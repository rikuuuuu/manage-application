<template>
  <div class="">
    <div v-show="pageloading" class="loader center-loader"></div>
    <menu-head v-show="!pageloading" :title="'購入者一覧'">
      <div class="home-container">
        <div class="fans-contents main-contents">
          <div class="fans-title flex">
            <h2>{{ fanstate }}</h2>
            <p class="lengthlabel">0人</p>
            <div class="reflesh">
              <button
                class="nbutton"
                type="button"
                name="button"
                @click="reflesh"
              >
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
                type="text"
                name=""
                value=""
                v-model="selectName"
                placeholder="購入者名 検索"
              />
              <div class="sort">
                <button
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
            <div v-show="fanspayment" class="tabs-left tabs-content">
              <button
                type="button"
                name="button"
                class="nbutton"
                @click="fansPayment"
              >
                ＜ 購入者一覧
              </button>
            </div>
            <div v-show="fansall" class="tabs-right tabs-content">
              <button
                type="button"
                name="button"
                class="nbutton"
                @click="fansAll"
              >
                購入者ごとの購入 ＞
              </button>
            </div>
          </div>
          <div class="flex listslabel">
            <p class="image">画像</p>
            <p>購入者名</p>
            <p>本名</p>
            <p v-show="!fanspayment" class="app">承認</p>
            <p v-show="!fanspayment" class="fanid">購入者ID</p>
            <p v-show="fanspayment" class="sales-label">売上</p>
            <p v-show="fanspayment" class="sales-label">ポイント</p>
            <p v-show="fanspayment" class="talks-label">レッスン数</p>
          </div>
          <div v-show="loading" class="loader"></div>
          <div v-show="!loading && fansall" class="fansall-content">
            <ul v-show="fans.length !== 0" class="lists list-box-shadow">
              <All-Fans v-for="(fan, index) in fans" :key="index" :fan="fan" />
            </ul>
            <p v-show="fans.length === 0" class="no-talks">
              購入者が存在しません
            </p>
          </div>
          <!-- <div v-show="!loading && fanspayment" class="fanspayment-content">
            <ul v-show="fans.length !== 0" class="lists list-box-shadow">
              <All-Fans v-bind:purchasestate="purchasestate" v-bind:fanspayment="fanspayment" v-for="(fan, index) in fans" :key="index" :fan="fan" />
            </ul>
            <p class="no-talks">
              購入者が存在しません
            </p>
          </div> -->
        </div>
      </div>
    </menu-head>
  </div>
</template>

<script>
import MenuHead from '~/components/MenuHead'
import AllFans from '~/components/AllFans'

