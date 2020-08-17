<template>
  <li class="flex fan-list">
    <!-- <nuxt-link v-if="fan.info" :to="{ name: 'fans-id', params: { id: fan.info.userid }}" class="links list-a flex"> -->
    <img v-if="fan.info.profileLink" :src="fan.info.profileLink" alt="" />
    <img v-else src="/nuxt.png" alt="" />
    <p v-if="fan.info.nickName" class="fansname">
      {{ fan.info.nickName | truncate(15, '...') }}
    </p>
    <p v-else class="fansname">未記入</p>
    <p v-if="fan.info.familyName + fan.info.givenName" class="realname">
      {{ fan.info.familyName + fan.info.givenName }}
    </p>
    <p v-else class="realname">未記入</p>
    <p class="approval">{{ status }}</p>
    <p class="userid" v-if="fan.info.userid">{{ fan.info.userid }}</p>
    <!-- <p class="payments" v-if="fanspayment && payments">{{ prices.toLocaleString() }}円</p>
    <p class="payments" v-if="fanspayment && !payments">0円</p>
    <p class="payments" v-if="fanspayment && payments">{{ (prices / 2).toLocaleString() }}P</p>
    <p class="payments" v-if="fanspayment && !payments">0P</p>
    <p class="talks" v-if="fanspayment && payments">{{ length }}回</p> -->
    <!-- </nuxt-link> -->
  </li>
</template>

<script>
export default {
  filters: {
    truncate(value, length, omission) {
      if (!value) {
        value = '未記入'
        return value
      }
      length = length ? parseInt(length, 10) : 20
      omission = omission ? omission.toString() : '...'

      if (value.length <= length) {
        return value
      }

      return value.substring(0, length) + omission
    },
  },
  props: [
    'fan',
    // 'purchasestate',
    // 'fanspayment',
    // 'currentMonth'
  ],
  data() {
    return {
      none: false,
    }
  },
  computed: {
    //   prices(point) {
    //
    //     var sales = 0
    //
    //     if (this.currentMonth) {
    //
    //       for ( var n in this.payments ) {
    //         var createdMonth = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY / M')
    //         if (this.currentMonth === createdMonth && this.fan.info.userid === this.payments[n].pay.userId ) {
    //           // 0円含めない
    //           if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //             sales += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
    //           }
    //         }
    //       }
    //
    //     } else {
    //
    //       var today = this.$dayjs().format('YYYY/MM/DD')
    //       var thismonth = this.$dayjs().format('YYYY/MM')
    //       var thisweek = this.$dayjs().startOf('week').format('YYYY/MM/DD')
    //
    //       switch (this.purchasestate) {
    //         case 'all':
    //           for ( var n in this.payments ) {
    //             if (this.fan.info.userid === this.payments[n].pay.userId ) {
    //               if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //                 sales += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
    //               }
    //             }
    //           }
    //           break;
    //         case 'day':
    //           for ( var n in this.payments ) {
    //             var dayjspaytime = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY/MM/DD')
    //             if (this.fan.info.userid === this.payments[n].pay.userId && today === dayjspaytime) {
    //               if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //                 sales += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
    //               }
    //             }
    //           }
    //           break;
    //         case 'week':
    //           for ( var n in this.payments ) {
    //             var dayjspaytime = this.$dayjs(this.payments[n].pay.sentAt * 1000).startOf('week').format('YYYY/MM/DD')
    //             if (this.fan.info.userid === this.payments[n].pay.userId && thisweek === dayjspaytime) {
    //               if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //                 sales += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
    //               }
    //             }
    //           }
    //           break;
    //         case 'month':
    //           for ( var n in this.payments ) {
    //             var dayjspaytime = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY/MM')
    //             if (this.fan.info.userid === this.payments[n].pay.userId && thismonth === dayjspaytime) {
    //               if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //                 sales += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
    //               }
    //             }
    //           }
    //           break;
    //         default:
    //       }
    //
    //     }
    //
    //     if (point === 'point') {
    //       sales /= 2
    //     }
    //
    //     return sales
    //   },
    //   length() {
    //
    //     var count = 0
    //
    //     if (this.currentMonth) {
    //
    //       for ( var n in this.payments ) {
    //         if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //           var createdMonth = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY / M')
    //           if (this.currentMonth === createdMonth && this.fan.info.userid === this.payments[n].pay.userId ) {
    //             count += 1
    //           }
    //         }
    //       }
    //
    //     } else {
    //
    //       var today = this.$dayjs().format('YYYY/MM/DD')
    //       var thismonth = this.$dayjs().format('YYYY/MM')
    //       var thisweek = this.$dayjs().startOf('week').format('YYYY/MM/DD')
    //
    //       switch (this.purchasestate) {
    //         case 'all':
    //           for ( var n in this.payments ) {
    //             if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //               if (this.fan.info.userid === this.payments[n].pay.userId ) {
    //                 count += 1
    //               }
    //             }
    //           }
    //           break;
    //         case 'day':
    //           for ( var n in this.payments ) {
    //             if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //               var paytime = this.payments[n].pay.sentAt * 1000
    //               var dayjspaytime = this.$dayjs(paytime).format('YYYY/MM/DD')
    //               if (this.fan.info.userid === this.payments[n].pay.userId && today === dayjspaytime) {
    //                 count += 1
    //               }
    //             }
    //           }
    //           break;
    //         case 'week':
    //           for ( var n in this.payments ) {
    //             if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //               var paytime = this.payments[n].pay.sentAt * 1000
    //               var dayjspaytime = this.$dayjs(paytime).startOf('week').format('YYYY/MM/DD')
    //               if (this.fan.info.userid === this.payments[n].pay.userId && thisweek === dayjspaytime) {
    //                 count += 1
    //               }
    //             }
    //           }
    //           break;
    //         case 'month':
    //           for ( var n in this.payments ) {
    //             if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //               var paytime = this.payments[n].pay.sentAt * 1000
    //               var dayjspaytime = this.$dayjs(paytime).format('YYYY/MM')
    //               if (this.fan.info.userid === this.payments[n].pay.userId && thismonth === dayjspaytime) {
    //                 count += 1
    //               }
    //             }
    //           }
    //           break;
    //         default:
    //       }
    //
    //     }
    //
    //     return count
    //   },
    //   payments() {
    //     return this.$store.getters['payment/payments']
    //   },
    status() {
      let status

      if (!this.fan.info.authStatus) {
        status = 'データなし'
      } else {
        switch (this.fan.info.authStatus) {
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
  },
  mounted() {},
  methods: {},
}
</script>

<style>
.lists li:last-child {
  border: none;
}

.fan-list {
  border-bottom: 2px solid #eee;
  line-height: 55px;
  width: 95%;
  margin: 0 auto;
}

.fan-list img {
  width: 40px;
  height: 40px;
  margin: auto 0 auto 20px;
  border-radius: 50%;
}

.fan-list p {
  margin-left: 20px;
  width: 20%;
}

.fan-list .approval {
  width: 10%;
}

.fan-list .talks {
  width: 9%;
  text-align: right;
}

.fan-list .payments {
  width: 12%;
  text-align: right;
}

@media (max-width: 769px) {
  .fan-list img {
    width: 30px;
    height: 30px;
    margin: auto 0 auto 10px;
  }

  .fan-list p {
    font-size: 14px;
    width: 25%;
  }

  .fan-list .userid {
    display: none;
  }

  .fan-list .fansname {
    line-height: 50px;
  }

  .fan-list .realname {
    line-height: 50px;
  }

  .fan-list .approval {
    width: 15%;
  }
}
</style>
