<template>
<div class="m-0 p-0" style="width:400px;height:100px;">
    <l-map
      :zoom="zoom"
      :center="center"
      style="border-radius:20px; border:2px solid #7E98DF;"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :lat-lng="marker" />
      <l-icon-default :image-path="path" />
    </l-map>
  </div>

</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LIconDefault } from 'vue2-leaflet'
import { mapGetters } from 'vuex'
export default {
  name: 'CustomPath',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIconDefault
  },
  data () {
    return {
      zoom: 13,
      path: '/images/',
      center: [0, 0],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(0, 0)
    }
  },
  computed: {
    ...mapGetters(['getCurrentLocation'])
  },
  async mounted () {
    this.$getLocation()
      .then(coordinates => {
        this.center = latLng(coordinates.lat, coordinates.lng)
        this.marker = latLng(coordinates.lat, coordinates.lng)
      })
  }
}
</script>

<style>

</style>
