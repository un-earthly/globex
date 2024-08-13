import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-100 mt-12 text-gray-700">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-blue-600">About Us</h3>
                        <p>Your one-stop shop for all your e-commerce needs.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-blue-600">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="hover:text-blue-600 transition-colors">Shipping</Link></li>
                            <li><Link href="/returns" className="hover:text-blue-600 transition-colors">Returns</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-blue-600">My Account</h3>
                        <ul className="space-y-2">
                            <li><Link href="/account" className="hover:text-blue-600 transition-colors">My Account</Link></li>
                            <li><Link href="/orders" className="hover:text-blue-600 transition-colors">Order History</Link></li>
                            <li><Link href="/wishlist" className="hover:text-blue-600 transition-colors">Wish List</Link></li>
                            <li><Link href="/newsletter" className="hover:text-blue-600 transition-colors">Newsletter</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-blue-600">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                <Youtube size={24} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
                    <p>&copy; 2023 Your E-commerce Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}