import React, { useEffect, } from 'react'
import { useNavigate, useParams, } from 'react-router'
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import { getCheckout } from '../../../redux/actions/checkoutActions'

export default function CheckoutCancelledComponent() {
  const { billingReference } = useParams()
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    checkout: state.checkout,
  }))
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCheckout(billingReference))
  }, [])

  useEffect(() => {
    if (false === state.checkout.loading) {
      if (null !== state.checkout.error) {
        return navigate("/404-not-found")
      }
    }
  }, [state.checkout])

  if (state.checkout.loading) {
    return (
      <div className="container checkout-cancelled-container text-center">
        <Helmet>
          <title>Cancelled Order - {process.env.REACT_APP_NAME}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }
  
  return (
    <div className="container checkout-cancelled-container">
      <Helmet>
        <title>Cancelled Order {state.checkout.data.billingReference} - {process.env.REACT_APP_NAME}</title>
      </Helmet>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Cancelled Order {state.checkout.data.billingReference}</h1>

          <p>
            <strong>Payment Method:</strong> {state.checkout.data.paymentMethod}
          </p>
          <p>
            <strong>Total Price:</strong> {state.checkout.data.amount}
          </p>
          <p>
            <strong>Shipping Status:</strong> cancelled
          </p>
        </div>
      </div>
    </div>
  )
}
