import React, { useEffect, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import ReactPaginate from "react-paginate"
import { Helmet, } from "react-helmet"
import Error from "../layouts/Error"
import { parseDate, } from "../../utils/date"
import { getProducts, } from "../../redux/actions/productsActions"

import "./HomeComponent.scss"

export default function HomeComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    products: state.products,
  }))

  useEffect(() => {
    dispatch(getProducts())
  }, []);

  const handlePageChange = ({ selected, }) => {
    const newPage = selected + 1
    if (newPage > state.products.data.meta.pages) {
      return
    }
    dispatch(getProducts(newPage))
  }

  const pagination = () => {
    if (!state.products.data) {
        return null
    }

    return <ReactPaginate
      onPageChange={handlePageChange}
      previousLabel="Previous"
      nextLabel="Next"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      pageCount={state.products.data.meta.pages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName="pagination"
      activeClassName="active"
      forcePage={state.products.data.meta.currentPage - 1}
    />
  }

  const paginationDetail = () => {
    return <div className="text-center">
      <strong>Page</strong> ({state.products.data.meta.currentPage}),&nbsp;
      <strong>Page Count</strong> ({state.products.data.meta.pages}),&nbsp;
      <strong>Displayed Items</strong> ({state.products.data.data.length}),&nbsp;
      <strong>Items</strong> ({state.products.data.meta.items})
    </div>
  }

  const renderList = () => {
    if (!state.products.data) {
      return null
    }
    return (
      <>
        {paginationDetail()}
        <div className="row">
          {state.products.data.data.map((product, index) => (
            <div key={index} className="col-md-2 product-card-container">
              <div className="card product-card">
                <div className="card-header">
                  {product.photos && (
                    <img
                      src={product.photos[0].path}
                      alt={product.photos[0].name}
                      className="img-fluid"
                    />
                  )}
                </div>
                <div className="card-body">
                  <span className="product-name">{product.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {paginationDetail()}
      </>
    )
  }

  if (
    !state.auth.loading &&
    typeof state.auth.data === "object" &&
    null !== state.auth.data
  ) {
    console.log("authenticated", state.auth.data)
  }
  if (
    !state.products.loading &&
    typeof state.products.data === "object" &&
    null !== state.products.data
  ) {
    console.log("products", state.products.data)
  }
  if (state.auth.loading || state.products.loading) {
    return <div className="container home-container text-center">
      <Helmet>
        <title>Home - {process.env.REACT_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return (
    <div className="container home-container">
      <Helmet>
        <title>Home - {process.env.REACT_APP_NAME}</title>
      </Helmet>
      <Error error={state.auth.error || state.products.error}/>
      {pagination()}
      {renderList()}
      {pagination()}
    </div>
  )
}
