import styled, { css } from 'styled-components'
import theme from 'styles/theme'

export const Base = styled.div`
  ${() => css`
    height: 100vh;
    background: linear-gradient(
      ${theme.colors.soft_pink},
      ${theme.colors.soft_blue}
    );
    -webkit-background: linear-gradient(
      left,
      ${theme.colors.soft_pink},
      ${theme.colors.soft_blue}
    );
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`
