import { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'
import { connectToDatabase } from '../../../lib/mongodb'




type Props = {}

export default async function signIn(req: NextApiRequest , res:NextApiResponse ) {
     const {db} = await connectToDatabase()
     console.log('this si the db: ' , db)
    const response = { hi: 'john' }

    res.json(req.query)

   
}

