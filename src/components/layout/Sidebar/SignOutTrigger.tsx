"use client";
import React from 'react'
//import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function SignOutTrigger() {
  const router = useRouter()
  return (
    <div className="p-4">
    <button
      onClick={() => {
       // signOut();
        router.push('/auth/login')
      }}
    type="button" className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"  viewBox="0 0 16 16">
        <path d="M7.5 1v7h1V1z"/>
        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
      </svg>
    </button> <span className="font-bold text-sm ml-2">Deconnecter</span>
  </div>
  )
}