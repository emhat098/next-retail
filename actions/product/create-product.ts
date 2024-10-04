'use server';

import { Product } from "@/types";
import prisma from '@/prisma/db';

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
        data: {
          name: product.name,
          sku: product.sku,
          price: product.price
        }
      });
    }
   
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default createProduct;