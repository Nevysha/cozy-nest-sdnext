import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './index.css'
import Loading from "@/componants/Loading/FullScreenLoading.tsx";
import { observeOnLinks } from '@/tools/tools'

import eventBus from "@/core/EventBus.ts";

declare global {
  interface Window {
    onUiLoaded: (arg: any) => void; // replace 'any' with the type of your argument
  }
}

//push a new element to the body
const cozyNestRoot = document.createElement('div')
cozyNestRoot.id = 'cozy-nest-loading'
document.body.appendChild(cozyNestRoot)

ReactDOM.createRoot(document.getElementById('cozy-nest-loading')!).render(
  <React.StrictMode>
    <Loading />
  </React.StrictMode>,
)

function registerForGradioUiLoaded() {
  if (window.onUiLoaded) {
    window.onUiLoaded(() => {
      eventBus.emit('gradio-ui-loaded')
    })
    return;
  }
  setTimeout(registerForGradioUiLoaded, 200)
}
registerForGradioUiLoaded()

document.addEventListener("DOMContentLoaded", function() {
  //push a new element to the body
  const cozyNestRoot = document.createElement('div')
  cozyNestRoot.id = 'cozy-nest-root'
  document.querySelector('gradio-app').appendChild(cozyNestRoot)

  ReactDOM.createRoot(document.getElementById('cozy-nest-root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
