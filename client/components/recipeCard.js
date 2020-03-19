import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function RecipeCard(props) {
  let {id, imageUrl, title, site, author, ownership, url} = props
  author = author.split('.')[0]
  return (
    <Card raised as={Link} to={`/singleRecipe/${id}`}>
      {/* <Image src={imageUrl} wrapped ui={false} /> */}
      <img src={imageUrl} height={200} position="relative" overflow="hidden" />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className="date">Original recipe by {author}</span>
        </Card.Meta>
        {ownership ? <Card.Description>Saved!</Card.Description> : null}
      </Card.Content>
    </Card>
  )
}
