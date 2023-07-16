'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import * as z from 'zod'

import { AlertModal } from '@/components/modals/alert-modal'
import { ApiAlert } from '@/components/ui/api-alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useOrigin } from '@/hooks/use-origin'

interface SettingsFormProps {
  initialData: Store
}

const formSchema = z.object({
  name: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      setIsLoading(true)

      await axios.patch(`/api/stores/${params.storeId}`, values)
      router.refresh()
      toast.success('Store settings updated.')
    } catch (error) {
      toast.error("Couldn't update store settings.")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push('/')
      toast.success('Store deleted.')
    } catch (error) {
      toast.error('Make sure you removed all products and categories first.')
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        onConfirm={onDelete}
        isLoading={isLoading}
      />

      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Update your store's settings." />

        <Button
          variant="destructive"
          size="icon"
          onClick={() => {
            setIsOpen(true)
          }}
          disabled={isLoading}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Store name"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>

      <Separator />

      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  )
}
