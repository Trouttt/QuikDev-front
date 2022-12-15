import styled from 'styled-components'

export const Form = styled.form`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  gap: 3rem;
  width: 100%;
  background-color: white;
  box-shadow: 0px 10px 26px 8px rgba(0, 0, 0, 0.1);
  border-radius: 3rem;

  @media screen and (min-width: 800px) {
    padding: 1rem 0;

    max-width: 56.2rem;
    height: fit-content;
    gap: 3rem;
  }
`
