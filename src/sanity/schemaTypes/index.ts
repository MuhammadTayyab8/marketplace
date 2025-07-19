import { type SchemaTypeDefinition } from 'sanity'
import Products from './products'
import customer from './customer'
import order from './order'
import shipment from './shipment'
import user from './user'
import reviews from './reviews'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Products, user, order, shipment, reviews],
}
