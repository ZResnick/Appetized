import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {addNewRecipe, getSearchedByTitle} from '../store/recipes'
import {Form, Dropdown, Menu, Image} from 'semantic-ui-react'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      searchQuery: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
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

  handleSubmitSearch() {
    event.preventDefault()
    let temp = this.state.searchQuery
    this.setState({
      searchQuery: ''
    })
    this.props.getSearchedByTitle(temp)
  }

  render() {
    const {
      isLoggedIn,
      handleClick,
      firstName,
      imageUrl,
      searchedByTitle
    } = this.props

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
          <div className="search-recipe-nav-form">
            <Form onSubmit={this.handleSubmitSearch}>
              <Form.Field>
                <label htmlFor="searchQuery"></label>
                <input
                  placeholder="Search recipes by title here"
                  type="text"
                  name="searchQuery"
                  value={this.state.searchQuery}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </div>
        </div>
        <div>
          <div className="main-nav-dropdown">
            <Menu>
              <Dropdown
                size="massive"
                trigger={trigger}
                pointing
                className="link item"
              >
                <Dropdown.Menu>
                  <Dropdown.Header>Categories</Dropdown.Header>
                  <Dropdown.Item>Home Goods</Dropdown.Item>
                  <Dropdown.Item>Bedroom</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Order</Dropdown.Header>
                  <Dropdown.Item>Status</Dropdown.Item>
                  <Dropdown.Item>
                    <a href="#" onClick={handleClick}>
                      Logout
                    </a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
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
    imageUrl: state.user.imgUrl,
    searchedByTitle: state.recipes.searchedByTitle
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    addNewRecipe: url => {
      dispatch(addNewRecipe(url))
    },
    getSearchedByTitle: searchQuery => {
      dispatch(getSearchedByTitle(searchQuery))
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
