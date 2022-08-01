<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-grey-10"
      bordered
      >
      <q-toolbar class="constraint">

        <q-btn
          to="/camera"
          dense
          flat
          round
          icon="eva-camera-outline"
          class="large-screen-only"
          size="18px" />

        <q-separator
          class="large-screen-only"
          vertical
          spaced />

        <q-toolbar-title
          class="text-grand-hotel text-bold"
          style="font-size: 25px;">
          Quasagram
        </q-toolbar-title>

        <q-btn
        to="/"
        dense
        flat
        round
        icon="eva-home-outline"
        class="large-screen-only q-pt-xl"
        size="18px" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      class="bg-white small-screen-only"
      bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab
          to="/"
          name="home"
          icon="eva-home-outline" />

        <q-route-tab
          to="/camera"
          name="camera"
          icon="eva-camera-outline" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

})
</script>

<style lang="sass">

.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 77px

.q-footer
  .q-tab__icon
    font-size: 30px

.q-toolbar__title
  @media (max-width: $breakpoint-xs-max)
    text-align: center

</style>
