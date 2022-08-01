<template>
  <q-page class="constraint q-pa-md">

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat
          bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label
                class="text-bold">
                mr_isy_fox
                </q-item-label>
              <q-item-label caption>
                {{ post.location }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-img :src="post.imageUrl"/>

          <q-card-section>
            <div> {{ post.caption }} </div>
            <div class="text-caption text-grey"> {{ niceDate(post.date) }} </div>
          </q-card-section>

        </q-card>
      </div>
      <div
        class="col-4 large-screen-only">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label
              class="text-bold">
              mr_isy_fox
            </q-item-label>
            <q-item-label caption>
              Isidro Raposo
            </q-item-label>
          </q-item-section>
        </q-item>
        </div>
    </div>

  </q-page>
</template>

<script>

import { date } from 'quasar'

export default {
  name: 'HomePage',

  data() {
    return {
      posts: [
        {
          id: 1,
          caption: 'Golden Gate Bridge',
          date: 1497159857411,
          location: 'San Francisco, United States',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg',
        },
        {
          id: 2,
          caption: 'Golden Gate Bridge',
          date: 1497159857411,
          location: 'San Francisco, United States',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg',
        },
        {
          id: 3,
          caption: 'Golden Gate Bridge',
          date: 1497159857411,
          location: 'San Francisco, United States',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg',
        },
        {
          id: 4,
          caption: 'Golden Gate Bridge',
          date: 1497159857411,
          location: 'San Francisco, United States',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg',
        }
      ]
    }
  },

  methods: {
    niceDate(value) {
      return date.formatDate(value, 'DD MMMM YYYY HH:mm')
    }
  }

}
</script>

<style lang="sass">

.card-post
  .q-img
    min-height: 200px

</style>
