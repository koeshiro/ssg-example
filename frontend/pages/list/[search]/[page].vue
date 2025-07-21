<template>
  <BookList :search="$route.params.search" :page="Number($route.params.page)" :chips="chips"/>
</template>

<script setup>
import BookList from '~/components/book-list.vue';
import { chips } from '~/constants';

</script>
