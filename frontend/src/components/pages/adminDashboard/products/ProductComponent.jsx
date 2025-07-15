import React from "react"
import { Helmet, } from "react-helmet"
import { Slide, } from "react-slideshow-image"
import { adminDashboardTitle, } from "../../../../constants"

import "./ProductComponent.scss"
import "react-slideshow-image/dist/styles.css"

const indicators = (index) => (<div className="indicator">{index + 1}</div>);

export default function ProductComponent() {

  const renderProductPhotos = () => {
    return <Slide indicators={indicators}>
        <div className="each-slide-effect">
            <div style={{ 'backgroundImage': `url(http://localhost:8000/productPhotos/pizza-6948995_1280.webp)` }}>
                <span>Slide 1</span>
            </div>
        </div>
        <div className="each-slide-effect">
            <div style={{ 'backgroundImage': `url(http://localhost:8000/productPhotos/apples-2243734_1280.jpg)` }}>
                <span>Slide 2</span>
            </div>
        </div>
        <div className="each-slide-effect">
            <div style={{ 'backgroundImage': `url(http://localhost:8000/productPhotos/dairy-5621769_1280.webp)` }}>
                <span>Slide 3</span>
            </div>
        </div>
    </Slide>
  }

  return (
    <div className="container-fluid dashboard-products-container">
      <Helmet>
        <title>Product Page - {adminDashboardTitle}</title>
      </Helmet>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          <a href="/admin/products" className="breadcrumb-link">
            View Products
          </a>&nbsp;
          &#x2022; Product Page
        </h1>
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
              Product details go here.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
