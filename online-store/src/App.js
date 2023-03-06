import { observer } from 'mobx-react-lite'
import React, { useState, useContext, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { Context } from './index'
import AppRouter from './components/AppRouter'
import Footer from './components/Footer'
import { check } from './components/http/userAPI'
import NavBar from './components/NavBar'

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // check().then(data => {

    (async function asyncFunc () {
      const response = await check()

      if (response) {
        user.setUser(true)
        user.setIsAuth(true)
        setLoading(false)
      } else {
        setLoading(false)
      }
    })()

    // }).finally(() => setLoading(false))
  }, [])

  window.addEventListener('resize', function (event) {
    user.setUserWidth(document.body.clientWidth)
    user.setUserHeight(document.body.clientHeight)
  })

  if (loading) {
    return (
      <div
          style={{ height: '100vh' }}
          className="d-flex align-items-center justify-content-center"
        >
        <Spinner
          animation="border"
          variant="secondary" />
      </div>
    )
  }

  const WebFont = require('webfontloader')

  WebFont.load({
    google: {
      families: ['Amaranth']
    }
  })

  return (
      <BrowserRouter>
        <NavBar />
        <main style={{ minHeight: '100vh', background: '#FFF' }}>
          <AppRouter />
        </main>
        <Footer />
      </BrowserRouter>
  )
})

export default App
