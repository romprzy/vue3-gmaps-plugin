<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <RefineriesExample3 />
      </v-col>
      <v-col
        cols="12"
        lg="6"
      >
        <RefineriesExample2 />
      </v-col>
      <v-col
        cols="12"
        lg="6"
      >
        <RefineriesExample />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import RefineriesExample2 from '../../examples/markers/RefineriesExample2.vue'
import RefineriesExample from '../../examples/markers/RefineriesExample.vue'
import RefineriesExample3 from '../../examples/markers/RefineriesExample3.vue'
</script>
