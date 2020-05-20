<template lang="pug">
  div
    h1 Route {{ route.number }}
    h3 {{ route.name }}
    div(
      v-for="item in route.variants"
      :key="item.variant"
    )
      span Variant \#{{ item.id }}
      div(
        v-for="itenerary in item.iteneraries",
        v-if="itenerary.connections && itenerary.connections.length"
      )
        span {{ itenerary.direction }}: {{itenerary.connections[0].stop.name}} - {{itenerary.connections[itenerary.connections.length - 1].stop.name}}
        ul
          li(v-for="connection in itenerary.connections")
            router-link(:to="{ name: 'carris/stop', params: { id: connection.stop.publicId } }")
              span
                | {{ connection.stop.publicId }} 
                strong {{ connection.stop.name }}
      | {{ route | json }}
</template>

<script>
  export default {
    props: {
      route: Object
    },
    filters: {
      json: (value) => JSON.stringify(value, null, 2)
    }
  };
</script>

<style>
  code {
    white-space: break-spaces;
  }
</style>
