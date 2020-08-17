<template>
  <div class="">
    <div v-show="pageloading" class="loader center-loader"></div>
    <menu-head v-show="!pageloading" :title="'売り上げ一覧'">
      <div class="sales-contents main-contents">
        <div class="sales-title">
          <h2>累計</h2>
        </div>
        <All-sales />
        <div class="bottom-contents">
          <div class="sales-title flex">
            <button class="leftb" type="button" name="button">＜</button>
            <h2>0月</h2>
            <button class="rightb" type="button" name="button">＞</button>
          </div>
          <div class="">
            <transition>
              <div class="">
                <Month-Sales :currentMonth="currentMonth" />
              </div>
            </transition>
          </div>
        </div>
        <div class="">
          <h2>内訳</h2>
          <div class="label-container">
            <div class="flex listslabel">
              <p class="image">画像</p>
              <p>出品者名</p>
              <p>本名</p>
              <p class="sales-label">売上</p>
              <p class="sales-label">ポイント</p>
              <p class="talks-label">出品者数</p>
            </div>
          </div>
          <div v-show="!loading" class="talentssales-content">
            <!-- <ul class="lists list-box-shadow">
              <All-Talents :currentMonth="currentMonth" v-for="(talent, index) in talents" :paymentstate="paymentstate" :talentssale="talentssale" :key="index" :talent="talent" />
            </ul> -->
            <p class="no-talks">内訳はありません</p>
          </div>
        </div>
      </div>
    </menu-head>
  </div>
</template>

<script>
import MenuHead from '~/components/MenuHead'
import MonthSales from '~/components/MonthSales'
import AllSales from '~/components/AllSales'
// import AllTalents from '~/components/AllTalents'

export default {
  components: {
    MenuHead,
    MonthSales,
    AllSales,
    // AllTalents
  },
  data() {
    return {
      paymentstate: 'all',
      talentssale: true,
      loading: true,
      pageloading: false,
      currentMonth: '',
      sort: {
        key: '',
        isAsc: false,
      },
    }
  },
  computed: {
    // adminpartner() {
    //   return this.$store.getters['adminpartner']
    // },
    // talks() {
    //   return this.$store.getters['talk/talks']
    // },
    // payments() {
    //   return this.$store.getters['payment/payments']
    // },
    // talents() {
    //   var items = this.$store.getters['talent/talents']
    //
    //   var list = items.slice();
    //
    //   //売り上げのあるタレントのみを表示
    //   if (this.currentMonth) {
    //     list = list.filter(element => {
    //       var count = 0
    //       for ( var n in this.payments ) {
    //         var createdat = this.payments[n].pay.sentAt * 1000
    //         var createdMonth = this.$dayjs(createdat).format('YYYY / M')
    //         var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //         if (this.currentMonth === createdMonth && element.info.userid === paymenttalk.chat.talentId) {
    //           return element
    //         }
    //       }
    //     })
    //   }
    //
    //   // 売り上げ順で表示
    //   if (list) {
    //     list.sort((a, b) => {
    //       var salesa = 0
    //
    //       for ( var n in this.payments ) {
    //         var createdat = this.payments[n].pay.sentAt * 1000
    //         var createdMonth = this.$dayjs(createdat).format('YYYY / M')
    //         var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //         if (this.currentMonth === createdMonth && a.info.userid === paymenttalk.chat.talentId) {
    //           salesa += this.payments[n].pay.point
    //         }
    //       }
    //
    //       var salesb = 0
    //       for ( var n in this.payments ) {
    //         var createdat = this.payments[n].pay.sentAt * 1000
    //         var createdMonth = this.$dayjs(createdat).format('YYYY / M')
    //         var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //         if (this.currentMonth === createdMonth && b.info.userid === paymenttalk.chat.talentId) {
    //           salesb += this.payments[n].pay.point
    //         }
    //       }
    //
    //       a = salesa
    //       b = salesb
    //
    //       return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
    //     });
    //   }
    //
    //   return list
    // }
  },
  created() {
    // this.currentmonth()
    //
    // if (this.adminpartner !== null) {
    //
    //   var partnerid = this.adminpartner
    //   this.$store.dispatch('talent/fetchPartnersTalents', { partnerid })
    //
    // } else {
    //
    //   // this.$store.commit('payout/fleshPayouts') // 出金の変更対応
    //   // this.$store.dispatch('payout/fetchPayouts')
    //   // this.$store.dispatch('talk/fetchTalks')
    //   // this.$store.dispatch('talent/fetchTalents')
    //   // this.$store.dispatch('payment/fetchPayments')
    //
    // }
  },
  mounted() {
    this.pageloading = false
    this.loading = false
  },
  methods: {
    // sortBy: function(key) {
    //   this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
    //   this.sort.key = key;
    // },
    // sortedClass: function(key) {
    //   return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc' }` : '';
    // },
    // currentmonth() {
    //   var now = new Date;
    //   var month = this.$dayjs(now).format('YYYY / M')
    //   this.currentMonth = month
    // },
    // beforemonth() {
    //   this.currentMonth = this.$dayjs(this.currentMonth).add(-1, 'month').format('YYYY / M')
    // },
    // nextmonth() {
    //   this.currentMonth = this.$dayjs(this.currentMonth).add(1, 'month').format('YYYY / M')
    // }
  },
}
</script>

<style>
.sales-contents {
  max-width: 1200px;
}

.sales-title {
  padding-right: 40px;
}

.sales-title button {
  background-color: #fff;
  border-radius: 0px;
  color: #666;
  box-shadow: none;
}

.leftb {
  margin: 0 auto 0 0;
}

.rightb {
  margin: 0 0 0 auto;
}

.item {
  padding: 5px;
  overflow: hidden;
  animation-name: LeftToRight;
  animation-duration: 0.3s;
}

.listslabel {
  width: 95%;
  margin: 0 auto 20px;
}

.listslabel p {
  margin-left: 20px;
  width: 20%;
  color: #999;
}

.listslabel .image {
  width: 40px;
  margin: auto 0 auto 20px;
  text-align: center;
}

.listslabel .app {
  width: 10%;
}

.listslabel .sales-label {
  width: 12%;
  text-align: center;
}

.listslabel .talks-label {
  width: 9%;
  text-align: center;
}

@keyframes LeftToRight {
  0% {
    transform: translateX(-256px);
  }
  100% {
    transform: translateX(0px);
  }
}

/* .v-leave-active {
  position: absolute;
}
.v-enter {
  transform: translateX(-100%);
}
.v-leave-to {
  transform: translateX(100%);
} */

@media (max-width: 769px) {
  .sales-title {
    padding: 0;
  }

  .listslabel p {
    font-size: 12px;
    margin: auto;
  }

  .listslabel .image {
    margin: auto 0 auto 10px;
    width: 30px;
  }

  .listslabel .sales-label {
    width: 15%;
  }
}
</style>
