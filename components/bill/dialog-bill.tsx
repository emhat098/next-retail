import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Bill from "./bill";
import { Order } from "@/types";
import { FC } from "react";

interface BillDialogProps {
  orderId?: string;
  order?: Order;
  onClick?: any;
  title?: string;
  isOpen?: boolean;
  setOpen?: any;
  disabled?: boolean
}

const BillDialog: FC<BillDialogProps> = ({  
  order,
  orderId,
  onClick,
  title,
  isOpen,
  setOpen,
  disabled = true,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} size={'sm'} onClick={onClick} variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="w-full !bg-transparent border-none print:shadow-none">
        <DialogTitle>{''}</DialogTitle>
        <DialogDescription>{''}</DialogDescription>
        <Bill orderId={orderId} order={order} />
      </DialogContent>
    </Dialog>
  )
}

export default BillDialog;