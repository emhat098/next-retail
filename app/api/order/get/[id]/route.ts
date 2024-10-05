import getOrderById from "@/actions/order/get-order-by-id";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params:  {
    id: string;
  }
}

export async function GET(req: NextRequest, {params}: Params) {
  try {
    if (!params.id) {
      return NextResponse.json({}, {
        status: 404,
        statusText: 'Order is not found',
      });
    }
    const result = await getOrderById(params.id);
    return NextResponse.json({
      data: result
    }, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: 'Something went wrong',
    }, {
      status: 500,
    })
  }
}
