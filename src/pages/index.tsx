import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css'
// @ts-ignore
import { Helmet } from 'react-helmet';

interface Props {
  shortUrl?: string;
}

const Home = (props: Props) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(props.shortUrl || '');
  const [copied, setCopied] = useState(false);
  const [notifText, setNotifText] = useState('NO TEXT');

  const notify = (text: string) => {
    // On change le texte de la notification
    setNotifText(text);
  
    
    if (typeof window !== "undefined") {
      // alert("fdfsjkn")
      // On affiche la notification
      setCopied(true);
      // On la cache après 1 seconde, seulement côté client
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (longUrl === '') {
      notify("You can't shorten an empty URL!");
    } else {
      try {
        const response = await fetch('/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ longUrl }),
        });
        const shortUrl = await response.json();
        setShortUrl(shortUrl);
      } catch (error) {
        console.error(error);
      }
    }

  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    notify('Copied to clipboard!');
  }

  return (
    <>
      <Helmet>
        <title> Tiny URL </title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </Helmet>

      <main className={styles.main} >

        <h1> Tiny URL </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="long-url"
            value={longUrl}
            onChange={(event) => setLongUrl(event.target.value)}
          /> 
          <button type="submit">Shorten</button>
        </form>

        {shortUrl && (
          <div className={styles.resultLink} >

            <p>Your reduced URL : </p>
            <div>

              <a className="resultLink__link" href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>

              <button type='button' onClick={handleCopy} >
                <span className="material-symbols-outlined"> content_copy </span>
              </button>

            </div>
            <center>  {copied && <span className={styles.copyFeedback}> {notifText} </span>} </center>
          </div>
        )}

      </main>
    </>
  );
};

export default Home;