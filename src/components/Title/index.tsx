import * as S from './styles'

type ListProps = {
  children: React.ReactNode
  color?: 'primary' | 'purple'
  size?: 'medium' | 'large' | 'sTitle' | 'title'
  weight?: 'semiBold' | 'bold'
}
export default function Title({ children, color, size, weight }: ListProps) {
  return (
    <S.Title color={color} size={size} weight={weight}>
      {children}
    </S.Title>
  )
}
