<template>
  <q-page class="row flex-center">
    <div class="col-8 text-center">
      <div class="text-h3">POST PAGE {{ postId }}</div>
      <div class="row" v-if="fullPost">
        <div class="col-12">
          <div class="text-h2">{{ fullPost.title || 'Sem titulo' }}</div>
          <div class="body">{{ fullPost.body }}</div>
          <div class="row">
            <div class="col-12" v-for="(comment) in fullPost.comments"
              :key="comment.id">
              <div class="">{{ comment.name }} - {{ comment.email }}</div>
              <div class="caption">{{ comment.body }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
// import { useCounterStore } from 'src/stores/example-store';

import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'PostPage',
  async setup() {
    const route = useRoute()
    const router = useRouter()

    const postId = route.params.id || false


    const fullPost = await api.get(`/posts/${postId}`)
      .then(async res => {
        const comments = await api.get(`/posts/${res.data.id}/comments`)
          .then(response => response.data)

        const userInfo = await api.get(`/users/${res.data.user_id}`)
          .then(response => response.data)

        const data = {
          ...res.data,
          comments,
          userInfo
        }
        return data
      })

    return { postId, route, router, fullPost }
  }
})
</script>
