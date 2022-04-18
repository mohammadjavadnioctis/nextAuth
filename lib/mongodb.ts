// // This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, MongoClientOptions } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {
  
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise : Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local")
}


if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // @ts-ignore
  if (!global._mongoClientPromise) {
// @ts-ignore
    client = new MongoClient(uri as string, options)
        // @ts-ignore
    global._mongoClientPromise = client.connect()
  }
      // @ts-ignore

  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
      // @ts-ignore

  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise




// libs/mongodb.js

// import { Db, MongoClient } from "mongodb";

// const MONGODB_URI = process.env.MONGODB_URI;

// // check the MongoDB URI
// if (!MONGODB_URI) {
//   throw new Error("Define the MONGODB_URI environmental variable");
// }

// let cachedClient: MongoClient;
// let cachedDb : any;

// export async function connectToDatabase() {
//   // check the cached.
//   if (cachedClient && cachedDb) {
//     // load from cache
//     return {
//       client: cachedClient,
//       db: cachedDb,
//     };
//   }

//   // Connect to cluster
//   let client = new MongoClient(MONGODB_URI as string ) ;
//   await client.connect();
//   let db = client.db();

//   // set cache
//   cachedClient = client;
//   cachedDb = db;

//   return {
//     client: cachedClient,
//     db: cachedDb,
//   };
// }
