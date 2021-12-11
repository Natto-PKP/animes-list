/* Typings */
import { FC, ReactElement, useState } from 'react';
import { AnimeBase } from '../typings';

/* Components */
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { AnimeSearchComponent } from './anime-search';
import { AnimeComponent } from './anime';

/* Services */
import { fade_in_out } from '../services/transitions';

/* CSS */
import '../assets/css/anime-section.css';
import '../assets/css/anime-search.css';

/**
 * Faire un css pour les transitions
 * faire un fichier ts pour les transitions
 * faire un fichier et dossier pour les autres fonctions qui ne sont pas des components
 * Refaire au propre les classes et id des éléments
 */

/**
 * Boite de la liste de d'animé
 * @returns
 */
export const AnimeSectionComponent: FC<{ animes: AnimeBase[] }> = ({ animes }): ReactElement => {
  const [animes_list, setAnimesList] = useState(animes);

  return (
    <>
      <AnimeSearchComponent animes={animes} setAnimesList={setAnimesList} />

      <TransitionGroup id="animes" component="section">
        {animes_list.map((anime, i) => {
          return (
            <CSSTransition key={i} {...fade_in_out}>
              <AnimeComponent anime={anime} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </>
  );
};
