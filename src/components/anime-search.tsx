import { ReactElement, FC, useState, useEffect, ChangeEvent, MouseEventHandler } from 'react';

/* Components */
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* Services */
import { tags_colors as colors } from '../services/colors';
import { fade_in_out } from '../services/transitions';
import { getCurrentTags } from '../services/tags';

/* Typings */
import { AnimeBase, AnimeTag } from '../typings';
type Props = FC<{ animes: AnimeBase[]; list: AnimeBase[]; setList: React.Dispatch<React.SetStateAction<AnimeBase[]>> }>;

/**
 * Section de recherche de la liste d'animé
 * @param anime
 * @returns
 */
export const AnimeSearchComponent: Props = ({ animes, list, setList }): ReactElement => {
  // States
  const [search, setSearch] = useState('');
  const [selected_tags, setSelectedTags] = useState<AnimeTag[]>([]);
  const tags = getCurrentTags(animes);

  /**
   * Use search and selected_tags states to filter animes list
   */
  useEffect(() => {
    const current_list_after_search_filter = search.length ? animes.filter(anime => anime.name.toLowerCase().includes(search)) : animes;
    const current_list_after_tags_filter = current_list_after_search_filter.filter(anime => selected_tags.every(tag => anime.tags?.includes(tag)));

    setList(current_list_after_tags_filter);
  }, [search, animes, selected_tags, setList]);

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
   * add a element in selected_tags state
   * @param event
   */
  const addSelectedTags = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as AnimeTag;
    if (!selected_tags.includes(value)) setSelectedTags(state => [...state, value]);
  };

  /**
   * remove a element in selected_tags state
   * @param event
   */
  const removeSelectedTags: MouseEventHandler = event => {
    event.preventDefault();

    const value = event.currentTarget.id as AnimeTag;
    if (selected_tags.includes(value)) {
      setSelectedTags(state => {
        state.slice(state.indexOf(value), 1);
        return state;
      });
    }
  };

  /**
   * Render
   */
  return (
    <section>
      {selected_tags.length ? (
        <TransitionGroup id="animes-selected-tags">
          {selected_tags.map((tag, i) => {
            const value = tag.replace(/\s+/g, '-');

            return (
              <CSSTransition key={i} {...fade_in_out}>
                <button id={value} className={'anime-tag anime-tag--' + colors[value]} onClick={removeSelectedTags}>
                  <span>{tag}</span>
                  <i className="fas fa-window-close"></i>
                </button>
              </CSSTransition>
            );
          })}

          {selected_tags.length > 2 ? (
            <CSSTransition {...fade_in_out}>
              <button id="all-tags" onClick={removeSelectedTags}>
                <i className="fas fa-window-close"></i>
              </button>
            </CSSTransition>
          ) : (
            <></>
          )}
        </TransitionGroup>
      ) : (
        <></>
      )}

      <form id="animes-filter">
        <label className="search-bar" htmlFor="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" id="search-bar" name="animes-search" placeholder="Rechercher par nom" onChange={updateSearch} />
        </label>

        {tags.length ? (
          <>
            <div id="tags-burger">
              <label htmlFor="tags-select">
                <span>
                  <i className="fas fa-tags"></i>Tags
                </span>
                <i className="fas fa-angle-right"></i>
              </label>

              <select name="tags-select" id="tags-select" multiple onChange={addSelectedTags}>
                {tags.map((tag, i) => {
                  const value = tag.replace(/\s+/g, '-');

                  return (
                    <option key={i} className={`anime-tag anime-tag--${colors[value]}`} value={value}>
                      {tag}
                    </option>
                  );
                })}
              </select>
            </div>

            <div id="tags-display">
              {tags.map((tag, i) => {
                const value = tag.replace(/\s+/g, '-');

                return (
                  <span key={i} className={`anime-tag anime-tag--${colors[value]} ${selected_tags.includes(tag) ? 'anime-tag--selected' : ''}`}>
                    {tag}
                  </span>
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
