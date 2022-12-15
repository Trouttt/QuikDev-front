import axios, { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`
})
