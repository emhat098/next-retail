'use server';

import prisma from '@/prisma/db';
import { Product } from '@/types';

const hideProductByid = async (id: string): Promise<Product | undefined> => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id
      }
    })

    const result = await prisma.product.update({
      where: {
        id
      },
      data: {
        isDeleted: !product?.isDeleted,
        updatedAt: new Date(),
      }
    });
    return result as Product;
  } catch (error) {
    console.log(error);
  }
};

export default hideProductByid 