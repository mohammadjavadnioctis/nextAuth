import { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'
import clientPromise from '../../../lib/mongodb'




type Props = {}

export default async function signIn(req: NextApiRequest , res:NextApiResponse ) {
     const db = (await clientPromise).db()
     const query = await req.body
    //  const respnse = await db.collection('firstCollection').insertOne({title: query})
    const data = await db.collection('users').find().toArray()
    // console.log('data is :', data)
    //  console.log('this si the db: ' , db)
    //  console.log('here is the response',respnse)

    res.status(200).json({
        // data: await db.collection('users').findOne({id: data?.insertedId}),
        message:'data added succesfully'
    })

   
}

