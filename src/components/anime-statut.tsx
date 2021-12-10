import { ReactElement, FC } from 'react';
import { AnimeBase } from '../typings';

/**
 * Statut d'un animé
 * @param anime
 * @returns
 */
export const AnimeStatutComponent: FC<Pick<AnimeBase, 'pending' | 'episodes' | 'seasons'>> = (anime): ReactElement => {
  if (anime.episodes || anime.seasons) {
    return (
      <span className="anime-box__infos__primary__ref__statut">
        {anime.seasons ? <span>{anime.episodes} eps</span> : ''}
        {anime.seasons ? <span className="anime-seasons">/ {anime.seasons} saisons</span> : ''}
      </span>
    );
  } else if (anime.pending) return <span className="anime-box__infos__primary__ref__statut">en cours</span>;
  else return <></>;
};
