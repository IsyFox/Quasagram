<template>
  <q-page class="constraint-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        v-show="!imageCaptured"
        ref="video"
        class="full-width"
        autoplay></video>
      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"></canvas>
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        @click="captureImage"
        v-model="post.caption"
        color="grey-10"
        icon="eva-camera"
        size="lg"
        round
      />
      <q-file
        v-else
        outlined
        v-model="imageUpload"
        label="Escolha a imagem"
        @input="captureImageFallback"
        accept="image/*">

        <template v-slot:prepend>
          <q-icon
            name="eva-attach-outline" />
        </template>
        </q-file>
      <div class="row justify-center q-ma-md">
        <q-input
          class="col"
          label="Título"
          dense />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.location"
          :loading="locationLoading"
          class="col"
          label="Localização"
          dense>

          <template v-slot:append>
            <q-btn
              v-if="!locationLoading && locationSupported"
              @click="getLocation"
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
      },
      imageCaptured: false,
      imageUpload: [],
      hasCameraSupport: true,
      locationLoading: false
    }
  },
  computed: {
    locationSupported() {
      if ('geolocation' in navigator) return true
      else return false
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true

      }).then(stream => {
        this.$refs.video.srcObject = stream
      }).catch (err => {
        this.hasCameraSupport = false
      })
    },
    captureImage() {
      let video = this.$refs.video
      let canvas = this.$refs.canvas
      canvas.width = video.getBoundingClientRect().width
      canvas.height = video.getBoundingClientRect().height
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
      this.imageCaptured = true
      this.post.photo = this.dataURItoBlob(canvas.toDataURL())
      this.disableCamera()
    },
    captureImageFallback(file) {

      let canvas = this.$refs.canvas
      let context = canvas.getContext('2d')

      this.post.photo = file
      var reader = new FileReader()
      // reader.readAsDataURL(this.dataURItoBlob(canvas.toDataURL()))
      reader.onload = event => {
        var img = new Image()
        img.onload = () => {
          if (event.target.readyState == FileReader.DONE) {
            img.src = event.target.result
            context.drawImage(img, 0, 0, canvas.width, canvas.height)
            this.imageCaptured = true
          }

        }

        reader.readAsDataURL(this.dataURItoBlob(file.toDataURL))

        // img.onload = function() {
        //   canvas.width = img.width
        //   canvas.height = img.height
        //   context.drawImage(img, 0, 0)
        //   this.imageCaptured = true
        // }
        // img.src = event.target.result
        // context.drawImage(img, 0, 0)
      }

      /*var canvas = this.$refs.canvas
      var context = canvas.getContext('2d')

      var img = new Image()
      img.onload = function() {
        canvas.width = img.width
        canvas.height = img.height
        console.log(file)
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        this.imageCaptured = true

      }

      img.src = URL.createObjectURL(this.dataURItoBlob(canvas.toDataURL())) */

    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => track.stop())
    },
    getLocation() {
      this.locationLoading = true
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          let apiUrl = 'https://geocode.xyz/' + position.coords.latitude + ',' + position.coords.longitude + '?json=1&auth=332048993145334419283x71227'
          fetch(apiUrl).then(response => response.json()).then(data => {
            this.post.location = data.city + ', ' + data.country
          })
        })
      }
      this.locationLoading = false
    },
    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      var blob = new Blob([ab], {type: mimeString});
      return blob;

    }
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
