import React from "react"
import { Outlet, } from "react-router"
import Header from "./components/layouts/adminDashboard/Header"
import Footer from "./components/layouts/adminDashboard/Footer"

const AdminDashboardRoute = () => (
  <>
    <div id="wrapper">
      <Header/>
      <div id="content-wrapper" className="d-flex flex-column">
        <Outlet/>
        <Footer/>
      </div>
    </div>
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>
  </>
)

export default AdminDashboardRoute