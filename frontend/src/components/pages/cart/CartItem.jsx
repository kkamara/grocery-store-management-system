import React, { useEffect, } from "react"
import { CiCircleMinus } from "react-icons/ci"
import { FaMinusCircle } from "react-icons/fa"
import { CiCirclePlus } from "react-icons/ci"
import { FaPlusCircle } from "react-icons/fa"
import { useDispatch, useSelector, } from "react-redux"
import { deleteCartItemFunc } from "../../../redux/actions/deleteCartItemActions"
import { addToCartFunc, } from "../../../redux/actions/addToCartActions"
import { getCart, } from "../../../redux/actions/cartActions"

import "./CartItem.scss"

export default function CartItem({ data }) {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    addToCart: state.addToCart,
    deleteCartItem: state.deleteCartItem,
  }))

  useEffect(() => {
    if (true === state.addToCart.loading) {
      if (null !== state.addToCart.data) {
        console.log(1)
        dispatch(getCart())
      }
    }
  }, [state.addToCart])

  useEffect(() => {
    if (false === state.deleteCartItem.loading) {
      if (null !== state.deleteCartItem.data) {
        console.log(2)
        dispatch(getCart())
      }
    }
  }, [state.deleteCartItem])

  function handleMinusCartItemBtnPress() {
    dispatch(deleteCartItemFunc(data.productsId))
  }

  function handlePlusCartItemBtnPress() {
    dispatch(addToCartFunc(data.productsId))
  }

  return (
    <div className="card cart-item-card">
      <div className="row">
        <div className="col-md-2">
          <img
            src={data.product.photos[0].path}
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <h3 className="product-name">
            {data.product.name}
          </h3>

          <div className="quantity-container">
            <button
              className="minus-btn"
              onClick={handleMinusCartItemBtnPress}
            >
              <CiCircleMinus className="circle-outline-minus-icon" />
              <FaMinusCircle className="circle-filled-minus-icon" />
            </button>
            <input
              type="text"
              disabled={true}
              value={data.quantity}
              className="quantity"
            />
            <button
              className="plus-btn"
              onClick={handlePlusCartItemBtnPress}
            >
              <CiCirclePlus className="circle-outline-plus-icon" />
              <FaPlusCircle className="circle-filled-plus-icon" />
            </button>
          </div>
        </div>
        <div className="col-md-2">
          <div className="product-price">
            {data.price}
          </div>
        </div>
      </div>
      
    </div>
  )
}
