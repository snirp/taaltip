<template>
  <div>
    <h2>Google sitemap</h2>
    <p>Knip en plak deze code in <em>catalog/controller/extension/feed/google_sitemap.php</em></p>
    <code>
      $taaltips = array(
        {{ makeGoogle() }}
			);
      
    </code>
    <p>
      De sitemap url: <a href="https://www.taalhulp123.nl/index.php?route=extension/feed/google_sitemap">
      https://www.taalhulp123.nl/index.php?route=extension/feed/google_sitemap</a>
    </p>
    <h2>Taalhulp sitemap</h2>
    <p>Knip en plak deze code in <em>catalog/view/theme/thulp/template/information/sitemap.twig</em></p>
    <code>
    {% set taaltips = {{ makeTwig() }} %}
    </code>
  </div>
</template>

<script>
import { data } from '../main'

export default {
  data() {
    return data
  },
  methods: {
    makeTwig () {
      // const yyyymmdd = function(myDate){
      //   let year = myDate.getFullYear();
      //   let month = myDate.getMonth()+1;
      //   let dt = myDate.getDate();
      //   if (dt < 10) {
      //     dt = '0' + dt;
      //   }
      //   if (month < 10) {
      //     month = '0' + month;
      //   }
      //   return(year+'-' + month + '-'+dt);
      // }
      const ids = Object.keys(this.tiplijst).sort( (a,b) => this.tiplijst[b].datum - this.tiplijst[a].datum)
      const twig = []
      for (let id of ids){
        twig.push({
          "title": this.tiplijst[id].title,
          "id": id,
          "date": this.yyyymmdd(this.tiplijst[id].datum),
        })
      }
      return twig
    },
    yyyymmdd (myDate) {
      let year = myDate.getFullYear();
      let month = myDate.getMonth()+1;
      let dt = myDate.getDate();
      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      return(year+'-' + month + '-'+dt);
    },
    makeGoogle () {
      const ids = Object.keys(this.tiplijst);
      let result = "";
      for (let id of ids){
        result += `
        array("${id}", "${this.yyyymmdd(this.tiplijst[id].datum)}"),`
      }
      return result
    }
  },
}
</script>