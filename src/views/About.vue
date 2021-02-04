<template>
  <div class="about">
    <h1 v-if="oidcIsAuthenticated">登录状态才能看到这句话</h1>
    <button v-if="!oidcIsAuthenticated" @click="authenticateOidc">Sign In</button>
    <button v-if="oidcIsAuthenticated" @click="signOut">Sign out</button>
    <br/>
    <button @click="showForumInfo">获取我的社区基础信息</button>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import myCommunityService from '../service/personal-center/my-community.service'

  export default {
    name: 'About',
    data() {
      return {}
    },
    computed: {
      ...mapGetters('oidcStore', {
        oidcIsAuthenticated: 'oidcIsAuthenticated',
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
        //   if (!this.$route.meta.isPublic) {
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
  }
</script>
