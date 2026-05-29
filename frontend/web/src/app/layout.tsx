import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FreshCart Pro - Fresh Groceries Delivered',
  description: 'Your one-stop shop for fresh groceries',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
