import "./App.css";
import { store } from "./Components/store";
import { Provider } from "react-redux";
import Display from "./Components/display";

const App = () => {
  return (
    <Provider store={store}>
      <Display />
    </Provider>
  );
};

export default App;
