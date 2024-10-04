"use client";

import { useContext } from "react";
import { Button } from "../ui/button"
import { ShoppingCartContext } from "@/providers/shopping-cart-provider";
import { Product } from "@/types";
import { toast } from "sonner"

interface AddToCartProps {
  product: Product;
}

const AddToCart: React.FC<AddToCartProps> = ({product}) => {
  const { addToCart } = useContext(ShoppingCartContext);

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity: 1
    });

    toast.success('Added product: ' + product.name + ' to shopping cart');
  }

  return (
    <Button
      onClick={handleAddToCart}
      size={'sm'}
    >
      {'Add to cart'}
    </Button>
  )
}

export default AddToCart;