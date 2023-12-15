import { type Ref } from 'vue';

export type TLinks = {
  links: Ref<string[]>;
  urlTitles: Ref<string[]>;
  setAddLink: (link: string) => void;
  setTitleLink: (urlTitle: string) => void;
}
