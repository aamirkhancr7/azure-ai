<template>
  <div v-if="role && user.name">
    <the-toolbar />
    <router-view />
  </div>
  <div v-else class="center-div">
    <q-spinner-gears size="250" color="cyan" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TheToolbar from "@/layout/TheToolbar.vue";

export default {
  name: 'MainLayout',
  components: {TheToolbar},
  data: () => ({}),
  computed: {
    ...mapState({
      user: state => state.users.user,
      role: state => state.users.role,
    }),
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      await this.handleCurrentUser();
    },
    async handleCurrentUser() {
      try {
        await this.$store.dispatch('getCurrentUser');
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
