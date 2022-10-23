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
    max-width:70vw;
    color:rgba(0,0,0,0.8);
    font-size:0.95rem;
  }

  .settings__title{
    font-size:1.5rem;
    font-weight:bold;
    color:rgb(78, 78, 208);
  }

  .settings__subtitle{
    margin-bottom:10px;
    font-weight:100;
    font-size:1.2rem;
  }

  .settings__actions{
    text-align:right;   
    margin-top:10px; 
  }

  .settings__toggler{
    margin:6px;
    border: #ccc 1px solid;
    padding:5px 10px;
    display:flex;
    align-items: center;
    justify-content:space-between;
    user-select: none;
    border-radius:6px;
    font-weight:bold;
    position:relative;
    will-change: transform;
    -moz-osx-font-smoothing: grayscale;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    transition: -webkit-transform .25s ease-out;
    transition: transform .25s ease-out;
    transition: transform .25s ease-out,-webkit-transform .25s ease-out;
  }

  .settings__toggler::after{
    position:absolute;
    top:0;left:0;right:0;bottom:0;
    transition: all 0.2s;
    background-color:rgba(0,0,0,0);
    content: '';
    display:block;
  }

  .settings__toggler:hover{
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }

  .settings__toggler:hover::after{
    background-color:rgba(0,0,0,0.14);
  }

</style>