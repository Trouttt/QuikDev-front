import * as S from './styles'

type ListProps = {
  children: React.ReactNode
  styleCard?: 'default' | 'medium' | 'large'
}

export default function Card({ children, styleCard = 'default' }: ListProps) {
  return <S.Card styleCard={styleCard}>{children}</S.Card>
}
