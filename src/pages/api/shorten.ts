import * as redis from 'redis';
import { NextApiRequest, NextApiResponse } from 'next'
import ShortUniqueId from 'short-unique-id';

async function tinyURLNumberAI(url : string) {

  let sizeDatabase = await client.dbSize();
  const shortUrl = (sizeDatabase + 1).toString();

  // clé = shortURl et valeur = longUrl
  let cle_valeur = {
    longUrl: url,
    shortUrl: shortUrl,
    newUrl: `http://localhost:3000/${shortUrl}`
  };

  console.log("url avant/apres : ", "", cle_valeur);

  await client.set(shortUrl, url);
  console.log("url dans redis : ", await client.get(shortUrl));
  console.log("taille bdd : ", await client.dbSize());

  return cle_valeur;

}

async function tinyURL(url : string) {

  let cpt = 4;

  // reduire l'url
  const uid = new ShortUniqueId();
  let shortUrl = uid.randomUUID(cpt);

  while(await client.get(shortUrl)) {
    cpt++;
    shortUrl = uid.randomUUID(cpt);
  }

  // clé = shortURl et valeur = longUrl
  let cle_valeur = {
    longUrl: url,
    shortUrl: shortUrl,
    newUrl: `http://localhost:3000/${shortUrl}`
  };

  console.log("url avant/apres : ", "", cle_valeur);

  await client.set(shortUrl, url);
  console.log("url dans redis : ", await client.get(shortUrl));
  console.log("taille bdd : ", await client.dbSize());

  return cle_valeur;

}

// Create a Redis client
const client = redis.createClient({
  url: 'redis://default:redispw@127.0.0.1:32768'
});

// Connect to Redis
client.connect()
  .then(() => {
    console.log('Connected to Redis');
    // //generate a random number
    // const random = Math.floor(Math.random() * 1000000);
    // //generate a random url
    // const url = 'https://www.google.com/search?q=' + random;
    // //convert the random number to a key
    // const key = random.toString();
    // //convert the url to a value
    // const value = url.toString();
    // //set the random number as the key and the url as the value
    // client.set(key, value);

    // //get the key
    // console.log(client.get(key));
    // console.log('Key: ' + key);

    // //get the url
    // getURL();


    async function getURL() {
      const url = await client.get("name");
      console.log(url);
    }

  });

// This is the function that will be called when the API endpoint is called
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  // Return an empty response with a 200 OK status
  // res.status(200).json(req.body)

  if (req.method === 'POST') {
    // Handle POST request
    let result = await tinyURL(req.body.longUrl);
    console.log("result : ", result);
    
    res.status(200).json(result.newUrl); 
  }

}