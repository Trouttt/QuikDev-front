import CurrencyInput from 'react-currency-input-field'
import styled, { css } from 'styled-components'

type ListProps = {
  isValid: boolean
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`

export const Button = styled.button``
export const IconContainer = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  position: absolute;
  top: 0.5rem;
  right: 6rem;
`
export const InputMoney = styled(CurrencyInput)<ListProps>`
  ${({ theme, isValid }) => css`
    width: 80%;
    height: 3rem;
    padding: 0.5rem;
    border: none;
    color: ${isValid ? 'black' : 'white'};
    outline: none;
    border-bottom: 1px solid
      ${isValid ? theme.colors.medium_gray : theme.colors.medium_red};
    background-color: ${isValid
      ? theme.colors.soft_gray
      : theme.colors.soft_red};
    &::placeholder {
      color: ${isValid ? 'black' : 'white'};
    }
    &:focus {
      border-bottom: 1px solid
        ${isValid ? theme.colors.dark_gray : theme.colors.dark_red};
      background-color: ${isValid
        ? theme.colors.medium_gray
        : theme.colors.medium_red};
      transition: 500ms;
    }
  `}
`
export const Input = styled.input<ListProps>`
  ${({ theme, isValid }) => css`
    width: 80%;
    height: 3rem;
    padding: 0.5rem;
    border: none;
    color: ${isValid ? 'black' : 'white'};
    outline: none;
    border-bottom: 1px solid
      ${isValid ? theme.colors.medium_gray : theme.colors.medium_red};
    background-color: ${isValid
      ? theme.colors.soft_gray
      : theme.colors.soft_red};
    &::placeholder {
      color: ${isValid ? 'black' : 'white'};
    }
    &:focus {
      border-bottom: 1px solid
        ${isValid ? theme.colors.dark_gray : theme.colors.dark_red};
      background-color: ${isValid
        ? theme.colors.medium_gray
        : theme.colors.medium_red};
      transition: 500ms;
    }
  `}
`
