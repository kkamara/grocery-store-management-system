import React, { useEffect, } from 'react'
import { useNavigate, useParams, } from 'react-router'
import { useDispatch, useSelector, } from "react-redux"
import { getCheckout } from '../../../redux/actions/checkoutActions'

export default function CheckoutSuccessComponent() {
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

  console.log(state.checkout)
  
  return (
    <div className="container checkout-success-container">
      <div>CheckoutSuccessComponent</div>
    </div>
  )
}
