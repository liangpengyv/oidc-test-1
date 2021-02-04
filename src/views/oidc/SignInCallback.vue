<template>
  <div></div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'SignInCallback',
    computed: {
      ...mapGetters('oidcStore', {
        oidcIsAuthenticated: 'oidcIsAuthenticated',
      }),
    },
    methods: {
      ...mapActions('oidcStore', {
        oidcSignInCallback: 'oidcSignInCallback',
        signOutOidcSilent: 'signOutOidcSilent',
        removeOidcUser: 'removeOidcUser',
      }),
    },
    created() {
      this.oidcSignInCallback()
        .then((redirectPath) => {
          this.$router.push(redirectPath)
        })
        .catch((error) => {
          console.log(error)
          this.$router.push('/oidc-callback-error')
        })
    },
  }
</script>

<style scoped>

</style>
