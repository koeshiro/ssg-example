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
        <v-btn icon @click="async () => {
          const response = await loadPageBooks(currentSearch, currentPage)
          if (booksData) {
            booksData.books = response.items
            booksData.pageCount = totalItemsToPageCount(response.totalItems ?? 0)
          }
        }">
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
        <v-col v-for="(item, index) in booksData?.books" :key="index" cols="12" sm="6" md="3">
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
            v-if="booksData?.pageCount && booksData?.pageCount > 0"
            v-model="currentPage"
            :length="booksData?.pageCount"
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
import { useApi } from '~/composables/api';

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
const { backend } = useApi()

const totalItemsToPageCount = (totalItems: number) => {
  if (totalItems > 300) {
    return 8
  }
  return Math.floor(totalItems / maxResults)
}

const loadPageBooks = async (search: string, page: number = 1) => {
  if (!search.length) {
    return {
      items: [],
      kind: '',
      totalItems: 0,
    }
  }
  const startPage = page - 1 > 0 ? page - 1 : 0
  isLoading.value = true
  const response = (await backend.booksGet({
    startIndex: startPage > 0 ? startPage * maxResults : 0,
    maxResults,
    query: search
  }))

  isLoading.value = false
  return response
}

const event = useRequestEvent()
const { data: booksData } = await useAsyncData(
  'booksData',
  async () => {
    if (event?.context?.payload?.books) {
      return Promise.resolve({
        books: event?.context?.payload?.books as BooksVolume[],
        pageCount: event?.context?.payload?.totalItems? totalItemsToPageCount(event?.context?.payload?.totalItems ?? 0) : 1
      })
    }

    const response = await loadPageBooks(currentSearch.value, currentPage.value)

    return {
      books: response.items,
      pageCount: totalItemsToPageCount(response.totalItems ?? 0)
    }
  },
  {
    watch: [
      currentSearch,
      currentPage
    ]
  }
)
</script>
