<template>
  <!-- eslint-disable -->
  <ais-instant-search index-name="instant_search" :search-client="searchClient">
    <button @click="toggleAlgolia">
      {{ algolia ? 'algolia' : 'static' }}
    </button>
    <ais-configure :hitsPerPage="20" />
    <div style="display: flex">
      <div style="flex: 2">
        <ais-refinement-list attribute="brand" />
      </div>
      <div style="flex: 4">
        <ais-search-box />
        <ais-hits>
          <template slot-scope="{ item }" slot="item">
            <h2>
              <ais-highlight :hit="item" attribute="name" v-if="item._highlightResult" />
              <span v-else>{{item.name}}</span>
            </h2>
            <p>
              <ais-highlight :hit="item" attribute="description" v-if="item._highlightResult" />
              <span v-else>{{item.description}}</span>
            </p>
          </template>
        </ais-hits>
        <ais-pagination />
      </div>
    </div>
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch';
import searchClient from './searchClient';

export default {
  data() {
    return {
      algolia: true,
    };
  },
  computed: {
    searchClient() {
      if (this.algolia) {
        return algoliasearch('latency', '3d9875e51fbd20c7754e65422f7ce5e1');
      }
      return searchClient;
    },
  },
  methods: {
    toggleAlgolia() {
      this.algolia = !this.algolia;
    },
  },
};
</script>

<style>
:root {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.ais-Hits-item {
  width: unset !important;
}
</style>
