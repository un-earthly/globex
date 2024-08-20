'use client'

import { forwardRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, User, LogOut, Search, CreditCard, Settings, Keyboard, Menu, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { logout } from '@/lib/features/userSlice' // Make sure this path is correct
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink
} from '@/components/ui/navigation-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { cn } from '@/lib/utils'
import { useGetTopCategoriesQuery } from '@/lib/features/api'
export default function Header() {
    const [searchQuery, setSearchQuery] = useState('')
    const cartItemCount = useSelector(state => state.cart.items.length)
    const wishListCount = useSelector(state => state.wishlist.items.length)
    const isAuthenticated = localStorage.getItem('user')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const router = useRouter();
    const { data, isError, isLoading } = useGetTopCategoriesQuery();

    const [selectedCategory, setSelectedCategory] = useState("")


    const handleSearch = (e) => {
        router.push(`/search?q=${encodeURIComponent(e.target.value)}`)
    }
    if (selectedCategory) {
        router.push(`/search?q=${selectedCategory}`)
    }

    const handleSignOut = () => {
        localStorage.removeItem('user');
        router.push('/');
    };
    return (
        <header className="bg-gray-100 shadow-md sticky top-0 z-50">
            <div className="text-xs py-1">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="hidden md:block">
                        <span>Free shipping on orders over $50!</span>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <Link href="/cart" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                            <ShoppingCart className="mr-1" size={16} />
                            <span className="hidden md:inline">Cart</span> ({cartItemCount})
                        </Link>
                        <Link href="/wishlist" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                            <Heart className="mr-1" size={16} />
                            <span className="hidden md:inline">Wishlist</span> ({wishListCount})
                        </Link>
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center p-1 text-xs hover:text-blue-600 transition-colors">
                                        <User className="mr-1" size={16} />
                                        <span className="hidden md:inline">Account</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {/* <DropdownMenuItem>
                                        <Link href="/profile" className="w-full">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/orders" className="w-full">Orders</Link>
                                    </DropdownMenuItem> */}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onSelect={handleSignOut}>
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/auth/login" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                                <User className="mr-1" size={16} />
                                <span className="hidden md:inline">Sign In</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="px-3 mx-auto md:px-4 py-4 flex items-center justify-between">
                <Link href="/" className="lg:text-2xl text-xl font-bold text-blue-600 shrink-0">E-Shop</Link>

                <form className="flex-grow mx-4 max-w-3xl hidden md:block">
                    <div className="flex w-full border-2 rounded-full border-black">
                        <div className="relative flex-grow">
                            <Input
                                type="search"
                                placeholder="Search products..."
                                onChange={(e) => { handleSearch(e); }}
                                className="w-full border-transparent ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none pl-10 pr-4"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        <div className="shrink-0">
                            <Select
                                className="bg-transparent border-l ring-0 focus:ring-0"
                                onValueChange={(v) => setSelectedCategory(v)}
                            >
                                <SelectTrigger className="border-transparent ring-0 focus:ring-0">
                                    <SelectValue
                                        className="capitalize"
                                        placeholder={
                                            selectedCategory
                                                ? data.categories.find((cat) => cat.slug === selectedCategory)?.slug
                                                : "All Categories"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select Category</SelectLabel>
                                        <SelectItem value="all">
                                            All Categories
                                        </SelectItem>
                                        {data?.categories?.map((category) => (
                                            <SelectItem
                                                value={category.name}
                                                className="capitalize"
                                                key={category.name}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>

                <div className="flex items-center shrink-0">
                    <Button
                        variant="ghost"
                        className="md:hidden mr-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu size={24} />
                    </Button>
                </div>
            </div>
            <div className="md:hidden">
                {isMobileMenuOpen && (
                    <div className="px-4 py-2">
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="flex w-full border rounded-full border-gray-300">
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full border-transparent rounded-l-full focus:ring-blue-500"
                                />
                                <Button type="submit" className="rounded-r-full bg-blue-600 hover:bg-blue-700">
                                    <Search className="text-white" size={18} />
                                </Button>
                            </div>
                        </form>
                        <Accordion type="single" collapsible className="w-full">
                            {data?.categories?.map((category) => (
                                <AccordionItem value={category.slug} key={category.slug}>
                                    <AccordionTrigger className="text-left">
                                        {category.name}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="pl-4 space-y-2">
                                            {category.subcategories.map((sub) => (
                                                <li key={sub.value}>
                                                    <Link href={`/category/${category.slug}/${sub.slug}`} className="block py-1 hover:text-blue-600">
                                                        {sub.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                )}
            </div>

            <div className="hidden md:block bg-blue-600 text-white">
                <div className="container mx-auto px-4">
                    <nav>
                        <ul className="flex justify-center space-x-6 py-2">

                            <NavigationMenu>
                                <NavigationMenuList>
                                    {data?.categories?.map(cat => <NavigationMenuItem>
                                        <NavigationMenuTrigger className="bg-transparent">{cat.name}</NavigationMenuTrigger>
                                        <NavigationMenuContent className="flex w-[400px] gap-3 p-4 md:w-[500px] lg:w-[800px] ">
                                            <ul className="grid grid-cols-3 gap-5 p-4 ">
                                                {cat?.subcategories?.map((sub) => (
                                                    <li key={sub.slug}>
                                                        <Link href={`/category/${cat.slug}/${sub.slug}`}>
                                                            <span className="hover:underline cursor-pointer">{sub.name}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div
                                                className="w-80 h-48 rounded-lg p-4 flex flex-col items-center justify-center bg-cover bg-center"
                                                style={{ backgroundImage: `url(${cat?.image})` }}
                                            >
                                                <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
                                                    <h3 className="text-lg font-semibold mb-2 text-white">{cat?.name}</h3>
                                                    <Link href={`/category/${cat.slug}`}>
                                                        <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer">
                                                            Shop Now
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    )}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});

// Assign a display name to the component
ListItem.displayName = "ListItem";
