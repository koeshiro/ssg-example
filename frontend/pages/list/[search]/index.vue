<template>
  <BookList :search="$route.params.search" />
</template>

<script setup>
import BookList from '~/components/book-list.vue';

</script>
