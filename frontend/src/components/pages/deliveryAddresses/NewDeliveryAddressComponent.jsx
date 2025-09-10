import React, { useState, useEffect, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import { useNavigate } from "react-router"
import { newUserAddress } from "../../../redux/actions/createUserAddressesActions"
import Error from "../../layouts/Error"

import "./NewDeliveryAddressComponent.scss"

const defaultAddressLine1State = ""
const defaultAddressLine2State = ""
const defaultZipCodeState = ""
const defaultCityState = ""
const defaultStateState = ""
const defaultTelephoneAreaCodeState = ""
const defaultTelephoneState = ""

export default function NewDeliveryAddressComponent() {
  const [addressLine1, setAddressLine1] = useState(defaultAddressLine1State)
  const [addressLine2, setAddressLine2] = useState(defaultAddressLine2State)
  const [zipCode, setZipCode] = useState(defaultZipCodeState)
  const [city, setCity] = useState(defaultCityState)
  const [stateState, setState] = useState(defaultStateState)
  const [telephoneAreaCode, setTelephoneAreaCode] = useState(defaultTelephoneAreaCodeState)
  const [telephone, setTelephone] = useState(defaultTelephoneState)

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    createUserAddress: state.createUserAddress,
  }))

  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (false === state.createUserAddress.loading) {
      if (null !== state.createUserAddress.error) {
        setError(state.createUserAddress.error)
      }
      if (null !== state.createUserAddress.data) {
        navigate("/user/addresses")
      }
    }
  }, [state.createUserAddress])

  const handleAddressLine1Change = e => {
    setAddressLine1(e.target.value)
  }

  const handleAddressLine2Change = e => {
    setAddressLine2(e.target.value)
  }

  const handleZipCodeChange = e => {
    setZipCode(e.target.value)
  }

  const handleCityChange = e => {
    setCity(e.target.value)
  }

  const handleStateChange = e => {
    setState(e.target.value)
  }

  const handleTelephoneAreaCodeChange = e => {
    setTelephoneAreaCode(e.target.value)
  }

  const handleTelephoneChange = e => {
    setTelephone(e.target.value)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    dispatch(newUserAddress({
      addressLine1,
      addressLine2,
      zipCode,
      city,
      telephoneAreaCode,
      telephone,
      state: stateState,
    }))
  }

  if (state.createUserAddress.loading) {
    return (
      <div className="container product-container text-center">
        <Helmet>
          <title>New Delivery Address - {process.env.REACT_APP_NAME}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container new-delivery-address-container">
      <Helmet>
        <title>New Delivery Address - {process.env.REACT_APP_NAME}</title>
      </Helmet>
      <div className="row">
        <form onSubmit={handleFormSubmit} className="col-md-4 offset-md-4">
          <h1 className="title">New Delivery Address</h1>
          <Error error={error} />

          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="addressLine1">Address Line 1*:</label>
                <input
                  type="text"
                  name="addressLine1"
                  id="addressLine1"
                  value={addressLine1}
                  onChange={handleAddressLine1Change}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressLine2">Address Line 2:</label>
                <input
                  type="text"
                  name="addressLine2"
                  id="addressLine2"
                  value={addressLine2}
                  onChange={handleAddressLine2Change}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code*:</label>
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  value={zipCode}
                  onChange={handleZipCodeChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City*:</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={city}
                  onChange={handleCityChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State*:</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={stateState}
                  onChange={handleStateChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telephoneAreaCode">Telephone Area Code:</label>
                <input
                  type="text"
                  name="telephoneAreaCode"
                  id="telephoneAreaCode"
                  value={telephoneAreaCode}
                  onChange={handleTelephoneAreaCodeChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Telephone*:</label>
                <input
                  type="text"
                  name="telephone"
                  id="telephone"
                  value={telephone}
                  onChange={handleTelephoneChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="float-end">
                <input
                  type="submit"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
