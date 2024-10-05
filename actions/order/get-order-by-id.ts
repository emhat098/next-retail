'server only';

import prisma from '@/prisma/db';
import { Order } from '@/types';

const getOrderById = async (id: string): Promise<Order | undefined> => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        customer: {
          select: {
            fullName: true,
            phoneNumber: true,
            address: true
          }
        },
        orders: {
          select: {
            quantity: true,
            product: {
              select: {
                name: true,
                sku: true,
                price: true,
              }
            }
          },
        },
        createdAt: true,
      },
    });

    return order as unknown as Order;
  } catch (error) {
    console.log(error);
  }
};

export default getOrderById;