import { AppProps } from 'next/app'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import { UserContext, UserContextProvider } from 'store/auth-context'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </UserContextProvider>
  )
}
export default App
