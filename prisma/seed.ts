import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed users
  const jane = await prisma.user.create({
    data: {
      email: "jane@example.com",
      name: "Jane Doe",
      // password for testing "hashedpassword123" cost factor 12
      password: "$2y$12$pnmG8xoVesJ0XVv6ON6B6uwQX1/NpUq7iGLjTD9fWo5Uw4774Lxo2",
      accountType: "SELLER",
    },
  });

  const john = await prisma.user.create({
    data: {
      email: "john@example.com",
      name: "John Smith",
      // password for testing "hashedpassword456" cost factor 12
      password: "$2y$12$yrmGesWrKgkF6q3x4lOjKebZo/rqakewJFLCXVE/v1CYUcFKQPC.a",
      accountType: "SELLER",
    },
  });

  const sarah = await prisma.user.create({
    data: {
      email: "sarah@example.com",
      name: "Sarah Jones",
      // password for testing "hashedpassword789" cost factor 12
      password: "$2y$12$4JBigxGbT9EWNVUF2CwL3uqirkeD0rLdqA561VaRxRKmDorkmbmly",
      accountType: "SELLER",
    },
  });

  const basicUser = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "Basic User",
      // password for testing "basicpassword123" cost factor 12
      password: "$2y$12$0n3gD.ifW27wKcV1TYu07O9YuOaXFiYJN5nYHmOkx4zqpdhuC7m3q",
      accountType: "BASIC",
    },
  });

  // Seed categories
  const ceramicsCategory = await prisma.category.create({
    data: { name: "Ceramics & Pottery" },
  });

  const woodCraftsCategory = await prisma.category.create({
    data: { name: "Wood Crafts" },
  });

  const jewelryCategory = await prisma.category.create({
    data: { name: "Handmade Jewelry" },
  });

  // Seed products
  const bowlSet = await prisma.product.create({
    data: {
      name: "Handcrafted Ceramic Bowl Set",
      description:
        "This ceramic set is made from high-quality materials, and each item is shaped and glazed by hand, making every piece one of a kind.",
      price: 49.99,
      image: "/ceramic-bowls.webp",
      userId: jane.id,
      categoryId: ceramicsCategory.id,
    },
  });

  const woodAnimals = await prisma.product.create({
    data: {
      name: "Hand Carved Wooden Animals",
      description:
        "Celebrate the beauty of nature and craftsmanship with this exquisite hand-carved wooden animal set.",
      price: 35.21,
      image: "/animal-wood.webp",
      userId: john.id,
      categoryId: woodCraftsCategory.id,
    },
  });

  const silverJewelry = await prisma.product.create({
    data: {
      name: "Silver Jewelry Collection",
      description:
        "From delicate chains and minimalist rings to statement earrings, each piece is crafted from high-quality 925 sterling silver.",
      price: 156.99,
      image: "/jewelry.webp",
      userId: sarah.id,
      categoryId: jewelryCategory.id,
    },
  });

  // Seed ratings
  await prisma.rating.createMany({
    data: [
      {
        rating: 5,
        comment: "Absolutely beautiful and well made!",
        userId: basicUser.id,
        productId: bowlSet.id,
      },
      {
        rating: 5,
        comment: "Amazing craftsmanship. Love it!",
        userId: basicUser.id,
        productId: woodAnimals.id,
      },
      {
        rating: 4,
        comment: "Very nice quality, but delivery was slow.",
        userId: basicUser.id,
        productId: silverJewelry.id,
      },
    ],
  });

  console.log("Seed data created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
