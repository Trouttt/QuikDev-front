const validatePassword = (password: string) => {
  if (!/[A-Z]/.test(password)) {
    return false
  }
  if (!/[0-9]/.test(password)) {
    return false
  }
  if (password.length < 8) {
    return false
  }
  return true
}

const validateConfirmPassword = (
  password: string,
  confirmPassword?: string
) => {
  if (password !== confirmPassword) return false
  return true
}

export { validatePassword, validateConfirmPassword }
