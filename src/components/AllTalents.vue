<template>
  <li class="flex t-list">
    <!-- <button class="nbutton maincolor regist-btn" type="button" name="button" @click="registbtn">登録</button> -->
    <!-- <nuxt-link :to="{ name: 'talents-id', params: { id: talent.info.userid }}" class="links list-a flex"> -->
    <img v-if="talent.info.profileLink" :src="talent.info.profileLink" alt="" />
    <img v-else src="/nuxt.png" alt="" />
    <p v-if="talent.info.nickName" class="fansname">
      {{ talent.info.nickName }}
    </p>
    <p v-else class="fansname">未記入</p>
    <p v-if="talent.info.familyName + talent.info.givenName" class="realname">
      {{ talent.info.familyName + talent.info.givenName }}
    </p>
    <p v-else class="realname">未記入</p>
    <p class="approval">{{ status }}</p>
    <p class="userid">
      {{ talent.info.userid }}
    </p>
    <!-- <p class="payments" v-if="talentssale && payments">{{ prices.toLocaleString() + '円' }}</p>
    <p class="payments" v-if="talentssale && !payments">0円</p>
    <p class="payments" v-if="talentssale && payments">{{ Math.round(prices / 2).toLocaleString() + 'P' }}</p>
    <p class="payments" v-if="talentssale && !payments">0P</p>
    <p class="talks" v-if="talentssale && payments">{{ length }}回</p> -->
    <!-- </nuxt-link> -->
  </li>
</template>

