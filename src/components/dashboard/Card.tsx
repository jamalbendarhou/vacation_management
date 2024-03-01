import React from 'react'
import Link from 'next/link'

type Props = {
  title: string,
  linkTo: string
}

export default function Card({ title, linkTo }: Props) {
  return (
    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
      <Link href={linkTo}>
        <div className="font-bold hover:text-yellow-800 hover:underline">{title}</div>
      </Link>
    </div>
  )
}
