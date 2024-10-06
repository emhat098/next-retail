'use server';

import { Order } from "@/types";
import prisma from '@/prisma/db';

const createOrder = async (order: Order) => {
  try {
    const customer = await prisma?.customer.create({
      data: {
        fullName: order.customer.fullName,
        address: order.customer.address,
        phoneNumber: order.customer.phoneNumber
      }
    });

    const orderResult = await prisma.order.create({
      data: {
        customerId: customer.id,
        note: order.note,
      }
    });

    const result = await prisma.orderItem.createMany({
      data: order.orders.map(o => ({
        orderId: orderResult.id,
        productId: o.product.id,
        quantity: o.quantity,
      }))
    });

    const isPlacedOrderSucces = result.count > 0;

    if (isPlacedOrderSucces) {
      await Promise.allSettled(order.orders.map(async (o) => {
        await prisma.product.update({
          where: {
            id: o.product.id
          },
          data: {
            stock: {
              decrement: o.quantity,
            }
          }
        })
      }));
    }

    return isPlacedOrderSucces;
  } catch (error) {
    console.log(error);
  }
}

export default createOrder;