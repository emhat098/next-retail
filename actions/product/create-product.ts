'use server';

import { Product } from "@/types";
import prisma from '@/prisma/db';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidateTag } from "next/cache";
import { GET_PRODUCTS_CACHE_TAG } from "@/next.constants.mjs";

const createProduct = async (product: Product) => {
  try {
    let result;
    if (product.id) {
      result = await prisma?.product.update({
        where: {
          id: product.id
        },
        data: {
          ...product,
          updatedAt: new Date(),
        }
      });
    } else {
      result = await prisma?.product.create({
        data: product,
      });
    }

    revalidateTag(GET_PRODUCTS_CACHE_TAG);
    return result;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        error: 'SKU is unique. Please choose other SKU.'
      };
    }
  }
}

export default createProduct;