/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {getSearchedByTitleStatic, getUserRecipes} from '../store/recipes'
import {Card} from 'semantic-ui-react'
import {RecipeCard} from './index'

class SearchResults extends React.Component {
  componentDidMount() {
    let searchQuery = this.props.location.search.slice(1)
    this.props.getSearchedByTitleStatic(searchQuery)
    this.props.getUserRecipes()
  }

  render() {
    let searchQuery = this.props.location.search.slice(1)
    const {searchedByTitleStatic, userRecipes} = this.props
    let recipes = searchedByTitleStatic
    if (recipes.length && userRecipes.length) {
      for (let i = 0; i < recipes.length; i++) {
        let curId = recipes[i].id
        if (userRecipes.find(userRecipe => userRecipe.id === curId)) {
          recipes[i].ownership = true
        }
      }
    }
    return (
      <div className="search-results-container">
        <div className="all-recipes">
          {!recipes.length && userRecipes.length ? (
            <h1>
              No recipes match the term: {searchQuery.split('%20').join(' ')}
            </h1>
          ) : (
            <div>
              <div className="recipe-box-category-section">
                <h2 className="recipe-box-category">
                  Recipes Matching: {searchQuery.split('%20').join(' ')}
                </h2>
                {recipes.length === 1 ? (
                  <h4 className="recipe-box-category-count">
                    {recipes.length} recipe
                  </h4>
                ) : (
                  <h4 className="recipe-box-category-count">
                    {recipes.length} recipes
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
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchedByTitleStatic: state.recipes.searchedByTitleStatic,
  userRecipes: state.recipes.userRecipes
})

const mapDispatchToProps = dispatch => ({
  getSearchedByTitleStatic: searchQuery => {
    dispatch(getSearchedByTitleStatic(searchQuery))
  },
  getUserRecipes: () => {
    dispatch(getUserRecipes())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
