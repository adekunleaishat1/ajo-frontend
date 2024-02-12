import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
        <div>
        <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar w/ text</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
      </ul>
      <span class="navbar-text">
      <li class="nav-item">
         <Link to="/login" className="btn btn-dark btn-sm rounded-pill px-4 border-white nav-link">Log in</Link>
        </li>
      {/* <Link to="/login" className="btn btn-dark btn-sm rounded-pill px-4 border-white">Log in</Link> */}
      <Link to="/signup" className="btn btn-light btn-sm rounded-pill"> Create an account</Link>
      </span>
    </div>
  </div>
</nav>
  
        </div>
    </div>
  )
}

export default Nav