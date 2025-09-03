import React, { useEffect, } from "react"
import { useSelector, useDispatch, } from "react-redux"
import { Helmet, } from "react-helmet"
import { getCart, } from "../../../redux/actions/cartActions"
import CartItem from "./CartItem"

import "./CartComponent.scss"

export default function CartComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    cart: state.cart,
  }))

  useEffect(() => {
    dispatch(getCart())
  }, [])

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
      <div className="row">
        <div className="col-md-10">
          {state.cart.data.cart.map((cartItem, index) => (
            <CartItem
              key={index}
              data={cartItem}
            />
          ))}
        </div>
        <div className="col-md-2">
          <span className="product-price-label">
            Subtotal:&nbsp;
          </span>
          <h2 className="product-price">
            {state.cart.data.totalPrice}
          </h2>
          <div className="action-buttons-container">
            <a
              href="/checkout"
              className="btn btn-success checkout-btn"
            >
              Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
