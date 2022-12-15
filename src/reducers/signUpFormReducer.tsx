import {
  validateConfirmPassword,
  validatePassword
} from 'utils/validateForm-utils'

type formState = {
  username_value: string
  password_value: string
  confirmPassword_value: string
  username_isValid: boolean
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
    case 'USERNAME_INPUT':
      return {
        username_value: action.val,
        username_isValid: action.val.length > 3,
        password_value: state.password_value,
        password_isValid: state.password_isValid,
        confirmPassword_value: state.confirmPassword_value,
        confirmPassword_isValid: state.confirmPassword_isValid,
        form_isValid: state.form_isValid
      }
    case 'USERNAME_BLUR':
      return {
        username_value: state.username_value,
        username_isValid: state.username_value.length >= 3,
        password_value: state.password_value,
        password_isValid: state.password_isValid,
        confirmPassword_value: state.confirmPassword_value,
        confirmPassword_isValid: state.confirmPassword_isValid,
        form_isValid: state.form_isValid
      }
    case 'PASSWORD_INPUT':
      return {
        username_value: state.username_value,
        username_isValid: state.username_isValid,
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
        username_value: state.username_value,
        username_isValid: state.username_isValid,
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
        username_value: state.username_value,
        username_isValid: state.username_isValid,
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
        username_value: state.username_value,
        username_isValid: state.username_isValid,
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
        username_value: '',
        password_value: '',
        confirmPassword_value: '',
        username_isValid: false,
        password_isValid: false,
        confirmPassword_isValid: false,
        form_isValid: false
      }
  }
}

export default signUpFormReducer
