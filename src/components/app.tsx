import animesJSON from '../animes.json';

/* Typings */
import { ReactElement } from 'react';
import { AnimeBase } from '../typings';

/* Components */
import { AnimeSectionComponent } from './animes-section';

/* CSS */
import '../assets/css/global.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';

export const App = (): ReactElement => {
  const animes = animesJSON as AnimeBase[];

  return (
    <>
      <header>
        <h1>
          {'🥥'} Ma liste d'<span className="font--color-secondary">animés</span>
        </h1>
        <span>{animes.length}</span>
      </header>

      <main>
        <AnimeSectionComponent animes={animes} />
      </main>

      <footer>
        <a target="_blank" href="https://discord.gg/cMgGaDpuay" rel="noreferrer">
          Vers mon serveur Discord
        </a>
      </footer>
    </>
  );
};

/**
header
section
    search
    list
footer
*/
