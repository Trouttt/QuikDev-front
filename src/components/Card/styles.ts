import styled, { css, DefaultTheme } from 'styled-components'

type ListProps = {
  styleCard: 'default' | 'medium' | 'large'
}

const CardMapper = {
  default: (theme: DefaultTheme) => css`
    width: 80%;
    height: auto;
  `,
  medium: (theme: DefaultTheme) => css``,
  large: (theme: DefaultTheme) => css``
}
export const Card = styled.div.attrs((props: ListProps) => ({
  styleCard: props.styleCard
}))`
  ${({ theme, styleCard }) => css`
    background-color: ${theme.colors.medium_gray};
    padding: 1rem 2rem;
    border-radius: 2rem;
    box-shadow: 0px 10px 26px 8px rgba(0, 0, 0, 0.1);

    ${!!styleCard && CardMapper[styleCard](theme)}
  `}
`
