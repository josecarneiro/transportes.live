export default {
  render() {
    const { now } = this;
    return this.$scopedSlots.default({ now });
  },
  props: {
    interval: Number
  },
  data: () => ({ now: new Date(), id: null }),
  mounted() {
    const { interval } = this;
    if (interval) {
      this.id = setInterval(() => {
        this.now = new Date();
      }, interval * 1000);
    }
  },
  unmounted() {
    setInterval(this.id);
  }
};
