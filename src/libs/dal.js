import 'server-only'

import { cookies, headers } from 'next/headers'
import { decrypt, getSession } from '@/libs/session'
import prisma from "@/libs/prisma";
import { redirect } from 'next/navigation';

export const verifySession = async () => {
  // Utiliser getSession qui vérifie à la fois cookie et header Authorization
  const session = await getSession()
  
  if (!session) {
    const headerss = await headers()
    const pathname = headerss.get("x-invoke-path") || "/";
    if (pathname == "/") {
      return undefined
    }
    redirect('/login')
  }

  return { isAuth: true, userId: session.userId }
}



// Get User
export const getUser = async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const user = await prisma.user.findUnique({
            where: {
                id : session.userId
            },
            select : {
                pseudo: true,
                firstname: true,
                lastname: true,
                email: true,
                birthday: true,
                sex: true
            }
        })
      return user
    } catch (error) {
      console.log('Failed to fetch user')
      console.log(error)
      return null
    }
  }
