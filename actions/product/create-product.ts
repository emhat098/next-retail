'use server';

import { Product } from "@/types";
import prisma from '@/prisma/db';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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