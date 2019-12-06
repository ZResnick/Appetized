import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleRecipe} from '../store/recipes'

export class SingleRecipe extends Component {
  componentDidMount() {
    this.props.getSingleRecipe(this.props.match.params.id)
  }

  render() {
    let recipe = undefined
    if (this.props.recipe) {
      if (this.props.recipe.length) recipe = this.props.recipe[0]
    }

    return (
      <div>
        {!recipe ? (
          <div>
            <h1>There doesn't seem to be anything here...</h1>
          </div>
        ) : (
          <div>
            <div
              className="single-recipe-image"
              style={{backgroundImage: `url(${recipe.imageUrl})`}}
            >
              <div className="recipe-title-div">
                <h1 className="recipe-title">{recipe.title}</h1>
              </div>
            </div>
          </div>
        )}
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
