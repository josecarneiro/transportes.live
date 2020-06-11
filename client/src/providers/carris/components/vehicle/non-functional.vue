<template lang="pug">
  custom-map-marker(
    v-bind="{ position }"
    :class="['bus', `bus--${angle > 180 ? 'left' : 'right'}`]"
    @click="$emit('changeCenter', position)"
  )
    router-link(
      :to="{ name: 'carris/vehicle', params: { id } }"
      :style="{ transform: `rotate(${ angle }deg)` }"
    )
      span(v-text="route")
  //- map-marker.marker(
  //-   v-bind="{ position: { lat: position.latitude, lng: position.longitude } }",
  //-   :clickable="true",
  //-   @click="$emit('navigate')"
  //- )
</template>

<script>
  // import { Marker as MapMarker } from 'vue2-google-maps';
  import CustomMapMarker from '@/components/map/custom-marker';

  export default {
    props: {
      id: String,
      position: Object,
      route: String,
      angle: Number
    },
    components: {
      CustomMapMarker
      // MapMarker
    }
  };
</script>

<style lang="scss" src="./style.scss"></style>
