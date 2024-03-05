<template>
  <div>
    <h1>Guest</h1>
    <p>Endpoint: {{ route.params.endpoint }}</p>
    <p>
      Linktree Title:
      <ul v-for="(titleValue, index) in linktreeData.titles" :key="index">
        <li>{{ titleValue as string }}</li>
      </ul>
    </p>
    <p>
      Linktree Link:
      <ul v-for="(linkValue, index) in linktreeData.links" :key="index">
        <li>{{ linkValue as string }}</li>
      </ul>
    </p>
  </div>
</template>
<script setup lang="ts">
import { useAsyncQuery } from "@nuxtjs/apollo/dist/runtime/composables";
import { getGuestDataQuery } from "~/apollo/mutation/guestData";
import { type TLink } from "~/types/Links";
import { ref } from "vue";

const route = useRoute();

const { data } = await useAsyncQuery<TLink>(getGuestDataQuery, {
  endpoint: route.params.endpoint as string,
});
const linktreeData = ref(data.value.linktree.getLink);
</script>
