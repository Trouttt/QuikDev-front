import styled, { css } from 'styled-components'
import { Theme } from 'types/styled-components'

type ListProps = {
  theme: Theme
  color?: 'primary' | 'purple'
  size?: 'medium' | 'large' | 'sTitle' | 'title'
  weight?: 'semiBold' | 'bold'
}

export const Title = styled.h1`
  ${({ theme, color, size, weight }: ListProps) => css`
    font-size: ${size === 'medium'
      ? theme.font.sizes.medium
      : size === 'large'
      ? theme.font.sizes.large
      : size === 'sTitle'
      ? theme.font.sizes.sTitle
      : theme.font.sizes.Title};
    weight: ${weight === 'semiBold' ? theme.font.semiBold : theme.font.bold};
    color: ${color === 'primary'
      ? theme.colors.primary
      : theme.colors.dark_blue};
  `}
`
