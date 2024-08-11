import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gray-100 mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">About Us</h3>
                        <p>Your one-stop shop for all your e-commerce needs.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/shipping">Shipping</Link></li>
                            <li><Link href="/returns">Returns</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">My Account</h3>
                        <ul className="space-y-2">
                            <li><Link href="/account">My Account</Link></li>
                            <li><Link href="/orders">Order History</Link></li>
                            <li><Link href="/wishlist">Wish List</Link></li>
                            <li><Link href="/newsletter">Newsletter</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                        {/* Add social media icons/links here */}
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <p>&copy; 2023 Your E-commerce Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}