'server only';

import prisma from '@/prisma/db';
import { Product } from '@/types';

const getProducts = async (where: object = {}): Promise<Product[] | undefined> => {
  try {
    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        sku: true,
        name: true,
        price: true,
        isDeleted: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return products as Product[];
  } catch (error) {
    console.log(error);
  }
};

export default getProducts;