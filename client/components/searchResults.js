/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {
  getSearchedByTitleStatic,
  getSearchedPageRecipes,
  getSearchedCount,
  getUserRecipes
} from '../store/recipes'
import {Card, Pagination} from 'semantic-ui-react'
import {RecipeCard} from './index'
import history from '../history'
import {animateScroll as scroll} from 'react-scroll'

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: this.props.match.params.pageNum
        ? this.props.match.params.pageNum
        : 1
    }
    this.paginationClick = this.paginationClick.bind(this)
  }

  paginationClick(event, data) {
    this.setState({activePage: data.activePage}, this.updatePage)
  }

  updatePage = () => {
    let searchQuery = this.props.location.search.slice(1)
    scroll.scrollToTop()
    setTimeout(() => {
      history.push(
        `/searchResults/page/${this.state.activePage}?${searchQuery
          .split('%20')
          .join(' ')}`
      )
    }, 800)
  }

  componentDidMount() {
    let pageNum = this.props.match.params.pageNum
      ? this.props.match.params.pageNum
      : 1
    let searchQuery = this.props.location.search.slice(1)
    this.props.getSearchedByTitleStatic(searchQuery)
    this.props.getSearchedPageRecipes(searchQuery, pageNum)
    this.props.getSearchedCount(searchQuery)
    this.props.getUserRecipes()
  }

  render() {
    let searchQuery = this.props.location.search.slice(1)
    const pageNum = this.props.match.params.pageNum
      ? this.props.match.params.pageNum
      : 1
    const {
      searchedByTitleStatic,
      userRecipes,
      searchedPageRecipes,
      searchedRecipeCount
    } = this.props
    let recipes = searchedPageRecipes
    if (recipes.length && userRecipes.length) {
      for (let i = 0; i < recipes.length; i++) {
        let curId = recipes[i].id
        if (userRecipes.find(userRecipe => userRecipe.id === curId)) {
          recipes[i].ownership = true
        }
      }
    }
    let totalCount = null
    if (searchedRecipeCount && searchedRecipeCount.searchedRecipeCount > -1)
      totalCount = searchedRecipeCount.searchedRecipeCount
    console.log('here', totalCount)

    return (
      <div className="search-results-container">
        <div className="all-recipes">
          {!recipes.length && userRecipes.length && !totalCount ? (
            <h1 className="search-results-header">
              <span className="bold">No recipes match the term: </span>
              {searchQuery.split('%20').join(' ')}
            </h1>
          ) : (
            <div>
              <div className="recipe-box-category-section">
                <h2 className="search-results-header">
                  <span className="bold">Recipes Matching: </span>
                  {searchQuery.split('%20').join(' ')}
                </h2>
                {totalCount === 1 ? (
                  <h4 className="recipe-box-category-count">
                    {totalCount} recipe
                  </h4>
                ) : (
                  <h4 className="recipe-box-category-count">
                    {totalCount} recipes
                  </h4>
                )}
              </div>
              <div className="category-cards">
                <Card.Group>
                  {recipes.map(recipe => (
                    <RecipeCard key={recipe.id} {...recipe} />
                  ))}
                </Card.Group>
              </div>
              <div className="pagination-container">
                <div>
                  <p className="pagination-label">
                    <span className="bold">
                      {pageNum * 24 - 23} -{' '}
                      {totalCount && pageNum * 24 > totalCount
                        ? totalCount
                        : pageNum * 24}
                    </span>{' '}
                    of <span className="bold">{totalCount} </span>
                    Results
                  </p>
                  <Pagination
                    defaultActivePage={pageNum}
                    totalPages={totalCount && Math.ceil(totalCount / 24)}
                    onPageChange={this.paginationClick}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchedByTitleStatic: state.recipes.searchedByTitleStatic,
  userRecipes: state.recipes.userRecipes,
  searchedPageRecipes: state.recipes.searchedPageRecipes,
  searchedRecipeCount: state.recipes.searchedRecipeCount
})

const mapDispatchToProps = dispatch => ({
  getSearchedByTitleStatic: searchQuery => {
    dispatch(getSearchedByTitleStatic(searchQuery))
  },
  getSearchedPageRecipes: (searchQuery, pageNum) => {
    dispatch(getSearchedPageRecipes(searchQuery, pageNum))
  },
  getSearchedCount: searchQuery => {
    dispatch(getSearchedCount(searchQuery))
  },
  getUserRecipes: () => {
    dispatch(getUserRecipes())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
