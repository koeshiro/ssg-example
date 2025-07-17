<template>
  <BookList :search="$route.params.search" :page="Number($route.params.page)" />
</template>

<script setup>
import BookList from '~/components/book-list.vue';

</script>
