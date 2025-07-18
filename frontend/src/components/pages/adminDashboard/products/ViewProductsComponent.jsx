import React, { useEffect, useState, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import ReactPaginate from "react-paginate"
import { FaWindowClose, } from "react-icons/fa"
import { searchAdminProducts, } from "../../../../redux/actions/adminSearchProductsActions"
import { adminDashboardTitle, } from "../../../../constants"
import { parseDate, } from "../../../../utils/date"

import "./ViewProductsComponent.scss"

export default function ViewProductsComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminAuth: state.adminAuth,
    adminSearchProducts: state.adminSearchProducts,
  }))
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (false === state.adminAuth.loading && state.adminAuth.data) {
      dispatch(searchAdminProducts(query, page))
    }
  }, [state.adminAuth])

  const handlePageChange = ({ selected, }) => {
    const newPage = selected + 1
    if (newPage > state.adminSearchProducts.data.meta.pages) {
      return
    }
    setPage(newPage)
    dispatch(searchAdminProducts(query, newPage))
  }

  const handleQueryChange = e => {
    setQuery(e.target.value)
  }

  const onQueryFormSubmit = e => {
    e.preventDefault()
    dispatch(searchAdminProducts(
      query,
      page,
    ))
  }

  const resetQueryForm = () => {
    setQuery("")
  }

  const pagination = () => {
    if (!state.adminSearchProducts.data) {
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
      pageCount={state.adminSearchProducts.data.meta.pages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName="pagination"
      activeClassName="active"
      forcePage={state.adminSearchProducts.data.meta.currentPage - 1}
    />
  }

  const paginationDetail = () => {
    return <div className="text-center">
      <strong>Page</strong> ({state.adminSearchProducts.data.meta.currentPage}),&nbsp;
      <strong>Page Count</strong> ({state.adminSearchProducts.data.meta.pages}),&nbsp;
      <strong>Displayed Items</strong> ({state.adminSearchProducts.data.data.length}),&nbsp;
      <strong>Items</strong> ({state.adminSearchProducts.data.meta.items})
    </div>
  }

  const renderList = () => {
    if (!state.adminSearchProducts.data) {
      return null
    }
    return (
      <>
        {paginationDetail()}
        <ul className="list-group">
          {state.adminSearchProducts.data.data.map((product, index) => (
            <li key={index} className="list-group-item home-item">
              <a
                href={`/admin/products/${product.slug}`}
                className="product-page-link"
              >
                <strong>Name:</strong> ({product.name}),&nbsp;
                <strong>Price:</strong> ({product.price}),&nbsp;
                <strong>Units:</strong> ({product.units}),&nbsp;
                <strong>Weight:</strong> ({product.weight}),&nbsp;
                <strong>Created At:</strong> ({parseDate(product.createdAt)}),&nbsp;
                <strong>Updated At:</strong> ({parseDate(product.updatedAt)})
              </a>
            </li>
          ))}
        </ul>
        {paginationDetail()}
      </>
    )
  }

  if (state.adminAuth.loading || state.adminSearchProducts.loading) {
    return (
      <div className="container dashboard-products-container text-center">
        <Helmet>
          <title>View Products - {adminDashboardTitle}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container-fluid dashboard-products-container">
      <Helmet>
        <title>View Products - {adminDashboardTitle}</title>
      </Helmet>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">View Products</h1>
      </div>
      
      <div className="row">

        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header">
              <div className="float-start">
                {pagination()}
              </div>
              <div className="row float-end query-form-container">
                <form
                  className="float-end"
                  onSubmit={onQueryFormSubmit}
                >
                  <label htmlFor="query">
                    <strong>Search:</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control query-input"
                    name="query"
                    value={query}
                    onChange={handleQueryChange}
                  />
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Submit"
                  />
                  <FaWindowClose
                    className="reset-query-form-icon"
                    onClick={resetQueryForm}
                  />
                </form>
              </div>
            </div>
            <div className="card-body">
              {renderList()}
            </div>
            <div className="card-footer">{pagination()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
