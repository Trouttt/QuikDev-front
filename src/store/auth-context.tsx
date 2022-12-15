import Cookies from 'js-cookie'

import { createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from 'services/api'
import React from 'react'

const defaultValuesUserContext = {
  balance: 0,
  isLoggedIn: false,
  loginHandler: (body: { username: string; password: string }) => {
    console.log('')
  },
  logoutHandler: () => {
    console.log('')
  }
}
export const UserContext = React.createContext(defaultValuesUserContext)

export const UserContextProvider = (props: any) => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    const storedUserLoggedInformation = localStorage.getItem('isLoggedIn')

    if (storedUserLoggedInformation === '1') {
      setIsLoggedIn(true)
    }
  }, [])

  const logoutHandler = () => {
    Cookies.remove('auth_token')
    setIsLoggedIn(false)
    router.push('/sign-in')
  }

  const loginHandler = async (body: { username: string; password: string }) => {
    try {
      const response = await api.post(`auth`, body)

      toast.success('Login realizado com sucesso', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })

      Cookies.set('auth_token', response.data.access_token)

      setIsLoggedIn(true)

      router.push('/')
    } catch (e: any) {
      if (e.message === 'Network Error') {
        return toast.error('Servidor offline')
      }
      if (e.response.data.message)
        return toast.error(`Aconteceu um erro: ${e.response.data.message}`, {})

      return false
    }
  }
  return (
    <UserContext.Provider
      value={{
        balance,
        isLoggedIn,
        loginHandler,
        logoutHandler
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
