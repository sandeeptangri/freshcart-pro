import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="aspect-square rounded-lg" />
        <Skeleton className="h-4 w-3/4 mt-4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
        <Skeleton className="h-8 w-full mt-4" />
      </CardContent>
    </Card>
  )
}
