<template>
  <div>Error in authentication</div>
</template>

<script>
  export default {
    name: 'OidcCallbackError',
    created() {
      this.$router.push('/')
    },
  }
</script>

<style scoped>

</style>
