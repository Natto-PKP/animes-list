/* Typings */
import { AnimeBase } from '../typings';
import { FC, ReactElement } from 'react';

/* Components */
import { AnimeNoteComponent } from './anime-note';
import { AnimeTagsComponent } from './anime-tags';
import { AnimeStatutComponent } from './anime-statut';

/**
 * Anime box
 * @param anime
 * @returns
 */
export const AnimeComponent: FC<{ anime: AnimeBase }> = ({ anime }): ReactElement => {
  return (
    <article className="anime-box">
      <img className="anime-box__img" src={`./images/${anime.image}`} alt={anime.name} />

      <div className="anime-box__infos">
        <div className="anime-box__infos__primary">
          <div className="anime-box__infos__primary__ref">
            <h3 className="anime-box__infos__primary__ref__title">{anime.name}</h3>
            <AnimeStatutComponent episodes={anime.episodes} seasons={anime.seasons} pending={anime.pending} />
          </div>

          <AnimeTagsComponent tags={anime.tags} />
        </div>

        <AnimeNoteComponent rating={anime.rating} />
      </div>
    </article>
  );
};
