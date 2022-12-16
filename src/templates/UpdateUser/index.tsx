import Button from 'components/Button'
import Form from 'components/Form'
import Input from 'components/Input'
import Title from 'components/Title'
import React, { useEffect, useReducer } from 'react'
import formReducer from 'reducers/signUpFormReducer'
import { useRouter } from 'next/router'
import { api } from 'services/api'
import BaseAuth from 'templates/BaseAuth'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import jwt from 'jwt-decode'

export default function UpdateUser() {
  const router = useRouter()
  const formInitialState = {
    name_value: '',
    email_value: '',
    password_value: '',
    confirmPassword_value: '',
    name_isValid: true,
    email_isValid: true,
    password_isValid: true,
    confirmPassword_isValid: true,
    form_isValid: false
  }
  const [formState, dispatchForm] = useReducer(formReducer, formInitialState)

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ type: 'NAME_INPUT', val: event.target.value })
  }

  const nameValidateHandler = () => {
    dispatchForm({ type: 'NAME_BLUR', val: formState.name_value })
  }

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ type: 'EMAIL_INPUT', val: event.target.value })
  }

  const emailValidateHandler = () => {
    dispatchForm({ type: 'EMAIL_BLUR', val: formState.email_value })
  }

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatchForm({ type: 'PASSWORD_INPUT', val: event.target.value })
  }

  const passwordValidateHandler = () => {
    dispatchForm({ type: 'PASSWORD_BLUR', val: formState.password_value })
  }

  const confirmPasswordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatchForm({ type: 'CONFIRM_PASSWORD_INPUT', val: event.target.value })
  }

  const confirmPasswordValidateHandler = () => {
    dispatchForm({
      type: 'CONFIRM_PASSWORD_INPUT',
      val: formState.confirmPassword_value
    })
  }

  const getToken = () => {
    const payload = Cookies.get('auth_token')
    let token = { id: '', name: '', exp: '', iat: '' }
    if (payload) token = jwt(payload)
    return token
  }
  const getUserById = async () => {
    const token = getToken()
    try {
      const user = await api.get(`users/${token.id}`, {
        headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` }
      })

      dispatchForm({ type: 'NAME_INPUT', val: user.data.name })
      dispatchForm({ type: 'NAME_BLUR', val: user.data.name })
      dispatchForm({ type: 'EMAIL_INPUT', val: user.data.email })
    } catch (e) {
      toast.error('Aconteceu um erro')
    }
  }
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()

    const token = getToken()
    try {
      const body = {
        name: formState.name_value,
        email: formState.email_value,
        password: formState.password_value
      }
      const response = await api.patch(`users/${token.id}`, body, {
        headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` }
      })
      if (response)
        toast.success('Update realizado com sucesso', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })

      router.push('/sign-in')
    } catch (e: any) {
      if (e.message === 'Network Error') {
        return toast.error('Servidor offline')
      }
      toast.error(`Aconteceu um erro: ${e.response.data.message}`)
    }
  }
  useEffect(() => {
    getUserById()
  }, [])
  return (
    <BaseAuth>
      <Form onSubmit={submitHandler}>
        <Title size="sTitle" color="purple">
          Update User
        </Title>
        <Input
          inputChangeHandler={nameChangeHandler}
          onBlur={nameValidateHandler}
          isValid={formState.name_isValid}
          placeholder="Usuário"
          type="text"
        />
        <Input
          inputChangeHandler={emailChangeHandler}
          onBlur={emailValidateHandler}
          isValid={formState.email_isValid}
          placeholder="Email"
          type="text"
        />
        <Input
          inputChangeHandler={passwordChangeHandler}
          onBlur={passwordValidateHandler}
          isValid={formState.password_isValid}
          placeholder="Senha"
          type="password"
        />

        <Input
          inputChangeHandler={confirmPasswordChangeHandler}
          onBlur={confirmPasswordValidateHandler}
          isValid={formState.confirmPassword_isValid}
          placeholder="Nova senha"
          type="password"
        />
        <Button
          disabled={
            !formState.confirmPassword_isValid ||
            !formState.password_isValid ||
            !formState.email_isValid ||
            !formState.name_isValid
          }
        >
          Cadastrar
        </Button>
      </Form>
    </BaseAuth>
  )
}
