enum AnimeTags {
  'romance',
  'comique',
  'slice of life',
  'isekai',
  'ecchi',
  'harem',
  'action',
  'drame',
  'politique',
  'sf',
  'fantasy',
  'sport',
  'mecha',
}

export type AnimeTag = keyof typeof AnimeTags;

export interface AnimeBase {
  name: string;
  image: string;
  pending: boolean;
  seasons?: number;
  episodes?: number;
  rating?: number;
  tags?: AnimeTag[];
}
