import React from 'react'
import { parseDate, } from '../../../../utils/date'

export default function ProductDetail({ data, }) {
  const {
    name,
    units,
    weight,
    category,
    price,
    description,
    manufacturer,
    createdAt,
    updatedAt,
  } = data
  return (
    <div>
      <strong>Name:</strong> {name}
      <br />
      <strong>Units:</strong> {units}
      <br />
      <strong>Weight:</strong> {weight}
      <br />
      <strong>Price:</strong> {price}
      <br />
      <strong>Description:</strong> {description}
      <br />
      <strong>Category:</strong> {category ? category.name : null}
      <br />
      <strong>Manufacturer:</strong> {manufacturer ? manufacturer.name : null}
      <br />
      <strong>Created At:</strong> {parseDate(createdAt)}
      <br />
      <strong>Name:</strong> {parseDate(updatedAt)}
    </div>
  )
}
