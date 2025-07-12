import React from "react"
import { Routes, Route, } from "react-router-dom"

import Header from "./components/layouts/Header"
import Footer from "./components/layouts/Footer"

import Home from "./components/pages/HomeComponent"
import SignIn from "./components/pages/auth/SignInComponent"
import Logout from "./components/pages/auth/LogoutComponent"
import Register from "./components/pages/auth/RegisterComponent"
import NotFound from "./components/pages/http/NotFoundComponent"

import DashboardHome from "./components/pages/adminDashboard/HomeComponent"
import DashboardSignIn from "./components/pages/adminDashboard/auth/SignInComponent"
import DashboardLogout from "./components/pages/adminDashboard/auth/LogoutComponent"
import DashboardViewProductsComponent from "./components/pages/adminDashboard/products/ViewProductsComponent"

import { url, } from "./utils/config"
import AuthRoute from "./AuthRoute"
import AdminDashboardTemplateRoute from "./AdminDashboardTemplateRoute"
import MainSiteRoute from "./MainSiteRoute"
import AdminAuthRoute from "./AdminAuthRoute"

export default () => {
  return (
    <Routes>
      <Route element={<AdminDashboardTemplateRoute/>}>
        <Route element={<AdminAuthRoute/>}>
          <Route path={url("/admin")} element={<DashboardHome/>}/>
          <Route path={url("/admin/user/logout")} element={<DashboardLogout />}/>
          <Route path={url("/admin/products")} element={<DashboardViewProductsComponent/>}/>
        </Route>
      </Route>
      <Route element={<MainSiteRoute/>}>
        <Route element={<AuthRoute/>}>
          <Route path={url("/")} element={<Home />}/>
        </Route>
        <Route path={url("/user/signin")} element={<SignIn />}/>
        <Route path={url("/user/logout")} element={<Logout />}/>
        <Route path={url("/user/register")} element={<Register />}/>
      </Route>
      <Route path={url("/admin/signin")} element={<DashboardSignIn/>}/>
      <Route path={url("*")} element={<NotFound />}/>
    </Routes>
  )
}
