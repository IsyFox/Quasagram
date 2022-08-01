<template>
  <q-page class="constraint-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        ref="video"
        class="full-width"
        autoplay></video>
      <canvas
        ref="canvas"
        class="full-width"
        height="240" />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        @click="captureImage"
        v-model="post.caption"
        color="grey-10"
        icon="eva-camera"
        size="lg"
        round
      />
      <div class="row justify-center q-ma-md">
        <q-input
          class="col"
          label="Título"
          dense />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.location"
          class="col"
          label="Localização"
          dense>

          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="eva-navigation-2-outline" />
          </template>

        </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn
          unelevated
          rounded
          color="primary"
          label="Publicar Imagem" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar'
require('md-gum-polyfill')

export default {
  name: 'CameraPage',

  data() {
    return {
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now()
      }
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true

      }).then(stream => {
        this.$refs.video.srcObject = stream
      })
    },
    captureImage
  },
  mounted() {
    this.initCamera()
  }

}
</script>

<style lang="sass">

.camera-frame
  border: 2px solid $grey-10
  border-radius: 15px

</style>
