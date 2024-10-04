import createProduct from "@/actions/product/create-product";
import { Product } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await createProduct(body as unknown as Product);
    if (result) {
      return NextResponse.json({}, {
        status: body.id ? 201 : 200,
        statusText: `Product is ${body.id ? 'updated' : 'created' } succesfully`,
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
