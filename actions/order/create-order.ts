'use server';

import { Order } from "@/types";
import prisma from '@/prisma/db';

const createOrder = async (order: Order) => {
  try {
    const customer = await prisma?.customer.create({
      data: {
        fullname: order.customer.fullName,
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
    })

    return result.count > 0;
  } catch (error) {
    console.log(error);
  }
}

export default createOrder;