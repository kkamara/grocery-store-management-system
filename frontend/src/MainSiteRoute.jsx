import React from "react"
import { Outlet, } from "react-router"
import Header from "./components/layouts/Header"
import Footer from "./components/layouts/Footer"

import $ from"jquery/dist/jquery.min.js"
import Popper from"@popperjs/core/dist/cjs/popper"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

import "./brite_bootstrap.css"

const MainSiteRoute = () => (
  <>
    <Header/>
    <Outlet/>
    <Footer/>
  </>
)

export default MainSiteRoute