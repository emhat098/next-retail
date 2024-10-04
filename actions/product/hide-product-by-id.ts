'use server';

import prisma from '@/prisma/db';
import { Product } from '@/types';

const hideProductByid = async (id: string, isDeleted: boolean = true): Promise<Product | undefined> => {
  try {
    const result = await prisma.product.update({
      where: {
        id
      },
      data: {
        isDeleted,
        updatedAt: new Date(),
      }
    });
    return result as Product;
  } catch (error) {
    console.log(error);
  }
};

export default hideProductByid 