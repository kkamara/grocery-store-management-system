import React, { useEffect, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import ReactPaginate from "react-paginate"
import { Helmet, } from "react-helmet"
import { getUsers, } from "../../redux/actions/usersActions"
import Error from "../layouts/Error"
import { parseDate, } from "../../utils/date"

import "./HomeComponent.scss"

export default function HomeComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    users: state.users,
  }))

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const handlePageChange = ({ selected, }) => {
    const newPage = selected + 1
    if (newPage > state.users.data.meta.pages) {
      return
    }
    dispatch(getUsers(newPage))
  }

  const pagination = () => {
    if (!state.users.data) {
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
      pageCount={state.users.data.meta.pages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName="pagination"
      activeClassName="active"
      forcePage={state.users.data.meta.currentPage - 1}
    />
  }

  const paginationDetail = () => {
    return <div className="text-center">
      <strong>Page</strong> ({state.users.data.meta.currentPage}),&nbsp;
      <strong>Page Count</strong> ({state.users.data.meta.pages}),&nbsp;
      <strong>Displayed Items</strong> ({state.users.data.data.length}),&nbsp;
      <strong>Items</strong> ({state.users.data.meta.items})
    </div>
  }

  const renderList = () => {
    if (!state.users.data) {
      return null
    }
    return (
      <>
        {paginationDetail()}
        <ul className="list-group">
          {state.users.data.data.map((user, index) => (
            <li key={index} className="list-group-item home-item">
              <strong>name</strong> ({user.firstName} {user.lastName}),&nbsp;
              <strong>email</strong> ({user.email}),&nbsp;
              <strong>created_at</strong> ({parseDate(user.createdAt)}),&nbsp;
              <strong>updated_at</strong> ({parseDate(user.updatedAt)})
            </li>
          ))}
        </ul>
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
    !state.users.loading &&
    typeof state.users.data === "object" &&
    null !== state.users.data
  ) {
    console.log("users", state.users.data)
  }
  if (state.auth.loading || state.users.loading) {
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
      <Error error={state.auth.error || state.users.error}/>
      <div className="text-center">
        <button className="btn btn-primary home-button">
          Test Button
        </button>
      </div>
      <br />
      <br />
      {pagination()}
      {renderList()}
      {pagination()}
    </div>
  )
}
