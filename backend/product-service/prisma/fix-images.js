const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const imageUpdates = {
  'VEG-TOM-001': 'https://images.unsplash.com/photo-1592924357228-91a46a0d04c0?w=400&h=300&fit=crop',
  'VEG-SPN-001': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
  'FRU-APL-001': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop'
};

async function fixImages() {
  for (const [sku, imageUrl] of Object.entries(imageUpdates)) {
    await prisma.product.updateMany({
      where: { sku },
      data: { images: [imageUrl] }
    });
    console.log(`Updated ${sku}`);
  }
  console.log('Done!');
}

fixImages().finally(() => prisma.$disconnect());
