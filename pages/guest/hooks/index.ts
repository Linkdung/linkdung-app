import { ref, type Ref } from 'vue';
import type { TLinktree } from '~/types/Links';


export const useLink = (linktreeData: TLinktree) => {
  const links: Ref<string[]> = ref(linktreeData.links);
  const urlTitles: Ref<string[]> = ref(linktreeData.titles);
  const header: Ref<string> = ref(linktreeData.header);


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

  return { links, setAddLink, urlTitles, setTitleLink, header };
};
