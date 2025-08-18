import React, { useEffect, useState, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { useParams, } from "react-router"
import { Helmet, } from "react-helmet"
import { Zoom, } from "react-slideshow-image"
import { getProduct, } from "../../../redux/actions/productActions"
import Error from "../../layouts/Error"

import "react-slideshow-image/dist/styles.css"
import "./ProductComponent.scss"

const indicators = (index) => (<div className="indicator">{index + 1}</div>)

export default function ProductComponent() {
  const { productSlug } = useParams()
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    product: state.product,
  }))
  const [error, setError] = useState("")

  useEffect(() => {
    dispatch(getProduct(productSlug))
  }, [])

  useEffect(() => {
    if (false === state.product.loading) {
      if (null !== state.product.data) {
        console.log(state.product.data)
      }
      if (null !== state.product.error) {
        setError(state.product.error)
      }
    }
  }, [state.product])
  
  const renderProductPhotos = () => {
    return <Zoom indicators={indicators}>
      {state.product.data.photos.map(({ path, }, index) => (
        <div className="each-slide-effect">
          <div
            className="product-image"
            style={{ "backgroundImage": `url(${path})` }}
          ></div>
        </div>))}
    </Zoom>
  }

  if (state.product.loading) {
    return (
      <div className="container product-container text-center">
        <Helmet>
          <title>Product Screen - {process.env.REACT_APP_NAME}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }

  if (state.product.error) {
    return (
      <div className="container product-container">
        <Helmet>
          <title>Product Screen - {process.env.REACT_APP_NAME}</title>
        </Helmet>
        <div className="row">
          <div className="col-md-12">
            <Error error={error} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container product-container">
      <Helmet>
        <title>{state.product.data.name} - {process.env.REACT_APP_NAME}</title>
      </Helmet>
      <div className="row">
        <div className="col-md-12">
          <Error error={error} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <div className="card">
            <div className="card-header">
              {renderProductPhotos()}
            </div>
            <div className="card-body"></div>
            <div className="card-footer"></div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="product-price">
                {state.product.data.price}
              </div>
              <button
                className="btn btn-primary"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
