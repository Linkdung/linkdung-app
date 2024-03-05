<template>
  <section id="guest" class="overflow-hidden py-16 md:py-20 lg:py-28">
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="w-full px-4">
            <button
              class="m-2 shadow-submit dark:shadow-submit-dark rounded-md bg-primary px-7 py-3 text-base font-medium text-white duration-300 hover:bg-primary/90"
              @click="setPreview"
            >
              {{ isPreview ? "Create" : "Preview" }}
            </button>
          </div>
          <div
            class="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
            data-wow-delay=".15s"
            v-if="!isPreview"
          >
            <h2
              class="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl"
            >
              New with Linkdung?
            </h2>
            <p class="mb-12 text-base font-medium text-body-color">
              Let's get started with Linkdung
            </p>
            <form @submit.prevent="handleSubmit">
              <div class="-mx-4 flex flex-wrap">
                <div class="w-full px-4 mb-8">
                  <label
                    for="header"
                    class="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >Your Header</label
                  >
                  <p
                    v-if="!header"
                    class="mb-3 block text-sm font-medium text-red-500 dark:text-red-400"
                  >
                    Header harus diisi
                  </p>
                  <div class="relative w-full min-w-[200px] h-10">
                    <input
                      name="header"
                      v-model="header"
                      class="border-stroke dark:text-gray-light dark:shadow-two resize-none border bg-[#f8f8f8] px-6 py-6 text-base text-gray-dark outline-none dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none peer w-full h-full text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent rounded-[7px] border-blue-gray-200 focus:border-purple-500"
                      placeholder=" "
                    /><label
                      class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-body-color leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[14px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-purple-500 before:border-blue-gray-200 peer-focus:before:!border-purple-500 after:border-blue-gray-200 peer-focus:after:!border-purple-500"
                      >Header
                    </label>
                  </div>
                </div>
                <div class="w-full px-4 mb-8">
                  <label
                    for="link"
                    class="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >Your Link</label
                  >
                  <div
                    class="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                  >
                    <div class="relative w-full min-w-[200px] h-10">
                      <input
                        name="urlTitle"
                        v-model="newUrlTitle"
                        class="border-stroke dark:text-gray-light dark:shadow-two resize-none border bg-[#f8f8f8] px-6 py-6 text-base text-gray-dark outline-none dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none peer w-full h-full text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent rounded-[7px] border-blue-gray-200 focus:border-purple-500"
                        placeholder=" "
                      /><label
                        class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-body-color leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[14px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-purple-500 before:border-blue-gray-200 peer-focus:before:!border-purple-500 after:border-blue-gray-200 peer-focus:after:!border-purple-500"
                        >Title
                      </label>
                    </div>
                    <div class="relative w-full min-w-[200px] h-10">
                      <input
                        name="link"
                        v-model="newLink"
                        class="border-stroke dark:text-gray-light dark:shadow-two resize-none border bg-[#f8f8f8] px-6 py-6 text-base text-gray-dark outline-none dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none peer w-full h-full text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent rounded-[7px] border-blue-gray-200 focus:border-purple-500"
                        placeholder=" "
                      /><label
                        class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-body-color leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[14px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-purple-500 before:border-blue-gray-200 peer-focus:before:!border-purple-500 after:border-blue-gray-200 peer-focus:after:!border-purple-500"
                        >Link
                      </label>
                    </div>
                    <div
                      class="rounded-md bg-primary px-4 py-2 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
                      @click="addLink"
                    >
                      +
                    </div>
                  </div>
                  <div
                    v-for="(link, index) in links"
                    :key="index"
                    class="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 my-7"
                  >
                    <div class="relative w-full min-w-[200px] h-10">
                      <input
                        name="urlTitle"
                        :value="urlTitles[index]"
                        class="border-stroke dark:text-gray-light dark:shadow-two resize-none border bg-[#f8f8f8] px-6 py-6 text-base text-gray-dark outline-none dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none peer w-full h-full text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent rounded-[7px] border-blue-gray-200 focus:border-purple-500"
                        placeholder=" "
                        @focus="setFocus(index)"
                        @input="handleUrlTitleChange($event, index)"
                      /><label
                        class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-body leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[14px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-purple-500 before:border-blue-gray-200 peer-focus:before:!border-purple-500 after:border-blue-gray-200 peer-focus:after:!border-purple-500"
                        >Title
                      </label>
                    </div>

                    <div
                      v-if="isFocus === index"
                      class="relative w-full min-w-[200px] h-10"
                    >
                      <input
                        name="link"
                        :value="link"
                        class="border-stroke dark:text-gray-light dark:shadow-two resize-none border bg-[#f8f8f8] px-6 py-6 text-base text-gray-dark outline-none dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none peer w-full h-full text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent rounded-[7px] border-blue-gray-200 focus:border-purple-500"
                        placeholder=" "
                        @input="handleLinkChange($event, index)"
                      /><label
                        class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-body-color leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[14px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-purple-500 before:border-blue-gray-200 peer-focus:before:!border-purple-500 after:border-blue-gray-200 peer-focus:after:!border-purple-500"
                        >Link
                      </label>
                    </div>
                    <div
                      class="rounded-md bg-primary px-[18px] py-2 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer"
                      @click="removeLink(index)"
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full px-4">
                <button
                  class="m-2 disabled:opacity-40 shadow-submit dark:shadow-submit-dark rounded-md bg-primary px-7 py-3 text-base font-medium text-white duration-300 hover:bg-primary/90"
                  @click="handleSubmit"
                  :disabled="!header || links.length === 0"
                >
                  Save
                </button>
                <NuxtLink
                  :to="{ name: 'account' }"
                  class="m-2 shadow-submit dark:shadow-submit-dark rounded-md bg-primary px-7 py-3 text-base font-medium text-white duration-300 hover:bg-primary/90"
                >
                  Start with Account (Login/Signup)
                </NuxtLink>
              </div>
            </form>
          </div>
          <div
            class="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-72 px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
            data-wow-delay=".15s"
            v-if="isPreview"
          >
            <h1 class="text-3xl font-bold text-center mb-8">{{ header }}</h1>
            <div class="grid gap-4">
              <div v-for="(link, index) in links" :key="index" class="mb-6">
                <a
                  :href="link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center space-x-2 text-purple-500 hover:text-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 group-hover:text-purple-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    ></path>
                  </svg>
                  <span class="text-lg group-hover:underline">{{
                    urlTitles[index]
                  }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { createGuestDataMutation } from "~/apollo/mutation/guestData";
import { useLink } from "./hooks";

// const route = useRouter();
// if (!('params' in route)) console.log('router tidak ada');
const { links, setAddLink, urlTitles, header, setTitleLink } = useLink();

// const props = defineProps({
//   isPreview: {
//     type: Boolean,
//     default: false,
//   },
// });

const formData = ref({
  newLink: "",
  newUrlTitle: "",
  header: "",
  isFocus: null,
});

const { newLink, newUrlTitle, isFocus } = toRefs(formData.value);
const isPreview = ref(false);
const setPreview = () => {
  isPreview.value = !isPreview.value;
  console.log("Masuk");
};



const addLink = () => {
  if (
    links.value.length < 5 &&
    newLink.value.trim() !== "" &&
    newUrlTitle.value.trim() !== ""
  ) {
    setAddLink(newLink.value);
    newLink.value = "";

    setTitleLink(newUrlTitle.value);
    newUrlTitle.value = "";
  }
};

const removeLink = (index: number) => {
  links.value.splice(index, 1);
  urlTitles.value.splice(index, 1);
};

const setFocus = (index: number | null) => {
  isFocus.value = index as null;
};

const handleUrlTitleChange = (event: any, index: string | number) => {
  urlTitles.value[index as number] = event.target.value;
};

const handleLinkChange = (event: any, index: string | number) => {
  links.value[index as number] = event.target.value;
};

const { mutate } = useMutation(createGuestDataMutation, {
  refetchQueries: [{ query: createGuestDataMutation }],
  context: {
    headers: {
      // 'Apollo-Require-Preflight': 'true',
      "Content-Type": "application/json",
      // 'Access-Control-Allow-Origin': '*',
    },
  },
});

const handleSubmit = async () => {
  var data = {
    header: header.value,
    endpoint: "",
    titles: JSON.parse(
      JSON.stringify(urlTitles.value.filter((title: string) => title.trim() !== ""))
    ),
    links: JSON.parse(
      JSON.stringify(links.value.filter((title: string) => title.trim() !== ""))
    ),
  };
  var wrapData = { data };
  if (header.value.trim() !== "") {
    const result = await mutate(wrapData);
  }
};
</script>
