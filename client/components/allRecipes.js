/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {getRecipes, getUserRecipes} from '../store/recipes'
import {Card} from 'semantic-ui-react'
import {RecipeCard} from './index'

class AllRecipes extends React.Component {
  componentDidMount() {
    this.props.getRecipes()
    this.props.getUserRecipes()
  }

  render() {
    const {recipes, userRecipes} = this.props
    if (recipes.length && userRecipes.length) {
      for (let i = 0; i < recipes.length; i++) {
        let curId = recipes[i].id
        if (userRecipes.find(userRecipe => userRecipe.id === curId)) {
          recipes[i].ownership = true
        }
      }
    }
    // recipes.length && userRecipes.length && console.log(recipes, userRecipes)

    return (
      <div className="all-recipes">
        {!recipes.length && userRecipes.length ? (
          <h1>It doesn't look like you have any recipes.</h1>
        ) : (
          <div>
            <Card.Group centered>
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </Card.Group>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.all,
  userRecipes: state.recipes.userRecipes
})

const mapDispatchToProps = dispatch => ({
  getRecipes: () => {
    dispatch(getRecipes())
  },
  getUserRecipes: () => {
    dispatch(getUserRecipes())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes)
