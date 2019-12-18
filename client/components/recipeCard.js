import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function RecipeCard(props) {
  const {id, imageUrl, title, site, author, ownership, url} = props
  return (
    <Card raised as={Link} to={`/singleRecipe/${id}`}>
      <Image src={imageUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className="date">Original recipe by {author}</span>
        </Card.Meta>
        {ownership ? (
          <Card.Description>You have this recipe</Card.Description>
        ) : null}
      </Card.Content>
    </Card>
  )
}
