import React, { useEffect, useState, } from "react"
import { useSelector, useDispatch, } from "react-redux"
import { Helmet, } from "react-helmet"
import { getCart, } from "../../../redux/actions/cartActions"
import CartItem from "../cart/CartItem"
import { getUserAddresses, } from "../../../redux/actions/userAddressesActions"
import DeliveryAddresses from "./DeliveryAddresses"
import Error from "../../layouts/Error"

import "./CheckoutComponent.scss"

const defaultUserHasAddressesState = false
const defaultUserAddressState = "0"

export default function CartComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    cart: state.cart,
    userAddresses: state.userAddresses,
  }))
  const [userHasAddresses, setUserHasAddresses] = useState(defaultUserHasAddressesState)
  const [userAddress, setuserAddress] = useState(defaultUserAddressState)
  const [error, setError] = useState("")

  useEffect(() => {
    dispatch(getCart())
    dispatch(getUserAddresses())
  }, [])

  useEffect(() => {
    if (false === state.userAddresses.loading) {
      if (null !== state.userAddresses.data) {
        if (0 < state.userAddresses.data.length) {
          setUserHasAddresses(true)
        }
      }
    }
  }, [state.userAddresses])
  
  const handleUserAddressChange = e => {
    setuserAddress(e.target.value)
  }

  const getError = () => {
    if ("0" === userAddress) {
      return "The delivery address field is missing."
    }
    return false
  }

  const handleSubmitForm = e => {
    e.preventDefault()
    setError("")
    const err = getError()
    if (false !== err) {
      return setError(err)
    }
    console.log("Form submitted")
  }

  if (
    state.cart.loading ||
    state.userAddresses.loading
  ) {
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
        <Error error={error}/>
        <div className="col-md-9">
          {state.cart.data.cart.map((cartItem, index) => (
            <CartItem
              key={index}
              data={cartItem}
              hideQuantity={true}
            />
          ))}
        </div>
        <div className="col-md-3">
          {userHasAddresses && (
            <>
              <label htmlFor="userAddress">Delivery Address:</label>
              <DeliveryAddresses
                data={state.userAddresses.data}
                handleUserAddressChange={handleUserAddressChange}
                userAddress={userAddress}
              />
            </>
          )}
          {!userHasAddresses && (
            <p>Please add your address in settings.</p>
          )}
          <span className="product-price-label">
            Subtotal:&nbsp;
          </span>
          <h3 className="product-price">
            {state.cart.data.totalPrice}
          </h3>
          <div className="action-buttons-container">
            <button
              className="btn btn-success checkout-btn"
              onClick={handleSubmitForm}
              disabled={!userHasAddresses}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
