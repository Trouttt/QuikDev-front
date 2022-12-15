import {
  validateConfirmPassword,
  validatePassword
} from 'utils/validateForm-utils'

type formState = {
  username_value: string
  password_value: string

  username_isValid: boolean
  password_isValid: boolean

  form_isValid: boolean
}

type formAction = {
  type: string
  val: string
}

const signInFormReducer = (state: formState, action: formAction): formState => {
  switch (action.type) {
    case 'USERNAME_INPUT':
      return {
        username_value: action.val,
        username_isValid: action.val.length > 3,
        password_value: state.password_value,
        password_isValid: state.password_isValid,
        form_isValid: state.form_isValid
      }
    case 'USERNAME_BLUR':
      return {
        username_value: state.username_value,
        username_isValid: state.username_value.length >= 3,
        password_value: state.password_value,
        password_isValid: state.password_isValid,

        form_isValid: state.form_isValid
      }
    case 'PASSWORD_INPUT':
      return {
        username_value: state.username_value,
        username_isValid: state.username_isValid,
        password_value: action.val,
        password_isValid: validatePassword(action.val),
        form_isValid: state.form_isValid
      }
    case 'PASSWORD_BLUR':
      return {
        username_value: state.username_value,
        username_isValid: state.username_isValid,
        password_value: state.password_value,
        password_isValid: validatePassword(state.password_value),

        form_isValid: state.form_isValid
      }
    default:
      return {
        username_value: '',
        password_value: '',

        username_isValid: false,
        password_isValid: false,

        form_isValid: false
      }
  }
}

export default signInFormReducer
