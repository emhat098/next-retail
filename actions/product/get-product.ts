'server only';

import prisma from '@/prisma/db';
import { Product } from '@/types';
import { GET_PRODUCTS_CACHE_TAG, MAX_ITEM_PER_PAGE } from '@/next.constants.mjs';
import { DataWithPagination } from '@/types/pagination';
import { unstable_cache } from 'next/cache';

export const defaultGetProductOrderBy = {
  createdAt: 'desc',
};

export const defaultGetProductWhere = (q?: string) => (q ? {
  OR: [
    {
      sku: {
        contains: q,
        mode: 'insensitive'
      },
    },
    {
      name: {
        contains: q,
        mode: 'insensitive'
      },
    }
  ]
} : {});

const getProducts = unstable_cache(async (
  where: object = {},
  take: number = MAX_ITEM_PER_PAGE,
  orderBy: object = defaultGetProductOrderBy,
  page: number = 1,
): Promise<DataWithPagination<Product> | undefined> => {
  try {
    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        sku: true,
        name: true,
        price: true,
        salePrice: true,
        stock: true,
        isDeleted: true,
      },
      skip: (page - 1) * take,
      orderBy,
      take,
    });

    const totalItem = await prisma.product.count({
      where
    });

    return {
      data: products as Product[],
      pagination: {
        currentPage: page,
        itemPerPage: take,
        totalPage: Math.floor(totalItem / take),
      }
    };
  } catch (error) {
    console.log(error);
  }
}, [GET_PRODUCTS_CACHE_TAG.toLowerCase()],  {
  revalidate: 3600,
  tags: [GET_PRODUCTS_CACHE_TAG],
});

export default getProducts;