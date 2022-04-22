import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// import db from "../../../lib/mongodb"
import clientPromise from '../../../lib/mongodb'

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
          id: 'loginWithGoogleId',
          name: "Credentials",
        
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: {  label: "Password", type: "password" }
          },
          
          async authorize(credentials, req) {
            console.log('here is the credentials :', credentials)
            const db =  (await clientPromise).db()
            const fetchedUser = (await db.collection('users').find({name: credentials?.username}).toArray())[0]
            
            console.log('here is the FetchedUser:', fetchedUser)
            const user = { name: credentials?.username , pass: credentials?.password }
          //@ts-ignore
            // if(credentials.csrfToken !== alreadyRegeisteredUser.csrfToken){
            //   console.log('tokens did not match')
              
           
            if (user.name === fetchedUser?.name && user.pass === fetchedUser?.password ) {

              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        }),
        CredentialsProvider({
          id:'loginWithPhoneId',
          name: "phoneNumber",
        
          credentials: {
            countryCode: { label: "countryCode", type: "tel", placeholder: "+90" },
            PhoneNo: {  label: "PhoneNo", type: "tel" }
          },
          
          async authorize(credentials, req) {
            console.log('here is the credentials :', credentials)
            console.log('here is the request:', req)
            
            const db =  (await clientPromise).db()
            const fetchedUser = (await db.collection('users').find({phoneNo: credentials?.PhoneNo}).toArray())[0]

            
            // console.log('here is the FetchedUser:', fetchedUser)
            const user = { id: 1, countryCode: credentials?.countryCode , phoneNo: credentials?.PhoneNo }
            console.log('here is the user:', user)
            console.log('here is the fetched phone  user:', fetchedUser)
          //@ts-ignore
            // if(credentials.csrfToken !== alreadyRegeisteredUser.csrfToken){
            //   console.log('tokens did not match')
              
            // }
             // }
             if(!fetchedUser){
              return null
            }
            if ( user.phoneNo == credentials?.PhoneNo, user.countryCode === fetchedUser.countryCode) {

              // Any object returned will be saved in `user` property of the JWT
              return fetchedUser
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ],
      pages: {
        signIn: '/signIn'
      },
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
            async signIn({ user, account, profile, email, credentials }) {
                console.log('user with the following credentials signed in:', user, 'accountIs:' ,account, 'profile Is : ', profile, 'email Is : ', email)
              return true
            },
      },
     
})

