<template>
  <div class="bevatter">
    <div v-if="testdata" :style="{backgroundColor: 'lemonchiffon', textAlign: 'center', padding: '4px', marginBottom: '10px'}">
      De test-dataset is geladen voor deze url
    </div>
    <div v-if="loading" class="loader">
      <svg width="80" height="80" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#444">
          <g fill="none" fill-rule="evenodd" stroke-width="2">
              <circle cx="22" cy="22" r="1">
                  <animate attributeName="r"
                      begin="0s" dur="1.8s"
                      values="1; 20"
                      calcMode="spline"
                      keyTimes="0; 1"
                      keySplines="0.165, 0.84, 0.44, 1"
                      repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity"
                      begin="0s" dur="1.8s"
                      values="1; 0"
                      calcMode="spline"
                      keyTimes="0; 1"
                      keySplines="0.3, 0.61, 0.355, 1"
                      repeatCount="indefinite" />
              </circle>
              <circle cx="22" cy="22" r="1">
                  <animate attributeName="r"
                      begin="-0.9s" dur="1.8s"
                      values="1; 20"
                      calcMode="spline"
                      keyTimes="0; 1"
                      keySplines="0.165, 0.84, 0.44, 1"
                      repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity"
                      begin="-0.9s" dur="1.8s"
                      values="1; 0"
                      calcMode="spline"
                      keyTimes="0; 1"
                      keySplines="0.3, 0.61, 0.355, 1"
                      repeatCount="indefinite" />
              </circle>
          </g>
      </svg>
    </div>
    <div v-else>
      <vue-headful :title="(tiplijst[id] ? tiplijst[id].title : 'Taaltip') + ' | taalhulp123.nl'"/>
      <div class="menu-bar">
        <div class="filter-menu">
          <div 
            v-for="(val, key) in this.$catlijst" 
            :key="key" 
            :style="{backgroundColor: val.kleur}"
            class="filter-button"
            :class="{'active-filter': catFilter == key}"
            @click="catFilter = catFilter == key ? '': key">
            {{ key }}
          </div>
        </div>
        <div class="info-menu hidden-xs hidden-sm">
          <span v-if="catFilter">{{ tiplijstFilterCat().length }} van </span>
          {{ Object.keys(tiplijst).length }} taaltips
        </div>
        <div class="order-menu">
          <div 
            v-for="choice in [
                { prop: 'title', display: 'Titel' }, 
                { prop: 'datum', display: 'Datum' },
              ]" 
              class="order-option"
              :class="{'active-order': choice.prop == orderBy}"
              :key="choice.prop"
              @click="orderBy = choice.prop">
            {{ choice.display }}
          </div>
          <div class="up-down" @click="orderUp = !orderUp">
            <span v-if="orderUp">&uarr;</span>
            <span v-else>&darr;</span>
          </div>
        </div>
      </div>
      <ul>
        <Tiplink
          v-for="id in tiplijstSort(tiplijstFilterCat())"
          :key="id"
          :id="id"
          @click.native="showModal = true"
        />
      </ul>
      <Modal v-if="showModal && id" @close="showModal = false">
        <Tip :tip="tiplijst[id]" />
      </Modal>
    </div>
  </div>
</template>

<script>
import { data } from '../main'
import Tiplink from './Tiplink'
import Modal from './Modal'
import Tip from './Tip'

export default {
  props: {
    id: String
  },
  data() {
    return data
  },
  methods: {
    prepareSortParams(a,b){
      a = this.tiplijst[a][this.orderBy];
      b = this.tiplijst[b][this.orderBy];
      if (typeof(a) == "string") {
        a = a.toLowerCase();
        b = b.toLowerCase();
      }
      return [a, b];
    },
    sortUp(a,b){
      [a ,b] = this.prepareSortParams(a,b)
      return a > b ? 1 : b > a ? -1 : 0;
    },
    sortDown(a,b){
      [a ,b] = this.prepareSortParams(a,b)
      return a > b ? -1 : b > a ? 1 : 0;
    },
    tiplijstSort(keys=Object.keys(this.tiplijst)){
      return this.orderUp ? keys.sort(this.sortUp) : keys.sort(this.sortDown)
    },
    tiplijstFilterCat(){
      if (this.catFilter) {
        return Object.keys(this.tiplijst).filter((key)=>this.tiplijst[key].cat == this.catFilter)
      } else {
        return Object.keys(this.tiplijst)
      }
    }
  },
  components: { Tiplink, Modal, Tip }
}
</script>

<style scoped>
.bevatter {
  margin: 50px 0 30px;
}

.loader {
  text-align: center;
  padding-top: 50px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 20px 0 0;
}

.menu-bar{
  display: flex;
  justify-content: space-between
}

.order-menu {
  display: flex;
}

.filter-menu {
  display: flex;
}

.filter-button {
  color: white;
  padding: 3px 6px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 2px;
}

.info-menu {
  padding: 3px 0;
}

.active-filter {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.445);
}

.order-option {
  padding: 3px 6px;
  margin-left: 10px;
  cursor: pointer;
}

.active-order {
  background-color: lightgray;
}

.up-down{
  margin-left: 10px;
  padding: 3px 8px;
  cursor: pointer;
}
</style>
