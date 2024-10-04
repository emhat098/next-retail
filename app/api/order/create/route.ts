import createOrder from "@/actions/order/create-order";
import { Order } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await createOrder(body as unknown as Order);
    if (result) {
      return NextResponse.json({}, {
        status: 200,
        statusText: 'Order is created succesfully',
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: 'Something went wrong',
    }, {
      status: 500,
    })
  }
}