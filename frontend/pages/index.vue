<template>
  <BookList :chips="chips"/>
</template>

<script setup>
import BookList from '~/components/book-list.vue';
import { chips } from '~/constants';

</script>
