import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, } from '../env'
import dotenv from 'dotenv'

dotenv.config();


export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
  console.error("SANITY_API_TOKEN is not set in the environment variables");
}
