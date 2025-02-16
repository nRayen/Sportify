import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)




// Créer la session (enregistrer le cookie "session")
export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Expire au bout de 7 jours
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()

  try {
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'strict',
      path: '/',
    })
  } catch (error) {
    console.log(error)
  }
}

// Refresh la session
export async function updateSession() {
  const session = cookies().get('session')?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: false,
    expires: expires,
    sameSite: 'none',
    path: '/',
  })
}


// Récuperer la session
export async function getSession() {
  const session = (await cookies()).get('session')?.value

  if(!session) {
    return null
  }

  const payload = await decrypt(session)
  return payload

}


// Supprimer la session
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}



/////////////////////////////////////////////////// Utilitaires

// Créer un JWT
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

// Vérifier un JWT
export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
    console.log(error)
  }
}