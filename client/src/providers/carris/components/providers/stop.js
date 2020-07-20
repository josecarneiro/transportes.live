import { loadStop, EstimatesService } from '@/providers/carris/services';

const CarrisStopDataProvider = {
  render() {
    const { loaded, stop, estimates } = this;
    return this.$scopedSlots.default({
      loaded,
      stop,
      estimates
    });
  },
  props: {
    id: String
  },
  data: () => ({
    service: null,
    loaded: false,
    stop: {},
    estimates: []
  }),
  watch: {
    id: {
      immediate: true,
      async handler(id) {
        this.loaded = false;
        if (this.service) this.service.destroy();
        this.stop = null;
        this.estimates = [];
        this.service = new EstimatesService(id, this.updateEstimates);
        this.service.listen();
        await this.loadData();
        this.loaded = true;
      }
    }
  },
  destroyed() {
    if (this.service) this.service.destroy();
  },
  methods: {
    updateEstimates(estimates) {
      this.estimates = estimates;
    },
    async loadData() {
      const { id } = this;
      const stop = await loadStop(id);
      this.stop = Object.assign({}, this.stop || {}, stop);
    }
  }
};

export default CarrisStopDataProvider;
