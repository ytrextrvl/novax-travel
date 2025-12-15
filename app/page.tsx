import Link from 'next/link'
import { Search, MapPin, Calendar, Users, ArrowRight, ShieldCheck, Globe, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/90 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Discover the World with <span className="text-blue-400">NOVAX</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Seamless travel experiences from Yemen to the globe. Book flights, hotels, and visas in one place.
          </p>
          
          {/* Search Box */}
          <div className="bg-white p-4 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Check-in" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Travelers" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose NOVAX?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We combine local expertise with global standards to provide the best travel experience in Yemen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-10 h-10 text-blue-600" />}
              title="Secure & Trusted"
              description="Your payments and data are protected with enterprise-grade security."
            />
            <FeatureCard 
              icon={<Globe className="w-10 h-10 text-blue-600" />}
              title="Global Coverage"
              description="Access to over 500 airlines and 1 million hotels worldwide."
            />
            <FeatureCard 
              icon={<Clock className="w-10 h-10 text-blue-600" />}
              title="24/7 Support"
              description="Our local support team is always ready to assist you, anytime, anywhere."
            />
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Popular Destinations</h2>
              <p className="text-slate-600">Explore the most visited cities by our travelers.</p>
            </div>
            <Link href="/destinations" className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <DestinationCard 
              image="https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=2071&auto=format&fit=crop"
              city="Cairo"
              country="Egypt"
              price="From $350"
            />
            <DestinationCard 
              image="https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=2009&auto=format&fit=crop"
              city="Dubai"
              country="UAE"
              price="From $420"
            />
            <DestinationCard 
              image="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1994&auto=format&fit=crop"
              city="Tokyo"
              country="Japan"
              price="From $890"
            />
            <DestinationCard 
              image="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop"
              city="Paris"
              country="France"
              price="From $550"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow text-center">
      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  )
}

function DestinationCard({ image, city, country, price }: { image: string, city: string, country: string, price: string }) {
  return (
    <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent z-20"></div>
      <img src={image} alt={city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      
      <div className="absolute bottom-0 left-0 p-6 z-30 w-full">
        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-2">
          {price}
        </span>
        <h3 className="text-2xl font-bold text-white">{city}</h3>
        <p className="text-slate-300">{country}</p>
      </div>
    </div>
  )
}
