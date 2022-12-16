import axios, { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`
})

export const aws_s3_api = async (url: string, imageFile: any) => {
  const response = await axios.put(url, imageFile, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': `image/jpeg`
    }
  })

  return response
}