export default {
  components: {
    MenuHead,
    AllFans,
  },
  data() {
    return {
      // all, day, week, month
      purchasestate: 'all',
      fansall: true,
      fanspayment: false,
      fanstate: '購入者',
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
    // payments() {
    //   return this.$store.getters['payment/payments']
    // },
    fans() {
      const items = this.$store.getters['fan/fans']

      let list = items.slice()

      if (this.sort.key) {
        list.sort((a, b) => {
          a = a.info[this.sort.key]
          b = b.info[this.sort.key]

          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
        })
      }

      if (this.selectName) {
        list = list.filter((element) => {
          if (element.info.nickName) {
            if (element.info.nickName.includes(this.selectName) !== -1) {
              return element.info.nickName
            }
          }
        })
      }

      // ファン購入の方
      // if (this.fanspayment) {
      //
      //   var today = this.$dayjs().format('YYYY/MM/DD')
      //   var thismonth = this.$dayjs().format('YYYY/MM')
      //   var thisweek = this.$dayjs().startOf('week').format('YYYY/MM/DD')
      //
      //   switch (this.purchasestate) {
      //     case 'all':
      //
      //       // 購入あるファンのみ表示
      //       list = list.filter(element => {
      //         for ( var n in this.payments ) {
      //           // 0円を含めない
      //           if (element.info.userid === this.payments[n].pay.userId && this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
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
      //           if (a.info.userid === this.payments[n].pay.userId && this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
      //             salesa += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
      //           }
      //           if (b.info.userid === this.payments[n].pay.userId && this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
      //             salesb += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
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
      //           if (element.info.userid === this.payments[n].pay.userId && today === createdday) {
      //             if (this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
      //               return element
      //             }
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
      //           var createdat = this.payments[n].pay.sentAt * 1000
      //           var createdday = this.$dayjs(createdat).format('YYYY/MM/DD')
      //           if (a.info.userid === this.payments[n].pay.userId && today === createdday && this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
      //             salesa += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
      //           }
      //           if (b.info.userid === this.payments[n].pay.userId && today === createdday && this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
      //             salesb += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
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
      //           if (element.info.userid === this.payments[n].pay.userId && thisweek === createdday && this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
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
      //           if (a.info.userid === this.payments[n].pay.userId && thisweek === createdday) {
      //             salesa += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
      //           }
      //           if (b.info.userid === this.payments[n].pay.userId && thisweek === createdday && this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
      //             salesb += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
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
      //           if (element.info.userid === this.payments[n].pay.userId && thismonth === createdday && this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
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
      //           if (a.info.userid === this.payments[n].pay.userId && thismonth === createdday && this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
      //             salesa += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
      //           }
      //           if (b.info.userid === this.payments[n].pay.userId && thismonth === createdday && this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
      //             salesb += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
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
      // // ファン登録の方
      // if (!this.fanspayment) {
      //
      //   if (this.selecttoday) {
      //     list = list.filter(element => {
      //       if ( element.info.joined ) {
      //         const createdat = this.$dayjs(element.info.joined * 1000).format('YYYY/MM/DD')
      //         const dayjsnow = this.$dayjs().format('YYYY/MM/DD')
      //         if (createdat == dayjsnow) {
      //           return element.info.joined
      //         }
      //       }
      //     })
      //   }
      //
      //   if (this.selectweek) {
      //     list = list.filter(element => {
      //       if ( element.info.joined ) {
      //         const createdat = this.$dayjs(element.info.joined * 1000).startOf('week').format('YYYY/MM/DD')
      //         const dayjsnow = this.$dayjs().startOf('week').format('YYYY/MM/DD')
      //         if (createdat == dayjsnow) {
      //           return element.info.joined
      //         }
      //       }
      //     })
      //   }
      //
      //   if (this.selectmonth) {
      //     list = list.filter(element => {
      //       if ( element.info.joined ) {
      //         const createdat = this.$dayjs(element.info.joined * 1000).format('YYYY/MM')
      //         const dayjsnow = this.$dayjs().format('YYYY/MM')
      //         if (createdat == dayjsnow) {
      //           return element.info.joined
      //         }
      //       }
      //     })
      //   }
      //
      // }

      return list
    },
  },
  created() {},
  mounted() {
    this.$store.dispatch('fan/fetchFans')
    // this.$store.dispatch('payment/fetchPayments')
    // this.$store.dispatch('talk/fetchTalks')

    this.pageloading = false
    this.loading = false
  },
  methods: {
    reflesh() {
      // this.$store.commit('fan/fleshFans')
      // this.$store.commit('fan/fleshapFans')
      // this.$store.dispatch('fan/fetchFans')
      // this.$store.dispatch('payment/fetchPayments')
      // this.$store.dispatch('talk/fetchTalks')
    },
    sortBy(key) {
      // this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
      // this.sort.key = key
    },
    sortedClass(key) {
      // return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc' }` : ''
    },
    fansAll() {
      this.allfalse()
      this.fansall = false
      this.fanspayment = true
      this.fanstate = '購入者購入'
      this.sort.key = ''
    },
    fansPayment() {
      this.allfalse()
      this.fansall = true
      this.fanspayment = false
      this.fanstate = '累計購入者'
    },
    purchasechange(val) {
      if (this.fanspayment) {
        this.purchasestate = val
      }
    },
    fanstatechange(val, value) {
      if (!this.fanspayment) {
        this.fanstate = val
      } else if (this.fanspayment) {
        this.fanstate = value
      }
    },
    allfalse() {
      this.allday = false
      this.selecttoday = false
      this.selectweek = false
      this.selectmonth = false
    },
    alldays() {
      this.allfalse()
      this.allday = true
      this.fanstate = '累計購入者'
      this.fanstatechange('累計購入者', '購入者購入')
      this.purchasechange('all')
    },
    month() {
      this.allfalse()
      this.selectmonth = true
      this.fanstate = '今月登録購入者数'
      this.fanstatechange('今月登録購入者数', '今月購入者購入')
      this.purchasechange('month')
    },
    week() {
      this.allfalse()
      this.selectweek = true
      this.fanstate = '今週登録購入者数'
      this.fanstatechange('今週登録購入者数', '今週購入者購入')
      this.purchasechange('week')
    },
    today() {
      this.allfalse()
      this.selecttoday = true
      this.fanstate = '今日登録購入者数'
      this.fanstatechange('今日登録購入者数', '今日購入者購入')
      this.purchasechange('day')
    },
  },
}
</script>

<style>
.listslabel {
  margin: 0 auto 20px;
  width: 95%;
  padding: 5px;
}

.listslabel p {
  margin-left: 20px;
  width: 20%;
  color: #999;
}

.listslabel .image {
  width: 40px;
  margin: auto 0 auto 20px;
}

.listslabel .app {
  width: 10%;
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

.listslabel .sales-label {
  width: 12%;
  text-align: center;
}

.listslabel .talks-label {
  width: 9%;
  text-align: center;
}

.fansall-content {
  padding: 8px;
  overflow: hidden;
  /* animation-name: LeftToRight; */
  animation-name: slideInLeft;
  animation-duration: 0.3s;
  animation-timing-function: ease;
}

.fanspayment-content {
  padding: 8px;
  overflow: hidden;
  /* animation-name: RightToLeft; */
  animation-name: slideInRight;
  animation-duration: 0.3s;
  animation-timing-function: ease;
}

@media (max-width: 769px) {
}
</style>
