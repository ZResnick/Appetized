/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {getPageRecipes, getUserRecipes, getTotalCount} from '../store/recipes'
import {Card, Pagination} from 'semantic-ui-react'
import {RecipeCard} from './index'
import history from '../history'
import {animateScroll as scroll} from 'react-scroll'

class AllRecipes extends React.Component {
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
    scroll.scrollToTop()
    setTimeout(() => {
      history.push(`/allRecipes/${this.state.activePage}`)
    }, 800)
  }

  componentDidMount() {
    this.props.getPageRecipes(
      this.props.match.params.pageNum ? this.props.match.params.pageNum : 1
    )
    this.props.getUserRecipes()
    this.props.getTotalCount()
  }

  render() {
    const pageNum = this.props.match.params.pageNum
      ? this.props.match.params.pageNum
      : 1
    const {userRecipes, pageRecipes, totalCount} = this.props
    let recipes = pageRecipes
    if (recipes.length && userRecipes.length) {
      for (let i = 0; i < recipes.length; i++) {
        let curId = recipes[i].id
        if (userRecipes.find(userRecipe => userRecipe.id === curId)) {
          recipes[i].ownership = true
        }
      }
    }
    return (
      <div className="all-recipes">
        {!recipes.length && userRecipes.length && totalCount ? (
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
        <div className="pagination-container">
          <div>
            <p className="pagination-label">
              <span className="bold">
                {pageNum * 24 - 23} -{' '}
                {totalCount && pageNum * 24 > totalCount.recipeCount
                  ? totalCount.recipeCount
                  : pageNum * 24}{' '}
              </span>
              of{' '}
              <span className="bold">
                {totalCount && totalCount.recipeCount}{' '}
              </span>
              Recipes
            </p>
            <Pagination
              defaultActivePage={pageNum}
              totalPages={totalCount && Math.ceil(totalCount.recipeCount / 24)}
              onPageChange={this.paginationClick}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userRecipes: state.recipes.userRecipes,
  pageRecipes: state.recipes.pageRecipes,
  totalCount: state.recipes.totalCount
})

const mapDispatchToProps = dispatch => ({
  getUserRecipes: () => {
    dispatch(getUserRecipes())
  },
  getPageRecipes: pageNum => {
    dispatch(getPageRecipes(pageNum))
  },
  getTotalCount: () => {
    dispatch(getTotalCount())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes)
