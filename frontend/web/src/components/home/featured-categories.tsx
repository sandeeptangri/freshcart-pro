import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  { id: 1, name: 'Fresh Produce', image: '🥬', slug: 'fresh-produce' },
  { id: 2, name: 'Dairy & Eggs', image: '🥛', slug: 'dairy-eggs' },
  { id: 3, name: 'Meat & Seafood', image: '🥩', slug: 'meat-seafood' },
  { id: 4, name: 'Bakery', image: '🥖', slug: 'bakery' },
  { id: 5, name: 'Beverages', image: '🥤', slug: 'beverages' },
  { id: 6, name: 'Snacks', image: '🍿', slug: 'snacks' },
]

export function FeaturedCategories() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <span className="text-4xl mb-3">{category.image}</span>
                  <span className="text-sm font-medium text-center">{category.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
