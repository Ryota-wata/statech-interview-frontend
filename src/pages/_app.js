import AppAppBar from './AppAppBar';
import { AuthProvider } from '../components/Auth';

export default function App({ Component, pageProps }) {
  return (
  <>
    <AuthProvider>
      <AppAppBar />
      <Component {...pageProps} />
    </AuthProvider>
  </>
  )
}
