import React from 'react'
import {Link} from 'react-router-dom'

export default function Error404Page() {
  return (
    <div className="error-404-container">
      <h1 className="error-page-title">OOPS! THAT PAGE CANNOT BE FOUND</h1>
      <h1 className="error-page-404">404</h1>
      <Link to="/">
        <button type="button" className="add-recipe-modal-button">
          <h3 className="error-page-button">RETURN TO HOMEPAGE</h3>
        </button>
      </Link>
    </div>
  )
}
