import { ref, type Ref } from 'vue';
import type { TLinks } from '~/types/Links';

export const useLink = (): TLinks => {
  const links: Ref<string[]> = ref([]);

  const addLink = (link: string): void => {
    if (link.trim() !== '') {
      links.value.push(link);
    }
  };

  return { links, addLink };
};
