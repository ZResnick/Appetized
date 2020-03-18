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
            <h3>Saved Recipes</h3>
            <Card.Group>
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
  recipes: state.recipes.userRecipes
})

const mapDispatchToProps = dispatch => ({
  getUserRecipes: () => {
    dispatch(getUserRecipes())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes)
