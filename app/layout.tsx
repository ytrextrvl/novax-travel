import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NOVAX Travel | طيران، فنادق وسيارات',
  description: 'NOVAX Travel — منصة سفر حديثة لحجوزات الطيران والفنادق والسيارات من اليمن إلى العالم.',
  metadataBase: new URL('https://novaxtravel.com'),
  openGraph: {
    title: 'NOVAX Travel',
    description: 'رحلتك تبدأ هنا — طيران، فنادق وسيارات من مكان واحد.',
    url: 'https://novaxtravel.com',
    siteName: 'NOVAX Travel',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
