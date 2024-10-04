import getProductById from "@/actions/product/get-product-by-id";
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
        statusText: 'Product is not found',
      });
    }
    const result = await getProductById(params.id);
    return NextResponse.json({
      body: result
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
