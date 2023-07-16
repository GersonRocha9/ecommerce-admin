import prismadb from '@/lib/prismadb'

interface DashboardPageProps {
  params: {
    storeId: string
  }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  })

  return (
    <div className="p-4">
      <p>Store ID: {params.storeId}</p>

      <p>Store Name: {store?.name}</p>
    </div>
  )
}

export default DashboardPage
