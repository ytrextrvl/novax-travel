import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Plane, Menu, X, User, Phone } from 'lucide-react'
import CustomerAIChat from '@/components/CustomerAIChat'
import DownloadApkButton from '@/components/DownloadApkButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NOVAX TRAVEL - Your Gateway to the World',
  description: 'Book flights, hotels, and visas with ease. The most trusted travel agency in Yemen.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
      {/* NOVAX_BRAND_HEADER */}
      <header style={{position:"sticky",top:0,zIndex:50,background:"#ffffff",borderBottom:"1px solid rgba(0,0,0,.08)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
          <a href="/" style={{display:"inline-flex",alignItems:"center",gap:10,textDecoration:"none"}}>
            <img src="/brand/svg/novax_logo_primary_dark.svg" alt="NOVAX" style={{height:28,width:"auto"}} />
          </a>
        </div>
      </header>

        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2">
                  <img src="/images/logo-light.png" alt="NOVAX Logo" className="h-10 w-auto object-contain" />
                </Link>
                <div className="hidden md:flex ml-10 space-x-8">
                  <Link href="/flights" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Flights</Link>
                  <Link href="/hotels" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Hotels</Link>
                  <Link href="/visa" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Visa Services</Link>
                  <Link href="/about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">About Us</Link>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a href="tel:+967770000000" className="hidden md:flex items-center gap-2 text-slate-600 hover:text-blue-600">
                  <Phone size={18} />
                  <span className="text-sm font-medium">Support</span>
                </a>
                <Link href="/login" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
                  <User size={16} />
                  <span>Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="min-h-screen">
          {children}
        </main>
        <CustomerAIChat />

        <footer className="bg-slate-900 text-slate-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <img src="/images/logo-dark.png" alt="NOVAX Logo" className="h-10 w-auto object-contain brightness-0 invert" />
              </div>
              <p className="text-sm text-slate-400">
                Your trusted partner for travel in Yemen and beyond. Flights, hotels, and visas made simple.
              </p>
              <div className="pt-4">
                <DownloadApkButton className="text-sm py-2 px-4" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/flights" className="hover:text-white">Flight Booking</Link></li>
                <li><Link href="/hotels" className="hover:text-white">Hotel Reservations</Link></li>
                <li><Link href="/visa" className="hover:text-white">Visa Assistance</Link></li>
                <li><Link href="/corporate" className="hover:text-white">Corporate Travel</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Support</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Sana'a, Yemen</li>
                <li>support@novaxtravel.com</li>
                <li>+967 77 000 0000</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} NOVAX TRAVEL. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
