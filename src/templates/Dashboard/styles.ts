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
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  ${({ theme }) => css`
    display: flex;
    justify-content:center;
    width: 100%;
    gap:1rem;
    background-color: ${theme.colors.medium_gray}
    padding-bottom: 2rem;

    @media (max-width: 800px){
      flex-direction:column;
    }
  `}
`

export const Image = styled.img`
  width: 100%;
  height: 30rem;
`

export const Comment = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`
export const CommentHeaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const CommentButtonHeaderBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

export const CommentArea = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
  width: 100%;
`

export const UserName = styled.h2`
  font-size: 3rem;
`
export const Title = styled.h3`
  margin: 1rem 0rem;
  word-break: break-all;
  font-size: 2rem;
`
export const Description = styled.p`
  word-break: break-all;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`
