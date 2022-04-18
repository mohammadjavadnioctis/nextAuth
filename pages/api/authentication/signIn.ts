import { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'
import { connectToDatabase } from '../../../lib/mongodb'




type Props = {}

export default async function signIn(req: NextApiRequest , res:NextApiResponse ) {
     const {db} = await connectToDatabase()
     const query = await req.body
     console.log('thisis the query : ', req.body)
    //  const respnse = await db.collection('firstCollection').insertOne({title: query})
    

    //  console.log('this si the db: ' , db)
    //  console.log('here is the response',respnse)

    res.status(200).json({
        // data: await db.collection('firstCollection').findOne({id: respnse?.insertedId}),
        message:'data added succesfully'
    })

   
}

