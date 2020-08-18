<template>
  <div class="">
    <div v-show="pageloading" class="loader center-loader"></div>
    <menu-head v-show="!pageloading" :title="'出品者一覧'">
      <div class="home-container">
        <div class="talents-contents main-contents">
          <div class="talents-title flex">
            <h2>{{ talentstate }}</h2>
            <p class="lengthlabel">0人</p>
            <div v-show="allday" class="reflesh">
              <button class="nbutton" type="button" name="button">
                <img src="/reload.png" alt="" />
              </button>
            </div>
            <div class="search flex">
              <div class="sort flex">
                <button
                  type="button"
                  name="button"
                  :class="{ selectedday: allday }"
                  @click="alldays"
                >
                  全て
                </button>
                <button
                  type="button"
                  name="button"
                  :class="{ selectedday: selecttoday }"
                  @click="today"
                >
                  今日
                </button>
                <button
                  type="button"
                  name="button"
                  :class="{ selectedday: selectweek }"
                  @click="week"
                >
                  今週
                </button>
                <button
                  type="button"
                  name="button"
                  :class="{ selectedday: selectmonth }"
                  @click="month"
                >
                  今月
                </button>
              </div>
              <input
                v-model="selectName"
                type="text"
                name=""
                value=""
                placeholder="出品者名 検索"
              />
              <div class="sort">
                <button
                  v-if="!talentssale"
                  :class="sortedClass('joined')"
                  type="button"
                  name="button"
                  @click="sortBy('joined')"
                >
                  新着順
                </button>
              </div>
            </div>
          </div>
          <div class="tabs-container">
            <div v-show="talentssale" class="tabs-left tabs-content">
              <button
                type="button"
                name="button"
                class="nbutton"
                @click="talentssales"
              >
                ＜ 出品者一覧
              </button>
            </div>
            <div v-show="talentsall" class="tabs-right tabs-content">
              <button
                type="button"
                name="button"
                class="nbutton"
                @click="talentsAll"
              >
                出品者毎の売上 ＞
              </button>
            </div>
          </div>
          <div class="label-container">
            <div class="flex listslabel">
              <p class="image">画像</p>
              <p>出品者名</p>
              <p>本名</p>
              <p v-show="!talentssale" class="app">承認</p>
              <p v-show="!talentssale">出品者ID</p>
              <p v-show="talentssale" class="sales-label">売上</p>
              <p v-show="talentssale" class="sales-label">ポイント</p>
              <p v-show="talentssale" class="talks-label">レッスン数</p>
            </div>
          </div>
          <div v-show="loading" class="loader"></div>
          <div v-show="!loading && talentsall" class="talentsall-content">
            <ul v-show="talents.length !== 0" class="lists list-box-shadow">
              <All-Talents
                v-for="(talent, index) in talents"
                :key="index"
                :talent="talent"
              />
            </ul>
            <p v-show="talents.length === 0" class="no-talks">
              出品者が存在しません
            </p>
          </div>
          <!-- <div v-show="!loading && talentssale" class="talentssales-content">
            <ul v-show="talents.length !== 0" class="lists list-box-shadow">
              <All-Talents v-for="(talent, index) in talents" v-bind:paymentstate="paymentstate" v-bind:talentssale="talentssale" :key="index" :talent="talent" />
            </ul>
            <p class="no-talks">
              出品者が存在しません
            </p>
          </div> -->
        </div>
      </div>
    </menu-head>
  </div>
</template>

<script>
import MenuHead from '~/components/MenuHead'
import AllTalents from '~/components/AllTalents'

