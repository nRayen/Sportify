import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { headers } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)




// Créer la session et retourner le token JWT
export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Expire au bout de 7 jours
  const token = await encrypt({ userId, expiresAt })
  
  // Pour la compatibilité avec l'ancienne version, on crée aussi un cookie
  const cookieStore = await cookies()

  try {
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      // sameSite: 'strict',
      // path: '/',
    })
  } catch (error) {
    console.log(error)
  }

  // Retourner le token pour l'utilisation dans React Native
  return token
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


// Récuperer la session à partir d'un token JWT
export async function getSessionFromToken(token) {
  if(!token) {
    return null
  }

  const payload = await decrypt(token)
  return payload
}

// Récuperer la session depuis le cookie ou le header Authorization
export async function getSession() {
  // Essayer d'abord de récupérer depuis le cookie
  const session = (await cookies()).get('session')?.value
  
  if(session) {
    const payload = await decrypt(session)
    return payload
  }
  
  // Si pas de cookie, essayer de récupérer depuis le header Authorization
  const headersList = await headers()
  const authHeader = headersList.get('Authorization')
  
  if(authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    const payload = await decrypt(token)
    return payload
  }
  
  return null
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