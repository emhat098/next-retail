import { FC } from "react";
import { Button } from "../ui/button";
import hideProductByid from "@/actions/product/hide-product-by-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "lucide-react";

interface HideProductButtonProps {
  id: string;
  isDeleted: boolean;
}

const HideProductButton: FC<HideProductButtonProps> = ({id, isDeleted}) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      const result = await hideProductByid(id, !isDeleted);
      if (result) {
        toast.success(`Product is ${isDeleted ? 'displayed' : 'hidden'} successfully`);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form action={onDelete}>
      <Button variant={'outline'} size={'icon'}>
        {!isDeleted ? <EyeIcon className={'w-4 h-4'} /> : <EyeClosedIcon className={'w-4 h-4'} />}
      </Button>
    </form>
  )
}

export default HideProductButton;