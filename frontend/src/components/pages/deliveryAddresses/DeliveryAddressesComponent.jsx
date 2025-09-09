import React from "react"
import { Helmet, } from "react-helmet"

export default function DeliveryAddressesComponent() {
  if (false) {
    return (
      <div className="container delivery-addresses-container text-center">
        <Helmet>
          <title>Product Screen - {process.env.REACT_APP_NAME}</title>
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
      <div>DeliveryAddressesComponent</div>
    </div>
  )
}
