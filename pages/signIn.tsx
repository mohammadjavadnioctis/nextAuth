import { GetServerSideProps } from "next"
import { getProviders, signIn } from "next-auth/react"
import { getCsrfToken } from "next-auth/react"
import React, { useState } from "react"
import { useRouter } from "next/router"

export default function SignIn({ providers, csrfToken, fetched } : any) {
  const [ countryCodevalue, setCountryCode ] = useState<string>()
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>()
    const router = useRouter()



    const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
      console.log('this is the country code',e.target.value)
      setCountryCode(e.target.value)
    }
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
      console.log('this is the pohone number:', e.target.value)
      setPhoneNumberValue(e.target.value)
    }


  const handleSubmit = async (e: React.FormEvent, csrfToken: string, countryCode?: string, PhoneNo?: string) => {
     

    e.preventDefault()
    console.log( 'this are values bitch','the CountryCode is ' ,countryCodevalue , 'the phone number is hte : ', phoneNumberValue )
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        csrfToken:  csrfToken,
        countryCode: countryCodevalue,
        PhoneNo: phoneNumberValue })
  };
   const data = await fetch(('/api/auth/callback/loginWithPhoneId'), requestOptions)
    router.push(data.url)

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
      <form method="post" action="" onSubmit={(e) => handleSubmit(e, csrfToken)}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Country Code
        <input name="countryCode" type="text" onChange={handleCountryCodeChange}/>
      </label>
      <label>
        Phone Number
        <input name="PhoneNo" type="tel" onChange={handlePhoneNumberChange}/>
      </label>
      <button type="submit">Sign in</button>
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