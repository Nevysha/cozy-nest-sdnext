import {Suspense, useEffect, useState} from "react";

import './App.scss'
import eventBus from "@/core/EventBus.ts";

function Loading() {
  return (
    <div>Loading...</div>
  )
}


function App() {

  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    //TODO NEVYSHA: manage timer for loading

    eventBus.onEver('gradio-ui-loaded', () => {
      setLoading(false)
      setReady(true)
    })

    return () => {
      eventBus.off('gradio-ui-loaded')
    }
  }, [])

  return (
    <>
      {!ready ? <Loading /> :
        (
          <Suspense fallback={<Loading />}>
            <h1>Vite + React</h1>
          </Suspense>
        )}
    </>
  )
}

export default App
