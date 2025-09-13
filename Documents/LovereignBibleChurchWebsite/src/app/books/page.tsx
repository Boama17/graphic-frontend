"use client"

import {Suspense} from "react"
import {useSearchParams} from "next/navigation"
import BookDetails from "@/components/books/BooksDetails";
import BooksList from "@/components/books/BooksLists";

function BooksContent() {
    const searchParams = useSearchParams()
    const bookId = searchParams.get("id")

    if (bookId) {
        return <BookDetails bookId={Number.parseInt(bookId)} />
    }

    return <BooksList />
}

export default function BooksPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-gray-300">Loading...</div>
                </div>
            }
        >
            <BooksContent />
        </Suspense>
    )
}
