'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div>
            {isVisible && (
                <Button
                    className="fixed bottom-4 right-4 p-2 rounded-full z-50 md:bottom-8 md:right-8"
                    onClick={scrollToTop}
                    size="icon"
                    aria-label="Back to top"
                >
                    <ArrowUp className="h-4 w-4" />
                </Button>
            )}
        </div>
    )
}

export default BackToTopButton