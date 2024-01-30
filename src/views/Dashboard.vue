<template>
  <div style="padding: 20px">
    <q-input style="margin: 20px 0" dense outlined v-model="searchQuery" @update:model-value="getDocuments" />
    <div class="flex-right" style="padding: 20px 0">
      <q-pagination
          v-model="page"
          :max="maxValues"
          direction-links
          @update:model-value="getDocuments"
          boundary-numbers
          :max-pages="10"
      />
    </div>
    <div class="grid-four-space">
      <q-card flat style="margin: 10px" v-for="result in searchResults" :key="result.Issue_ID">
        <div>
          <img :src="result.CoverImageURL" style="width: 200px" />
        </div>
        <div>{{ result.Title_Name }} </div>
      </q-card>
    </div>
  </div>
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
      page: 1,
      itemsPerPage: 48,
      maxValues: null,
      searchQuery: '',
      searchResults: [],
      searchEndpoint: `https://${import.meta.env.VITE_APP_SERVICE_NAME}.search.windows.net/indexes/${import.meta.env.VITE_APP_INDEX_NAME}/docs/search?api-version=${import.meta.env.VITE_APP_API_VERSION}`,
    };
  },
  methods: {
    async getDocuments() {
      try {
        const data = {"count":true,"orderby":"BillingDraw desc","skip": this.page * this.itemsPerPage - this.itemsPerPage,"top":this.itemsPerPage,"searchMode":"any","queryType":"simple","facets":["BillingDraw,values:0|1000000","TotalORDraw,values:0|1000000","EstBillingEff,values:0|100","BillingSale,values:0|1000000","EstBillingSale,values:0|1000000","Magazine_Category_Rollup,count:5,sort:count","TotalORSale,values:0|1000000","magazine_frequency_Description,count:5,sort:count","Publisher_Name,count:5,sort:count","magazine_format_Description,count:5,sort:count","Magazine_category_description,count:5,sort:count"],"filter":"","search": this.searchQuery }
        const response = await axios.post(this.searchEndpoint,data, {
          headers: {
            'Content-Type': 'application/json',
            'api-key': `${import.meta.env.VITE_APP_API_KEY}`,
          },
        });
        this.searchResults = response.data.value;
        this.maxValues = Math.ceil(response.data['@odata.count'] / this.itemsPerPage)
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
