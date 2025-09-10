import React, { useState, } from "react"
import Modal from "react-modal"

import "./DeleteDeliveryAddressModal.scss"

const customStyles = {
  content: {
    top: "46%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const defaultModalIsOpenValue = false
const defaultChoiceValue = "0"

export default function DeleteDeliveryAddressModal({
  onSuccess,
  data,
}) {
  const [modalIsOpen, setModalIsOpen] = React.useState(
    defaultModalIsOpenValue
  )
  const [choice, setChoice] = useState(defaultChoiceValue)
  
  function closeModal() {
    setChoice(defaultChoiceValue)
    setModalIsOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setChoice(defaultChoiceValue)
    if ("0" === choice) {
      setModalIsOpen(false)
    } else {
      onSuccess()
    }
  }

  function handleChoiceChange(e) {
    setChoice(e.target.value)
  }

  function openModal() {
    setModalIsOpen(true)
  }

  return (
    <>
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
        contentLabel="Delete User Address Modal"
      >
        <div className="delete-user-address-modal">
          <h2>
            Are you sure you want to delete&nbsp;
            {data.addressLine1}, {data.zipCode}?
          </h2>
          <form
            className="delete-user-address-form"
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
    </>
  )
}
