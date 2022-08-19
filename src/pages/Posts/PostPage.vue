<template>
  <q-page class="row justify-center">
    <div class="col-8">
      <div class="row" v-if="fullPost">
        <div class="col-12">
          <div class="text-h3 q-mb-md">{{ fullPost.title || 'Título do post' }}
          </div>
          <div class="body">{{ fullPost.body }}</div>
        </div>
        <div class="col-12">
          <q-card flat>
            <q-card-section>
              <div class="text-h6 q-mt-lg">{{ fullPost.comments.length
              }} Comentários
              </div>
            </q-card-section>
            <q-card-section>
              <q-list separator>
                <q-item v-for="(comment) in fullPost.comments"
                  :key="comment.id">
                  <q-item-section avatar>
                    <q-avatar color="primary" text-color="white">{{
                        comment.name[0]
                    }}</q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">{{ comment.name }}
                    </q-item-label>
                    <q-item-label>{{ comment.body }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
          <div v-if="isAuthenticated">
            <div>Deixe seu comentário:</div>
            <q-form @submit="sendComment">
              <div class=" text-right" style="max-width: 600px;">
                <q-input label="Comentário" type="textarea" v-model="comment" />

                <q-btn class="q-mt-md" color="primary" label="Comentar"
                  type="submit" />
              </div>

            </q-form>
          </div>


        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

import { usePostsStore } from 'src/stores/posts-store'
import { useUserStore } from 'src/stores/user-store'

import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PostPage',
  setup() {
    const $q = useQuasar()
    const route = useRoute()
    const postStore = usePostsStore()

    const { user, isAuthenticated } = useUserStore()
    const { fullPost } = storeToRefs(postStore)

    const postId = route.params.id || false
    const comment = ref('')

    onMounted(async () => {
      $q.loading.show()
      await postStore.getPostById(postId)
    })

    onUnmounted(() => {
      console.log('Clear post!')
    })

    const sendComment = async () => {
      $q.loading.show()
      const payload = {
        post_id: postId,
        name: user.name,
        email: user.email,
        body: comment.value
      }
      await postStore.insertNewComment(payload)

    }

    // const sendComment = async () => {
    //   debugger
    //   try {
    //     const payload = {
    //       post_id: postId,
    //       name: user.name,
    //       email: user.email,
    //       body: comment.value
    //     }

    //     const response = await api.post(`/comments`, payload)
    //     const newPost = response.data

    //     $q.notify({
    //       message: 'Post enviado!',
    //       icon: 'check',
    //       type: 'positive',
    //       progress: true,
    //     })

    //     console.log(newPost)

    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    return {
      fullPost,
      comment,
      isAuthenticated,
      sendComment
    }
  },
  props: {
    goBack: {
      type: Boolean
    }
  }
})
</script>
