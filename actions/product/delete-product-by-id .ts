'use server';

import prisma from '@/prisma/db';
import { Product } from '@/types';

const deleteProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const products = await prisma.product.delete({
      where: {
        id
      },
    });
    return products as Product;
  } catch (error) {
    console.log(error);
  }
};

export default deleteProductById 