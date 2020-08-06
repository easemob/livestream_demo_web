<template>
  <div :id="playerOption.id" style="width:100%"></div>
</template>
<script>
import "xgplayer";
import HlsJsPlayer from "xgplayer-hls.js";

const defaultConfig = {
  id: "vp",
  playsinline: true,
  whitelist: [""],
};
export default {
  name: "VideoPlayer",
  data() {
    return {
      player: null,
      playerOption: defaultConfig,
    };
  },
  props: {
    config: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    initPlayer() {
      if (this.config.url) {
      this.playerOption = Object.assign({}, defaultConfig, this.config);
      this.player = new HlsJsPlayer(this.playerOption);
      this.$emit("playerInit", this.player);
      }
    },
    destroy(){
      this.player &&
      typeof this.player.destroy === "function" &&
      this.player.destroy();
  }
  },
  // mounted() {
  //   this.initPlayer();
  // },
  // beforeUpdate() {
  //   this.initPlayer();
  // },
  beforeDestroy() {
    this.destroy()
  },
  
};
</script>
