import React from "react"
import { Outlet, } from "react-router"
import Header from "./components/layouts/Header"
import Footer from "./components/layouts/Footer"

const MainSiteRoute = () => (
  <>
    <Header/>
    <Outlet/>
    <Footer/>
  </>
)

export default MainSiteRoute