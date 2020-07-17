import {
  StationEstimatesService,
  loadStationDetails
} from '@/providers/metro/services';
// import { stations as metroStations } from '@/providers/metro/data';

const MetroStationDataProvider = {
  render() {
    const { loaded, details, estimates } = this;
    return this.$scopedSlots.default({
      loaded,
      details,
      estimates
    });
  },
  props: {
    id: String
  },
  data: () => ({
    loaded: false,
    details: {
      lines: []
    },
    estimates: {}
    // metroStations
  }),
  watch: {
    id: {
      immediate: true,
      async handler(id) {
        this.loaded = false;
        if (this.service) this.service.destroy();
        this.details = null;
        this.estimates = {};
        this.service = new StationEstimatesService(id, this.updateEstimates);
        this.service.listen();
        await this.loadData();
      }
    }
  },
  destroyed() {
    if (this.service) this.service.destroy();
  },
  methods: {
    updateEstimates(estimates) {
      this.estimates = Object.assign({}, this.estimates, estimates);
    },
    async loadData() {
      const { id } = this;
      const station = await loadStationDetails(id);
      this.details = Object.assign({}, this.details, station);
      this.loaded = true;
    }
  }
};

export default MetroStationDataProvider;
