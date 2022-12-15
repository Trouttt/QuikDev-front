import * as S from './styles'

interface ListProps extends React.HTMLAttributes<Element> {
  children: React.ReactNode
  styleButton?: 'default' | 'buttonRectangular'
  type?: 'button' | 'submit' | 'reset'
  icon?: React.ReactNode
  size?: string
  color?: 'default' | 'yellow'
  disabled?: boolean
}
export default function Button({
  children,
  disabled,
  styleButton = 'default',
  color = 'default',
  type,
  size = '100%',
  ...props
}: ListProps) {
  return (
    <S.Button
      styleButton={styleButton}
      color={color}
      disabled={disabled}
      {...props}
    >
      {!!children && <span>{children}</span>}
    </S.Button>
  )
}
