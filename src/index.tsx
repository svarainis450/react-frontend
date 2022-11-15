import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './state/userContext';
import { UserInfoContextProvider } from 'src/state/UserInfoContextProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './state/reduxstate/store';

import './index.css';

import { Spinner } from './Components/elements/Spinner';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <UserContextProvider>
        <UserInfoContextProvider>
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        </UserInfoContextProvider>
      </UserContextProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
