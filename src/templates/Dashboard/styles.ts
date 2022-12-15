import CurrencyInput from 'react-currency-input-field'
import styled, { css, DefaultTheme } from 'styled-components'

type ButtonProps = {
  isValid: boolean
  theme: DefaultTheme
}
export const Base = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      ${theme.colors.primary},
      ${theme.colors.soft_blue}
    );
    width: 100%;
    height: 100vh;

    @media (max-width: 600px) {
      height: 100%;
    }
  `}
`
export const Main = styled.main`
  ${({ theme }) => css`
    margin-top: 5rem;
    display: flex;
    justify-content: center;
  `}
`
export const BoxPagination = styled.div`
  margin: 2rem 0rem;
  display: flex;
  width: 100%;
  justify-content: center;
`
export const TitlePagination = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.dark_blue};
    font-size: ${theme.font.sizes.sTitle};
    margin: 0rem 1rem;
  `}
`
export const ButtonPagination = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.dark_blue};
    color: white;
    border-radius: 100%;
    border: none;
    padding: 1rem 2rem;
    &:hover {
      transition: 200ms;
      color: black;
      background-color: ${theme.colors.medium_yellow};
    }
  `}
`
export const FormBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
  width: 100%;
`

export const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 0.3rem solid gray;
  padding-bottom: 2rem;
`
export const Table = styled.table`
  ${({ theme }) => css`
    border: 1px solid black;
    border-collapse: collapse;
    width: 100%;
  `}
`
export const Tr = styled.tr`
  ${({ theme }) => css`
    border: 1px solid black;
    border-collapse: collapse;
  `}
`
export const Th = styled.th`
  ${({ theme }) => css`
    border: 1px solid black;
    color: black;
    font-size: ${theme.font.sizes.small};
    border-collapse: collapse;
    padding: 0.5rem 0rem;
    width: 25%;
  `}
`
export const Td = styled.td`
  ${({ theme }) => css`
    border: 1px solid black;
    border-collapse: collapse;
    padding: 0.5rem;
    width: 25%;
    font-size: ${theme.font.sizes.small};
  `}
`
