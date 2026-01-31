// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SaveSlotsProvider } from './state/useSaveSlots'

import './index.css'  

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <SaveSlotsProvider>
    <App />
  </SaveSlotsProvider>
)