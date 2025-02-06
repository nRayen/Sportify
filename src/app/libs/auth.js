import { deleteSession } from '@/app/libs/session'


// Déconnexion
export async function logout() {
  deleteSession()
  redirect('/login')
}