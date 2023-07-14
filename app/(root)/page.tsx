'use client'

import { UserButton } from '@clerk/nextjs'

import { Modal } from '@/components/ui/modal'

export default function SetupPage() {
  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/" />

      <Modal
        title="Modal"
        description="This is a modal"
        isOpen
        onClose={() => {}}
      >
        Modal content
      </Modal>
    </div>
  )
}
