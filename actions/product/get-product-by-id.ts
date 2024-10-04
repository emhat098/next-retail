'server only';

import prisma from '@/prisma/db';
import { Product } from '@/types';

const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const products = await prisma.product.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        sku: true,
        name: true,
        price: true,
      }
    });
    return products as Product;
  } catch (error) {
    console.log(error);
  }
};

export default getProductById 