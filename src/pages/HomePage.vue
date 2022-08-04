<template>
  <q-page class="constraint q-pa-md">

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPosts && posts.length">
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
        </template>
        <template v-else-if="!loadingPosts && !posts.length">
          <h5 class="text-center text-grey"> Nenhuma publicação encontrada! </h5>
        </template>
        <template
          v-else
          class="text-center">
          <q-card flat bordered style="max-width: 300px">
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
            </q-card-section>
          </q-card>
        </template>
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
      posts: [],
      loadingPosts: false
    }
  },

  methods: {
    niceDate(value) {
      return date.formatDate(value, 'DD MMMM YYYY HH:mm')
    },
    getPosts() {
      this.loadingPosts = true
      this.$axios.get('http://localhost:3000/posts')
      .then(response => {
        this.posts = response.data
      }).catch(error => {
        this.$q.dialog({
          title: 'Erro',
          message: 'Não foi possível carregar os posts',
        })
      })

      this.loadingPosts = false

    }
  },
  created() {
    this.getPosts()
  }

}
</script>

<style lang="sass">

.card-post
  .q-img
    min-height: 200px

</style>
