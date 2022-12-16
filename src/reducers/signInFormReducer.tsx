import {
  validateConfirmPassword,
  validateEmail,
  validatePassword
} from 'utils/validateForm-utils'

type formState = {
  email_value: string
  password_value: string

  email_isValid: boolean
  password_isValid: boolean

  form_isValid: boolean
}

type formAction = {
  type: string
  val: string
}

const signInFormReducer = (state: formState, action: formAction): formState => {
  switch (action.type) {
    case 'EMAIL_INPUT':
      return {
        email_value: action.val,
        email_isValid: validateEmail(action.val),
        password_value: state.password_value,
        password_isValid: state.password_isValid,
        form_isValid: state.form_isValid
      }

    case 'EMAIL_BLUR':
      return {
        email_value: state.email_value,
        email_isValid: validateEmail(state.email_value),
        password_value: state.password_value,
        password_isValid: state.password_isValid,
        form_isValid: state.form_isValid
      }
    case 'PASSWORD_INPUT':
      return {
        email_value: state.email_value,
        email_isValid: state.email_isValid,
        password_value: action.val,
        password_isValid: validatePassword(action.val),
        form_isValid: state.form_isValid
      }
    case 'PASSWORD_BLUR':
      return {
        email_value: state.email_value,
        email_isValid: state.email_isValid,
        password_value: state.password_value,
        password_isValid: validatePassword(state.password_value),

        form_isValid: state.form_isValid
      }
    default:
      return {
        email_value: '',
        password_value: '',

        email_isValid: false,
        password_isValid: false,

        form_isValid: false
      }
  }
}

export default signInFormReducer
