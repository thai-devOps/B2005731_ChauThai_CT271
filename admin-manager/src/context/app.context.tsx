import { createContext, useState } from 'react'
import { User } from '~/types/user.type'
import { getAccessTokenFromLocalStorage, getUserToLocalStorage } from '~/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setAuthenticated: () => null,
  user: getUserToLocalStorage() as User,
  setUser: () => null,
  isLoading: false,
  setIsLoading: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(initialAppContext.user)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated && Boolean(user.role === 'admin')
  )
  const [isLoading, setIsLoading] = useState<boolean>(initialAppContext.isLoading)
  return (
    <AppContext.Provider value={{ isAuthenticated, setAuthenticated, user, setUser, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  )
}
