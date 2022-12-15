import styled, { css } from 'styled-components'

export const Table = styled.table`
  ${({ theme }) => css`
    border: 1px solid black;
    border-collapse: collapse;
    width: 100%;
  `}
`
export const Tr = styled.tr`
  ${({ theme }) => css`
    border: 1px solid black;
    border-collapse: collapse;
  `}
`
export const Th = styled.th`
  ${({ theme }) => css`
    border: 1px solid black;
    color: black;
    font-size: ${theme.font.sizes.small};
    border-collapse: collapse;
    padding: 0.5rem 0rem;
    width: 25%;
  `}
`
export const Td = styled.td`
  ${({ theme }) => css`
    border: 1px solid black;
    border-collapse: collapse;
    padding: 0.5rem;
    width: 25%;
    font-size: ${theme.font.sizes.small};
  `}
`
