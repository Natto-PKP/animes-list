import { ReactElement, FC } from 'react';
import { AnimeBase } from '../typings';

/* Services */
import { tags_colors as colors } from '../services/colors';

/**
 * Tags de l'animé
 * @param anime
 * @returns
 */
export const AnimeTagsComponent: FC<Pick<AnimeBase, 'tags'>> = (anime): ReactElement => {
  if (!anime.tags || !anime.tags.length) return <></>;

  return (
    <div className="anime-box__tags">
      {anime.tags.map((tag, i) => {
        return (
          <span key={i} className={`anime-tag anime-tag--${colors[tag.replace(/\s+/g, '-')]} anime-tag--tiny`}>
            {tag}
          </span>
        );
      })}
    </div>
  );
};
