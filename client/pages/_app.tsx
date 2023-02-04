import {Provider} from "react-redux";
import '@/styles/globals.css'
import type {AppProps} from 'next/app';
import {store} from "../store/index";


const App = ({ Component, pageProps }: AppProps) => {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}


export default App;
