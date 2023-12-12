<template>
  <div>
    <h1>Linkdung</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="newLink" placeholder="Add a new Link" />
      <button type="submit">Add Link</button>
      <p v-if="links.length >= 5" style="color: red;">Maximum links reached (Sign in For More)</p>
    </form>
    <ul>
      <li v-for="(link, index) in links" :key="index">{{ link }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLink } from './hooks';


const { links, addLink } = useLink();
const newLink = ref('');

const handleSubmit = () => {

  if (links.value.length < 5 && newLink.value.trim() !== '') {
    addLink(newLink.value);
    newLink.value = '';
  }
};
</script>
