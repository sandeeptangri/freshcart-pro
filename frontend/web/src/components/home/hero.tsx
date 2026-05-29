import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-background py-20">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Fresh Groceries
              <br />
              <span className="text-green-600">Delivered to You</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Shop from thousands of fresh products and get them delivered
              to your doorstep in as little as 2 hours.
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button size="lg" className="gap-2">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                View Deals
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
              <div className="text-6xl">🥬</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
