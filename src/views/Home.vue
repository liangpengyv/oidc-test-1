<template>
  <div class="home">
    <p>这是一个开放访问的页面</p>
    <button v-if="!oidcIsAuthenticated" @click.prevent="authenticateOidc">Sign In</button>
    <button v-if="oidcIsAuthenticated" @click.prevent="signOut">Sign out</button>
    <br/>
    <img alt="Vue logo" src="../assets/logo.png">
    <p v-if="oidcIsAuthenticated">这句话是登录后才会展示的受保护内容</p>
    <p>{{ $store.state.oidcStore.access_token }}</p>
    <p v-if="oidcUser">{{ oidcUser }}</p>
    <button @click="showForumInfo">获取我的社区基础信息</button>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import myCommunityService from '../service/personal-center/my-community.service'

  export default {
    name: 'Home',
    data() {
      return {}
    },
    computed: {
      ...mapGetters('oidcStore', {
        oidcIsAuthenticated: 'oidcIsAuthenticated',
        oidcUser: 'oidcUser',
      }),
    },
    methods: {
      ...mapActions('oidcStore', {
        authenticateOidc: 'authenticateOidc',
        signOutOidcSilent: 'signOutOidcSilent',
        removeOidcUser: 'removeOidcUser',
      }),
      signOut() {
        this.signOutOidcSilent()
        // this.removeOidcUser().then(() => {
        //   if(!this.$route.meta.isPublic) {
        //     this.$router.go(0)
        //   }
        // })
      },
      showForumInfo() {
        myCommunityService.getForumInfo().then(response => {
          console.log(response)
          if (response.code === 200) {
            this.$message.success('获取成功，' + response.message)
          } else {
            this.$message.error('获取失败，' + response.message)
          }
        })
      },
    },
    mounted() {
      console.log(this.$store)
    },
  }
</script>

<style scoped>

</style>
