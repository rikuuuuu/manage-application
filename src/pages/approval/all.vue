<template>
  <div class="">
    <div v-show="pageloading" class="loader center-loader"></div>
    <menu-head v-show="!pageloading" v-bind:title="'申請承認待ち'">
      <div class="home-container">
        <div class="approval-contents main-contents">
          <div class="approval-title flex">
            <h2>購入者</h2>
            <p>{{ apfans.length }}人</p>
          </div>
          <div v-show="loading" class="loader"></div>
          <div v-show="!loading">
            <div class="approval-contents-boxes flex calusel">
              <Ap-Fan v-for="(fan, index) in apfans" :key="index" :fan="fan" />
            </div>
            <p v-show="apfans.length === 0" class="no-fans">
              申請待ちの購入者はいません
            </p>
          </div>
        </div>
        <div class="approval-contents main-contents">
          <div class="approval-title flex">
            <h2>出品者</h2>
            <p>{{ aptalents.length }}人</p>
          </div>
          <div v-show="talentsloading" class="loader"></div>
          <div v-show="!talentsloading">
            <div class="approval-contents-boxes flex calusel">
              <Ap-Talent
                v-for="(talent, index) in aptalents"
                :key="index"
                :talent="talent"
              />
            </div>
            <p v-show="aptalents.length === 0" class="no-fans">
              申請待ちの出品者はいません
            </p>
          </div>
        </div>
      </div>
    </menu-head>
  </div>
</template>

<script>
import MenuHead from '~/components/MenuHead'
import ApFan from '~/components/ApFan'
import ApTalent from '~/components/ApTalent'

export default {
  components: {
    MenuHead,
    ApFan,
    ApTalent,
  },
  data() {
    return {
      loading: false,
      talentsloading: true,
      pageloading: false,
    }
  },
  computed: {
    apfans() {
      return this.$store.getters['fan/apfans']
    },
    aptalents() {
      return this.$store.getters['talent/aptalents']
    },
  },
  created() {
    // this.$store.commit('fan/fleshapFans')
    // this.$store.commit('talent/fleshapTalents')
    //
    this.$store.dispatch('fan/fetchFans')
    this.$store.dispatch('talent/fetchTalents')
    this.talentsloading = false
    this.pageloading = false
    this.loading = false
  },
  mounted() {},
  methods: {},
}
</script>

<style>
.approval-contents {
  max-width: none;
  margin: 0 0 50px 0;
  width: 100%;
}

.approval-title {
  width: 95%;
  margin: 0 auto;
}

.approval-title p {
  margin-left: 20px;
  font-size: 18px;
  line-height: 30px;
}

.calusel {
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  white-space: nowrap;
  padding: 10px 0;
}

.no-fans {
  width: 95%;
  margin: 0 auto;
}

@media (max-width: 769px) {
  .calusel {
    width: 100vw;
  }
}
</style>
