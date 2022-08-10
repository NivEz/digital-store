<template>
  <q-card class="summary-card text-black q-pa-md">
    <q-card-section>
      <div class="text-h6 text-center q-mb-lg">Summary</div>
    </q-card-section>

    <q-separator style="background: rgba(0,0,0,0.3)"/>

    <q-card-section>
      <div class="text-subtitle1">Price:
        <span class="summary-text">
                {{ '$ ' + cart.summary }}
              </span>
      </div>
      <q-space class="q-ma-lg"/>
      <div class="text-subtitle1">Amount of products:
        <span class="summary-text">
                {{ cart.totalNumOfProducts }}
              </span>
      </div>
    </q-card-section>

    <q-separator style="background: rgba(0,0,0,0.3)"/>

    <q-card-actions class="q-mt-lg">
      <q-space/>
      <q-btn
        no-caps size="16px"
        class="col-8"
        @click="trigger"
        style="background: var(--button)"
      >Checkout now
      </q-btn>
      <q-space/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CartSummary",
  props: ['function'],

  computed: mapState('cart', ['cart']),

  methods: {
    trigger() {
      this.function()
    }
  }
}
</script>

<style scoped>

.summary-card {
  height: 100%;
  flex-basis: 25%;
  background: var(--secondary);
}

.summary-text {
  float: right;
}

</style>
