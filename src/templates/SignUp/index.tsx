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

export default function SignUp() {
  const router = useRouter()
  const formInitialState = {
    username_value: '',
    password_value: '',
    confirmPassword_value: '',
    username_isValid: false,
    password_isValid: false,
    confirmPassword_isValid: false,
    form_isValid: false
  }
  const [formState, dispatchForm] = useReducer(formReducer, formInitialState)

  const usernameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatchForm({ type: 'USERNAME_INPUT', val: event.target.value })
  }

  const usernameValidateHandler = () => {
    dispatchForm({ type: 'USERNAME_BLUR', val: formState.username_value })
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

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const body = {
        username: formState.username_value,
        password: formState.password_value
      }
      const response = await api.post(`users`, body)

      if (response)
        toast.success('Cadastro realizado com sucesso', {
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

  return (
    <BaseAuth>
      <Form onSubmit={submitHandler}>
        <Title size="sTitle" color="purple">
          Sign Up
        </Title>
        <Input
          inputChangeHandler={usernameChangeHandler}
          onBlur={usernameValidateHandler}
          isValid={formState.username_isValid}
          placeholder="Usuário"
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
            !formState.username_isValid
          }
        >
          Cadastrar
        </Button>
      </Form>
    </BaseAuth>
  )
}
