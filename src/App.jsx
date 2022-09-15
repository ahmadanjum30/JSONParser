import './App.css'
import { store } from './Components/Redux/store'
import { Provider } from 'react-redux'
import MainView from './Components/MainView'

const App = () => {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  )
}

export default App
