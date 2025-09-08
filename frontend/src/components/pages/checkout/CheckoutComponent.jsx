import React, { useEffect, } from "react"
import { useSelector, useDispatch, } from "react-redux"
import { Helmet, } from "react-helmet"
import { getCart, } from "../../../redux/actions/cartActions"
import CartItem from "../cart/CartItem"

import "./CheckoutComponent.scss"

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
      <div className="container checkout-container text-center">
        <Helmet>
          <title>Checkout - {process.env.REACT_APP_NAME}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container checkout-container">
      <Helmet>
        <title>Checkout - {process.env.REACT_APP_NAME}</title>
      </Helmet>
      <div className="row">
        <h1>Checkout</h1>
        <div className="col-md-10">
          {state.cart.data.cart.map((cartItem, index) => (
            <CartItem
              key={index}
              data={cartItem}
              hideQuantity={true}
            />
          ))}
        </div>
        <div className="col-md-2">
          <span className="product-price-label">
            Subtotal:&nbsp;
          </span>
          <h3 className="product-price">
            {state.cart.data.totalPrice}
          </h3>
          <div className="action-buttons-container">
            <a
              href="/checkout"
              className="btn btn-success checkout-btn"
            >
              Pay Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
