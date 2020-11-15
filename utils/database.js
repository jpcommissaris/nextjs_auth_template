import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
import {MONGO} from '../config'


const client = new MongoClient(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('blog_prj');
  return next();
}

const dbconnect = nextConnect();

dbconnect.use(database);

export default dbconnect;