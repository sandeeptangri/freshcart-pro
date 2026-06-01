const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixImages() {
  // Update categories
  await prisma.category.updateMany({
    where: { slug: 'fresh-vegetables' },
    data: { image: 'https://placehold.co/400x300/10B981/FFFFFF/png?text=Vegetables' }
  });
  await prisma.category.updateMany({
    where: { slug: 'fruits' },
    data: { image: 'https://placehold.co/400x300/F59E0B/FFFFFF/png?text=Fruits' }
  });
  
  // Update products
  await prisma.product.updateMany({
    where: { sku: 'VEG-TOM-001' },
    data: { images: ['https://placehold.co/400x300/EF4444/FFFFFF/png?text=Tomatoes'] }
  });
  await prisma.product.updateMany({
    where: { sku: 'VEG-SPN-001' },
    data: { images: ['https://placehold.co/400x300/10B981/FFFFFF/png?text=Spinach'] }
  });
  await prisma.product.updateMany({
    where: { sku: 'FRU-APL-001' },
    data: { images: ['https://placehold.co/400x300/F59E0B/FFFFFF/png?text=Apples'] }
  });
  
  console.log('Images updated!');
}

fixImages().finally(() => prisma.$disconnect());
