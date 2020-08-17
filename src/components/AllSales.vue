<template>
  <div class="">
    <div class="sales-contents-boxes flex">
      <a class="links salesbox" :class="{ nlink: !toppage }">
        <div class="box-shadow">
          <div class="box-title">
            <h3>流通量</h3>
          </div>
          <div class="box-value maincolor">
            <p>0<span> 円</span></p>
          </div>
        </div>
      </a>
      <a class="links salesbox" :class="{ nlink: !toppage }">
        <div class="box-shadow">
          <div class="box-title">
            <h3>売り上げ</h3>
          </div>
          <div class="box-value maincolor">
            <p>0<span> 円</span></p>
          </div>
        </div>
      </a>
      <a class="links salesbox" :class="{ nlink: !toppage }">
        <div class="box-shadow">
          <div class="box-title">
            <h3>利益</h3>
          </div>
          <div class="box-value maincolor">
            <p>0<span> 円</span></p>
          </div>
        </div>
      </a>
    </div>
    <div class="sales-contents-boxes flex bottom-contents">
      <a class="links salesbox" :class="{ nlink: !toppage }">
        <div class="box-shadow">
          <div class="box-title">
            <h3>出金総額</h3>
          </div>
          <div class="box-value maincolor">
            <p>0<span> 円</span></p>
          </div>
        </div>
      </a>
      <a class="links salesbox" :class="{ nlink: !toppage }">
        <div class="box-shadow">
          <div class="box-title">
            <h3>入金総額</h3>
          </div>
          <div class="box-value maincolor">
            <p>0<span> 円</span></p>
          </div>
        </div>
      </a>
      <a class="links salesbox" :class="{ nlink: !toppage }">
        <div class="box-shadow">
          <div class="box-title">
            <h3>キャッシュ残高</h3>
          </div>
          <div class="box-value maincolor">
            <p>0<span> 円</span></p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['toppage'],
  created() {},
  mounted() {},
  computed: {
    // payments() {
    //   return this.$store.getters['payment/payments']
    // },
    // charges() {
    //   return this.$store.getters['charge/charges']
    // },
    // cash() {
    //   return Number(this.allwithDraw) - Number(this.allCharge)
    // },
    // allCharge() {
    //   var allCharge = 0
    //   // 実際はチャージ計算式
    //   // for (var n in this.charges) {
    //   //   allCharge += this.charges[n].price * 0.7
    //   // }
    //   return allCharge
    // },
    // allwithDraw() {
    //   var allwithDraw = 0
    //   for ( var n in this.payouts) {
    //     allwithDraw += Number(this.payouts[n].pay.balance)
    //   }
    //   return allwithDraw
    // },
    // payouts() {
    //   return this.$store.getters['payout/payouts']
    // },
    // distribution() {
    //   var distributions = 0
    //
    //   for (var n in this.payments) {
    //     if (this.payments[n].pay.price && this.payments[n].pay.percent) {
    //       distributions += this.payments[n].pay.price * (this.payments[n].pay.percent / 100)
    //     }
    //   }
    //
    //   return distributions
    // },
    // sale() {
    //   var sales = 0
    //
    //   for ( var n in this.payments ) {
    //     if (this.payments[n].pay.price && this.payments[n].pay.percent && this.payments[n].pay.balance) {
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
.salesbox {
  width: 30%;
  margin-right: 40px;
}
</style>
