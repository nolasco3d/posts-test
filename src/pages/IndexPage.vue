<template>
  <q-page class="row flex-center log">
    <div class="col-8">
      <div class="row q-pa-md q-gutter-y-md" v-show="posts.length > 0">
        <div class="q-px-sm text-h3">Novos posts</div>
        <CardPost class="full-width" v-for="(post) in posts" :key="post.id"
          :post="post" />
      </div>

    </div>
  </q-page>
</template>


<script>
import { defineComponent, onMounted } from 'vue'
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

    onMounted(async () => {
      $q.loading.show()
      await postStore.getPostsByPage()
    })

    return {
      posts
    }
  }
})
</script>
<style lang="scss">
</style>
