import React from "react"
import { parseDate, } from "../../../../utils/date"

import "./ProductDetail.scss"

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
    <div className="admin-product-detail-container">
      <strong>Name:</strong> {name}
      <br />
      <strong>Units:</strong> {units}
      <br />
      <strong>Weight:</strong> {weight}
      <br />
      <strong>Price:</strong> {price}
      <br />
      <strong>Description:</strong> <span className="description-span">{description}</span>
      <br />
      <strong>Category:</strong> {category ? category.name : null}
      <br />
      <strong>Manufacturer:</strong> {manufacturer ? manufacturer.name : null}
      <br />
      <strong>Created At:</strong> {parseDate(createdAt)}
      <br />
      <strong>Updated At:</strong> {parseDate(updatedAt)}
    </div>
  )
}
