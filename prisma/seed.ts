import prisma from './db';

async function main() {
  try {
    // await prisma.order.deleteMany();
    // await prisma.customer.deleteMany();
    // await prisma.orderItem.deleteMany();
    // await prisma.product.deleteMany();

    // await prisma.product.createMany({
    //   data: [
    //     {
    //       name: 'Product 1',
    //       price: 200000,
    //       sku: 'P1',
    //       updatedAt: new Date(),
    //     },
    //     {
    //       name: 'Product 2',
    //       price: 300000,
    //       sku: 'P2',
    //       updatedAt: new Date(),
    //     },
    //     {
    //       name: 'Product 3',
    //       price: 400000,
    //       sku: 'P3',
    //       updatedAt: new Date(),
    //     },
    //     {
    //       name: 'Product 4',
    //       price: 400000,
    //       sku: 'P4',
    //       updatedAt: new Date(),
    //     },
    //   ]
    // });
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma?.$disconnect();
  }).catch(async err => {
    console.log(err);
    await prisma?.$disconnect();
    process.exit(1);
  })