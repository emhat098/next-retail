import { FC } from "react";
import { Button } from "../ui/button";
import hideProductByid from "@/actions/product/hide-product-by-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import deleteProductById from "@/actions/product/delete-product-by-id ";

interface DeleteProductButtonProps {
  id: string;
}

const DeleteProductButton: FC<DeleteProductButtonProps> = ({id}) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      const result = await deleteProductById(id);
      if (result) {
        toast.success('Product is deleted successfully.');
        router.refresh();
      } else {
        toast.warning('This product is in other order items. You are not able to delete it.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form action={onDelete}>
      <Button variant={'destructive'} size={'icon'}>
        <Trash className={'w-4 h-4'} />
      </Button>
    </form>
  )
}

export default DeleteProductButton;