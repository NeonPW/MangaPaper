<script setup lang="ts">
  import SettingsPanel from './SettingsPanel.vue';

  defineEmits(['close', 'openRatings', 'openTags']);
</script>

<template>
  <SettingsPanel
    title="Hello, beautiful"
    subtitle="Thanks for trying out MangaPaper, powered by MangaDex.org!"
    v-bind="$attrs"
  >
    <template #content>
      <div style="padding:0px 10px;">
        <div style="margin-bottom:10px;">
          <h3 style="margin-bottom:5px;">How to use</h3>
          <ul>
            <li>Set filters for tags and ratings below</li>
            <li>Save and close this window to start scrolling</li>
            <li>Click a panel you like to open the manga viewer</li>
            <li>Change the filters using the dropdown at the top of the screen</li>
            <li>Favorite this wallpaper on the steam workshop?</li>
          </ul>
        </div>
        
        <div style="margin-bottom:10px;">
          <h3 style="margin-bottom:5px;">Filtering Manga</h3>
          <div>Currently the default filters are set</div>
          <div style="font-size:0.7rem;">(Filters can be changed later by using the dropdown at the top of the screen)</div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <ul>
              <li>Only english mangas are visible</li>
              <li>All tags are shown</li>
              <li>Only 'safe' manga are included</li>
            </ul>
            <div class="secondary button" @click="$emit('openTags')">
              Change Tags
            </div>
            <div class="secondary button" @click="$emit('openRatings')">
              Change Ratings
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #actions>
      <div class="button primary" @click="$emit('close')">Close and Start Scrolling!</div>
    </template>
  </SettingsPanel>
</template>

<style scoped>
  ul{
    padding-left:0;
    font-size:0.8rem;
    margin-top:10px;
  }

  .secondary.button{
    padding:15px;
  }
</style>