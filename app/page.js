// import { getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]/route'
// import User from './components/user'
// import Login from './(site)/auth/login/page'
import Auth from './(site)/auth/page'


export default async function Home() {
  // const session = await getServerSession(authOptions)

  return (
    <section>
      {/* <h1>Home</h1>
      <h1>Server Side Rendered</h1>
      <pre>{JSON.stringify(session?.user?.id)}</pre>
      <h1>Client Side Rendered</h1> */}
      <Auth />
    </section>
  )
}
