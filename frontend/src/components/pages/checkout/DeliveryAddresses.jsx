import React, { useState, } from 'react'

const defaultUserAddressState = "0"

export default function DeliveryAddresses({ data }) {
  const [userAddress, setuserAddress] = useState(defaultUserAddressState)

  const handleUserAddressChange = e => {
    setuserAddress(e.target.value)
  }

  return (
    <div
      className="delivery-addresses-container form-group"
    >
      <select
        name="userAddress"
        id="userAddress"
        className="form-control"
        value={userAddress}
        onChange={handleUserAddressChange}
      >
        <option value="0">Please choose an address</option>
        {data.map((item, index) => (
          <option
            key={index}
            value={item.id}
          >
            {item.addressLine1}, {item.zipCode}
          </option>
        ))}
      </select>
    </div>
  )
}
