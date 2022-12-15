import { useEffect } from 'react'
import * as S from './styles'

type Transaction = {
  value: number
  createAt: string
  origin: string
  receiver: string
}
type MetaData = {
  has_next_page: false
  has_previous_page: false
  item_count: number
  page: number
  page_count: number
  take: number
}
interface ListProps extends React.HTMLAttributes<Element> {
  transactions: Transaction[]
}

export default function Table({ transactions }: ListProps) {
  return (
    <div>
      <S.Table>
        <thead>
          <S.Tr>
            <S.Th>Valor</S.Th>
            <S.Th>Data de transferência</S.Th>
            <S.Th>Origem</S.Th>
            <S.Th>Destino</S.Th>
          </S.Tr>
        </thead>
        <tbody>
          {Array.isArray(transactions)
            ? transactions.map((td: Transaction, index: number) => (
                <S.Tr key={index}>
                  <S.Td>{td.value}</S.Td>
                  <S.Td>{td.createAt}</S.Td>
                  <S.Td>{td.origin}</S.Td>
                  <S.Td>{td.receiver}</S.Td>
                </S.Tr>
              ))
            : null}
        </tbody>
      </S.Table>
    </div>
  )
}
