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
    background-color:rgba(0,0,0,0.5);
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
    border-radius:20px;
    max-width:80vw;
  }

  .settings__title{
    font-size:2em;
    font-weight:bold;
  }

  .settings__subtitle{
    margin-bottom:10px;
  }

  .settings__actions{
    text-align:right;   
    margin-top:10px; 
  }

  .settings__actions .button{
    padding:10px;
    border: rgba(0,0,0,0.4) 1px solid;
    display:inline-block;
    cursor:pointer;
    background-color:rgb(65, 130, 177);
    color:white;
    font-size:1.2em;
    position:relative;
    overflow:hidden;
    font-weight:700;
    margin:0 5px;
  }

  .settings__actions .button:before{
    content:'';
    display:block;
    position:absolute;
    top:0;left:0;right:0;bottom:0;
    background-color:transparent;
    transition: background-color 0.3s;
  }

  .settings__actions .button:hover:before{
    background-color:rgba(0,0,0,0.2);
  }

  .settings__actions .button:last-child{
    margin-right:none;
  }

  .button.normal{
    background-color:#fef9ff;
    color:#555555;
  }
</style>