import './Loading.scss'
import {Suspense, useEffect, useState} from "react";
import Loader from "react-spinners/HashLoader";
import eventBus from "@/core/EventBus.ts";

function FullScreenLoading() {

  const config = JSON.parse(localStorage.getItem('COZY_NEST_CONFIG'))
  const color = '#ff8134'

  //TODO NEVYSHA: manage theme
  const maybeLightThemeClass = "light"

  return (
    <div className="CozyNestLoading">
      <div id='nevysha-loading-wrap' className={`nevysha ${maybeLightThemeClass}`}>
        <div id='nevysha-loading' className='nevysha'>
          <div className="nevysha-loading-progress">
            <div className="nevysha-cozy-nest-app-name animate__animated animate__backInLeft">
              SD.<span className="highlight-title">Next</span>
            </div>
            <div className="LoadingWrapper">
              <Loader color={color} className="Loader" size={window.innerHeight / 4} />
            </div>
            <div className="subtext1 animate__animated animate__pulse animate__infinite">
              Loading The Magic
            </div>
            <div className="subtext2 animate__animated animate__pulse animate__infinite">
              (and gradio)
            </div>

          </div>
          <div id='nevy_waves'>
            <div className='wave'></div>
            <div className='wave'></div>
            <div className='wave'></div>
          </div>
          <div className="footer">UI made by Nevysha with <span className="heart">❤</span> and <span
            className="coffee">☕</span></div>
        </div>
      </div>
    </div>
  );
}

export default function Loading() {

  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {

    eventBus.onEver('gradio-ui-loaded', () => {
      setLoading(false)
      setReady(true)
      eventBus.emit('cozy-nest-ui-ready')
    })

    return () => {
      eventBus.off('gradio-ui-loaded')
    }
  }, [])

  return (
    <>
      {!ready ? <FullScreenLoading /> :
        (
          <Suspense fallback={<FullScreenLoading />}>
            <div/>
          </Suspense>
        )}
    </>
  )
}
