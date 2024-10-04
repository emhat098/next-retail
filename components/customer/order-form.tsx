'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import SelectedProducts from './selected-product';
import { useContext } from 'react';
import { ShoppingCartContext } from '@/providers/shopping-cart-provider';
import { Order } from '@/types';
import { toast } from 'sonner';

const customerSchema = z.object({
  fullName: z.string().min(1, {
    message: 'Full name is required'
  }),
  phoneNumber: z.string().min(1, {
    message: 'Phone number is required'
  }),
  address: z.string().min(1, {
    message: 'Address is required'
  }),
  note: z.string().optional(),
});

const CustomerOrderForm = () => {
  const { totalItem, carts, clearCart } = useContext(ShoppingCartContext);

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      address: '',
      fullName: '',
      phoneNumber: '',
      note: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof customerSchema>) => {
    try {
      const order: Order = {
        customer: {
          address: values.address,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
        },
        orders: carts.map(c => ({
          product: c.product,
          quantity: c.quantity,
        })),
        note: values.note ?? '',
      };
      const res = await fetch('/api/order/create', {
        method: 'POST',
        body: JSON.stringify(order),
      });
      if (res.ok) {
        toast.success(res.statusText);
        clearCart();
        form.reset();
      } else {
        toast.success('Place order is failed. Something went wrong!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full bg-white p-2 rounded-md'>
      <Form {...form}>
        <form className={'space-y-2'} onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SelectedProducts />
          <div className='flex gap-2'>
            <Button disabled={totalItem === 0} type="submit">Place order</Button>
            <Button disabled={totalItem === 0} type="submit" variant={'outline'}>Place order & Print</Button>
          </div>
        </form>
      </Form>
      
    </div>
  )
}

export default CustomerOrderForm;