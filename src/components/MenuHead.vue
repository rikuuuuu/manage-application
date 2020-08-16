<template>
  <section class="container">
    <menu-bar />
    <div class="maincontent">
      <!-- <head-contents v-bind:title='title' @menubar="menubar"/>
      <slot/> -->
    </div>
  </section>
</template>

<script>
import MenuBar from '~/components/MenuBar'
// import HeadContents from '~/components/HeadContents'

export default {
  components: {
    MenuBar,
    // HeadContents
  },
  data() {
    return {
      // isMenu: false,
      // isAdminPartner: false
    }
  },
  // props: ['title'],
  mounted() {
    // const auth = this.$store.state.auth
    // const adminpartner = this.$store.state.adminpartner
    //
    // if (adminpartner !== null) {
    //   this.isAdminPartner = true
    //   return
    // }
    //
    // if (auth !== true) {
    //   return this.$router.push('/admin/login')
  },
  methods: {
    // menubar() {
    //   this.isMenu = true
    // },
    // close() {
    //   this.isMenu = false
    // },
  },
}
</script>

<style>
/* .menumodal {
  display: block;
  position: fixed;
  z-index: 30;
  overflow: hidden;
  animation-name: LeftToRight;
  animation-duration: 0.3s;
}

@keyframes LeftToRight {
  0% {
    transform: translateX(-256px);
  }
  100% {
    transform: translateX(0px);
  }
} */
</style>
