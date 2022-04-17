import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { MongoClient } from 'mongodb'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
    // @ts-ignore
import db from "../../../lib/mongodb"
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
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: {  label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            console.log('here is the credentials :', credentials)
            const user = { id: 1, name: credentials?.username , pass: credentials?.password }
            const alreadyRegeisteredUser = { id: 1, name: 'john', email: 'john@gmail.com', pass: '123123'}
            if (user.name === alreadyRegeisteredUser.name && user.pass === alreadyRegeisteredUser.pass ) {

              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ],
    session:{
        strategy:'jwt'
    }
      ,
      jwt: {
          
      },
          // @ts-ignore
      adapter: MongoDBAdapter(db),

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

