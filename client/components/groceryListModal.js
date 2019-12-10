import React from 'react'
import {Button, Modal} from 'semantic-ui-react'

const GroceryModal = props => (
  <Modal trigger={<Button>YOUR GROCERY LIST</Button>}>
    <Modal.Header>Your Grocery List</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        {!props.ingredients ? (
          <div>
            <h3 className="build-list">Build Your Grocery List</h3>
            <p className="build-list-caption">
              Add recipes you plan to cook. Adjust what you need to buy, then
              export your list.
            </p>
          </div>
        ) : (
          props.ingredients.map(ing => {
            return <div key={ing.id}>{ing.title}</div>
          })
        )}
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default GroceryModal
