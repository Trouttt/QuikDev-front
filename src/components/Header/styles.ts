import styled, { css } from 'styled-components'

export const Header = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.colors.soft_gray};
    width: 100%;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0px 10px 26px 8px rgba(0, 0, 0, 0.1);
  `}
`
export const BalanceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 20rem;
`
export const Balance = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.dark_gray};
    padding: 1rem 2rem;
    border-radius: 2rem;
  `}
`
