<template>
  <v-container class="py-8">
    <v-row>
      <v-col>
        <v-chip-group>
          <v-chip
            v-for="chip, index in chips"
            :key="index"
            :to="`/list/${chip}`"
          >
            {{ chip }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="11">
        <v-text-field
          v-model="currentSearch"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
        />
      </v-col>
      <v-col cols="1">
        <v-btn icon @click="async () => books = await loadPageBooks(currentSearch, currentPage)">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <template v-if="isLoading">
      <v-row>
        <v-col>
          <v-progress-circular indeterminate color="primary" size="48" />
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row dense>
        <v-col v-for="(item, index) in books" :key="index" cols="12" sm="6" md="3">
          <BookListItem
            :title="item.volumeInfo?.title"
            :subtitle="item.volumeInfo?.subtitle"
            :image-src="item.volumeInfo?.imageLinks?.thumbnail"
          />
        </v-col>
      </v-row>
      <v-row :key="currentPage">
        <v-col>
          <v-pagination
            v-if="pageCount > 0"
            v-model="currentPage"
            :length="pageCount"
            :total-visible="7"
            class="mt-4"
            rounded color="primary"
          />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script async setup lang="ts">
import type { BooksVolume } from '~/api/backend';

const props = withDefaults(
  defineProps<{ search?: string; page?: number, chips?: string[] }>(),
  {
    search: '',
    page: 0,
    chips: () => []
  },
)

const maxResults = 40

const isLoading = ref(false)
const currentSearch = ref(props.search)
const currentPage = ref(props.page)
const pageCount = ref(0)
const { backend } = useApi()

const totalItemsToPageCount = (totalItems: number) => {
  if (totalItems > 300) {
    return 8
  }
  return Math.floor(totalItems / maxResults)
}

const loadPageBooks = async (search: string, page: number = 1) => {
  if (!search.length) {
    return [];
  }
  const startPage = page - 1 > 0 ? page - 1 : 0
  isLoading.value = true
  const response = (await backend.booksGet({
    startIndex: startPage > 0 ? startPage * maxResults : 0,
    maxResults,
    query: search
  }))

  pageCount.value = totalItemsToPageCount(response.totalItems ?? 0)
  isLoading.value = false
  return response.items
}

const event = useRequestEvent()
const { data: books } = await useAsyncData(
  'books',
  () => {
    if (event?.context?.payload?.books) {
      if (event?.context?.payload?.totalItems) {
        pageCount.value = totalItemsToPageCount(event?.context?.payload?.totalItems ?? 0)
      }
      return Promise.all(event?.context?.payload?.books as BooksVolume[])
    }

    return loadPageBooks(currentSearch.value, currentPage.value)
  },
  {
    watch: [
      currentSearch,
      currentPage
    ]
  }
)
</script>
