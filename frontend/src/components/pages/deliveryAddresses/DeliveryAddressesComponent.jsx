import React, { useEffect, } from "react"
import { Helmet, } from "react-helmet"
import { useSelector, useDispatch } from "react-redux"
import { getUserAddresses } from "../../../redux/actions/userAddressesActions"
import DeleteDeliveryAddressModal from "./DeleteDeliveryAddressModal"

import "./DeliveryAddressesComponent.scss"
import { deleteUserAddressFunc } from "../../../redux/actions/deleteUserAddressesActions"

export default function DeliveryAddressesComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    userAddresses: state.userAddresses,
    deleteUserAddress: state.deleteUserAddress,
  }))

  useEffect(() => {
    dispatch(getUserAddresses())
  }, [])

  const handleDeleteAddress = userAddressId => {
    dispatch(deleteUserAddressFunc(userAddressId))
      .then(() => {
        dispatch(getUserAddresses())
      })
  }

  if (
    state.userAddresses.loading ||
    state.deleteUserAddress.loading
  ) {
    return (
      <div className="container delivery-addresses-container text-center">
        <Helmet>
          <title>Delivery Addresses - {process.env.REACT_APP_NAME}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }
  
  return (
    <div className="container delivery-addresses-container">
      <Helmet>
        <title>Delivery Addresses - {process.env.REACT_APP_NAME}</title>
      </Helmet>
      <div className="col-md-10 offset-md-1 header-container">
        <div className="row">
          <div className="col-md-10">
            <h1>Delivery Addresses</h1>
          </div>
          <div className="col-md-2">
            <div className="float-end">
              <a
                href="/user/addresses/new"
                className="btn btn-primary"
              >
                Add New
              </a>
            </div>
          </div>
        </div>
      </div>
      {state.userAddresses.data.map((address, index) => (
        <div key={index} className="col-md-10 offset-md-1 user-address-card-container">
          <div className="card">
            <div className="card-body">
              {address.addressLine1}, {address.zipCode}
            </div>
            <div className="card-footer">
              <div className="float-end">
                <a
                  className="btn btn-info edit-link-button"
                  href={`/user-addresses/${address.id}/edit`}
                >
                  Edit
                </a>
                <DeleteDeliveryAddressModal
                  onSuccess={handleDeleteAddress}
                  data={address}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
