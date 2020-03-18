/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {getUserRecipes} from '../store/recipes'
import {Card} from 'semantic-ui-react'
import {RecipeCard} from './index'

class UserRecipes extends React.Component {
  componentDidMount() {
    this.props.getUserRecipes()
  }

  render() {
    const {recipes} = this.props

    return (
      <div className="saved-recipes">
        {!recipes.length ? (
          <h1>It doesn't look like you have any recipes.</h1>
        ) : (
          <div>
            <div className="recipe-box-category-section">
              <h2 className="recipe-box-category">Saved Recipes</h2>
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
