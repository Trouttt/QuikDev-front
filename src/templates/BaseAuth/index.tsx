import * as S from './styles'
export type BaseTemplateProps = {
  children: React.ReactNode
}

export default function BaseAuth({ children }: BaseTemplateProps) {
  return <S.Base>{children}</S.Base>
}
