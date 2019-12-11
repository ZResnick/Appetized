import React from 'react'
import {Button, Modal, Icon} from 'semantic-ui-react'
import {getGroceryList, removeIngredient} from '../store/groceryList'
import {connect} from 'react-redux'

class GroceryModal extends React.Component {
  componentDidMount() {
    this.props.getGroceryList()
  }

  render() {
    let ingredients = null
    if (this.props.groceryList) {
      if (this.props.groceryList.ingredients) {
        if (this.props.groceryList.ingredients.length)
          ingredients = this.props.groceryList.ingredients
      }
    }

    return (
      <Modal size="small" trigger={<Button>YOUR GROCERY LIST</Button>}>
        <Modal.Header>
          <h5 className="grocery-modal-header">Your Grocery List</h5>
        </Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            {!ingredients ? (
              <div>
                <h3 className="build-list">Build Your Grocery List</h3>
                <p className="build-list-caption">
                  Add recipes you plan to cook. Adjust what you need to buy,
                  then export your list.
                </p>
              </div>
            ) : (
              ingredients.map(ing => {
                return (
                  <div className="grocery-ingredient" key={ing.id}>
                    <h5>{ing.title}</h5>
                    <Icon
                      size="large"
                      name="delete"
                      className="grocery-delete-icon"
                      onClick={() => this.props.removeIngredient(ing.id)}
                    ></Icon>
                  </div>
                )
              })
            )}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    groceryList: state.groceryList.ingredients
  }
}

const mapDispatch = dispatch => {
  return {
    getGroceryList: () => {
      dispatch(getGroceryList())
    },
    removeIngredient: id => {
      dispatch(removeIngredient(id))
    }
  }
}

export default connect(mapState, mapDispatch)(GroceryModal)
