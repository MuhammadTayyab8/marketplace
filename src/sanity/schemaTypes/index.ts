import { type SchemaTypeDefinition } from 'sanity'
import Products from './products'
import customer from './customer'
import order from './order'
import shipment from './shipment'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Products, customer, order, shipment],
}
