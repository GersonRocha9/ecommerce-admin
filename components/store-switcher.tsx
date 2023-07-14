'use client'

import { useState } from 'react'

import { Store } from '@prisma/client'
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useStoreModal } from '@/hooks/use-store-modal'
import { cn } from '@/lib/utils'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[]
}

export default function StoreSwitcher({
  className,
  items = [],
  ...props
}: StoreSwitcherProps) {
  const storeModal = useStoreModal()
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId,
  )

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn('justify-between gap-2', className)}
        >
          <StoreIcon className="h-4 w-4" />
          {currentStore?.label || 'Select a store'}
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search a store" />
            <CommandEmpty>There is no store</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm gap-2"
                >
                  <StoreIcon className="h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.onOpen()
                }}
                className="gap-2"
              >
                <PlusCircle className="h-5 w-5" />
                Create a store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
