<template>
  <v-app>
    <v-main class="bg-gradient">
      <v-row style="height: 100%;" justify="center" align="center">
        <v-spacer />
        <nuxt />
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
}
</script>

<style>
.bg-gradient {
  background-image: linear-gradient(135deg, #576cb9, #343c61);
  /* Adjust the angle and colors as needed */
  /* You can also use rgba values for more control */
  /* Example: background-image: linear-gradient(135deg, rgba(95, 190, 115, 1), rgba(103, 190, 96, 1)); */
}
</style>
