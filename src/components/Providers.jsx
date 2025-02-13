"use client"
import { SessionProvider } from '@/hooks/useSession'
import { ThemeProvider } from '@/hooks/useTheme'

const Providers = ({children}) => {
  return (
    <ThemeProvider>
        <SessionProvider>
            {children}
        </SessionProvider>
    </ThemeProvider>
  )
}

export default Providers