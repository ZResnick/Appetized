import React from 'react'
import {Button, Modal, Icon} from 'semantic-ui-react'
import {getGroceryList, removeIngredient, checkout} from '../store/groceryList'
import {connect} from 'react-redux'

class GroceryModal extends React.Component {
  constructor() {
    super()
    this.state = {
      emailSent: false
    }
    this.checkoutClick = this.checkoutClick.bind(this)
  }

  componentDidMount() {
    this.props.getGroceryList()
  }

  checkoutClick() {
    this.props.checkout()
    this.setState({emailSent: true})
    setTimeout(() => {
      this.setState({emailSent: false})
    }, 4000)
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
      <Modal
        size="small"
        trigger={<h1 className="grocery-list-navbar">YOUR GROCERY LIST</h1>}
      >
        <Modal.Header>
          <h5 className="grocery-modal-header">Your Grocery List</h5>
        </Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            {this.state.emailSent ? (
              <div>
                <h3 className="build-list">
                  {`An email with your grocery list has been sent to ${this.props.email}`}
                </h3>
              </div>
            ) : !ingredients ? (
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
        {!this.state.emailSent && ingredients ? (
          <Modal.Actions>
            <Button onClick={this.checkoutClick} color="teal">
              <Icon name="mail" /> Email Yourself Your Grocery List
            </Button>
          </Modal.Actions>
        ) : null}
      </Modal>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    groceryList: state.groceryList.ingredients,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    getGroceryList: () => {
      dispatch(getGroceryList())
    },
    removeIngredient: id => {
      dispatch(removeIngredient(id))
    },
    checkout: () => {
      dispatch(checkout())
    }
  }
}

export default connect(mapState, mapDispatch)(GroceryModal)
