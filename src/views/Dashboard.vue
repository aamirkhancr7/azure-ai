<template>
  <div style="padding: 20px">
    <q-input label="Search...." style="margin: 20px 0" dense outlined v-model="searchQuery" @update:model-value="getDocuments" />
    <div>
      <div style="padding: 5px 0 15px 0">Filters</div>
      <div style="display: grid; grid-gap: 10px; grid-template-columns: 2fr 2fr 2fr 2fr 2fr">
        <div v-if="selection.filters.publisherName.length > 0">
          <div style="margin: 0 10px">Publisher Name</div>
          <q-select
              dense
              use-chips
              outlined
              v-model="magazine.filters.publisherName"
              :options="selection.filters.publisherName"
              multiple
              emit-value
              map-options
              @update:model-value="getDocuments"
              style="margin: 10px"
          >
            <template #selected-item="{ opt, toggleOption }">
              <q-chip @remove="toggleOption(opt)" removable dense>{{ opt.label }} ({{ opt.count }})</q-chip>
            </template>
            <template #option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section side>
                  <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ opt.label }} ({{ opt.count }})
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div v-if="selection.filters.magazineCategoryDescription.length > 0">
          <div style="margin: 0 10px">Magazine category description</div>
          <q-select
              dense
              use-chips
              outlined
              v-model="magazine.filters.magazineCategoryDescription"
              :options="selection.filters.magazineCategoryDescription"
              multiple
              emit-value
              map-options
              @update:model-value="getDocuments"
              style="margin: 10px"
          >
            <template #selected-item="{ opt, toggleOption }">
              <q-chip @remove="toggleOption(opt)" removable dense>{{ opt.label }} ({{ opt.count }})</q-chip>
            </template>
            <template #option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section side>
                  <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ opt.label }} ({{ opt.count }})
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div v-if="selection.filters.magazineFormatDescription.length > 0">
          <div style="margin: 0 10px">Magazine format description</div>
          <q-select
              dense
              use-chips
              outlined
              v-model="magazine.filters.magazineFormatDescription"
              :options="selection.filters.magazineFormatDescription"
              multiple
              emit-value
              map-options
              @update:model-value="getDocuments"
              style="margin: 10px"
          >
            <template #selected-item="{ opt, toggleOption }">
              <q-chip @remove="toggleOption(opt)" removable dense>{{ opt.label }} ({{ opt.count }})</q-chip>
            </template>
            <template #option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section side>
                  <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ opt.label }} ({{ opt.count }})
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div v-if="selection.filters.magazineFrequencyDescription.length > 0">
          <div style="margin: 0 10px">Magazine frequency description</div>
          <q-select
              dense
              use-chips
              outlined
              v-model="magazine.filters.magazineFrequencyDescription"
              :options="selection.filters.magazineFrequencyDescription"
              multiple
              emit-value
              map-options
              @update:model-value="getDocuments"
              style="margin: 10px"
          >
            <template #selected-item="{ opt, toggleOption }">
              <q-chip @remove="toggleOption(opt)" removable dense>{{ opt.label }} ({{ opt.count }})</q-chip>
            </template>
            <template #option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section side>
                  <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ opt.label }} ({{ opt.count }})
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div v-if="selection.filters.magazineCategoryRollup.length > 0">
          <div style="margin: 0 10px">Magazine category rollup</div>
          <q-select
              use-chips
              outlined
              dense
              v-model="magazine.filters.magazineCategoryRollup"
              :options="selection.filters.magazineCategoryRollup"
              multiple
              emit-value
              map-options
              @update:model-value="getDocuments"
              style="margin: 10px"
          >
            <template #selected-item="{ opt, toggleOption }">
              <q-chip @remove="toggleOption(opt)" removable dense>{{ opt.label }} ({{ opt.count }})</q-chip>
            </template>
            <template #option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section side>
                  <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ opt.label }} ({{ opt.count }})
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
    </div>
    <div style="padding: 20px 0 40px 0; display: grid; justify-content: flex-end">
      <div style="padding-top: 20px">
        <q-pagination
            v-model="page"
            :max="maxValues"
            direction-links
            @update:model-value="getDocuments"
            boundary-numbers
            :max-pages="10"
        />
      </div>
      <div class="flex-right" style="padding-top: 20px;font-weight: 500">Total items ({{ totalItems }})</div>
    </div>
    <div>
      <div style="display: grid; grid-gap: 10px; grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr">
        <q-card flat style="margin: 10px" v-for="result in searchResults" :key="result.Issue_ID">
          <div>
            <img :src="result.CoverImageURL" style="width: 190px; height: 270px" />
          </div>
          <div>{{ result.Title_Name }} </div>
        </q-card>
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="200px" color="primary" />
        </q-inner-loading>
      </div>
    </div>
    <div style="padding: 10px 0 40px 0; display: grid; justify-content: flex-end">
      <div style="padding-top: 20px">
        <q-pagination
            v-model="page"
            :max="maxValues"
            direction-links
            @update:model-value="getDocuments"
            boundary-numbers
            :max-pages="10"
        />
      </div>
      <div class="flex-right" style="padding-top: 20px;font-weight: 500">Total items ({{ totalItems }})</div>
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
      loading: false,
      page: 1,
      itemsPerPage: 48,
      totalItems: 0,
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
      this.loading = true
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
        this.totalItems = response.data['@odata.count']
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
      this.loading = false
    },
  },
}
</script>

<style scoped>

</style>
