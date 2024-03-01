import React from 'react'
import Link from 'next/link'


export default function Card() {
  return (
    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2 ">
        <Link href="" className="font-bold hover:text-yellow-800 hover:underline">******************</Link>
        <div className="text-sm text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
        </svg>*******************
        </div>
    </div>
  )
}