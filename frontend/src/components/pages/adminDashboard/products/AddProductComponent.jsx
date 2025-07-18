import React, { useEffect, } from "react"
import { Helmet, } from "react-helmet"
import { Navigate, } from "react-router"
import { useDispatch, useSelector, } from "react-redux"
import { adminDashboardTitle, } from "../../../../constants"
import { getAdminProduct, } from "../../../../redux/actions/adminGetProductActions"

import "react-slideshow-image/dist/styles.css"
import "./ProductComponent.scss"

export default function ProductComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminAuth: state.adminAuth,
  }))

  useEffect(() => {
    if (
      false === state.adminAuth.loading &&
      false !== state.adminAuth.data
    ) {
      // dispatch(getAdminProduct(productSlug))
    }
  }, [state.adminAuth])

  if (
    state.adminAuth.loading
  ) {
    return (
      <div className="container dashboard-product-container text-center">
        <Helmet>
          <title>Add a New Product - {adminDashboardTitle}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <form className="container-fluid dashboard-product-container">
      <Helmet>
        <title>
          Add a New Product - {adminDashboardTitle}
        </title>
      </Helmet>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          Add a New Product
        </h1>
      </div>

      <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              Show image inputs here.
            </div>
          </div>
        </div>
        
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              Product detail inputs go here.
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="float-end">
                <input
                  type="submit"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
