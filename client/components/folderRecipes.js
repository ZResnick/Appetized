/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {getSingleFolder} from '../store/folders'
import {Card, Pagination} from 'semantic-ui-react'
import {RecipeCard} from './index'
import history from '../history'
import {animateScroll as scroll} from 'react-scroll'

class FolderRecipes extends React.Component {
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
    let pathnameArr = this.props.location.pathname.split('/')
    let id = pathnameArr[pathnameArr.length - 3]
    setTimeout(() => {
      history.push(`/recipeBox/folder/${id}/page/${this.state.activePage}`)
    }, 800)
  }

  componentDidMount() {
    let pathnameArr = this.props.location.pathname.split('/')
    let id = pathnameArr[pathnameArr.length - 3]
    this.props.getSingleFolder(id)
  }

  render() {
    const pageNum = this.props.match ? this.props.match.params.pageNum : 1
    let recipes, folder, totalCount, start, end

    if (this.props.folder) {
      if (this.props.folder.length) {
        folder = this.props.folder[0]
        recipes = this.props.folder[0].recipes
        if (recipes.length > 1 && recipes[0].createdAt < recipes[1].createdAt)
          recipes.reverse() //so that the most recently added appear first
        totalCount = recipes.length
        start = (pageNum - 1) * 15
        end = pageNum * 15
        recipes = recipes.slice(start, end)
      }
    }
    return (
      <div className="saved-recipes">
        {!recipes ? (
          <h1 className="bold search-results-header">
            It doesn't look like you have any recipes in this folder yet. Try
            adding one by clicking on the dropdown menu next to the 'Saved'
            button on the recipe's page!
          </h1>
        ) : recipes.length ? (
          <div>
            <div className="recipe-box-category-section">
              <h2 className="recipe-box-category">{folder.title}</h2>
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
        ) : (
          <h1 className="no-recipes-message">
            It doesn't look like you have any recipes in this folder yet. Try
            adding one by clicking on the dropdown menu next to the 'Saved'
            button on a recipe's page!
          </h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  folder: state.folders.singleFolder
})

const mapDispatchToProps = dispatch => ({
  getSingleFolder: id => {
    dispatch(getSingleFolder(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FolderRecipes)
