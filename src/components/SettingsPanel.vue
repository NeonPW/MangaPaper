<script setup lang="ts">
import { Ref } from 'vue';


  const props = defineProps<{
    title?: string;
    subtitle?: string;
    show?: boolean;
  }>()
</script>

<template>
  <div class="settings__background" v-if="show">
    <div class="settings__content">
      <div class="settings__title">{{title ?? ''}}</div>
      <div class="settings__subtitle">{{subtitle ?? ''}}</div>
      <slot name="content" ></slot>

      <div class="settings__actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<style>
  .settings__background{
    background-color:rgba(0,0,0,0.6);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:9998;
  }

  .settings__content{
    background-color:#fff;
    min-width:500px;
    min-height:150px;
    padding:15px;
    border-radius:4px;
    max-width:80vw;
  }

  .settings__title{
    font-size:1.4em;
    font-weight:bold;
    color:rgb(78, 78, 208);
  }

  .settings__subtitle{
    margin-bottom:10px;
    font-weight:100;
  }

  .settings__actions{
    text-align:right;   
    margin-top:10px; 
  }

  .settings__actions .button{
    font-size: .875rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    background-color: #e6e6e6;
    color: rgba(0,0,0,.8);
    border-radius: .25rem;
    border-style: none;
    border-width: 0;
    -webkit-appearance: button;
    text-transform: none;
    overflow: visible;
    line-height: 1.15;
    margin: 0;
    will-change: transform;
    -moz-osx-font-smoothing: grayscale;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    transition: -webkit-transform .25s ease-out;
    transition: transform .25s ease-out;
    transition: transform .25s ease-out,-webkit-transform .25s ease-out;
    display:inline-block;
    margin:0px 5px;
  }

  .settings__actions .button:before{
    content:'';
    display:block;
    position:absolute;
    top:0;left:0;right:0;bottom:0;
    background-color:transparent;
    transition: background-color 0.2s;
  }

  .settings__actions .button:hover{
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }

  .settings__actions .button:hover:before{
    background-color:rgba(0,0,0,0.2);
  }

  .settings__actions .button:last-child{
    margin-right:none;
  }

  .button.primary{
    background-color: #00449e;
    color: #fff;
  }
</style>