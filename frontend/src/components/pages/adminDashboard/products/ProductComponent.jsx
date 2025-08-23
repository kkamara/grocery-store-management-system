import React, { useEffect, } from "react"
import { Helmet, } from "react-helmet"
import { useParams, Navigate, } from "react-router"
import { Slide, } from "react-slideshow-image"
import { useDispatch, useSelector, } from "react-redux"
import { adminDashboardTitle, } from "../../../../constants"
import { getAdminProduct, } from "../../../../redux/actions/adminGetProductActions"
import ProductDetail from "./ProductDetail"
import DeleteProductModal from "./DeleteProductModal"

import "react-slideshow-image/dist/styles.css"
import "./ProductComponent.scss"

const indicators = (index) => (<div className="indicator">{index + 1}</div>)

export default function ProductComponent() {
  let { productSlug, } = useParams()
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminAuth: state.adminAuth,
    adminGetProduct: state.adminGetProduct,
    adminDeleteProduct: state.adminDeleteProduct,
  }))

  useEffect(() => {
    if (
      false === state.adminAuth.loading &&
      null !== state.adminAuth.data
    ) {
      dispatch(getAdminProduct(productSlug))
    }
  }, [state.adminAuth])

  const renderProductPhotos = () => {
    return <Slide indicators={indicators}>
      {state.adminGetProduct.data.photos.map(({ path, }, index) => (
        <div key={index} className="each-slide-effect">
          <div
            style={{ 'backgroundImage': `url(${path})` }}
          ></div>
        </div>))}
    </Slide>
  }

  if (
    state.adminAuth.loading ||
    state.adminGetProduct.loading ||
    state.adminDeleteProduct.loading
  ) {
    return (
      <div className="container dashboard-product-container text-center">
        <Helmet>
          <title>Product Screen - {adminDashboardTitle}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }

  if (
    false === state.adminGetProduct.loading &&
    null !== state.adminGetProduct.error
  ) {
    return <Navigate to="/admin/404-not-found"/>
  }

  return (
    <div className="container-fluid dashboard-product-container">
      <Helmet>
        <title>
          {state.adminGetProduct.data.name}&nbsp;
          Product Screen - {adminDashboardTitle}
        </title>
      </Helmet>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          <a href="/admin/products" className="breadcrumb-link">
            View Products
          </a>&nbsp;
          &#x2022; {state.adminGetProduct.data.name}
        </h1>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="float-end product-action-buttons-container">
                <div className="edit-product-modal-container">
                  <button className="btn btn-info">
                    Edit
                  </button>
                </div>
                <DeleteProductModal/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              {renderProductPhotos()}
            </div>
          </div>
        </div>
        
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              <ProductDetail data={state.adminGetProduct.data} />              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
