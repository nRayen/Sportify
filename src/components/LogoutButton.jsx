"use client"
import { logout } from '@/app/libs/auth'

const LogoutButton = ({children, className}) => {
  return (
    <button className={className} onClick={() => logout()}>{children}</button>
  )
}

export default LogoutButton