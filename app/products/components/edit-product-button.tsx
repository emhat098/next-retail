'use client';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const productFormSchema = z.object({
  sku: z.string().min(1, {
    message: 'SKU is required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  price: z.coerce
    .number({
      coerce: true,
      required_error: 'Price is required',
    })
    .positive({
      message: 'Price must be greater than 0.',
    })
    .min(1, {
      message: 'Price should be at least 1.',
    }),
  salePrice: z.coerce
    .number({
      coerce: true,
    }),
  stock: z.coerce
    .number({
      coerce: true,
      required_error: 'Stock is required',
    })
    .positive({
      message: 'Stock must be greater than 0.',
    })
    .min(1, {
      message: 'Stock should be at least 1.',
    }),
});

type ProductSchemaType = z.infer<typeof productFormSchema>;

interface EditProductButtonProps {
  id?: string;
  title?: string;
}

const EditProductButton: FC<EditProductButtonProps> = ({ title, id }) => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      sku: '',
      name: '',
      price: 0,
      salePrice: 0,
      stock: 1,
    }
  });

  useEffect(() => {
    if (id && isOpen) {
      fetch('/api/product/get/' + id)
        .then(res => res.json())
        .then(res => {
          if (res) {
            form.reset(res.body);
          }
        }).catch(err => {
          console.log(err);
        })
    }
  }, [id, isOpen, form])

  const onSubmit = async (values: ProductSchemaType) => {
    try {
      const body = JSON.stringify({
        id: id,
        ...values
      });
      const res = await fetch('/api/product/create', {
        method: 'POST',
        body
      });
      if (res.ok) {
        toast.success(res.statusText);
        setOpen(false);
        form.reset();
        router.refresh();
      } else {
        form.setError('sku', {
          message: res.statusText,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(title ? 'underline p-0' : '')} variant={title ? "link" : "outline"}>{title ?? "Add a product"}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>
            {`Make changes to your product here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className={"space-y-4"} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input disabled={Boolean(id)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


export default EditProductButton;