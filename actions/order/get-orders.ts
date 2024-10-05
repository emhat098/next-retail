'server only';

import prisma from '@/prisma/db';
import { Order } from '@/types';
import { MAX_ITEM_PER_PAGE } from '@/next.constants.mjs';
import { DataWithPagination } from '@/types/pagination';

export const defaultGetOrdersOrderBy = {
  createdAt: 'desc',
};

export const defaultGetOrderWhere = (q?: string) => (q ? {
  customer: {
    phoneNumber: {
      contains: q,
      mode: 'insensitive'
    },
  }
} : {});

const getOrders = async (
  where: object = {},
  take: number = MAX_ITEM_PER_PAGE,
  orderBy: object = defaultGetOrdersOrderBy,
  page: number = 1,
): Promise<DataWithPagination<Order> | undefined> => {
  try {
    const orders = await prisma.order.findMany({
      where,
      select: {
        id: true,
        customer: {
          select: {
            fullname: true,
            phoneNumber: true,
          }
        },
        createdAt: true,
      },
      skip: (page - 1) * take,
      orderBy,
      take,
    });

    const totalItem = await prisma.order.count({
      where
    });

    return {
      data: orders as unknown as Order[],
      pagination: {
        currentPage: page,
        itemPerPage: take,
        totalPage: Math.floor(totalItem / take),
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export default getOrders;