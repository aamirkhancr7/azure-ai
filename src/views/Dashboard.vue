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
    <div style="display: grid; grid-gap: 10px; grid-template-columns: 3fr 9fr">
      <div>
        <div v-if="selection.filters.publisherName.length > 0">
          <div>
            Publisher Name
          </div>
          <q-option-group
              v-model="magazine.filters.publisherName"
              :options="selection.filters.publisherName"
              color="green"
              type="checkbox"
              @update:model-value="getDocuments"
          >
            <template #label="opt">
              <span>{{ opt.label }}</span>
              <span style="padding-left: 8px">({{ opt.count }})</span>
            </template>
          </q-option-group>
        </div>
        <q-separator style="margin: 10px 0" />
        <div v-if="selection.filters.magazineCategoryDescription.length > 0">
          <div>
            Magazine category description
          </div>
          <q-option-group
              v-model="magazine.filters.magazineCategoryDescription"
              :options="selection.filters.magazineCategoryDescription"
              color="green"
              type="checkbox"
              @update:model-value="getDocuments"
          >
            <template #label="opt">
              <span>{{ opt.label }}</span>
              <span style="padding-left: 8px">({{ opt.count }})</span>
            </template>
          </q-option-group>
        </div>
        <q-separator style="margin: 10px 0" />
        <div v-if="selection.filters.magazineFormatDescription.length > 0">
          <div>
            Magazine format description
          </div>
          <q-option-group
              v-model="magazine.filters.magazineFormatDescription"
              :options="selection.filters.magazineFormatDescription"
              color="green"
              type="checkbox"
              @update:model-value="getDocuments"
          >
            <template #label="opt">
              <span>{{ opt.label }}</span>
              <span style="padding-left: 8px">({{ opt.count }})</span>
            </template>
          </q-option-group>
        </div>
        <q-separator style="margin: 10px 0" />
        <div v-if="selection.filters.magazineFrequencyDescription.length > 0">
          <div>
            Magazine frequency description
          </div>
          <q-option-group
              v-model="magazine.filters.magazineFrequencyDescription"
              :options="selection.filters.magazineFrequencyDescription"
              color="green"
              type="checkbox"
              @update:model-value="getDocuments"
          >
            <template #label="opt">
              <span>{{ opt.label }}</span>
              <span style="padding-left: 8px">({{ opt.count }})</span>
            </template>
          </q-option-group>
        </div>
        <q-separator style="margin: 10px 0" />
        <div>
          <div>
            Magazine category rollup
          </div>
          <q-option-group
              v-model="magazine.filters.magazineCategoryRollup"
              :options="selection.filters.magazineCategoryRollup"
              color="green"
              type="checkbox"
              @update:model-value="getDocuments"
          >
            <template #label="opt">
              <span>{{ opt.label }}</span>
              <span style="padding-left: 8px">({{ opt.count }})</span>
            </template>
          </q-option-group>
        </div>
      </div>
      <div class="grid-four-space">
        <q-card flat style="margin: 10px" v-for="result in searchResults" :key="result.Issue_ID">
          <div>
            <img :src="result.CoverImageURL" style="width: 200px; height: 270px" />
          </div>
          <div>{{ result.Title_Name }} </div>
        </q-card>
      </div>
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
      magazine: {
        filterValue: '',
        filters: {
          magazineCategoryDescription: [],
          magazineFrequencyDescription: [],
          publisherName: [],
          magazineCategoryRollup: [],
          magazineFormatDescription: []
        }
      },
      selection: {
        filters: {
          magazineCategoryDescription: [],
          magazineFrequencyDescription: [],
          publisherName: [],
          magazineCategoryRollup: [],
          magazineFormatDescription: []
        }
      }
    };
  },
  methods: {
    filterProperties() {
      const filterMapping = {
        publisherName: 'Publisher_Name',
        magazineCategoryDescription: 'Magazine_category_description',
        magazineFrequencyDescription: 'magazine_frequency_Description',
        magazineCategoryRollup: 'Magazine_Category_Rollup',
        magazineFormatDescription: 'magazine_format_Description'
      };
      // Sample Filter condition
      // (Magazine_category_description eq 'CURRENT CELEBRITY') and (Publisher_Name eq 'A360 MEDIA LLC' or Publisher_Name eq 'KAPPA PUBLISHING GROUP INC')
      function constructCondition(field, values) {
        return values.length > 0 ? `(${values.map(value => `${field} eq '${value}'`).join(' or ')})` : '';
      }

      const foundFilter = Object.keys(filterMapping).find(key => this.magazine.filters[key].length);
      this.magazine.filterValue = foundFilter ? constructCondition(filterMapping[foundFilter], this.magazine.filters[foundFilter]) : '';

      function applyFilter(...filterKeys) {
        console.log('Filter keys:', filterKeys);

        const { filters } = this.magazine;
        const conditions = filterKeys.map(key => constructCondition(filterMapping[key], filters[key]));

        const nonEmptyConditions = conditions.filter(condition => condition.length > 0);

        if (nonEmptyConditions.length > 0) {
          this.magazine.filterValue = nonEmptyConditions.join(' and ');
        }
      }

      // Generate all permutations dynamically
      const filterKeys = Object.keys(filterMapping);
      const filterPermutations = generatePermutations(filterKeys);

      function generatePermutations(arr) {
        const result = [];

        function swap(i, j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }

        function permute(start) {
          if (start === arr.length - 1) {
            result.push([...arr]);
            return;
          }

          for (let i = start; i < arr.length; i++) {
            swap(start, i);
            permute(start + 1);
            swap(start, i);
          }
        }

        permute(0);
        return result;
      }
      // Apply filters for each permutation
      filterPermutations.forEach(keys => applyFilter.call(this, ...keys));

    },
    async getDocuments() {
      try {
        if (Object.values(this.magazine.filters).some(filter => filter.length)) {
          await this.filterProperties();
        } else {
          this.magazine.filterValue = '';
        }
        const data = {
          "count":true,
          "orderby":"BillingDraw desc",
          "skip": this.page * this.itemsPerPage - this.itemsPerPage,
          "top":this.itemsPerPage,
          "searchMode":"any",
          "queryType":"simple",
          "facets":["BillingDraw,values:0|1000000","TotalORDraw,values:0|1000000","EstBillingEff,values:0|100","BillingSale,values:0|1000000","EstBillingSale,values:0|1000000","Magazine_Category_Rollup,count:5,sort:count","TotalORSale,values:0|1000000","magazine_frequency_Description,count:5,sort:count","Publisher_Name,count:5,sort:count","magazine_format_Description,count:5,sort:count","Magazine_category_description,count:5,sort:count"],
          "filter":`${this.magazine.filterValue}`,
          "search": this.searchQuery
        }
        const response = await axios.post(this.searchEndpoint,data, {
          headers: {
            'Content-Type': 'application/json',
            'api-key': `${import.meta.env.VITE_APP_API_KEY}`,
          },
        });
        this.searchResults = response.data.value;
        this.maxValues = Math.ceil(response.data['@odata.count'] / this.itemsPerPage)
        // Filter Mapping
        const filterMapping = {
          publisherName: 'Publisher_Name',
          magazineCategoryDescription: 'Magazine_category_description',
          magazineFrequencyDescription: 'magazine_frequency_Description',
          magazineCategoryRollup: 'Magazine_Category_Rollup',
          magazineFormatDescription: 'magazine_format_Description'
        };
        for (const key in filterMapping) {
          if (filterMapping.hasOwnProperty(key) && response.data['@search.facets'][filterMapping[key]]) {
            this.selection.filters[key] = response.data['@search.facets'][filterMapping[key]].map((value) => {
              return {
                label: value.value,
                value: value.value,
                count: value.count
              };
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
}
</script>

<style scoped>

</style>
