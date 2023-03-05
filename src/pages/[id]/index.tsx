import * as redis from 'redis';
import { GetServerSideProps, NextPage } from 'next';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    // Return an empty response with a 200 OK status
    // res.status(200).json(req.body)
  
    if (req.method === 'GET') {
        const client = redis.createClient({
            url: 'redis://default:redispw@127.0.0.1:32768',
        });

    

    }
  
  }








// interface ShortUrlPageProps {
//   redirectUrl: string;
// }

// const ShortUrlPage: NextPage<ShortUrlPageProps> = ({ redirectUrl }) => {
//   return (
//     <>
//       <h1>ShortUrlPage</h1>
//       <p>{redirectUrl}</p>
//     </>
//   );
// };

// export const getServerSideProps: GetServerSideProps<ShortUrlPageProps> = async (context) => {
//   const client = redis.createClient({
//     url: 'redis://default:redispw@127.0.0.1:32768',
//   });

//   const id = context.params.id;

//   if (!id) {
//     return {
//       notFound: true,
//     };
//   }

//   const redirectUrl = await new Promise<string>((resolve, reject) => {
//     client.connect().then(() => {
//       console.log('Connected to Redis');

//       client.get(id, (err, reply) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(reply);
//         }
//       });
//     });
//   });

//   return {
//     props: {
//       redirectUrl: 'https://www.google.com',
//     },
//   };
// };

// export default ShortUrlPage;





















// import * as redis from 'redis';
// import { useEffect, useState } from 'react';

// export default function ShortUrlPage() {    

//     function redirectToNewUrl() {
//         const client = redis.createClient({
//             url: 'redis://default:redispw@127.0.0.1:32768'
//           });
          
//           // Connect to Redis
//           client.connect()
//             .then(() => {
//               console.log('Connected to Redis');
        
//               // recuperer l'url de la page et enlever http://localhost:3000/
//                 const url = window.location.href;
//                 const id = url.replace('http://localhost:3000/', '');
        
//                 console.log('id: ', id);
              
          
//             });
//     }

//     useEffect(() => {
//         redirectToNewUrl();
//     }, []);

//     return ( 
//         <div>
//             <h1>ShortUrlPage</h1>
//         </div>
//     );
// }


























// import { NextPageContext } from 'next';
// import * as redis from 'redis';

// type Props = {
//   longUrl: string;
// };

// const ShortUrlPage = ({ longUrl }: Props) => {
//   // rediriger l'utilisateur vers le longUrl
//   if (longUrl) {
//     window.location.href = longUrl;
//     return <div>Redirecting...</div>;
//   }

//   // afficher un message d'erreur si la clé n'a pas été trouvée
//   return <div>URL not found</div>;
// };

// export default ShortUrlPage;

// export async function getServerSideProps(context: NextPageContext): Promise<{ props: Props }> {
//   // récupérer l'id de l'url à partir de l'URL actuelle
//   const id = context.query.id as string;

//   // établir une connexion à Redis
//   const client = redis.createClient({
//     url: 'redis://default:redispw@127.0.0.1:32768'
//   });

//   // récupérer la valeur correspondante à la clé
//   const longUrl = await new Promise<string | null>((resolve, reject) => {
//     client.get(id, (error, value) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(value);
//       }
//     });
//   });

//   // fermer la connexion à Redis
//   client.quit();

//   return {
//     props: {
//       longUrl: longUrl || '',
//     },
//   };
// }











// import * as redis from 'redis';
// import { GetServerSideProps, NextPage } from 'next';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';


// interface Props {
//     longUrl?: string;
// }

// export default function Home(props: Props) {
//     const router = useRouter();
//     const [longUrl, setLongUrl] = useState(router.query.id);

//     // on lance cette fonction au chargement de la page
//     async function redirectToNewUrl() {
//         // on récupère l'id de l'url
//         const id = await router.query.id;

//         console.log('uuid: ', id);

//     }

//     useEffect(() => {
//         redirectToNewUrl();
//     }, []);
    
//     return (
//         <main>
//             <h1>Home</h1>
//             <p>id: {longUrl}</p>
//         </main>
//     );
// };











// // export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {

// //     const id = params;

// //     const client = redis.createClient({
// //         url: 'redis://default:redispw@127.0.0.1:32768'
// //     });

// //     client.connect()
// //         .then(() => {
// //             console.log('Connected to Redis into getServerSideProps');

// //             console.log('id: ', id);
                

// //         });


// //     const response = await fetch(`http://localhost:3000/api/redirect/${id}`);
// //     const { url } = await response.json();
// //     return {
// //         props: {
// //             url,
// //         },
// //     };

// // }