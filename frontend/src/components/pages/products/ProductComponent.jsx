import React, { useEffect, useState, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { useParams, } from "react-router"
import { Helmet, } from "react-helmet"
import { getProduct, } from "../../../redux/actions/productActions"
import Error from "../../layouts/Error"

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
      <div>ProductComponent</div>
    </div>
  )
}
