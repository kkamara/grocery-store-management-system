import React, { useEffect, } from "react"
import { useSelector, useDispatch, } from "react-redux"
import { Helmet, } from "react-helmet"
import { getCart, } from "../../../redux/actions/cartActions"

export default function CartComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    cart: state.cart,
  }))

  useEffect(() => {
    dispatch(getCart())
  }, [])

  console.log(state.cart)

  if (state.cart.loading) {
    return (
      <div className="container cart-container text-center">
        <Helmet>
          <title>Your Cart - {process.env.REACT_APP_NAME}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container cart-container">
      <Helmet>
        <title>Your Cart - {process.env.REACT_APP_NAME}</title>
      </Helmet>
      CartComponent
    </div>
  )
}
