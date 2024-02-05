<template>
    <div class="center-div">
        <div>
            <h1>401 Unauthorized</h1>
            <q-btn :to="{ name: 'dashboard' }" flat class="text-capitalize iris-button-style" label="Back to Dashboard" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Unauthorized',
};
</script>
