import Button from 'components/Button'
import Form from 'components/Form'
import Input from 'components/Input'
import Title from 'components/Title'
import React, { useContext, useEffect, useReducer } from 'react'
import formReducer from 'reducers/signInFormReducer'
import { useRouter } from 'next/router'
import { api } from 'services/api'
import BaseAuth from 'templates/BaseAuth'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from 'store/auth-context'

export default function SignUp() {
  const router = useRouter()
  const formInitialState = {
    username_value: '',
    password_value: '',
    username_isValid: false,
    password_isValid: false,
    form_isValid: false
  }
  const [formState, dispatchForm] = useReducer(formReducer, formInitialState)

  const authCtx = useContext(UserContext)

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

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()

    const body = {
      username: formState.username_value,
      password: formState.password_value
    }

    authCtx.loginHandler(body)
  }

  return (
    <BaseAuth>
      <Form onSubmit={submitHandler}>
        <Title size="sTitle" color="purple">
          Sign In
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
        <Button
          disabled={!formState.password_isValid || !formState.username_isValid}
        >
          Entrar
        </Button>
      </Form>
    </BaseAuth>
  )
}
