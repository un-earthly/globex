"use client"
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Chrome, Youtube, Twitch, Linkedin, ShoppingCart, Tag } from 'lucide-react';
import ProductList from '@/components/ProductList'
import { Button } from '@/components/ui/button'
import HeroBanner from '@/components/HeroBanner'
import CategoryCard from '@/components/CategoryCard'
import DealOfTheDay from '@/components/DealOfTheDay'
import PromoBar from '@/components/PromoBar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { useGetAllProductsQuery, useGetDealOfTheDayQuery, useGetTopCategoriesQuery } from '@/lib/features/api';
import { useEffect } from 'react';



export default function Home() {
  const brandIcons = [
    { id: 1, icon: Linkedin, name: 'Apple' },
    { id: 2, icon: Chrome, name: 'Facebook' },
    { id: 3, icon: Twitter, name: 'Twitter' },
    { id: 4, icon: Instagram, name: 'Instagram' },
    { id: 5, icon: Youtube, name: 'Amazon' },
    { id: 6, icon: Twitch, name: 'Google' },
  ];
  const { data, isError, isLoading } = useGetTopCategoriesQuery();
  const { data: dealOfTheDay, isError: dealOfTheDayErr, isLoading: dealOfTheLoading } = useGetDealOfTheDayQuery();
  const { data: featuredProducts, isError: featuredProductsErr, isLoading: featuredProductsLoading } = useGetAllProductsQuery()
  return (
    <div className="min-h-screen">
      <PromoBar message="Free shipping on orders over $50! Use code: FREESHIP50" />

      <Container>
        <Section>
          <HeroBanner />
        </Section>

        <Section>
          <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {isLoading && <p>Loading</p>}
            {(data && data.categories && data.categories.length > 0) && data.categories.slice(0, 6).map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}

          </div>
        </Section>

        <Section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <Button variant="outline" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>
          <ProductList products={featuredProducts?.data} />
        </Section>

        <Section>
          <Card>
            <CardHeader>
              <CardTitle>Deal of the Day</CardTitle>
            </CardHeader>
            <CardContent>
              <DealOfTheDay deal={dealOfTheDay?.data} />
            </CardContent>
          </Card>
        </Section>

        <Section>
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
        </Section>

        <Section>
          <h2 className="text-2xl font-semibold mb-6">Popular Brands</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {brandIcons.map(({ id, icon: Icon, name }) => (
              <Card key={id} className="flex items-center justify-center p-4">
                <Icon size={50} className="text-gray-700" alt={name} />
              </Card>
            ))}
          </div>
        </Section>
      </Container>
    </div>
  )
}