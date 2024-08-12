import { Suspense } from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Chrome, Youtube, Twitch, Linkedin, ShoppingCart, Tag } from 'lucide-react';
import { fetchFeaturedProducts, fetchDealOfTheDay, fetchTopCategories } from '@/lib/products'
import ProductList from '@/components/ProductList'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

// New components you'll need to create:
import HeroBanner from '@/components/HeroBanner'
import CategoryCard from '@/components/CategoryCard'
import DealOfTheDay from '@/components/DealOfTheDay'
import PromoBar from '@/components/PromoBar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

async function FeaturedProducts() {
  const featuredProducts = await fetchFeaturedProducts()
  return <ProductList products={featuredProducts} />
}

async function DealOfTheDaySection() {
  const deal = await fetchDealOfTheDay()
  return <DealOfTheDay deal={deal} />
}

async function TopCategories() {
  const categories = await fetchTopCategories()
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}

export default function Home() {
  const brandIcons = [
    { id: 1, icon: Linkedin, name: 'Apple' },
    { id: 2, icon: Chrome, name: 'Facebook' },
    { id: 3, icon: Twitter, name: 'Twitter' },
    { id: 4, icon: Instagram, name: 'Instagram' },
    { id: 5, icon: Youtube, name: 'Amazon' },
    { id: 6, icon: Twitch, name: 'Google' },
  ];

  return (
    <div className="min-h-screen">
      <PromoBar message="Free shipping on orders over $50! Use code: FREESHIP50" />

      <main className="container mx-auto px-4 py-8">
        <HeroBanner />

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
          <Suspense fallback={<p>Loading categories...</p>}>
            <TopCategories />
          </Suspense>
        </section>

        <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <Button variant="outline" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>
          <Suspense fallback={<p>Loading featured products...</p>}>
            <FeaturedProducts />
          </Suspense>
        </section>

        <section className="my-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Deal of the Day</h2>
          <Suspense fallback={<p>Loading deal of the day...</p>}>
            <DealOfTheDaySection />
          </Suspense>
        </section>

        <section className="my-12">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "New Arrivals",
                description: "Check out our latest products and be the first to get them!",
                link: "/new-arrivals",
                bgColor: "bg-blue-100",
                icon: <ShoppingCart className="mr-3 text-blue-600" size={24} />,
              },
              {
                title: "Clearance Sale",
                description: "Huge discounts on selected items. Don't miss out!",
                link: "/clearance",
                bgColor: "bg-green-100",
                icon: <Tag className="mr-3 text-green-600" size={24} />,
              },
            ].map((card, index) => (
              <Card key={index} className={card.bgColor}>
                <CardHeader className="flex items-center">
                  {card.icon}
                  <CardTitle className="text-xl font-semibold">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <p className="mb-4">{card.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                  <Button asChild>
                    <Link href={card.link}>{`Shop ${card.title}`}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}

          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Brands</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {brandIcons.map(({ id, icon: Icon, name }) => (
              <div key={id} className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
                <Icon size={50} className="text-gray-700" alt={name} />
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  )
}