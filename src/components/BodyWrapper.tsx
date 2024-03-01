import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function BodyWrapper({
    children
}: Props) {
  return (
    <main className="ml-60 pt-16 max-h-screen overflow-auto">
        <div className="px-6 py-8">
        <div className="max-w-full mx-auto">
            <div className="bg-white rounded-3xl p-8 mb-5">
                   {children}
            </div>
        </div>
        </div>
    </main>
  )
}