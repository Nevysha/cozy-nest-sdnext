import Loader from "react-spinners/HashLoader";

import './App.scss'
import './Loading.scss'
import {Suspense, useEffect, useState} from "react";


function Loading() {

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


function App() {

  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    //TODO NEVYSHA: manage timer for loading
    setTimeout(() => {
      setLoading(false)
      setReady(true)
    }, 10000)
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
