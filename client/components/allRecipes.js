/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getRecipes} from '../store/recipes'
import {Card, Image} from 'semantic-ui-react'
import {RecipeCard} from './index'

class AllRecipes extends React.Component {
  componentDidMount() {
    this.props.getRecipes()
  }

  render() {
    const {recipes} = this.props
    recipes.length && console.log(recipes)

    return (
      <div>
        {!recipes.length ? (
          <h1>It doesn't look like you have any recipes.</h1>
        ) : (
          <div>
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
  recipes: state.recipes.all
})

const mapDispatchToProps = dispatch => ({
  getRecipes: () => {
    dispatch(getRecipes())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes)

//<Link to={`/singleRecipe/${recipe.id}`}>
