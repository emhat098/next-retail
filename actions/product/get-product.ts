'server only';

import prisma from '@/prisma/db';
import { Product } from '@/types';

const getProducts = async (): Promise<Product[] | undefined> => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isDeleted: false
      },
      select: {
        id: true,
        sku: true,
        name: true,
        price: true,
      }
    });

    return products as Product[];
  } catch (error) {
    console.log(error);
  }
};

export default getProducts;