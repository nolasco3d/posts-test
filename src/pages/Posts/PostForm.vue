<template>
  <q-page class="row justify-center">
    <div class="col-8 text-center">
      <div class="text-h3">Crie seu novo post</div>

      <q-form @submit="createPost" @reset="resetForm">
        <q-input label="Título" v-model="newPost.title" />
        <q-input label="Conteúdo" type="textarea" v-model="newPost.body" />

        <q-btn flat label="Limpar" color="primary" type="reset" />
        <q-btn label="Criar" color="primary" type="submit" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
// import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { usePostsStore } from 'src/stores/posts-store'
import { useUserStore } from 'src/stores/user-store'
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'


export default defineComponent({
  name: 'PostPage',
  async setup() {
    const $q = useQuasar()
    const router = useRouter()
    const postStore = usePostsStore()
    const userStore = useUserStore()

    const newPost = reactive({
      title: '',
      body: ''
    })

    const resetForm = () => {
      newPost.title = ''
      newPost.body = ''
    }

    const createPost = async () => {
      $q.loading.show()

      const done = await postStore.createNewPost({ newPost, id: userStore.user.id })

      if (done) {
        resetForm()
        router.push('/')
        $q.notify({
          message: 'Post criado com sucesso!',
          type: 'positive',
          icon: 'check',
          progress: true,
        })
      }



    }

    return {
      createPost,
      resetForm,
      newPost
    }
  }
})
</script>
