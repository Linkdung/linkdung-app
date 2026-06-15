import { type Ref } from "vue";

export interface TLink {
  linktree: TLinktree;
}

export interface TLinktree {
  getLink: TGetLink;
}

export interface TGetLink {
  endpoint: string;
  header: string;
  titles: Ref<string[]>;
  links: Ref<string[]>;
}
