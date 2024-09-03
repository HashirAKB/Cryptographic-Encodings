
import './App.css'
import EncodersAndDecoders from './pages/Encoding'
import { ThemeProvider } from './components/theme-provider'

function App() {

  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <EncodersAndDecoders />
    </ThemeProvider>
  )
}

export default App
