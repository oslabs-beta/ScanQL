import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Theme } from '@radix-ui/themes';
import { Auth0Provider } from '@auth0/auth0-react';
import  useAppStore from './store/appStore.ts';
// lol i didn't know you were in here
// bruh sam i thoight i was in mine but i edited on yours LOL
// fsho in here already


const theme = useAppStore.getState().theme;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain='dev-keiran1q27un0a8a.us.auth0.com'
    clientId='xA6c3tCkDz53RgWs6R2ZAZ5AkhSg1okA'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <React.StrictMode>
      <Theme appearance={theme}>
        <App />
      </Theme>
    </React.StrictMode>
  </Auth0Provider>
)

