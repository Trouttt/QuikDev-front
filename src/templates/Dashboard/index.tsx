import Button from 'components/Button'
import Card from 'components/Card'
import Form from 'components/Form'
import Header from 'components/Header'
import Input from 'components/Input'
import Table from 'components/Table'
import Title from 'components/Title'
import Cookies from 'js-cookie'
import { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import jwt from 'jwt-decode'
import { api } from 'services/api'
import { UserContext } from 'store/auth-context'
import * as S from './styles'

type Data = {
  value: number
  createAt: string
  origin: string
  receiver: string
}
type MetaData = {
  has_next_page: false
  has_previous_page: false
  page: number
  take: number
}
type ListProps = {
  data: Data[]
  metaData: MetaData
  balance?: number
}

export default function Dashboard() {
  const router = useRouter()
  const ctx = useContext(UserContext)
  const [transactions, setTransactions] = useState<ListProps>({
    balance: 0,
    metaData: {
      page: 1,
      take: 10,
      has_next_page: false,
      has_previous_page: false
    },
    data: []
  })
  const [openTable, setOpenTable] = useState<boolean>(true)
  const [pagination, setPagination] = useState({
    has_next_page: false,
    has_previous_page: false,
    page: 1,
    take: 10
  })

  const [money, setMoney] = useState({
    value: 0,
    isValid: true
  })

  const [user, setUser] = useState({
    value: '',
    isValid: true
  })

  const onInputMoneyHandler = (value: React.ChangeEvent<HTMLInputElement>) => {
    setMoney({
      value: parseInt(value.target.value),
      isValid: parseInt(value.target.value) > 0
    })
  }

  const onMoneyBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoney({
      value: money.value,
      isValid: money.value > 0
    })
  }

  const onInputUserHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      value: event.target.value,
      isValid: event.target.value.length >= 3
    })
  }

  const onUserBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      value: user.value,
      isValid: user.value.length >= 3
    })
  }
  const makePagination = async (props: string) => {
    if (props === 'previous') {
      await getTransactionHandler({ page: pagination.page - 1, order: 'ASC' })
    } else {
      await getTransactionHandler({ page: pagination.page + 1, order: 'ASC' })
    }
  }
  const getTransactionHandler = async (props: {
    page: number
    order: string
  }) => {
    try {
      const foundTransactions: any = await api.get(
        `transactions?order=${props.order}&page=${props.page}&take=10`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }
        }
      )
      setPagination(() => {
        return {
          has_next_page: foundTransactions.data.meta_data.has_next_page,

          has_previous_page: foundTransactions.data.meta_data.previous_page,

          page: foundTransactions.data.meta_data.page,

          take: foundTransactions.data.meta_data.take
        }
      })

      if (foundTransactions) {
        setTransactions(foundTransactions.data)
      }

      ctx.balance = foundTransactions.data.balance
    } catch (e: any) {
      if (e.message === 'Network Error') {
        toast.error('Servidor offline')
        return router.push('/sign-in')
      }
      if (e.response.data.statusCode === 401) {
        toast.error('Não autorizado')
        return router.push('/sign-in')
      }
    }
  }

  const changeFunctionDashboard = (value: boolean) => {
    setOpenTable(value)
  }

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const payload = Cookies.get('auth_token')
      let token = { username: '', exp: '', iat: '' }
      if (payload) token = jwt(payload)
      const body = {
        debitedAccountName: token.username,
        creditedAccountName: user.value,
        value: money.value
      }
      const response = await api.post(`transactions`, body, {
        headers: {
          Authorization: `Bearer ${Cookies.get('auth_token')}`
        }
      })

      ctx.balance = response.data.debitedAccount.balance
      if (response) {
        await getTransactionHandler({ order: 'ASC', page: 1 })
        setOpenTable(true)
      }
    } catch (e: any) {
      if (e.response.data.statusCode === 400)
        toast.error(`Aconteceu um erro: ${e.response.data.message}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
    }
  }
  useEffect(() => {
    getTransactionHandler({ order: 'ASC', page: pagination.page })
  }, [])

  return (
    <S.Base>
      <Header></Header>
      <S.Main>
        <Card>
          <S.ButtonBox>
            <Button
              onClick={() => {
                changeFunctionDashboard(true)
              }}
              styleButton={'buttonRectangular'}
            >
              TRANSAÇÕES
            </Button>
            <Button
              onClick={() => {
                changeFunctionDashboard(false)
              }}
              styleButton={'buttonRectangular'}
              color="yellow"
            >
              FAZER TRANSAÇÃO
            </Button>
          </S.ButtonBox>

          {openTable && (
            <>
              <Table transactions={transactions.data}></Table>
              <S.BoxPagination>
                <S.ButtonPagination
                  onClick={() => {
                    makePagination('previous')
                  }}
                  disabled={
                    pagination.has_previous_page === true ? true : false
                  }
                >
                  Prev
                </S.ButtonPagination>
                <S.TitlePagination>{pagination.page}</S.TitlePagination>
                <S.ButtonPagination
                  onClick={() => {
                    makePagination('next')
                  }}
                  disabled={!pagination.has_next_page === true ? true : false}
                >
                  Next
                </S.ButtonPagination>
              </S.BoxPagination>
            </>
          )}
          {!openTable && (
            <S.FormBox>
              <Form onSubmit={submitHandler}>
                <Title size="large">FAZER TRANSFERÊNCIA</Title>
                <Input
                  inputChangeHandler={onInputUserHandler}
                  onBlur={onUserBlur}
                  isValid={user.isValid}
                  placeholder="Nome do usuário"
                  type="text"
                ></Input>
                <Input
                  type="money"
                  placeholder="Valor a ser transferido"
                  inputChangeHandler={onInputMoneyHandler}
                  onBlur={onMoneyBlur}
                  isValid={money.isValid}
                />

                <Button
                  disabled={!money.isValid || !user.isValid ? true : false}
                >
                  COMPLETAR
                </Button>
              </Form>
            </S.FormBox>
          )}
        </Card>
      </S.Main>
    </S.Base>
  )
}
