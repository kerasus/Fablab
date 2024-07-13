<template>
  <div class="MapWidget"
       :style="localOptions.style"
       :class="localOptions.className">
    <div id="map"
         ref="mapRef" />
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { mixinWidget } from 'src/mixin/Mixins.js'

let leafletObject = null
if (typeof window !== 'undefined') {
  import('leaflet')
    .then((leaflet) => {
      leafletObject = leaflet.default
    })
}

export default {
  name: 'MapWidget',
  mixins: [mixinWidget],
  data() {
    return {
      mounted: false,
      mapInstance: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.loadMap()
      this.mounted = true
    }, 1000)
  },
  methods: {
    loadMap() {
      this.mapInstance = leafletObject.map('map').setView([35.705302890238904, 51.34860785106978], 17)
      leafletObject.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.mapInstance)
      leafletObject.marker([35.705302890238904, 51.34860785106978]).addTo(this.mapInstance)
    }
  }
}
</script>

<style scoped lang="scss">
.MapWidget {
  :deep(#map) {
    width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
    .leaflet-pane, .leaflet-tile, .leaflet-marker-icon, .leaflet-marker-shadow, .leaflet-tile-container, .leaflet-pane > svg, .leaflet-pane > canvas, .leaflet-zoom-box, .leaflet-image-layer, .leaflet-layer {
      left: auto;
      right: 0;
    }
  }
}
</style>
