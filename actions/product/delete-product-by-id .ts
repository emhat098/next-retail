'use server';

import { GET_PRODUCTS_CACHE_TAG } from '@/next.constants.mjs';
import prisma from '@/prisma/db';
import { Product } from '@/types';
import { revalidateTag } from 'next/cache';

const deleteProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const products = await prisma.product.delete({
      where: {
        id
      },
    });
    revalidateTag(GET_PRODUCTS_CACHE_TAG);
    return products as Product;
  } catch (error) {
    console.log(error);
  }
};

export default deleteProductById 