import React from "react"
import { Outlet } from "react-router"
import Sidebar from "./components/layouts/adminDashboard/Sidebar"
import Header from "./components/layouts/adminDashboard/Header"
import Footer from "./components/layouts/adminDashboard/Footer"

const AdminDashboardRoute = () => (
  <>
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header/>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
    <a className="scroll-to-top rounded" href="#page-top">
      <i className="fas fa-angle-up"></i>
    </a>
    <div
      className="modal fade"
      id="logoutModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="logoutModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="logoutModalLabel">
              Ready to Leave?
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            Select "Logout" below if you are ready to end your current session.
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <a className="btn btn-primary" href="/admin/user/logout">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default AdminDashboardRoute
