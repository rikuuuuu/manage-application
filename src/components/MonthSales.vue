<template>
  <div class="">
    <div class="sales-contents-boxes flex">
      <div class="sales-contents-box box-shadow nlink">
        <div class="box-title">
          <h3>流通量</h3>
        </div>
        <div class="box-value maincolor">
          <p>0<span> 円</span></p>
        </div>
      </div>
      <div class="sales-contents-box box-shadow nlink">
        <div class="box-title">
          <h3>売り上げ</h3>
        </div>
        <div class="box-value maincolor">
          <p>0<span> 円</span></p>
        </div>
      </div>
      <div class="sales-contents-box box-shadow nlink">
        <div class="box-title">
          <h3>利益</h3>
        </div>
        <div class="box-value maincolor">
          <p>0<span> 円</span></p>
        </div>
      </div>
    </div>
    <div class="sales-contents-boxes flex bottom-contents nlink">
      <div class="sales-contents-box box-shadow">
        <div class="box-title">
          <h3>出金総額</h3>
        </div>
        <div class="box-value maincolor">
          <!-- <p>{{ lastmonth }}<span> %</span></p> -->
          <p>0<span> 円</span></p>
        </div>
      </div>
      <div class="sales-contents-box box-shadow nlink">
        <div class="box-title">
          <h3>入金総額</h3>
        </div>
        <div class="box-value maincolor">
          <p>0<span> 円</span></p>
        </div>
      </div>
      <div class="sales-contents-box box-shadow nlink">
        <div class="box-title">
          <h3>キャッシュ残高</h3>
        </div>
        <div class="box-value maincolor">
          <p>0<span> 円</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['currentMonth', 'adminpartner'],
  created() {},
  mounted() {},
  computed: {
    // payments() {
    //   return this.$store.getters['payment/payments']
    // },
    // cash() {
    //   return Number(this.allwithDraw) - Number(this.allCharge)
    // },
    // allCharge() {
    //   var allCharge = 0
    //   // 実際はチャージ計算式
    //   return allCharge
    // },
    // allwithDraw() {
    //   var allwithDraw = 0
    //   var currentmonth = this.currentMonth
    //
    //   for ( var n in this.payouts) {
    //     if (currentmonth === this.$dayjs(this.payouts[n].pay.withdrawDate * 1000).format('YYYY / M')) {
    //       allwithDraw += Number(this.payouts[n].pay.balance)
    //     }
    //   }
    //   return allwithDraw
    // },
    // payouts() {
    //   return this.$store.getters['payout/payouts']
    // },
    // lastmonth() {
    //
    //   var value = 0
    //
    //   var currentvalue = 0
    //   var lastvalue = 0
    //
    //   var currentmonth = this.currentMonth
    //   var lastmonth = this.$dayjs(currentmonth).add(-1, 'month').format('YYYY / M')
    //
    //   for (var n in this.payments) {
    //     const createat = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY / M')
    //     if ( currentmonth === createat ) {
    //       if (this.adminpartner) {
    //         currentvalue += Math.round(this.payments[n].pay.balance)
    //       } else if (this.adminpartner === null) {
    //         currentvalue += Math.round(this.payments[n].pay.price * (this.payments[n].pay.percent / 100) * 0.7 - this.payments[n].pay.balance)
    //       }
    //     }
    //
    //     if ( lastmonth === createat ) {
    //       if (this.adminpartner) {
    //         lastvalue += Math.round(this.payments[n].pay.balance)
    //       } else if (this.adminpartner === null) {
    //         lastvalue += Math.round(this.payments[n].pay.price * (this.payments[n].pay.percent / 100) * 0.7 - this.payments[n].pay.balance)
    //       }
    //     }
    //   }
    //
    //   if (currentvalue !== 0 && lastvalue !== 0) {
    //     value = (currentvalue / lastvalue) * 100
    //   }
    //
    //   return value
    //
    // },
    // distribution() {
    //   var distributions = 0
    //
    //   const currentmonth = this.currentMonth
    //
    //   for (var n in this.payments) {
    //     const createat = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY / M')
    //     if (currentmonth === createat) {
    //       if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //         distributions += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
    //       }
    //     }
    //   }
    //
    //   return distributions
    // },
    // sale() {
    //   var sales = 0
    //
    //   const currentmonth = this.currentMonth
    //
    //   for (var n in this.payments) {
    //     const createat = this.$dayjs(this.payments[n].pay.sentAt * 1000).format('YYYY / M')
    //     if (currentmonth === createat && this.payments[n].pay.price && this.payments[n].pay.percent) {
    //       if (this.adminpartner) {
    //         sales += Math.round(this.payments[n].pay.balance)
    //       } else if (this.adminpartner === null) {
    //         sales += Math.round(this.payments[n].pay.price * (this.payments[n].pay.percent / 100) * 0.7 - this.payments[n].pay.balance)
    //       }
    //     }
    //   }
    //
    //   return sales
    // }
  },
}
</script>

<style>
.sales-contents-boxes {
}

.sales-contents-box {
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
}
</style>
