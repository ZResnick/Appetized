import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import {Form, Icon} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="auth-form-body">
      <Link to="/home">
        <h1 className="auth-major-title">Appetized</h1>
        <text className="auth-minor-title">Get recipes, get cookin'</text>
      </Link>
      <div id="auth-form">
        <div className="form-header">{displayName}</div>
        {name === 'signup' ? (
          <Form
            onSubmit={handleSubmit}
            name={name}
            className="auth-input-fields"
          >
            <Form.Field required>
              <label htmlFor="firstName">
                <medium>First Name</medium>
              </label>
              <input
                placeholder="Type your first name here"
                name="firstName"
                type="text"
              />
            </Form.Field>
            <Form.Field required>
              <label htmlFor="lastName">
                <medium>Last Name</medium>
              </label>
              <input
                placeholder="Type your last name here"
                name="lastName"
                type="text"
              />
            </Form.Field>
            <Form.Field required>
              <label htmlFor="email">
                <medium>Email</medium>
              </label>
              <input
                placeholder="Type your email here"
                name="email"
                type="text"
              />
            </Form.Field>
            <Form.Field required>
              <label htmlFor="password">
                <medium>Password</medium>
              </label>
              <input
                placeholder="Type your password here"
                name="password"
                type="password"
              />
            </Form.Field>
            <div className="auth-submit">
              <button className="auth-submit-button" type="submit">
                {displayName.toUpperCase()}
              </button>
            </div>
            {error && error.response && (
              <div className="auth-error">{error.response.data} </div>
            )}
          </Form>
        ) : (
          <Form
            onSubmit={handleSubmit}
            name={name}
            className="auth-input-fields"
          >
            <Form.Field required>
              <label htmlFor="email">
                <medium>Email</medium>
              </label>
              <input
                placeholder="Type your email here"
                name="email"
                type="text"
              />
            </Form.Field>
            <Form.Field required>
              <label htmlFor="password">
                <medium>Password</medium>
              </label>
              <input
                placeholder="Type your password here"
                name="password"
                type="password"
              />
            </Form.Field>
            <div className="auth-submit">
              <button className="auth-submit-button" type="submit">
                {displayName.toUpperCase()}
              </button>
            </div>
            {error && error.response && (
              <div className="auth-error">{error.response.data} </div>
            )}
          </Form>
        )}
        <div className="signup-director-google">
          <a className="signup-director-text-google" href="/auth/google">
            Or {displayName.toLowerCase()} with Google {'   '}
            <Icon name="google " size="large"></Icon>
          </a>
        </div>
        <br></br>
        <div className="signup-director">
          {name === 'login' ? (
            <Link to="/signup">
              <span className="signup-director-text">
                Create an account {'  '}
                <Icon name="signup"></Icon>
              </span>
            </Link>
          ) : (
            <Link to="/login">
              <span className="signup-director-text">
                Already signed up? Login here {'   '}
                <Icon name="sign in"></Icon>
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      dispatch(auth(email, password, formName, firstName, lastName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
