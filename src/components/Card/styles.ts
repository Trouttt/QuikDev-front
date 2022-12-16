import styled, { css, DefaultTheme } from 'styled-components'

type ListProps = {
  styleCard: 'default' | 'medium' | 'large'
}

const CardMapper = {
  default: (theme: DefaultTheme) => css`
    width: 60%;
    height: auto;
    padding: 3rem 2rem;
  `,
  medium: (theme: DefaultTheme) => css`
    background-color: white;
    width: 100%;
  `,
  large: (theme: DefaultTheme) => css``
}
export const Card = styled.div.attrs((props: ListProps) => ({
  styleCard: props.styleCard
}))`
  ${({ theme, styleCard }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 2rem 0rem;
    align-items: center;
    background-color: ${theme.colors.medium_gray};
    padding: 1rem 2rem;
    border-radius: 2rem;
    box-shadow: 0px 10px 26px 8px rgba(0, 0, 0, 0.1);

    ${!!styleCard && CardMapper[styleCard](theme)}
  `}
`
