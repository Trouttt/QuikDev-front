import * as S from './styles'

const Main = ({
  title = 'React Avançado',
  description = 'Typescript, ReactJS, NextJS e Styled Components'
}) => (
  <S.Wrapper>
    <S.Logo
      src="/vercel.svg"
      alt="Imagem do vercel e react avançado escrito ao lado."
    />
    <S.Title>{title}</S.Title>
    <S.Description>{description}</S.Description>
    <S.Ilustration src="/vercel.svg" alt="Simbolo da vercel" />
  </S.Wrapper>
)

export default Main
