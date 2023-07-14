'use client'

import { useEffect } from 'react'

import { UserButton } from '@clerk/nextjs'

import { useStoreModal } from '@/hooks/use-store-modal'

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/" />
      Root Page
    </div>
  )
}