<script>
export default {
  props: [
    'talent',
    // 'talentssale',
    // 'paymentstate',
    // 'currentMonth',
    // 'regist',
    // 'pid'
  ],
  computed: {
    // ptalent() {
    //   if (this.talent.info.partnerId === this.pid) {
    //     return false
    //   }
    //   return true
    // },
    status() {
      let status
      if (!this.talent.info.authStatus) {
        status = 'データなし'
      } else {
        switch (this.talent.info.authStatus) {
          case 0:
            status = '未提出'
            break
          case 1:
            status = '提出済み'
            break
          case 2:
            status = '不通過'
            break
          case 3:
            status = '通過'
            break
          default:
        }
      }
      return status
    },
    // payments() {
    //   return this.$store.getters['payment/payments']
    // },
    // talks() {
    //   return this.$store.getters['talk/talks']
    // },
    // prices() {
    //
    //   var sales = 0
    //
    //   if (this.currentMonth) {
    //
    //     for ( var n in this.payments ) {
    //       var createdMonth = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY / M')
    //       var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //       if (this.currentMonth === createdMonth && this.talent.info.userid === paymenttalk.chat.talentId ) {
    //         sales += this.payments[n].pay.balance
    //       }
    //     }
    //
    //   } else {
    //
    //     var today = this.$dayjs().format('YYYY/MM/DD')
    //     var thismonth = this.$dayjs().format('YYYY/MM')
    //     var thisweek = this.$dayjs().startOf('week').format('YYYY/MM/DD')
    //
    //     switch (this.paymentstate) {
    //       case 'all':
    //         for ( var n in this.payments ) {
    //           var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //           if (this.talent.info.userid === paymenttalk.chat.talentId ) {
    //             sales += this.payments[n].pay.balance
    //           }
    //         }
    //         break;
    //       case 'day':
    //         for ( var n in this.payments ) {
    //           var paytime = this.payments[n].pay.sentAt * 1000
    //           var dayjspaytime = this.$dayjs(paytime).format('YYYY/MM/DD')
    //           var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //           if (this.talent.info.userid === paymenttalk.chat.talentId && today === dayjspaytime) {
    //             sales += this.payments[n].pay.balance
    //           }
    //         }
    //         break;
    //       case 'week':
    //         for ( var n in this.payments ) {
    //           var paytime = this.payments[n].pay.sentAt * 1000
    //           var dayjspaytime = this.$dayjs(paytime).startOf('week').format('YYYY/MM/DD')
    //           var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //           if (this.talent.info.userid === paymenttalk.chat.talentId && thisweek === dayjspaytime) {
    //             sales += this.payments[n].pay.balance
    //           }
    //         }
    //         break;
    //       case 'month':
    //         for ( var n in this.payments ) {
    //           var paytime = this.payments[n].pay.sentAt * 1000
    //           var dayjspaytime = this.$dayjs(paytime).format('YYYY/MM')
    //           var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //           if (this.talent.info.userid === paymenttalk.chat.talentId && thismonth === dayjspaytime) {
    //             sales += this.payments[n].pay.balance
    //           }
    //         }
    //         break;
    //       default:
    //     }
    //
    //   }
    //
    //   return sales
    // },
    // // いったん保留 paymentの中にpointはないし、売上半分にするだけなので
    // // points() {
    // //   var sales = 0
    // //
    // //   if (this.currentMonth) {
    // //
    // //     for ( var n in this.payments ) {
    // //       // 0円トークを省く
    // //       if (this.payments[n].pay.point !== 0) {
    // //         var createdat = this.payments[n].pay.purchaseTime * 1000
    // //         var createdMonth = this.$dayjs(createdat).format('YYYY / M')
    // //         var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    // //         if (this.currentMonth === createdMonth && this.talent.info.userid === paymenttalk.chat.talentId ) {
    // //           sales += this.payments[n].pay.point * 2
    // //         }
    // //       }
    // //     }
    // //
    // //   } else {
    // //
    // //     var today = this.$dayjs().format('YYYY/MM/DD')
    // //     var thismonth = this.$dayjs().format('YYYY/MM')
    // //     var thisweek = this.$dayjs().startOf('week').format('YYYY/MM/DD')
    // //
    // //     switch (this.paymentstate) {
    // //       case 'all':
    // //         for ( var n in this.payments ) {
    // //           if (this.payments[n].pay.point !== 0) {
    // //             var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    // //             if (this.talent.info.userid === paymenttalk.chat.talentId ) {
    // //               sales += this.payments[n].pay.point * 2
    // //             }
    // //           }
    // //         }
    // //         break;
    // //       case 'day':
    // //         for ( var n in this.payments ) {
    // //           if (this.payments[n].pay.point !== 0) {
    // //             var paytime = this.payments[n].pay.purchaseTime * 1000
    // //             var dayjspaytime = this.$dayjs(paytime).format('YYYY/MM/DD')
    // //             var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    // //             if (this.talent.info.userid === paymenttalk.chat.talentId && today === dayjspaytime) {
    // //               sales += this.payments[n].pay.point
    // //             }
    // //           }
    // //         }
    // //         break;
    // //       case 'week':
    // //         for ( var n in this.payments ) {
    // //           if (this.payments[n].pay.point !== 0) {
    // //             var paytime = this.payments[n].pay.purchaseTime * 1000
    // //             var dayjspaytime = this.$dayjs(paytime).startOf('week').format('YYYY/MM/DD')
    // //             var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    // //             if (this.talent.info.userid === paymenttalk.chat.talentId && thisweek === dayjspaytime) {
    // //               sales += this.payments[n].pay.point
    // //             }
    // //           }
    // //         }
    // //         break;
    // //       case 'month':
    // //         for ( var n in this.payments ) {
    // //           if (this.payments[n].pay.point !== 0) {
    // //             var paytime = this.payments[n].pay.purchaseTime * 1000
    // //             var dayjspaytime = this.$dayjs(paytime).format('YYYY/MM')
    // //             var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    // //             if (this.talent.info.userid === paymenttalk.chat.talentId && thismonth === dayjspaytime) {
    // //               sales += this.payments[n].pay.point
    // //             }
    // //           }
    // //         }
    // //         break;
    // //       default:
    // //     }
    // //   }
    // //
    // //   return sales.toLocaleString()
    // // },
    // length() {
    //   var count = 0
    //
    //   if (this.currentMonth) {
    //
    //     for ( var n in this.payments ) {
    //       // 0円トークをカウントしない
    //       if (this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
    //         var createdat = this.payments[n].pay.sentAt * 1000
    //         var createdMonth = this.$dayjs(createdat).format('YYYY / M')
    //         var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //         if (this.currentMonth === createdMonth && this.talent.info.userid === paymenttalk.chat.talentId ) {
    //           count += 1
    //         }
    //       }
    //     }
    //
    //   } else {
    //
    //     var today = this.$dayjs().format('YYYY/MM/DD')
    //     var thismonth = this.$dayjs().format('YYYY/MM')
    //     var thisweek = this.$dayjs().startOf('week').format('YYYY/MM/DD')
    //
    //     switch (this.paymentstate) {
    //       case 'all':
    //         for ( var n in this.payments ) {
    //           if (this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
    //             var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //             if (this.talent.info.userid === paymenttalk.chat.talentId ) {
    //               count += 1
    //             }
    //           }
    //         }
    //         break;
    //       case 'day':
    //         for ( var n in this.payments ) {
    //           if (this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
    //             var paytime = this.payments[n].pay.sentAt * 1000
    //             var dayjspaytime = this.$dayjs(paytime).format('YYYY/MM/DD')
    //             var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //             if (this.talent.info.userid === paymenttalk.chat.talentId && today === dayjspaytime) {
    //               count += 1
    //             }
    //           }
    //         }
    //         break;
    //       case 'week':
    //         for ( var n in this.payments ) {
    //           if (this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
    //             var paytime = this.payments[n].pay.sentAt * 1000
    //             var dayjspaytime = this.$dayjs(paytime).startOf('week').format('YYYY/MM/DD')
    //             var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //             if (this.talent.info.userid === paymenttalk.chat.talentId && thisweek === dayjspaytime) {
    //               count += 1
    //             }
    //           }
    //         }
    //         break;
    //       case 'month':
    //         for ( var n in this.payments ) {
    //           if (this.payments[n].pay.price && this.payments[n].pay.price !== 0) {
    //             var paytime = this.payments[n].pay.sentAt * 1000
    //             var dayjspaytime = this.$dayjs(paytime).format('YYYY/MM')
    //             var paymenttalk = this.talks.find(p => p.chat.tid === this.payments[n].pay.talkId)
    //             if (this.talent.info.userid === paymenttalk.chat.talentId && thismonth === dayjspaytime) {
    //               count += 1
    //             }
    //           }
    //         }
    //         break;
    //       default:
    //     }
    //   }
    //
    //   return count
    // }
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style>
.lists li:last-child {
  border: none;
}

.t-list {
  border-bottom: 2px solid #eee;
  line-height: 55px;
  width: 95%;
  margin: 0 auto;
}

.t-list img {
  width: 40px;
  height: 40px;
  margin: auto 0 auto 20px;
  border-radius: 50%;
}

.t-list p {
  margin-left: 20px;
  width: 20%;
}

.t-list .approval {
  width: 10%;
}

.t-list .payments {
  width: 12%;
  text-align: right;
}

.t-list .talks {
  width: 9%;
  text-align: right;
}

.t-list .regist-btn {
  line-height: 55px;
  margin-left: -110px;
  padding-right: 70px;
  background-color: transparent;
}

@media (max-width: 769px) {
  .t-list img {
    width: 30px;
    height: 30px;
    margin: auto 0 auto 10px;
  }

  .t-list p {
    font-size: 12px;
    width: 20%;
    margin: auto;
  }

  .t-list .payments {
    width: 15%;
  }

  .t-list .userid {
    display: none;
  }

  .fansname {
    line-height: 20px;
  }

  .realname {
    line-height: 20px;
  }

  .t-list .approval {
    width: 15%;
  }
}
</style>
