<template>
<div class="content-layout">
  <div>
    <div class="bord">
      <div class="links">
        <button class="replay link-item" @click="replay()">
          <IconBase width="18" height="18" icon-name="replay">
            <IconReplay />
          </IconBase> opnieuw
        </button>
        <a class="link-item" :href="`https://www.facebook.com/sharer/sharer.php?u=https://taalhulp123.nl/taaltip%23/${this.$route.params.id}`">
          <IconBase width="18" height="18" icon-name="facebook">
            <IconFacebook />
          </IconBase>
        </a>
        <a class="link-item" :href="`https://twitter.com/share?url=https://taalhulp123.nl/taaltip%23/${this.$route.params.id}&amp;text=Taaltip:%20${encodeURI(tip.title)}&amp;hashtags=taalhulp`">
          <IconBase width="18" height="18" icon-name="twitter">
            <IconTwitter /> 
          </IconBase>
        </a>
      </div>
      <div class="zin"><span v-for="(section, index) in tip.voorbeeld" :key="index"><span v-if="typeof section == 'string'">{{ section }}</span><span v-else class="goed-fout"><span class="fout" :class="{'fout-weg': animationStart}">{{ section.fout }}</span><span class="goed hyde" :class="{'goed-verschijn': animationStart}">{{ section.goed }}</span></span></span></div>
    </div>

    <Hintlijst :hints="tip.hints" />

    <div class="uitleg" v-html="tip.uitleg" />
  </div>

  <div class="referenties">
    <div>
      <a class="reflink" :href="this.$catlijst[tip.cat].link">
        {{ this.$catlijst[tip.cat].naam }}, {{tip.ref}}
      </a>
    </div>
  </div>
</div>
</template>

<script>
import Hintlijst from '../Hintlijst'
import IconBase from '../IconBase'
import IconFacebook from '../icons/IconFacebook'
import IconTwitter from '../icons/IconTwitter'
import IconReplay from '../icons/IconReplay'
import { data } from '../../main'

export default {
  data() {
    return data
  },
  props: {
    tip: Object,
  },
  methods: {
    replay () {
      // reset animation classes through state change
      this.animationStart = false;
      setTimeout(() => {
        this.animationStart = true;
      }, 30)
    }
  },
  components: { Hintlijst, IconBase, IconFacebook, IconTwitter, IconReplay }
}
</script>

<style scoped>
.content-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bord {
  font-family: 'Bordkrijt', sans-serif;
  background-image: url('blackboard.jpg');
  background-color: black;
  background-size: cover;
  color: white;
  font-size: 50px;
  text-align: center;
  letter-spacing: 2px;
  line-height: 1.6;
  position: relative;
}

.links {
  padding: 12px;
  display: flex;
  font-size: 18px;
  line-height: 18px;
  background-color: rgba(0,0,0,0.15);
  margin-bottom: 40px;
}

.link-item {
  opacity: 0.5;
  padding-right: 15px;
  display: inline; 
  color: white;
  transition: opacity 150ms ease;
}

.link-item:hover {
  opacity: 1;
}

button {
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: inline-block;
  border: none;
  text-decoration: none;
  transition: transform 150ms ease,
}

button:hover {
  outline: none;
}

button:active {
  transform: scale(0.9);
}

.replay {
  background-color: transparent;
}

.zin {
  padding: 0 20px 40px;
}

.uitleg {
  margin: 30px;
}

.goed-fout {
  display: inline-flex;
  flex-direction: column;
  white-space: nowrap;
  align-items: flex-end;
}

.goed-fout > span {
  height: 0;
}

.hyde {
  opacity: 0;
}

.fout-weg {
  animation: flash-red 1s 0.25s 2, disappear 1.5s 2s forwards;
}

.goed-verschijn {
  animation: appear 1.5s 3.25s forwards, flash-green 1.5s 4.5s;
}

@keyframes disappear {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes appear {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes flash-red {
  0% {
    text-shadow: 0 0 0px rgba(255, 0, 0, 0);
  }
  30% {
    text-shadow: 0 0 30px rgba(255, 0, 0);
  }
  100% {
    text-shadow: 0 0 100px rgba(255, 0, 0, 0);
  }
}

@keyframes flash-green {
  0% {
    text-shadow: 0 0 0px rgba(30, 255, 0, 0);
  }
  20% {
    text-shadow: 0 0 20px rgba(30, 255, 0);
  }
  100% {
    text-shadow: 0 0 100px rgba(30, 255, 0, 0);
  }
}

.referenties {
  margin: 30px;
  display: flex;
  justify-content: flex-end;
}

.reflink:link, .reflink:visited, .reflink:hover, .reflink:active {
  color: black;
  background-color: lightgrey;
  padding: 5px 8px;
  text-decoration: none;
}

.reflink:hover {
  background-color: #7fb3c3;
}

</style>