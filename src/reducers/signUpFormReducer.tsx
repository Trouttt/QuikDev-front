import {
  validateConfirmPassword,
  validateEmail,
  validatePassword
} from 'utils/validateForm-utils'

type formState = {
  name_value: string
  email_value: string
  password_value: string
  confirmPassword_value: string
  name_isValid: boolean
  email_isValid: boolean
  password_isValid: boolean
  confirmPassword_isValid: boolean
  form_isValid: boolean
}

type formAction = {
  type: string
  val: string
}

const signUpFormReducer = (state: formState, action: formAction): formState => {
  switch (action.type) {
    case 'NAME_INPUT':
      return {
        name_value: action.val,
        name_isValid: action.val.length > 3,
        email_value: state.email_value,
        email_isValid: state.email_isValid,
        password_value: state.password_value,
        password_isValid: state.password_isValid,
        confirmPassword_value: state.confirmPassword_value,
        confirmPassword_isValid: state.confirmPassword_isValid,
        form_isValid: state.form_isValid
      }
    case 'NAME_BLUR':
      return {
        name_value: state.name_value,
        name_isValid: state.name_value.length >= 3,
        email_value: state.email_value,
        email_isValid: state.email_isValid,
        password_value: state.password_value,
        password_isValid: state.password_isValid,
        confirmPassword_value: state.confirmPassword_value,
        confirmPassword_isValid: state.confirmPassword_isValid,
        form_isValid: state.form_isValid
      }

    case 'EMAIL_INPUT':
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        email_value: action.val,
        email_isValid: validateEmail(action.val),
        password_value: state.password_value,
        password_isValid: state.password_isValid,
        confirmPassword_value: state.confirmPassword_value,
        confirmPassword_isValid: state.confirmPassword_isValid,
        form_isValid: state.form_isValid
      }
    case 'EMAIL_BLUR':
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        email_value: state.email_value,
        email_isValid: validateEmail(state.email_value),
        password_value: state.password_value,
        password_isValid: state.password_isValid,
        confirmPassword_value: state.confirmPassword_value,
        confirmPassword_isValid: state.confirmPassword_isValid,
        form_isValid: state.form_isValid
      }
    case 'PASSWORD_INPUT':
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        email_value: state.email_value,
        email_isValid: state.email_isValid,
        password_value: action.val,
        password_isValid: validatePassword(action.val),
        confirmPassword_value: state.confirmPassword_value,
        confirmPassword_isValid: validateConfirmPassword(
          action.val,
          state.confirmPassword_value
        ),
        form_isValid: state.form_isValid
      }
    case 'PASSWORD_BLUR':
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        email_value: state.email_value,
        email_isValid: state.email_isValid,
        password_value: state.password_value,
        password_isValid: validatePassword(state.password_value),
        confirmPassword_value: state.confirmPassword_value,
        confirmPassword_isValid: validateConfirmPassword(
          state.password_value,
          state.confirmPassword_value
        ),
        form_isValid: state.form_isValid
      }
    case 'CONFIRM_PASSWORD_INPUT':
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        email_value: state.email_value,
        email_isValid: state.email_isValid,
        password_value: state.password_value,
        password_isValid: validatePassword(state.password_value),
        confirmPassword_value: action.val,
        confirmPassword_isValid: validateConfirmPassword(
          state.password_value,
          action.val
        ),
        form_isValid: state.form_isValid
      }
    case 'CONFIRM_PASSWORD_BLUR':
      return {
        name_value: state.name_value,
        name_isValid: state.name_isValid,
        email_value: state.email_value,
        email_isValid: state.email_isValid,
        password_value: state.password_value,
        password_isValid: validatePassword(state.password_value),
        confirmPassword_value: state.confirmPassword_value,
        confirmPassword_isValid: validateConfirmPassword(
          state.password_value,
          state.confirmPassword_value
        ),
        form_isValid: state.form_isValid
      }
    default:
      return {
        name_value: '',
        email_value: '',
        password_value: '',
        confirmPassword_value: '',
        name_isValid: false,
        email_isValid: false,
        password_isValid: false,
        confirmPassword_isValid: false,
        form_isValid: false
      }
  }
}

export default signUpFormReducer
