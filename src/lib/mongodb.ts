import { MongoClient, MongoClientOptions } from "mongodb";

const MONGODB_URI_ENV = process.env.MONGODB_URI;
const mongoClientOptions: MongoClientOptions = {
  appName: "peafield-dev",
};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  if (!MONGODB_URI_ENV) {
    throw new Error(
      'Invalid/Missing environment variable: "MONGODB_URI". Please ensure it is set in your environment.'
    );
  }

  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(MONGODB_URI_ENV, mongoClientOptions);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    return globalWithMongo._mongoClientPromise;
  } else {
    if (!clientPromise) {
      client = new MongoClient(MONGODB_URI_ENV, mongoClientOptions);
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

export default getClientPromise;