import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function RecipeCard(props) {
  let {id, imageUrl, title, site, author, ownership, url} = props
  author = author.split('.')[0]
  return (
    <Card raised as={Link} to={`/singleRecipe/${id}`}>
      <img
        src={imageUrl}
        style={{
          width: 'auto',
          height: '230px',
          objectFit: 'cover'
        }}
      />
      <Card.Content>
        <Card.Header>
          <div className="recipe-card-title">{title}</div>
        </Card.Header>
        <Card.Meta>
          <span className="recipe-card-caption">by {site}</span>
        </Card.Meta>
        {ownership ? (
          <Card.Description textAlign="right">
            <span className="recipe-card-saved-status">Saved!</span>
          </Card.Description>
        ) : null}
      </Card.Content>
    </Card>
  )
}
