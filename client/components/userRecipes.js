/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {getUserRecipes} from '../store/recipes'
import {Card, Pagination} from 'semantic-ui-react'
import {RecipeCard} from './index'
import history from '../history'
import {animateScroll as scroll} from 'react-scroll'

class UserRecipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: this.props.match ? this.props.match.params.pageNum : 1
    }
    this.paginationClick = this.paginationClick.bind(this)
  }

  paginationClick(event, data) {
    this.setState({activePage: data.activePage}, this.updatePage)
  }

  updatePage = () => {
    scroll.scrollToTop()
    setTimeout(() => {
      history.push(`/recipeBox/page/${this.state.activePage}`)
    }, 800)
  }

  componentDidMount() {
    this.props.getUserRecipes()
  }

  render() {
    const pageNum = this.props.match ? this.props.match.params.pageNum : 1
    let {recipes} = this.props
    let totalCount
    let start
    let end

    if (recipes.length) {
      // recipes.reverse() //so that the most recently added appear first
      if (recipes.length > 1 && recipes[0].createdAt < recipes[1].createdAt)
        recipes.reverse() //so that the most recently added appear first
      totalCount = recipes.length
      start = (pageNum - 1) * 15
      end = pageNum * 15
      recipes = recipes.slice(start, end)
    }

    return (
      <div className="saved-recipes">
        {!totalCount ? (
          <h1 className="no-recipes-message">
            It doesn't look like you have any recipes yet! Try adding a recipe
            using the Appetized Chrome Extension, pasting a link into the 'Add a
            New Recipe' form above, or searching for a recipe and clicking the
            'Save' button.
          </h1>
        ) : (
          <div>
            <div className="recipe-box-category-section">
              <h2 className="recipe-box-category">Saved Recipes</h2>
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
            <div className="pagination-container-recipe-box">
              <div>
                <p className="pagination-label">
                  <span className="bold">
                    {start + 1} -{' '}
                    {totalCount && pageNum * 15 > totalCount
                      ? totalCount
                      : pageNum * 15}{' '}
                  </span>
                  of <span className="bold">{totalCount && totalCount} </span>
                  Saved Recipes
                </p>
                <Pagination
                  defaultActivePage={pageNum}
                  totalPages={totalCount && Math.ceil(totalCount / 15)}
                  onPageChange={this.paginationClick}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.userRecipes
})

const mapDispatchToProps = dispatch => ({
  getUserRecipes: () => {
    dispatch(getUserRecipes())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes)
