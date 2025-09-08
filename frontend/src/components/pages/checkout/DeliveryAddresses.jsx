import React, { useState, } from 'react'

export default function DeliveryAddresses({
  data,
  handleUserAddressChange,
  userAddress,
}) {
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
