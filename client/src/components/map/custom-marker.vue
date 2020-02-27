<template lang="pug">
  div(:style="{ opacity }")
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
      position() {
        this.$mapPromise.then(() => this.$overlay.setPosition());
      },
      zIndex() {
        this.$overlay.repaint();
      }
    },
    methods: {
      afterCreate(inst) {
        if (this.$clusterPromise) {
          this.$clusterPromise.then(co => {
            co.addMarker(inst);
            this.$clusterObject = co;
          });
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
    provide() {
      const self = this;
      const google = this.google;

      return this.$mapPromise.then(map => {
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
            const div = self.$el;
            const projection = this.getProjection();
            if (projection && div) {
              const posPixel = projection.fromLatLngToDivPixel(self.latLng);
              const { x: horizontal, y: vertical } = posPixel;
              const { offsetWidth: width, offsetHeight: height } = div;
              let x, y;
              switch (self.alignment) {
                case 'top':
                  x = horizontal - width / 2;
                  y = vertical - height;
                  break;
                case 'bottom':
                  x = horizontal - width / 2;
                  y = vertical;
                  break;
                case 'left':
                  x = horizontal - width;
                  y = vertical - height / 2;
                  break;
                case 'right':
                  x = horizontal;
                  y = vertical - height / 2;
                  break;
                case 'center':
                  x = horizontal - width / 2;
                  y = vertical - height / 2;
                  break;
                case 'topleft':
                case 'lefttop':
                  x = horizontal - width;
                  y = vertical - height;
                  break;
                case 'topright':
                case 'righttop':
                  x = horizontal;
                  y = vertical - height;
                  break;
                case 'bottomleft':
                case 'leftop':
                  x = horizontal - width;
                  y = vertical;
                  break;
                case 'bottomright':
                case 'rightbottom':
                  x = horizontal;
                  y = vertical;
                  break;
                default:
                  throw new Error('Invalid alignment type of custom marker!');
                // break;
              }
              div.style.transform = `translate(${x + self.offsetX}px, ${y +
                self.offsetY}px)`;
              div.style['z-index'] = self.zIndex;
            }
          }

          onAdd() {
            const div = self.$el;
            Object.assign(div.style, {
              position: 'absolute',
              display: 'inline-block',
              zIndex: self.zIndex
            });
            const panes = this.getPanes();
            panes.overlayLayer.appendChild(div);
            panes.overlayMouseTarget.appendChild(div);
            this.getDraggable = () => false;
            this.getPosition = () => new google.maps.LatLng(self.lat, self.lng);
            self.afterCreate(this);
          }

          onRemove() {
            if (self.$el) {
              const ua = window.navigator.userAgent;
              const msie = ua.indexOf('MSIE ');
              // if (msie > 0 || !!ua.match(/Trident.*rv\:11\./)) {
              if (msie > 0 || !!ua.match(/Trident.*rv:11\./)) {
                self.$el.parentNode.removeChild(self.$el);
              } else {
                self.$el.remove();
              }
            }
          }
        }

        this.$overlay = new Overlay(map);

        this.$nextTick(() => {
          if (this.$overlay) {
            this.$overlay.repaint();
            this.opacity = 1;
          }
        });

        // setTimeout(() => {
        //   if (this.$overlay) {
        //     this.$overlay.repaint();
        //     this.opacity = 1;
        //   }
        // }, 100);
      });
    }
  };
</script>
