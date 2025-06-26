import React from "react"
import { Outlet, } from "react-router"
import Header from "./components/layouts/adminDashboard/Header"
import Footer from "./components/layouts/adminDashboard/Footer"

const AdminDashboardRoute = () => (
  <>
    <Header/>
    <Outlet/>
    <Footer/>
  </>
)

export default AdminDashboardRoute