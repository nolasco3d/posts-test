<template>
  <q-page class="row justify-center">
    <div class="col-8 text-center">
      <div class="text-h3" v-if="!editMode">Crie seu novo post</div>
      <div class="text-h3" v-else>Edite seu post</div>

      <q-form @submit="createPost" @reset="resetForm">
        <q-input label="Título" v-model="newPost.title" />
        <q-input label="Conteúdo" type="textarea" v-model="newPost.body" />

        <q-btn flat label="Limpar" color="primary" type="reset" />
        <q-btn :label="editMode ? 'Editar' : 'Criar'" color="primary"
          type="submit" />
      </q-form>


    </div>
  </q-page>
</template>

<script>
// import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { usePostsStore } from 'src/stores/posts-store'
import { useUserStore } from 'src/stores/user-store'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export default defineComponent({
  name: 'PostPage',
  async setup() {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const postStore = usePostsStore()
    const userStore = useUserStore()
    let postId = null
    const editMode = ref(false)


    let editPost = reactive({})

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

      const done = editMode.value ?
        await postStore.updatePost(editPost, postId) :
        await postStore.createNewPost({ newPost, id: userStore.user.id })

      if (done) {
        resetForm()
        router.push('/')
        $q.notify({
          message: `Post ${editMode.value ? 'editado' : 'criado'} com sucesso!`,
          type: 'positive',
          icon: 'check',
          progress: true,
        })
      }
    }

    onMounted(async () => {
      if (route.params.post) {
        editMode.value = true
        const obj = JSON.parse(route.params.post)
        newPost.title = obj.title
        newPost.body = obj.body
        postId = obj.id
      }
    })

    return {
      createPost,
      resetForm,
      newPost,
      route,
      editPost,
      editMode
    }
  }
})
</script>
