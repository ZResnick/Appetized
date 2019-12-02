import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleRecipe} from '../store/recipes'

export class SingleRecipe extends Component {
  componentDidMount() {
    this.props.getSingleRecipe(this.props.match.params.id)
  }

  render() {
    let recipe
    if (this.props.recipe.length) recipe = this.props.recipe[0]
    return !recipe ? (
      <div>
        <h1>Loading</h1>
      </div>
    ) : (
      <div>
        <h1>{recipe.title}</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recipe: state.recipes.single
})

const mapDispatchToProps = dispatch => ({
  getSingleRecipe: id => {
    dispatch(getSingleRecipe(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe)
