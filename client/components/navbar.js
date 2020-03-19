import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import GroceryModal from './groceryListModal'
import {getSearchedByTitle} from '../store/recipes'
import {Form, Dropdown, Image, Icon} from 'semantic-ui-react'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
  }

  handleChange() {
    this.setState({[event.target.name]: event.target.value})
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
        {imageUrl !==
        'https://www.seekclipart.com/clipng/middle/105-1058558_bulldog-default-avatar-icon-clipart.png' ? (
          <Image avatar src={imageUrl} />
        ) : (
          <Icon size="big" name="user circle" />
        )}
      </span>
    )

    return (
      <div className="mainNav">
        <div className="left-side-of-navbar">
          <div className="navbar-header-div">
            <Link to={isLoggedIn ? '/allRecipes' : '/home'}>
              <h1 className="navbar-main-title">Appetized</h1>
            </Link>
          </div>
        </div>
        <div className="right-side-of-navbar">
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
          <div className="far-right-navbar">
            <div className="grocery-list-navbar-container">
              <GroceryModal />
            </div>
            <div className="recipe-box-navbar-container">
              <Link to="/recipeBox">
                <h1 className="your-recipeBox-navbar">YOUR RECIPE BOX</h1>
              </Link>
            </div>
            <div className="main-nav-dropdown-container">
              <div className="main-nav-dropdown">
                <Dropdown
                  size="massive"
                  trigger={trigger}
                  pointing
                  direction="left"
                  className="link item"
                >
                  <Dropdown.Menu>
                    <Dropdown.Header>Chrome Extension</Dropdown.Header>
                    <Dropdown.Item>
                      <a
                        href="https://chrome.google.com/webstore/detail/appetized-recipe-manager/fonefhjcpmipemnobojdmphjljlcgeia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dropdown-link"
                      >
                        Chrome Store
                      </a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <a
                        href="https://chrome.google.com/webstore/detail/appetized-recipe-manager/fonefhjcpmipemnobojdmphjljlcgeia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dropdown-link"
                      >
                        Info
                      </a>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                      <a
                        href="#"
                        onClick={handleClick}
                        className="dropdown-link"
                      >
                        Logout
                      </a>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
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
    // addNewRecipe: url => {
    //   dispatch(addNewRecipe(url))
    // },
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
