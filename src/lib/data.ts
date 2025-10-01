import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });
  return products;
}

export async function getProductById(productId: number) {
  const products = await prisma.product.findMany({
    where: {
      id: productId,
    },
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });
  return products;
}

export async function getUserById(userId: number) {
  const products = await prisma.user.findMany({
    where: {
      id: userId,
    },
    include: {
      products: true,
      reviews: true,
    },
  });
  return products;
}

export async function getThreeProducts() {
const allProductIds = await prisma.product.findMany({
  select: { id: true },
});
    
    const random = allProductIds.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const randomProducts = await prisma.product.findMany({
      where: {
        id: { in: random.map((item) => item.id) },
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });
  return randomProducts;
}
