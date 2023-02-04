import '@/styles/globals.css'
import type {AppProps} from 'next/app';
import {Provider} from "react-redux";
import {persistor, store} from "@/store";
import {PersistGate} from "redux-persist/integration/react";
import {useEffect} from "react";
import {clearStorage} from "@/helpers/clearStorage";

const App = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    clearStorage();
  }, [])

  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
}

export default App;
