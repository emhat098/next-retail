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
import { Textarea } from '../ui/textarea';

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

  const handleOnPlaceOrderAndPrint = async () => {
    window.print();
    form.handleSubmit(onSubmit)();
  }

  return (
    <div className='w-full bg-white p-2 rounded-md'>
      <div className='print:flex flex-col gap-1 hidden'>
        <div className='flex flex-col items-center'>
          <h2 className='font-bold text-2xl text-center'>Next retail</h2>
          <hr />
          <div className={'text-sm font-bold'}>Shop information: </div>
          <div className='text-sm'>Adress: Some where </div>
          <div className='text-sm'>Phone: 099999999 </div>
        </div>
        <hr />
        <div className='flex flex-col'>
          <div className={'text-sm font-bold'}>Customer information: </div>
          <div className='text-sm'>
            <span className={'font-bold'}>Fullname: </span>
            <span>{form.getValues('fullName')}</span>
          </div>
          <div className='text-sm'>
            <span className={'font-bold'}>Phone number: </span>
            <span>{form.getValues('phoneNumber')}</span>
          </div>
          <div className='text-sm'>
            <span className={'font-bold'}>Address: </span>
            <span>{form.getValues('address')}</span>
          </div>
          <div className='text-sm'>
            <span className={'font-bold'}>Note: </span>
            <span>{form.getValues('note')}</span>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={'print:space-y-0 space-y-2 mb-4 print:hidden'}>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (form.getValues('fullName')) {
                            document.title = 'Order: ' + form.getValues('fullName');
                          }
                        }}
                      />
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
                      <Input className={'print:py-0'} {...field} />
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
                    <Textarea rows={3} {...field} />
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
            <hr />
          </div>
          <SelectedProducts />
          <div className='flex gap-2'>
            <Button
              disabled={totalItem === 0}
              type="submit"
              className="print:hidden"
            >
              Place order
            </Button>
            <Button
              disabled={totalItem === 0}
              variant={'outline'}
              onClick={handleOnPlaceOrderAndPrint}
              className="print:hidden"
            >
              Place order & Print
            </Button>
          </div>
        </form>
      </Form>
      
    </div>
  )
}

export default CustomerOrderForm;