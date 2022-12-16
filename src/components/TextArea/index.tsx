import * as S from './styles'

type ListProps = {
  placeholder: string
  textAreaChangeHandler: (value: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur: (value: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextArea({
  placeholder,
  textAreaChangeHandler,
  onBlur
}: ListProps) {
  return (
    <S.TextArea
      onChange={textAreaChangeHandler}
      onBlur={onBlur}
      placeholder={placeholder}
    ></S.TextArea>
  )
}
