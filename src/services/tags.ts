import { AnimeBase, AnimeTag } from '../typings';

export const getCurrentTags = (list: AnimeBase[]): AnimeTag[] => {
  return list.reduce((acc: AnimeTag[], anime: AnimeBase) => [...acc, ...(anime.tags?.filter(tag => !acc.includes(tag)) || [])], []);
};
