const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Fresh Vegetables', slug: 'fresh-vegetables', description: 'Farm fresh vegetables', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400' },
      { name: 'Fruits', slug: 'fruits', description: 'Fresh and juicy fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400' },
      { name: 'Dairy & Eggs', slug: 'dairy-eggs', description: 'Fresh dairy products', image: 'https://images.unsplash.com/photo-1628088062854-d187c3b5d9d2?w=400' },
      { name: 'Beverages', slug: 'beverages', description: 'Drinks and juices', image: 'https://images.unsplash.com/photo-1625772299848-391b82bc973f?w=400' }
    ],
    skipDuplicates: true
  });

  console.log('Categories created:', categories.count);

  // Get category IDs
  const vegCat = await prisma.category.findUnique({ where: { slug: 'fresh-vegetables' } });
  const fruitCat = await prisma.category.findUnique({ where: { slug: 'fruits' } });
  
  if (vegCat && fruitCat) {
    // Create products
    const products = await prisma.product.createMany({
      data: [
        { name: 'Fresh Tomatoes', description: 'Ripe red tomatoes, 500g', price: 40, sku: 'VEG-TOM-001', stock: 100, images: ['https://images.unsplash.com/photo-1592924357228-91a46a0d04c0?w=400'], categoryId: vegCat.id, featured: true, rating: 4.5, reviewCount: 120 },
        { name: 'Organic Spinach', description: 'Fresh organic spinach bunch', price: 30, sku: 'VEG-SPN-001', stock: 50, images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400'], categoryId: vegCat.id, featured: true, rating: 4.7, reviewCount: 85 },
        { name: 'Fresh Apples', description: 'Sweet and crunchy apples, 1kg', price: 120, sku: 'FRU-APL-001', stock: 200, images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400'], categoryId: fruitCat.id, featured: true, rating: 4.6, reviewCount: 200 }
      ]
    });
    console.log('Products created:', products.count);
  }

  console.log('Seeding completed!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
