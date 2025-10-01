import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";

const prisma = new PrismaClient();

async function promoteUserToSeller(userId: number) {
  try {
    // 1️⃣ Update the user in the DB
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { accountType: "SELLER" }, // must match enum exactly
    });
    console.log("[DEBUG] User updated to SELLER:", updatedUser);

    // 2️⃣ Generate a JWT reflecting the new role
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({ id: updatedUser.id, role: updatedUser.accountType })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    console.log("[DEBUG] Generated JWT:", token);

    // 3️⃣ Optionally, verify the user again
    const verifiedUser = await prisma.user.findUnique({ where: { id: userId } });
    console.log("[DEBUG] Verified user from DB:", verifiedUser);

    console.log("\n✅ Done! User is now a SELLER and JWT is ready for testing.");
  } catch (err) {
    console.error("[ERROR] Failed to promote user:", err);
  } finally {
    await prisma.$disconnect();
  }
}

// Replace 16 with the ID of the user you want to promote
promoteUserToSeller(16);
