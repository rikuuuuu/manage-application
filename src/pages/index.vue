<template>
  <div>
    <div>
      <menu-head :title="'管理画面'">
        <div class="home-container">
          <div class="sales-contents main-contents">
            <div class="sales-title flex">
              <h2>売り上げ</h2>
            </div>
            <All-sales :toppage="toppage" />
            <div class="flex bottom-contents">
              <div class="approval-contents">
                <div class="approval-title">
                  <h2>申請承認待ち</h2>
                </div>
                <div class="approval-contents-boxes flex">
                  <a href="/approval/all" class="links fansbox">
                    <div class="approval-contents-box box-shadow">
                      <div class="box-title">
                        <h3>購入者</h3>
                      </div>
                      <div class="box-value maincolor">
                        <div v-show="loading" class="loader"></div>
                        <div v-show="!loading">
                          <p>{{ apfans.length }}<span> 人</span></p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="/approval/all" class="links fansbox">
                    <div class="approval-contents-box box-shadow">
                      <div class="box-title">
                        <h3>出品者</h3>
                      </div>
                      <div class="box-value maincolor">
                        <div v-show="loading" class="loader"></div>
                        <div v-show="!loading">
                          <p>{{ aptalents.length }}<span> 人</span></p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="users-count-contents">
                <div class="users-count-title">
                  <h2>総ユーザー数</h2>
                </div>
                <div class="users-count-contents-boxes flex">
                  <a href="/fans/all" class="links fansbox">
                    <div class="users-count-contents-box box-shadow">
                      <div class="box-title">
                        <h3>購入者</h3>
                      </div>
                      <div class="box-value maincolor">
                        <div v-show="loading" class="loader"></div>
                        <div v-show="!loading">
                          <p>{{ fans.length }}<span> 人</span></p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="/talents/all" class="links fansbox">
                    <div class="users-count-contents-box box-shadow">
                      <div class="box-title">
                        <h3>出品者</h3>
                      </div>
                      <div class="box-value maincolor">
                        <div v-show="loading" class="loader"></div>
                        <div v-show="!loading">
                          <p>{{ talents.length }}<span> 人</span></p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </menu-head>
    </div>
  </div>
</template>

<script>
import MenuHead from '~/components/MenuHead'
import AllSales from '~/components/AllSales'

export default {
  components: {
    MenuHead,
    AllSales,
  },
  computed: {
    fans() {
      return this.$store.getters['fan/fans']
    },
    talents() {
      return this.$store.getters['talent/talents']
    },
    apfans() {
      return this.$store.getters['fan/apfans']
    },
    aptalents() {
      return this.$store.getters['talent/aptalents']
    },
  },
  data() {
    return {
      loading: true,
      toppage: true,
      pageloading: true,
    }
  },
  created() {},
  mounted() {
    this.$store.dispatch('talent/fetchTalents')
    this.$store.dispatch('fan/fetchFans')
    this.loading = false
  },
}
</script>

<style>
.home-container {
}

.sales-contents {
  max-width: 1200px;
}

.sales-title p {
  font-size: 14px;
  line-height: 35px;
}

.sales-contents-boxes {
}

.sales-contents-box {
}

.salesbox {
  width: 30%;
  margin-right: 40px;
}

.box-title {
  text-align: center;
}

.box-value {
  text-align: center;
  font-size: 32px;
}

.box-value p span {
  color: #666;
  font-size: 18px;
}

.bottom-contents {
  margin: 50px auto 50px;
}

.approval-contents {
  width: 40%;
  /* margin: 0 auto 50px; */
}

.approval-title {
}

.approval-contents-boxes {
}

.approval-contents-box {
  width: 100%;
}

.users-count-contents {
  width: 60%;
}

.users-count-contents-box {
  width: 100%;
}

.fansbox {
  width: 35%;
  margin-right: 40px;
}

@media (max-width: 769px) {
  .sales-contents-boxes {
    display: block;
  }

  .sales-contents-box {
    width: 60%;
    margin: 30px auto 0;
  }

  .bottom-contents {
    display: block;
  }

  .approval-contents-boxes {
  }

  .approval-contents {
    width: 100%;
  }

  .fansbox {
    margin: 0 auto;
  }

  .users-count-contents-boxes {
    display: block;
  }

  .users-count-contents {
    width: 100%;
    margin-top: 40px;
  }

  .users-count-contents-box {
    width: 60%;
    margin: 30px auto 0;
  }
}
</style>
