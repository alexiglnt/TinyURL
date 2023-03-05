import * as redis from 'redis';
import { NextApiRequest, NextApiResponse } from 'next';

// This is the function that will be called when the API endpoint is called
export default async function Redirect(req: NextApiRequest, res: NextApiResponse) {

  // Create a Redis client
  const client = redis.createClient({
    url: 'redis://default:redispw@127.0.0.1:32768'
  });

  // Connect to Redis
  client.connect()
    .then(() => {
      console.log('Connected to Redis');
    });

  if (req.method === 'GET') {
    // On récupère l'identifiant de l'URL
    const { id } = req.query;

    // On récupère la valeur associée à la clé
    const value = await client.get(id as string);

    // On vérifie si la valeur existe et on redirige vers l'URL si c'est le cas
    if (value) { res.redirect(value); }
    else { res.status(404).json({ error: 'URL not found' }); }
  }
}