<template lang="pug">
  div(
    class="marker",
    :style="{ opacity }"
  )
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
      opacity: 0.01
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
        this.$overlay.setPosition();
      },
      zIndex() {
        this.$overlay.repaint();
      }
    },
    methods: {
      async afterCreate(inst) {
        if (this.$clusterPromise) {
          const cluster = await this.$clusterPromise;
          cluster.addMarker(inst);
          this.$clusterObject = cluster;
        }
      }
    },
    beforeCreate(options) {
      if (this.$clusterPromise) options.map = null;
      return this.$clusterPromise;
    },
    destroyed() {
      if (this.$clusterObject) {
        this.$clusterObject.removeMarker(this.$overlay, true);
      } else {
        this.$overlay.setMap(null);
        this.$overlay = undefined;
      }
    },
    async provide() {
      const self = this;
      const google = this.google;

      const map = await this.$mapPromise;

      class Overlay extends google.maps.OverlayView {
        constructor(map) {
          super();
          this.setMap(map);
          this.draw = this.repaint;
          this.setPosition = this.repaint;
          // this.draw = () => this.repaint();
          // this.setPosition = () => this.repaint();
        }

        repaint() {
          const element = self.$el;
          const projection = this.getProjection();
          if (projection && element) {
            const posPixel = projection.fromLatLngToDivPixel(self.latLng);
            const { x: horizontal, y: vertical } = posPixel;
            const { offsetWidth: width, offsetHeight: height } = element;
            let x = horizontal + self.offsetX,
              y = vertical + self.offsetY;
            switch (self.alignment) {
              case 'top':
                x -= width / 2;
                y -= height;
                break;
              case 'bottom':
                x -= width / 2;
                break;
              case 'left':
                x -= width;
                y -= height / 2;
                break;
              case 'right':
                y -= height / 2;
                break;
              case 'center':
                x -= width / 2;
                y -= height / 2;
                break;
              case 'topleft':
              case 'lefttop':
                x -= width;
                y -= height;
                break;
              case 'topright':
              case 'righttop':
                y = vertical - height;
                break;
              case 'bottomleft':
              case 'leftop':
                x = horizontal - width;
                break;
              case 'bottomright':
              case 'rightbottom':
                break;
              default:
                throw new Error('Invalid alignment type of custom marker!');
            }
            Object.assign(element.style, {
              transform: `translate(${x}px, ${y}px)`,
              'z-index': self.zIndex
            });
          }
        }

        onAdd() {
          const element = self.$el;
          Object.assign(element.style, {
            position: 'absolute',
            display: 'inline-block',
            zIndex: self.zIndex
          });
          const panes = this.getPanes();
          panes.overlayLayer.appendChild(element);
          panes.overlayMouseTarget.appendChild(element);
          this.getDraggable = () => false;
          this.getPosition = () => new google.maps.LatLng(self.lat, self.lng);
          self.afterCreate(this);
        }

        onRemove() {
          if (self.$el) self.$el.remove();
        }
      }

      this.$overlay = new Overlay(map);

      await this.$nextTick();

      if (this.$overlay) {
        this.$overlay.repaint();
        this.opacity = 1;
      }
    }
  };
</script>
