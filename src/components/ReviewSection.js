'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ReviewSection({ reviews }) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle review submission
        console.log({ rating, comment })
    }

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
            <div className="space-y-4 mb-8">
                {reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4">
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                            ))}
                            <span className="ml-2 font-semibold">{review.author}</span>
                        </div>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Your Rating</label>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="comment" className="block mb-2">Your Review</label>
                    <Textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                    />
                </div>
                <Button type="submit">Submit Review</Button>
            </form>
        </div>
    )
}