import * as S from './styles'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'

type ListProps = {
  placeholder: string
  inputChangeHandler: (value: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (value: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
  type: string
  isValid: boolean
  prefix?: string
  ref?: any
  defaultValue?: number
  decimalsLimit?: number
  name?: string
  disabled?: boolean
}

export default function Input({
  placeholder,
  inputChangeHandler,
  isValid,
  prefix,
  onClick,
  type,
  defaultValue,
  ref,
  decimalsLimit,
  onBlur,
  ...props
}: ListProps) {
  const [showPassword, setShowPassword] = useState(false)

  const changeEyeHandler = () => {
    setShowPassword((prevState) => !prevState)
  }

  useEffect(() => {
    console.log(showPassword)
  }, [showPassword])
  return (
    <S.Container>
      {type === 'text' ? (
        <S.Input
          onBlur={onBlur}
          onChange={inputChangeHandler}
          isValid={isValid}
          type={type}
          placeholder={placeholder}
        ></S.Input>
      ) : type === 'password' ? (
        <>
          <S.Input
            onBlur={onBlur}
            onChange={inputChangeHandler}
            isValid={isValid}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
          ></S.Input>
          <S.Button type="button" onClick={changeEyeHandler}>
            <S.IconContainer>
              {showPassword && <BsEyeSlashFill size={20} />}
              {!showPassword && <BsEyeFill size={20} />}
            </S.IconContainer>
          </S.Button>
        </>
      ) : (
        <>
          <S.Input
            placeholder={placeholder}
            onChange={inputChangeHandler}
            isValid={isValid}
            onClick={onClick}
            ref={ref}
            type="file"
          ></S.Input>
        </>
      )}
    </S.Container>
  )
}
