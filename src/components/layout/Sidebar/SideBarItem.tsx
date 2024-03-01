'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
type Props = {
    title : string
    children: React.ReactNode
    url : string
}

export default function SideBarItem({
    title,
    children,
    url
}: Props) {

    const pathname = usePathname()
  return (
    <li>
        <Link href={url} className={`flex items-center  rounded-xl font-bold text-sm  py-3 px-4 ${pathname == url && "bg-yellow-200 text-yellow-900"}`}>
            {children}
            {title}
        </Link>
    </li>
  )
}