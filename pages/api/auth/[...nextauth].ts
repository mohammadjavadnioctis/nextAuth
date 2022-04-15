import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { MongoClient } from 'mongodb'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
    // @ts-ignore
import clientPromise from "../../../lib/mongodb"
const options = {
  
}

export default NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID as string,
          clientSecret: process.env.GOOGLE_SECRET as string,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          },
        }),

      ],
    session:{
        strategy:'jwt'
    }
      ,
      jwt: {
          
      },
          // @ts-ignore
      adapter: MongoDBAdapter(clientPromise),

      secret: process.env.SECRET,
      callbacks: {
            async jwt({token, account, user, profile}){
                // console.log('this is toke from jwt:', token, 'this is account from jwt:', account, 'this is the user: ',user, 'this is the profile:', profile )
                if(account?.access_token){
                    token.accessToken = account.access_token
                }
                return token
            },
            //  redirect: async ({url, baseUrl}) => {
            //     if(url === './profile'){
            //         return Promise.resolve('/')
            //     }
            //     return Promise.resolve('/')
            //   }
      },
     
})

