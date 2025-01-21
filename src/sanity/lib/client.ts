import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: 'sknRDnhDNTe3faJGQr6KSay0M1AcKbz008lzWHaKj3PrMg9luYRhgf38CHsMRpTNhKp4LlD3HvNZOnA0ckmtBWQvWOqIIlJoQi8nLMTlDMD3RIiVpOcpp6FrebVOpMurS4g6cZCzypzrbiplJqWyDcz8HcjNsRPvyudXcnI72meYOjK9OUuo',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

if (!process.env.SANITY_API_TOKEN) {
  console.error("SANITY_API_TOKEN is not set in the environment variables");
}
