import styled, { css, DefaultTheme } from 'styled-components'

type ListProps = {
  styleButton: 'default' | 'buttonRectangular'
  disabled: boolean
  color: 'default' | 'yellow'
}

const ButtonMapper = {
  default: (theme: DefaultTheme) => css`
    border-radius: 1rem;
  `,
  buttonRectangular: (theme: DefaultTheme) => css`
    border-radius: 0;
    box-shadow: inset 0px 0px 27px 41px rgba(0, 0, 0, 0.1);
    &:last-child {
      border-left: 0.2rem solid black;
    }
  `
}

export const Button = styled.button.attrs((props: ListProps) => ({
  styleButton: props.styleButton,
  color: props.color,
  disabled: props.disabled
}))`
  ${({ theme, disabled, color, styleButton }) => css`
    cursor: pointer;
    text-transform: uppercase;
    align-items: center;
    border: none;
    width: auto;
    font-size: 1.5rem;
    padding: 1rem 2rem;
    opacity: ${disabled ? '0.5' : '1'};
    transition: 0.2s;
    justify-content: center;
    line-height: 2.4rem;

    letter-spacing: 0.5px;
    color: ${color === 'default' ? 'white' : 'black'};
    background-color: ${color === 'default'
      ? theme.colors.dark_blue
      : theme.colors.medium_yellow};
    display: flex;

    ${!!styleButton && ButtonMapper[styleButton](theme)}
  `}
`
