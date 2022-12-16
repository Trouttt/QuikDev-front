import Button from 'components/Button'
import Title from 'components/Title'
import { useContext } from 'react'
import { UserContext } from 'store/auth-context'
import { useRouter } from 'next/router'
import * as S from './styles'

export default function Header({ generateReport }: any) {
  const ctx = useContext(UserContext)
  const router = useRouter()
  return (
    <S.Header>
      <S.ButtonBox>
        <Button onClick={generateReport}>Gerar relatório</Button>
        <Button
          onClick={() => {
            router.push('update-user')
          }}
        >
          Atualizar usuário
        </Button>
      </S.ButtonBox>

      <Button
        onClick={() => {
          ctx.logoutHandler()
        }}
      >
        Sair
      </Button>
    </S.Header>
  )
}
