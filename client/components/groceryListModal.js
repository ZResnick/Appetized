import React from 'react'
import {Button, Modal} from 'semantic-ui-react'

const GroceryModal = props => (
  <Modal trigger={<Button>YOUR GROCERY LIST</Button>}>
    <Modal.Header>Your Grocery List</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        {!props.ingredients ? (
          <div>
            It doesn't look like you have any ingredients in your grocery list
            yet.
          </div>
        ) : (
          props.ingredients.map(ing => {
            return <div key={ing.id}>ing</div>
          })
        )}
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default GroceryModal
