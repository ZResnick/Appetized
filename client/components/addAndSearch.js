import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSearchedByTitle} from '../store/recipes'
import {Form, Dropdown, Menu, Image, Icon} from 'semantic-ui-react'
import AddRecipeModal from './addRecipeModal'

export class AddAndSearch extends Component {
  render() {
    return (
      <div className="add-and-search">
        <AddRecipeModal />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchedByTitle: state.recipes.searchedByTitle
})

const mapDispatchToProps = dispatch => {
  return {
    getSearchedByTitle: searchQuery => {
      dispatch(getSearchedByTitle(searchQuery))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAndSearch)
