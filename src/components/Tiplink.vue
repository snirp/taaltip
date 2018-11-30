<template>
  <li>
    <router-link :to="{ name: 'home', params: { id: id }}">

      <h3>{{ tiplijst[id].title }}</h3>
      <p class="narrower">{{ tiplijst[id].intro }}</p>
      <div class="tags">
        <div class="datum-tag">
          <small>
          {{ tiplijst[id].datum.toLocaleDateString("nl-NL") }}
          </small>
        </div>
        <div class="cat-tag" :style="{backgroundColor: this.$catlijst[tiplijst[id].cat].kleur}"></div>
      </div>
    </router-link>
  </li>
</template>

<script>
import { data } from '../main'

export default {
  data () { return data },
  props: {
    id: String,
  },
}
</script>

<style scoped>
li {
  margin-bottom: 30px;
}

a {
  display: block;
  padding: 4px 20px 14px;;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.4s cubic-bezier(.25,.8,.25,1);
}

h3 {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover, a:focus {
  color: inherit;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.tags {
  display: flex;
  justify-content: space-between;
}

.datum-tag {
}

.cat-tag {
  background-color: rgb(65, 131, 93);
  border-radius: 99px;
  width: 12px;
  height: 12px;
  margin-top: 8px;
}

.narrower{
  max-width: 800px;
}
</style>