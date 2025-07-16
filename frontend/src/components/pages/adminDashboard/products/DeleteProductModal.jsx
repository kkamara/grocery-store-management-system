import React, { useState, } from "react"
import Modal from "react-modal"
import { useDispatch, useSelector, } from "react-redux"
import { useNavigate, } from "react-router"

import "./DeleteProductModal.scss"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const defaultChoiceValue = "0"

export default function DeleteProductModal() {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminGetProduct: state.adminGetProduct,
  }))
  const [choice, setChoice] = useState(defaultChoiceValue)
  const navigate = useNavigate()

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setChoice(defaultChoiceValue)
    setIsOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setChoice(defaultChoiceValue)
    if ("0" === choice) {
      setIsOpen(false)
    } else {
      console.log("should delete")
      setIsOpen(false)
      navigate("/admin/products")
    }
  }

  function handleChoiceChange(e) {
    setChoice(e.target.value)
  }

  return (
    <div className="delete-product-modal-container">
      <button
        className="btn btn-danger"
        onClick={openModal}
      >
        Delete
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Product Modal"
      >
        <div className="delete-product-modal">
          <h2>
            Are you sure you want to delete&nbsp;
            {state.adminGetProduct.data.name}?
          </h2>
          <form
            className="admin-delete-product-form"
            onSubmit={handleSubmit}
          >
            <select
              name="option"
              className="form-control admin-delete-product-option-select-input"
              value={choice}
              onChange={handleChoiceChange}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
            <input
              type="submit"
              className="btn btn-success"
            />
            <button
              onClick={closeModal}
              className="btn btn-default"
            >
              Close
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}