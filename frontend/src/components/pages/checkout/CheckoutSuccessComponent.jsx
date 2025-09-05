import React from 'react'
import { useParams, } from 'react-router'

export default function CheckoutSuccessComponent() {
  const { billingReference } = useParams()

  console.log(billingReference)
  
  return (
    <div className="container checkout-success-container">
      <div>CheckoutSuccessComponent</div>
    </div>
  )
}
