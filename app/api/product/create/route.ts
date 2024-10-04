import createProduct from "@/actions/product/create-product";
import { Product } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await createProduct(body as unknown as Product);
    if (result && !('error' in result)) {
      return NextResponse.json({}, {
        status: body.id ? 201 : 200,
        statusText: `Product is ${body.id ? 'updated' : 'created' } succesfully`,
      });
    }
    return NextResponse.json({}, {
      status: 400,
      statusText: result?.error,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong',
    }, {
      status: 500,
    })
  }
}
