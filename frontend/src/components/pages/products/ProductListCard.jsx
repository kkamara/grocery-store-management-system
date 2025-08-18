import React from 'react'

import "./ProductListCard.scss"

export default function ProductListCard({ product, }) {
  return (
    <a href={`/products/${product.slug}`} className="col-md-2 product-card-container">
      <div className="card product-card">
        <div className="card-header">
          {product.photos && (
            <img
              src={product.photos[0].path}
              alt={product.photos[0].name}
              className="img-fluid product-image"
            />
          )}
        </div>
        <div className="card-body">
          <p className="product-name">{product.name}</p>
          <p className='product-units-container'>Units: <span className="product-units">{product.units}</span></p>
          <p className="product-price">{product.price}</p>
        </div>
      </div>
    </a>
  )
}
