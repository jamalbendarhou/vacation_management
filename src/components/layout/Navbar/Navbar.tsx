import React from 'react'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <header className="fixed z-10 right-0 top-0 left-60 bg-yellow-50 py-3 px-4 h-16">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center">
        <div className="text-lg font-bold">Bonjour Admin</div>
      </div>
    </div>
  </header>
  )
}