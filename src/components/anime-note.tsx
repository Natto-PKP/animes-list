import { ReactElement, FC } from 'react';
import { AnimeBase } from '../typings';

/**
 * Note de l'animé
 * @param anime
 * @returns
 */
export const AnimeNoteComponent: FC<Pick<AnimeBase, 'rating'>> = (anime): ReactElement => {
  if (!anime.rating) return <></>;

  return (
    <div className="anime-box__note">
      <span className="anime-box__note__rating">{anime.rating} / 5</span>
      <span className="anime-box__note__stars">
        {Array.from({ length: 5 }).map((v, i) => {
          if (!anime.rating) return <></>;

          return (
            <i
              key={i}
              className={anime.rating > i ? (i + 1 - Math.ceil(anime.rating) > 0 ? 'fas fa-star-half-alt' : 'fas fa-star') : 'far fa-star'}
            ></i>
          );
        })}
      </span>
    </div>
  );
};
