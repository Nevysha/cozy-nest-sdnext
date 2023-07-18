import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

//push a new element to the body
const cozyNestRoot = document.createElement('div')
cozyNestRoot.id = 'cozy-nest-root'
document.body.appendChild(cozyNestRoot)

ReactDOM.createRoot(document.getElementById('cozy-nest-root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
