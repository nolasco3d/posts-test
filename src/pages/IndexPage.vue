<template>
  <q-page class="row flex-center log">
    <div class="col-8">
      <div class="row q-pa-md q-gutter-y-md" v-show="posts">
        <div class="q-px-sm ">Novos posts</div>
        <CardPost class="full-width" v-for="(post) in posts" :key="post.id"
          :post="post" />
      </div>
    </div>
  </q-page>
</template>


<script>
import { api } from 'boot/axios'
import { useCounterStore } from 'src/stores/example-store';
import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router';

import CardPost from 'src/components/CardPost.vue';


export default defineComponent({
  name: 'IndexPage',
  components: { CardPost },
  async setup() {
    const route = useRoute()
    const store = useCounterStore()
    const posts = reactive([])

    try {
      const dataPosts = await api.get('/posts')
      posts.push(...dataPosts.data)
    } catch (err) {
      console.log(err)
    }


    return {
      store,
      posts,
      route
    }
  }
})
</script>
<style lang="scss">
.log {
  &>div {
    border: solid 1px tomato;
  }
}
</style>
