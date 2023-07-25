import {Suspense, useEffect, useState} from "react";

import './App.scss'
//import '@/assets/cattpuccin/frappe.css' as assert and inject StyleSheet
import { Layout } from '@/componants/Layout.tsx'
import eventBus from "@/core/EventBus.ts";
import {loadPalette} from "@/core/loadPalette.ts";

loadPalette()

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
    eventBus.onEver('cozy-nest-ui-ready', () => {
      setLoading(false)
      setReady(true)
    })

    return () => {
      eventBus.off('cozy-nest-ui-ready')
    }

  }, [])

  return (
    <>
      {!ready ? <Loading /> :
        (
          <Suspense fallback={<Loading />}>
            <Layout />
          </Suspense>
        )}
    </>
  )
}

export default App
