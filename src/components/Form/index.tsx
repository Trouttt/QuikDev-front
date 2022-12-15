import * as S from './styles'

interface FormProps {
  children: React.ReactNode
  onSubmit?: React.FormEventHandler
}
export default function Form({ children, onSubmit }: FormProps) {
  return <S.Form onSubmit={onSubmit}>{children}</S.Form>
}
