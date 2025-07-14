import React from "react"
import { Helmet, } from "react-helmet"
import { adminDashboardTitle, } from "../../../../constants"

import "./ProductComponent.scss"

export default function ProductComponent() {
  return (
    <div className="container-fluid dashboard-products-container">
      <Helmet>
        <title>Product Page - {adminDashboardTitle}</title>
      </Helmet>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          View Products &#x2022; Product Page
        </h1>
      </div>
    </div>
  )
}
