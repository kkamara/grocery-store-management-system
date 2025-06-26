import React from "react"
import { Routes, Route, } from "react-router-dom"

import Header from "./components/layouts/Header"
import Footer from "./components/layouts/Footer"

import Home from "./components/pages/HomeComponent"
import Login from "./components/pages/auth/LoginComponent"
import Logout from "./components/pages/auth/LogoutComponent"
import Register from "./components/pages/auth/RegisterComponent"
import NotFound from "./components/pages/http/NotFoundComponent"

import DashboardHome from "./components/pages/adminDashboard/HomeComponent"

import { url, } from "./utils/config"
import AuthRoute from "./AuthRoute"
import AdminDashboardRoute from "./AdminDashboardRoute"
import MainSiteRoute from "./MainSiteRoute"

export default () => {
  return (
    <Routes>
      <Route element={<MainSiteRoute/>}>
        <Route element={<AuthRoute/>}>
          <Route path={url("/")} element={<Home />}/>
        </Route>
        <Route path={url("/user/login")} element={<Login />}/>
        <Route path={url("/user/logout")} element={<Logout />}/>
        <Route path={url("/user/register")} element={<Register />}/>
      </Route>
      <Route path={url("/admin")} element={<AdminDashboardRoute/>}>
        <Route path={url("/admin")} element={<DashboardHome/>}/>
      </Route>
      <Route path={url("*")} element={<NotFound />}/>
    </Routes>
  )
}
