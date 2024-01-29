<template>
  <input v-model="searchQuery" @input="getDocuments" placeholder="Search...">
  <ul>
    <li v-for="result in searchResults" :key="result.Issue_ID">
      Bipad Title = {{ result.Bipad_Title }}
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
export default {
  name: "Dashboard",
  mounted() {
    this.getDocuments()
  },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      searchEndpoint: `https://${import.meta.env.VITE_APP_SERVICE_NAME}.search.windows.net/indexes/${import.meta.env.VITE_APP_INDEX_NAME}/docs`,
    };
  },
  methods: {
    async getDocuments() {
      try {
        const response = await axios.get(this.searchEndpoint, {
          params: {
            search: this.searchQuery,
            'api-version': `${import.meta.env.VITE_APP_API_VERSION}`,
          },
          headers: {
            'Content-Type': 'application/json',
            'api-key': `${import.meta.env.VITE_APP_API_KEY}`,
          },
        });
        this.searchResults = response.data.value;
        console.log(this.searchResults);
      } catch (e) {
        console.log(e);
      }
    },
  },
}
</script>

<style scoped>

</style>
