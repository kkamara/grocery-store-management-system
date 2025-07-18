import React from "react"

import AdminDashboardLogo from "../../../assets/adminDashboard/images/admin-dashboard-logo.webp"

import "./Sidebar.scss"

function Sidebar() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/admin"
      >
        <div className="sidebar-brand-icon">
          <img
            alt="Admin Dashboard Logo"
            src={AdminDashboardLogo}
            className="dashboard-home-logo"
          />
        </div>
        <div className="sidebar-brand-text mx-3">
          Admin
        </div>
      </a>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <a className="nav-link" href="/admin">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Resources</div>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="true"
          aria-controls="collapsePages"
        >
          <i className="fas fa-fw fa-folder"></i>
          <span>Products</span>
        </a>
        <div
          id="collapsePages"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Products:</h6>
            <a className="collapse-item" href="/admin/products">
              View Products
            </a>
            <a className="collapse-item" href="/admin">
              Add a New Product
            </a>
          </div>
        </div>
      </li>
    </ul>
  )
}

export default Sidebar
