import React from "react"

function Footer() {
  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright &copy; {process.env.REACT_APP_NAME} 2025</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
