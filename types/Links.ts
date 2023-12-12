import { type Ref } from 'vue';

export type TLinks = {
  links: Ref<string[]>;
  addLink: (link: string) => void;
}
