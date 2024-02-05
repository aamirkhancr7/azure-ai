<template>
  <q-toolbar class="text-white" style="min-height: 45px !important; background-color: #3c3c3c">
    <q-toolbar-title>
      Azure Cognitive Search
    </q-toolbar-title>
    <div class="flex-right">
      <q-btn :ripple="{ center: true }" unelevated icon="logout" rounded @click.stop="logout">
        <q-tooltip>
          Logout
        </q-tooltip>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script>
import MSALInstance from '@/auth/auth';
export default {
  name: "TheToolbar",
  methods: {
    logout() {
      return MSALInstance.logout();f
    },
  }
}
</script>

<style scoped>

</style>
