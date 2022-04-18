import { GetServerSideProps } from "next"
import { getProviders, signIn } from "next-auth/react"
import { getCsrfToken } from "next-auth/react"
import React from "react"

export default function SignIn({ providers, csrfToken, fetched } : any) {

  const handleClick = (e: React.MouseEvent) =>{
    e.preventDefault()
    
  }

  return (
    <>
    <h1>here is the data from the database  </h1>
      {/* {Object.values(providers).map((provider) => (
        <div key={provider.name}> how you doing
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))} */}
      <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email address
        <input type="email" id="email" name="email" />
      </label>
      <button type="submit" onClick={handleClick}>Sign in with Email</button>
    </form>
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps: GetServerSideProps = async (context ) => {
// const fetched = await fetch('/api/authentication/signIn/')
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  console.log( "this is the providers from getServersideProps", providers )
  return {
    props: { providers, csrfToken}
  }
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async () => {
  return {
    providers: await getProviders()
  }
}
*/