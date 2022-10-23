<script setup lang="ts">
  import { computed } from '@vue/reactivity';
  import { ref, watch } from 'vue';
  import { Manga } from '../util/constants';
  import MangaPanel from './MangaPanel.vue';

  const loaded = ref(false);
  const hovered = ref(false);
  const timer = ref(null as ReturnType<typeof setTimeout> | null)
  const panel = ref(null as HTMLElement | null)
  const animation = ref(null as Animation | null);

  const props = defineProps<{
    manga: Manga;
    paused: boolean;
  }>()

  const emits = defineEmits(['scrollComplete']);

  const scrollSpeed = 20000 + Math.floor(Math.random() * 15000);
  const panelHeight = 400 + Math.floor(Math.random() * (window.innerHeight - 500 - (window.innerHeight / 4)));
  const top = Math.floor(Math.random() * (window.innerHeight - panelHeight));

  const imageLoaded = () => {
    loaded.value = true;
  }

  const mouseEnter = () => {
    timer.value = setTimeout(() => hovered.value = true, 500);
  }

  const mouseExit = () => {
    if (!!timer.value)
      clearTimeout(timer.value)

    timer.value = null;
    hovered.value = false;
  }

  watch(loaded,() => {
    if (loaded.value === true)
      createAnimation();
  })

  watch(() => props.paused,() => {
    if (props.paused === true){
      animation.value?.pause();
    }else{
      animation.value?.play();
    }
  })

  const createAnimation = () => {
    if (panel.value) {
      animation.value = panel.value?.animate([
        {transform: 'translateX(110vw)'},
        {transform: 'translateX(-110vw)'}
      ], scrollSpeed);

      animation.value.persist();

      animation.value.addEventListener('finish', () => {
        emits('scrollComplete');
      })

      if (props.paused) animation.value.pause();
    }
  }


</script>

<template>
  <div
    :class="['scroller', loaded ? 'loaded' : '']"
    :style="{
      height: panelHeight+'px',
      top: top+'px',
      zIndex: hovered ? 6969 : 1420 - panelHeight,
    }"
    @mouseenter="mouseEnter"
    @mouseleave="mouseExit"
    ref="panel"
  >
    <MangaPanel
      :manga="manga"
      :paused="paused"
      :random="true"
      v-bind="$attrs"
      @imageLoaded="imageLoaded"
    />
  </div>
</template>

<style scoped>
  .scroller{
    min-height:300px;
    position:relative;
    display:inline-block;
    position:fixed;
    padding:15px;
    background-color:#fff;
    box-shadow: 5px 15px 30px rgba(0,0,0,0.3);
    border-radius:12px;
    border: rgba(0,0,0,0.1) 2px solid;
    display:none;
  }

  .scroller.loaded{
    display:inline-block;
  }

</style>
