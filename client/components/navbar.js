import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import GroceryModal from './groceryListModal'
import SearchForm from './searchForm'
import {Dropdown, Image, Icon} from 'semantic-ui-react'

class Navbar extends React.Component {
  render() {
    //The below is the code that renders the results of the search bar.
    const resultRenderer = ({title, site, imageUrl, realID, searchValue}) => {
      return realID ? (
        <Link to={`/singleRecipe/${realID}`}>
          <div className="search-recipe-container">
            <div className="search-image">
              <Image src={imageUrl} />
            </div>
            <div className="search-title-and-site">
              <span className="search-title">{title}</span>
              <br></br>
              <span className="search-site">{site}</span>
            </div>
          </div>
        </Link>
      ) : searchValue ? (
        <Link to={`/searchResults?${searchValue}`}>
          <div className="search-title-and-site">
            <span className="search-title">
              <span className="bold">See all results for: </span>
              {searchValue}
            </span>
          </div>
        </Link>
      ) : null
    }

    const {isLoggedIn, handleClick, imageUrl} = this.props

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
            <Link to={isLoggedIn ? '/allRecipes/1' : '/home'}>
              <h1 className="navbar-main-title">Appetized</h1>
            </Link>
          </div>
        </div>
        <div className="right-side-of-navbar">
          <div className="search-recipe-nav-form">
            <SearchForm resultRenderer={resultRenderer} />
          </div>
          <div className="far-right-navbar">
            <div className="grocery-list-navbar-container">
              <GroceryModal />
            </div>
            <div className="recipe-box-navbar-container">
              <Link to="/recipeBox/page/1">
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
    imageUrl: state.user.imgUrl
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
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
