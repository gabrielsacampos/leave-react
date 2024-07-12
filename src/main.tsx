import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Theme } from '@radix-ui/themes'
import './index.css'
import '@radix-ui/themes/styles.css';
import 'primeicons/primeicons.css';
import { queryClient } from './lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>,
)
