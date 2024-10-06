'use server';

import { GET_PRODUCTS_CACHE_TAG } from '@/next.constants.mjs';
import prisma from '@/prisma/db';
import { Product } from '@/types';
import { revalidateTag } from 'next/cache';

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
    revalidateTag(GET_PRODUCTS_CACHE_TAG);
    return result as Product;
  } catch (error) {
    console.log(error);
  }
};

export default hideProductByid 