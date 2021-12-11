import { ReactElement, FC, useState, useEffect, ChangeEvent, MouseEvent } from 'react';

/* Services */
import { tags_colors as colors } from '../services/colors';
import { getCurrentTags } from '../services/tags';

/* Typings */
import { AnimeBase, AnimeTag } from '../typings';
type Props = FC<{ animes: AnimeBase[]; setAnimesList: React.Dispatch<React.SetStateAction<AnimeBase[]>> }>;

/**
 * Section de recherche de la liste d'animé
 * @param anime
 * @returns
 */
export const AnimeSearchComponent: Props = ({ animes, setAnimesList }): ReactElement => {
  // States
  const [search, setSearch] = useState('');
  const [selected_tags, setSelectedTags] = useState<AnimeTag[]>([]);
  const [display_tags_menu, setDisplayTagsMenu] = useState(false);
  const tags = getCurrentTags(animes);

  /**
   * Use search and selected_tags states to filter animes list
   */
  useEffect(() => {
    const current_list_after_search_filter = search.length ? animes.filter(anime => anime.name.toLowerCase().includes(search)) : animes;
    const current_list_after_tags_filter = current_list_after_search_filter.filter(anime => selected_tags.every(tag => anime.tags?.includes(tag)));

    setAnimesList(current_list_after_tags_filter);
  }, [search, animes, selected_tags, setAnimesList]);

  /**
   * update search state
   * @param event
   */
  const updateSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart();
    event.target.value = value;
    setSearch(value.trimEnd().toLowerCase());
  };

  /**
   * Update tags state
   * @param event
   * @param value
   */
  const handleChangeTag = (event: MouseEvent<HTMLButtonElement | HTMLOptionElement, MouseEvent | globalThis.MouseEvent>, tag: AnimeTag) => {
    event.preventDefault();

    if (selected_tags.includes(tag)) {
      setSelectedTags(state => state.filter(v => v.toLowerCase() !== tag.toLowerCase()));
    } else setSelectedTags(state => [...state, tag]);
  };

  /**
   * Render
   */
  return (
    <section>
      <form id="animes-filter">
        <label className="search-bar" htmlFor="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" id="search-bar" name="animes-search" placeholder="Rechercher par nom" onChange={updateSearch} />
        </label>

        {tags.length ? (
          <>
            <div id="tags-burger" onMouseEnter={() => setDisplayTagsMenu(state => true)} onMouseLeave={() => setDisplayTagsMenu(state => false)}>
              <label htmlFor="tags-select">
                <span>
                  <i className="fas fa-tags"></i>
                  {selected_tags.length ? `${selected_tags.length} filtres` : 'Tags'}
                </span>

                <i className="fas fa-angle-right"></i>
              </label>

              {display_tags_menu ? (
                <select name="tags-select" multiple>
                  {tags.map((tag, i) => {
                    const value = tag.replace(/\s+/g, '-');
                    const color = colors[value];

                    return (
                      <option
                        key={i}
                        className={selected_tags.includes(tag) ? 'anime-tag--' + color : ''}
                        value={value}
                        onClick={event => handleChangeTag(event, tag)}
                      >
                        {tag}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <></>
              )}
            </div>

            <div id="tags-display">
              {tags.map((tag, i) => {
                const value = tag.replace(/\s+/g, '-');
                const color = colors[value];

                return (
                  <button
                    key={i}
                    onClick={event => handleChangeTag(event, tag)}
                    className={`anime-tag anime-tag--${color} ${selected_tags.includes(tag) ? `anime-tag--${color}--selected` : ''}`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}
      </form>
    </section>
  );
};
