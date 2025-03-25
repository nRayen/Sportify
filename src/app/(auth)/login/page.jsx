import { Suspense } from 'react'
import LoginForm from '../../../components/LoginForm'
import Loader from '@/components/Loader'
const SignInPage = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <LoginForm/>
    </Suspense>
  )
}

export default SignInPage