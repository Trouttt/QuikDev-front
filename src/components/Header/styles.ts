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

    @media (max-width: 800px) {
      flex-direction: column;
      gap: 2rem;
      padding: 5rem 0 3rem 0;
      height: auto;
    }
  `}
`

export const ButtonBox = styled.div`
  display: flex;
  gap: 1rem;
`
