// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewResponse } from '@/models/Article'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const searchQuery = req.query.q?.toString()



  if(!searchQuery){
    return res.status(400).json({ error: "Please provide a search term"})
  }


  const response = await fetch( `https://content.guardianapis.com/search?q=${searchQuery}&show-fields=thumbnail&api-key=${process.env.API_KEY}`)
  const newResponse: NewResponse = await response.json()
  
  res.status(200).json(newResponse.response.results)
}
