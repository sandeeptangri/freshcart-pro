import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function DealsSection() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider mb-2">Limited Time</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fresh Deals Every Day
            </h2>
            <p className="text-white/90 mb-6">
              Save up to 50% on select items. New deals added daily.
            </p>
            <Link href="/deals">
              <Button variant="secondary" size="lg">
                Shop Deals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