export default {
  components: {
    MenuHead,
    AllTalents,
  },
  data() {
    return {
      // all, day, week, month
      paymentstate: 'all',
      talentstate: '累計出品者',
      talentsall: true,
      talentssale: false,
      allday: false,
      selecttoday: false,
      selectweek: false,
      selectmonth: false,
      loading: false,
      pageloading: false,
      selectName: '',
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
    talents() {
      const items = this.$store.getters['talent/talents']
      // const payments = this.payments

      let list = items.slice()

      if (this.sort.key) {
        list.sort((a, b) => {
          a = a.info[this.sort.key]
          b = b.info[this.sort.key]

          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
        })
      }

      // タレント売り上げの方
      // if (this.talentssale) {
      //
      //   var today = this.$dayjs().format('YYYY/MM/DD')
      //   var thismonth = this.$dayjs().format('YYYY/MM')
      //   var thisweek = this.$dayjs().startOf('week').format('YYYY/MM/DD')
      //
      //   switch (this.paymentstate) {
      //     case 'all':
      //
      //       // 売り上げあるタレントのみ表示
      //       list = list.filter(element => {
      //         if (this.payments.find(p => p.pay.talentId === element.info.userid)) {
      //           return element
      //         }
      //       })
      //
      //       list.sort((a, b) => {
      //
      //         var salesa = 0
      //         var salesb = 0
      //
      //         for ( var n in this.payments ) {
      //           if (a.info.userid === this.payments[n].pay.talentId) {
      //             salesa += this.payments[n].pay.balance
      //           }
      //           if (b.info.userid === this.payments[n].pay.talentId) {
      //             salesb += this.payments[n].pay.balance
      //           }
      //         }
      //
      //         a = salesa
      //         b = salesb
      //
      //         return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
      //       });
      //
      //       break;
      //     case 'day':
      //
      //       list = list.filter(element => {
      //         for ( var n in this.payments ) {
      //           var createdday = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY/MM/DD')
      //           if (element.info.userid === this.payments[n].pay.talentId && today === createdday) {
      //             return element
      //           }
      //         }
      //       })
      //
      //       list.sort((a, b) => {
      //
      //         var salesa = 0
      //         var salesb = 0
      //
      //         for ( var n in this.payments ) {
      //           var createdday = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY/MM/DD')
      //           if (a.info.userid === this.payments[n].pay.talentId && today === createdday) {
      //             salesa += this.payments[n].pay.balance
      //           }
      //           if (b.info.userid === this.payments[n].pay.talentId && today === createdday) {
      //             salesb += this.payments[n].pay.balance
      //           }
      //         }
      //
      //         a = salesa
      //         b = salesb
      //
      //         return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
      //       });
      //       break;
      //     case 'week':
      //
      //       list = list.filter(element => {
      //         for ( var n in this.payments ) {
      //           var createdday = this.$dayjs(this.payments[n].pay.sentAt * 1000).startOf('week').format('YYYY/MM/DD')
      //           if (element.info.userid === this.payments[n].pay.talentId && thisweek === createdday) {
      //             return element
      //           }
      //         }
      //       })
      //
      //       list.sort((a, b) => {
      //
      //         var salesa = 0
      //         var salesb = 0
      //
      //         for ( var n in this.payments ) {
      //           var createdday = this.$dayjs(this.payments[n].pay.sentAt * 1000).startOf('week').format('YYYY/MM/DD')
      //           if (a.info.userid === this.payments[n].pay.talentId && thisweek === createdday) {
      //             salesa += this.payments[n].pay.balance
      //           }
      //           if (b.info.userid === this.payments[n].pay.talentId && thisweek === createdday) {
      //             salesb += this.payments[n].pay.balance
      //           }
      //         }
      //
      //         a = salesa
      //         b = salesb
      //
      //         return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
      //       });
      //       break;
      //     case 'month':
      //
      //       list = list.filter(element => {
      //         for ( var n in this.payments ) {
      //           var createdday = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY/MM')
      //           if (element.info.userid === this.payments[n].pay.talentId && thismonth === createdday) {
      //             return element
      //           }
      //         }
      //       })
      //
      //       list.sort((a, b) => {
      //
      //         var salesa = 0
      //         var salesb = 0
      //
      //         for ( var n in this.payments ) {
      //           var createdday = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY/MM')
      //           if (a.info.userid === this.payments[n].pay.talentId && thismonth === createdday) {
      //             salesa += this.payments[n].pay.balance
      //           }
      //           if (b.info.userid === this.payments[n].pay.talentId && thismonth === createdday) {
      //             salesb += this.payments[n].pay.balance
      //           }
      //         }
      //
      //         a = salesa
      //         b = salesb
      //
      //         return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
      //       });
      //       break;
      //     default:
      //   }
      // }
      //
      // // タレント登録の方
      // if (!this.talentssale) {
      //
      //   if (this.selecttoday) {
      //     list = list.filter(element => {
      //       const createdat = this.$dayjs(element.info.joined * 1000).format('YYYY/MM/DD')
      //       const dayjsnow = this.$dayjs().format('YYYY/MM/DD')
      //       if (createdat == dayjsnow) {
      //         return element
      //         }
      //     })
      //   }
      //
      //   if (this.selectweek) {
      //     list = list.filter(element => {
      //       const createdat = this.$dayjs(element.info.joined * 1000).startOf('week').format('YYYY/MM/DD')
      //       const dayjsnow = this.$dayjs().startOf('week').format('YYYY/MM/DD')
      //       if (createdat == dayjsnow) {
      //         return element
      //       }
      //     })
      //   }
      //
      //   if (this.selectmonth) {
      //     list = list.filter(element => {
      //       const createdat = this.$dayjs(element.info.joined * 1000).format('YYYY/MM')
      //       const dayjsnow = this.$dayjs().format('YYYY/MM')
      //       if (createdat == dayjsnow) {
      //         return element
      //       }
      //     })
      //   }
      //
      if (this.selectName) {
        list = list.filter((element) => {
          if (element.info.nickName) {
            if (element.info.nickName.includes(this.selectName)) {
              return element.info.nickName
            }
          }
        })
      }
      //
      // }

      return list
    },
  },
  created() {
    // if (this.adminpartner !== null) {
    //
    //   var partnerid = this.adminpartner
    //   this.$store.dispatch('talent/fetchPartnersTalents', { partnerid })
    //
    // } else {
    //
    this.$store.dispatch('talent/fetchTalents')
    //   // this.$store.dispatch('payment/fetchPayments')
    //   // this.$store.dispatch('talk/fetchTalks')
    //
    // }
  },
  mounted() {
    this.pageloading = false
    this.loading = false
  },
  methods: {
    reflesh() {
      // this.$store.commit('talent/fleshTalents')
      // this.$store.commit('talent/fleshapTalents')
      // if (this.adminpartner !== null) {
      //   var partnerid = this.adminpartner
      //   this.$store.dispatch('talent/fetchPartnersTalents', { partnerid })
      // } else {
      //   this.$store.dispatch('talent/fetchTalents')
      //   this.$store.dispatch('payment/fetchPayments')
      //   this.$store.dispatch('talk/fetchTalks')
      // }
    },
    talentsAll() {
      this.allfalse()
      this.talentsall = false
      this.talentssale = true
      this.talentstate = '出品者売上'
      this.sort.key = ''
    },
    talentssales() {
      this.allfalse()
      this.talentsall = true
      this.talentssale = false
      this.talentstate = '累計出品者'
    },
    allfalse() {
      this.allday = false
      this.selecttoday = false
      this.selectweek = false
      this.selectmonth = false
    },
    paystatechange(val) {
      if (this.talentssale) {
        this.paymentstate = val
      }
    },
    talentstatechange(val, value) {
      if (!this.talentssale) {
        this.talentstate = val
      } else if (this.talentssale) {
        this.talentstate = value
      }
    },
    alldays() {
      this.allfalse()
      this.allday = true
      this.talentstatechange('累計出品者', '出品者売上')
      this.paystatechange('all')
    },
    month() {
      this.allfalse(this.selectmonth)
      this.selectmonth = true
      this.talentstatechange('今月の登録出品者', '今月出品者売上')
      this.paystatechange('month')
    },
    week() {
      this.allfalse()
      this.selectweek = true
      this.talentstatechange('今週の登録出品者', '今週出品者売上')
      this.paystatechange('week')
    },
    today() {
      this.allfalse()
      this.selecttoday = true
      this.talentstatechange('今日の登録出品者', '今日出品者売上')
      this.paystatechange('day')
    },
    sortBy(key) {
      // this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
      // this.sort.key = key;
    },
    sortedClass(key) {
      // return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc' }` : '';
    },
  },
}
</script>

<style>
.talents-title {
  padding: 0 8px;
}

.tabs-container {
  padding: 0 8px;
}

.label-container {
  padding: 0 8px;
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

.tabs-content {
  margin-bottom: 30px;
}

.tabs-right {
  text-align: right;
}

.tabs-left button {
  color: #999;
}

.tabs-right button {
  color: #999;
}

.talentsall-content {
  padding: 8px;
  overflow: hidden;
  /* animation-name: LeftToRight; */
  animation-name: slideInLeft;
  animation-duration: 0.3s;
  animation-timing-function: ease;
}

.talentssales-content {
  padding: 8px;
  overflow: hidden;
  /* animation-name: RightToLeft; */
  animation-name: slideInRight;
  animation-duration: 0.3s;
  animation-timing-function: ease;
}

@media (max-width: 769px) {
  h2 {
    margin-bottom: 15px;
  }

  .talents-title {
    display: block;
  }

  .lengthlabel {
    margin-left: 0;
    margin-bottom: 15px;
    padding-left: 7px;
  }

  .search {
    display: block !important;
  }

  .search input {
    margin-bottom: 10px;
  }

  .sort {
    margin-bottom: 15px;
  }

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

  .t-list .approval {
    width: 15%;
  }
}
</style>
