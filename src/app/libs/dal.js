// import 'server-only'

import { cookies, headers } from 'next/headers'
import { decrypt } from '@/app/libs/session'
import prisma from "@/app/libs/prisma";
import { redirect } from 'next/navigation';



export const verifySession = async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session) {
    const pathname = headers().get("x-invoke-path") || "/";
    if (pathname == "/") {
      return undefined
    }
    redirect('/login')
  }

  return { isAuth: true, userId: session.userId }
}


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