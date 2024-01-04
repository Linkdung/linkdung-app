import { type Ref } from 'vue';

export type TLinks = {
  links: Ref<string[]>;
  urlTitles: Ref<string[]>;
  setAddLink: (link: string) => void;
  setTitleLink: (urlTitle: string) => void;
}

export type TRootGuestWithId = {
  linktree: TLinktree
}

export type TLinktree = {
  header: string
  titles: string[]
  links: string[]
}
