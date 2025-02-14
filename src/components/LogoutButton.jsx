"use client"
import { useSession } from '@/hooks/useSession'
import { useRouter } from 'next/navigation'

const LogoutButton = ({children, className}) => {
  const { logout } = useSession()

  return (
    <button className={className} onClick={() => logout()}>{children}</button>
  )
}

export default LogoutButton