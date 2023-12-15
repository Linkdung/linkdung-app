import { ref, type Ref } from 'vue';
import type { TLinks } from '~/types/Links';

export const useLink = (): TLinks => {
  const links: Ref<string[]> = ref([]);
  const urlTitles: Ref<string[]> = ref([]);

  const setAddLink = (link: string): void => {
    if (link.trim() !== '') {
      links.value.push(link);
    }
  };

  const setTitleLink = (urlTitle: string): void => {
    if (urlTitle.trim() !== '') {
      urlTitles.value.push(urlTitle);
    }
  }

  return { links, setAddLink, urlTitles, setTitleLink };
};
