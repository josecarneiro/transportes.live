<script>
  // import mergeClasses from '@/util/merge-classes';

  import CustomMapMarker from '@/components/map/custom-marker';

  export default {
    functional: true,
    props: {
      id: String,
      position: Object,
      bikes: Number,
      docks: Number
    },
    render: (
      createElement,
      { data: { key }, props: { id, position, bikes, docks } }
    ) =>
      createElement(
        CustomMapMarker,
        {
          key,
          props: { position },
          class: 'bike-station'
        },
        [
          createElement(
            'router-link',
            {
              // style: { transform: `rotate(${angle}deg)` },
              style: { '--ratio': bikes / docks },
              props: {
                // to: { name: 'home' }
                to: { name: 'gira/station', params: { id } }
              }
            },
            [createElement('span', `${bikes}/${docks}`)]
          )
        ]
      )
  };
</script>

<style lang="scss">
  @import './../style/variables.scss';

  .bike-station {
    // --ratio: 0.75;
    a {
      $scale: 2;
      width: $scale * 1rem;
      height: $scale * 1rem;
      background-color: hsl(0, 0%, 90%);
      --split: calc(100% * (1 - var(--ratio)));
      background-image: linear-gradient(
        hsl(0, 0%, 90%) var(--split),
        $gira-green var(--split)
      );
      border-radius: 50%;
      border: 2px solid grey;
      span {
        font-size: 0.5em;
      }
    }
  }
</style>
