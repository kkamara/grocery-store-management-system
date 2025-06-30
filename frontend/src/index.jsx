import React from "react"
import { createRoot, } from "react-dom/client"
import { Provider } from "react-redux"

import App from "./App"
import store from "./redux/store"

import "./index.scss"

const container = document.getElementById("app")
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)