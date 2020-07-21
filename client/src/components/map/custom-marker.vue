<template lang="pug">
  .marker(:style="{ opacity }")
    slot
</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps';
  import { gmapApi } from 'vue2-google-maps';

  export default {
    mixins: [VueGoogleMaps.MapElementMixin],
    props: {
      position: {
        type: Object,
        default: undefined
      },
      offsetX: {
        type: Number,
        default: 0
      },
      offsetY: {
        type: Number,
        default: 0
      },
      alignment: {
        type: String,
        default: 'top'
      },
      zIndex: {
        type: Number,
        default: 50
      }
    },
    inject: {
      $clusterPromise: {
        default: null
      }
    },
    data: () => ({
      // opacity: 0.01
      instance: null,
      opacity: 1
    }),
    computed: {
      lat() {
        const { lat, latitude } = this.position;
        return parseFloat(isNaN(lat) ? latitude : lat);
      },
      lng() {
        const { lng, longitude } = this.position;
        return parseFloat(isNaN(lng) ? longitude : lng);
      },
      latLng() {
        return this.position instanceof this.google.maps.LatLng
          ? this.position
          : new this.google.maps.LatLng(this.lat, this.lng);
      },
      google: gmapApi
    },
    watch: {
      async position() {
        await this.$mapPromise;
        this.instance.setPosition();
      },
      zIndex() {
        this.instance.repaint();
      }
    },
    methods: {
      async afterCreate(instance) {
        if (this.$clusterPromise) {
          const cluster = await this.$clusterPromise;
          cluster.addMarker(instance);
          this.$clusterObject = cluster;
        }
      }
    },
    beforeCreate(options) {
      if (this.$clusterPromise) options.map = null;
      return this.$clusterPromise;
    },
    destroyed() {
      const { instance } = this;
      if (this.$clusterObject) {
        this.$clusterObject.removeMarker(instance, true);
      } else {
        instance.setMap(null);
        this.instance = null;
      }
    },
    async provide() {
      const google = this.google;
      const mapPromise = await this.$mapPromise;

      class Overlay extends google.maps.OverlayView {
        constructor(map, component) {
          super();
          this.component = component;
          this.setMap(map);
          this.draw = this.repaint;
          this.setPosition = this.repaint;
        }

        repaint() {
          const element = this.component.$el;
          const position = this.component.latLng;
          const projection = this.getProjection();

          if (element && projection) {
            const { x, y } = projection.fromLatLngToDivPixel(position);

            Object.assign(element.style, {
              top: `${y}px`,
              left: `${x}px`,
              transform: 'translate(-50%, -50%)'
            });
          }
        }

        onAdd() {
          const component = this.component;
          const element = component.$el;
          Object.assign(element.style, {
            position: 'absolute'
          });
          const panes = this.getPanes();
          panes.overlayLayer.appendChild(element);
          panes.overlayMouseTarget.appendChild(element);
          component.afterCreate(this);
        }

        onRemove() {
          const element = this.component.$el;
          if (element) element.remove();
        }

        getPosition() {
          const { component } = this;
          return new google.maps.LatLng(component.lat, component.lng);
        }
      }

      this.instance = new Overlay(mapPromise, this);

      await this.$nextTick();

      if (this.instance) {
        this.instance.repaint();
        this.opacity = 1;
      }
    }
  };
</script>

<style lang="scss">
  .marker {
    user-select: none;
  }
</style>
