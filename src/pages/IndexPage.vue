<template>
  <q-page class="row flex-center">
    <div class="col-12 col-md-8 col-lg-6">
      <div class="row q-pa-md q-gutter-y-md" v-show="posts.length > 0">
        <div class="q-px-sm text-h3">Novos posts</div>
        <CardPost class="full-width" v-for="(post) in posts" :key="post.id"
          :post="post" />
      </div>
      <div class="row flex-center q-py-lg">
        <q-pagination v-model="currentPage" :max="6" />
      </div>

    </div>
  </q-page>
</template>


<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import CardPost from 'src/components/CardPost.vue';
import { usePostsStore } from 'src/stores/posts-store';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  components: { CardPost },
  setup() {
    const $q = useQuasar()
    const postStore = usePostsStore()
    const { posts } = storeToRefs(postStore)
    const currentPage = ref(1)

    onMounted(async () => {
      $q.loading.show()
      await postStore.getPostsByPage()
    })

    watch(currentPage, async (count) => {
      $q.loading.show()
      await postStore.getPostsByPage(count)
    })

    return {
      posts,
      currentPage
    }
  }
})
</script>
<style lang="scss">
</style>
