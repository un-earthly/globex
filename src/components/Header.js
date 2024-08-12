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
export default function Header() {
    const [searchQuery, setSearchQuery] = useState('')
    const cartItemCount = useSelector(state => state.cart.items.length)
    const wishListCount = useSelector(state => state.wishlist.items.length)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter();
    const categories = [
        {
            "value": "electronics",
            "label": "Electronics",
            "subcategories": [
                {
                    "value": "smartphones",
                    "label": "Smartphones"
                },
                {
                    "value": "laptops",
                    "label": "Laptops"
                },
                {
                    "value": "tablets",
                    "label": "Tablets"
                },
                {
                    "value": "cameras",
                    "label": "Cameras"
                },
                {
                    "value": "headphones",
                    "label": "Headphones"
                },
                {
                    "value": "smartwatches",
                    "label": "Smartwatches"
                },
                {
                    "value": "gaming-consoles",
                    "label": "Gaming Consoles"
                },
                {
                    "value": "drones",
                    "label": "Drones"
                }
            ]
        },
        {
            "value": "fashion",
            "label": "Fashion",
            "subcategories": [
                {
                    "value": "men's-clothing",
                    "label": "Men's Clothing"
                },
                {
                    "value": "women's-clothing",
                    "label": "Women's Clothing"
                },
                {
                    "value": "footwear",
                    "label": "Footwear"
                },
                {
                    "value": "watches",
                    "label": "Watches"
                },
                {
                    "value": "bags",
                    "label": "Bags"
                },
                {
                    "value": "jewelry",
                    "label": "Jewelry"
                },
                {
                    "value": "sunglasses",
                    "label": "Sunglasses"
                },
                {
                    "value": "accessories",
                    "label": "Accessories"
                }
            ]
        },
        {
            "value": "homeAppliances",
            "label": "Home Appliances",
            "subcategories": [
                {
                    "value": "refrigerators",
                    "label": "Refrigerators"
                },
                {
                    "value": "washing-machines",
                    "label": "Washing Machines"
                },
                {
                    "value": "microwave-ovens",
                    "label": "Microwave Ovens"
                },
                {
                    "value": "air-conditioners",
                    "label": "Air Conditioners"
                },
                {
                    "value": "vacuum-cleaners",
                    "label": "Vacuum Cleaners"
                },
                {
                    "value": "water-purifiers",
                    "label": "Water Purifiers"
                },
                {
                    "value": "kitchen-appliances",
                    "label": "Kitchen Appliances"
                },
                {
                    "value": "heaters",
                    "label": "Heaters"
                }
            ]
        },
        {
            "value": "beautyAndHealth",
            "label": "Beauty And Health",
            "subcategories": [
                {
                    "value": "skincare",
                    "label": "Skincare"
                },
                {
                    "value": "makeup",
                    "label": "Makeup"
                },
                {
                    "value": "haircare",
                    "label": "Haircare"
                },
                {
                    "value": "fragrances",
                    "label": "Fragrances"
                },
                {
                    "value": "personal-care",
                    "label": "Personal Care"
                },
                {
                    "value": "health-supplements",
                    "label": "Health Supplements"
                },
                {
                    "value": "fitness-equipment",
                    "label": "Fitness Equipment"
                },
                {
                    "value": "wellness",
                    "label": "Wellness"
                }
            ]
        },
        {
            "value": "sports",
            "label": "Sports",
            "subcategories": [
                {
                    "value": "sportswear",
                    "label": "Sportswear"
                },
                {
                    "value": "footwear",
                    "label": "Footwear"
                },
                {
                    "value": "gym-equipment",
                    "label": "Gym Equipment"
                },
                {
                    "value": "outdoor-gear",
                    "label": "Outdoor Gear"
                },
                {
                    "value": "team-sports",
                    "label": "Team Sports"
                },
                {
                    "value": "cycling",
                    "label": "Cycling"
                },
                {
                    "value": "yoga",
                    "label": "Yoga"
                },
                {
                    "value": "swimming",
                    "label": "Swimming"
                }
            ]
        },
        {
            "value": "books",
            "label": "Books",
            "subcategories": [
                {
                    "value": "fiction",
                    "label": "Fiction"
                },
                {
                    "value": "non-fiction",
                    "label": "Non-Fiction"
                },
                {
                    "value": "children's-books",
                    "label": "Children's Books"
                },
                {
                    "value": "educational",
                    "label": "Educational"
                },
                {
                    "value": "comics",
                    "label": "Comics"
                },
                {
                    "value": "biographies",
                    "label": "Biographies"
                },
                {
                    "value": "self-help",
                    "label": "Self-help"
                },
                {
                    "value": "science-&-technology",
                    "label": "Science & Technology"
                }
            ]
        },
        {
            "value": "automotive",
            "label": "Automotive",
            "subcategories": [
                {
                    "value": "car-accessories",
                    "label": "Car Accessories"
                },
                {
                    "value": "motorbike-accessories",
                    "label": "Motorbike Accessories"
                },
                {
                    "value": "car-electronics",
                    "label": "Car Electronics"
                },
                {
                    "value": "tires-&-wheels",
                    "label": "Tires & Wheels"
                },
                {
                    "value": "oils-&-fluids",
                    "label": "Oils & Fluids"
                },
                {
                    "value": "car-care",
                    "label": "Car Care"
                },
                {
                    "value": "motorbike-parts",
                    "label": "Motorbike Parts"
                },
                {
                    "value": "tools-&-equipment",
                    "label": "Tools & Equipment"
                }
            ]
        },
        {
            "value": "toysAndGames",
            "label": "Toys And Games",
            "subcategories": [
                {
                    "value": "action-figures",
                    "label": "Action Figures"
                },
                {
                    "value": "board-games",
                    "label": "Board Games"
                },
                {
                    "value": "puzzles",
                    "label": "Puzzles"
                },
                {
                    "value": "dolls",
                    "label": "Dolls"
                },
                {
                    "value": "educational-toys",
                    "label": "Educational Toys"
                },
                {
                    "value": "outdoor-toys",
                    "label": "Outdoor Toys"
                },
                {
                    "value": "video-games",
                    "label": "Video Games"
                },
                {
                    "value": "building-sets",
                    "label": "Building Sets"
                }
            ]
        }
    ]
    const [selectedCategory, setSelectedCategory] = useState("")
    const handleLogout = () => {
        dispatch(logout())
        document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        router.push('/auth/login')
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="bg-gray-100 text-xs py-1">
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
                                {/* DropdownMenuContent remains the same */}
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
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-600 shrink-0">E-Shop</Link>

                <form onSubmit={handleSearch} className="flex-grow mx-4 max-w-3xl">
                    <div className="flex w-full border-2 rounded-full border-black">
                        <div className="relative flex-grow">
                            <Input
                                type="search"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                                                ? categories.find((cat) => cat.value === selectedCategory)?.label
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
                                        {categories.map((category) => (
                                            <SelectItem
                                                value={category.value}
                                                className="capitalize"
                                                key={category.value}
                                            >
                                                {category.label}
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
                    {/* Add other navigation items here */}
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
                            {categories.map((category) => (
                                <AccordionItem value={category.value} key={category.value}>
                                    <AccordionTrigger className="text-left">
                                        {category.label}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="pl-4 space-y-2">
                                            {category.subcategories.map((sub) => (
                                                <li key={sub.value}>
                                                    <Link href={`/category/${category.value}/${sub.value}`} className="block py-1 hover:text-blue-600">
                                                        {sub.label}
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
                    <NavigationMenu>
                        <NavigationMenuList className="space-x-6 py-2">
                            {categories.map((category) => (
                                <NavigationMenuItem key={category.value}>
                                    <NavigationMenuTrigger className="bg-transparent hover:bg-blue-700 hover:text-white transition-colors">
                                        {category.label}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div>
                                            <div className="w-[800px] p-4">
                                                <div className="grid grid-cols-5 gap-4">
                                                    <ul className="col-span-3 grid grid-cols-2 gap-2">
                                                        {category.subcategories.map((sub) => (
                                                            <ListItem
                                                                key={sub.value}
                                                                title={sub.label}
                                                                href={`/category/${category.value}/${sub.value}`}
                                                            />
                                                        ))}
                                                    </ul>
                                                    <div className="col-span-2 bg-muted rounded-lg p-4 flex flex-col items-center justify-center">
                                                        <img
                                                            src={`https://source.unsplash.com/random/300x200?${category.label}`}
                                                            alt={`${category.label} category`}
                                                            className="rounded-lg mb-4"
                                                        />
                                                        <h3 className="text-lg font-semibold mb-2">{category.label}</h3>
                                                        <Button variant="outline">Shop Now</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </header>
    )
}


const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
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
                </a>
            </NavigationMenuLink>
        </li >
    )
})