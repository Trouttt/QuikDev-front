import Button from 'components/Button'
import Title from 'components/Title'
import { useContext } from 'react'
import { UserContext } from 'store/auth-context'
import * as S from './styles'

export default function Header() {
  const ctx = useContext(UserContext)

  return (
    <S.Header>
      <S.BalanceBox>
        <Title size="medium">TOTAL:</Title>
        <S.Balance>
          <Title size="medium">
            {ctx.balance.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL'
            })}
          </Title>
        </S.Balance>
      </S.BalanceBox>

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
