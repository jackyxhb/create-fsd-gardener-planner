import { Layout } from '@shared/ui/Layout'
import { NavBar } from '@widgets/nav-bar'

export function MainPage() {
  return (
    <Layout navbar={<NavBar />}>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
        <p className="mt-3 text-gray-500">
          Your app starts here. Replace this page with your own content.
        </p>
      </div>
    </Layout>
  )
}
