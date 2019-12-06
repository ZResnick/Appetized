import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {addNewRecipe} from '../store/recipes'
import {Form, Menu, Image} from 'semantic-ui-react'
// import {Form, Dropdown, Menu, Image} from 'semantic-ui-react'
import {Dropdown} from './index'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit() {
    event.preventDefault()
    let temp = this.state.url
    this.setState({
      url: ''
    })
    this.props.addNewRecipe(temp)
  }

  render() {
    const {isLoggedIn, handleClick, firstName, lastName, imageUrl} = this.props

    const trigger = (
      <span>
        <Image avatar src={imageUrl} />
        {`Hi, ${firstName}`}
        {'    '}
      </span>
    )

    return (
      <div className="mainNav">
        <div className="left-side-of-navbar">
          <div>
            <Link to={isLoggedIn ? '/allRecipes' : '/home'}>
              <h1 className="navbar-main-title">Appetized</h1>
            </Link>
          </div>
          <div className="add-recipe-nav-form">
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label htmlFor="url"></label>
                <input
                  placeholder="Add a recipe URL here"
                  type="text"
                  name="url"
                  value={this.state.url}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </div>
        </div>
        <div>
          <div className="main-nav-dropdown">
            <Dropdown />
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    imageUrl: state.user.imgUrl
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    addNewRecipe: url => {
      dispatch(addNewRecipe(url))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
