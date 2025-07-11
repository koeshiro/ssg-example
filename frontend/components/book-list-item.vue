<!-- HeaderCard.vue -->
<template>
  <v-card
    class="pa-6 text-center"
    max-width="400"
    elevation="4"
    rounded="xl"
  >
    <v-img
      :src="imageSrc"
      height="200"
      cover
      class="mb-4 rounded-lg"
    ></v-img>

    <v-card-title class="text-h6 font-weight-bold">
      {{ title }}
    </v-card-title>

    <v-card-subtitle class="text-subtitle-2 text-grey-darken-1">
      {{ subtitle }}
    </v-card-subtitle>
  </v-card>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  imageSrc: String
})
</script>
