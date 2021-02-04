<template>
  <div></div>
</template>

<script>
  import {vuexOidcProcessSilentSignInCallback} from 'vuex-oidc'

  export default {
    name: 'OidcSilentRenew',
    created() {
      vuexOidcProcessSilentSignInCallback()
    },
  }
</script>

<style scoped>

</style>
