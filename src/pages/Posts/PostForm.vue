<template>
  <q-page class="row justify-center">
    <div class="col-8 text-center">
      <div class="text-h3" v-if="!editMode">Crie seu novo post</div>
      <div class="text-h3" v-else>Edite seu post</div>

      <q-form @submit="beforeSubmit(v$)" @reset="resetForm">
        <q-input label="Título" v-model="v$.title.$model"
          :error="v$.title.$error" error-message="Insira um título." />
        <q-input counter maxlength="250" label="Conteúdo" type="textarea"
          v-model="v$.body.$model" :error="v$.body.$error"
          error-message="Insira um texto válido." />

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

import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'


export default defineComponent({
  name: 'PostPage',
  async setup() {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const postStore = usePostsStore()
    const userStore = useUserStore()

    const editMode = ref(false)
    let postId = null

    const newPost = reactive({
      title: '',
      body: ''
    })
    const rules = {
      title: { required, minLength: minLength(6) },
      body: { required, minLength: minLength(10) },
    }

    const v$ = useVuelidate(rules, newPost)

    const resetForm = () => {
      newPost.title = ''
      newPost.body = ''
    }

    const createPost = async () => {
      $q.loading.show()

      const done = editMode.value ?
        await postStore.updatePost(newPost, postId) :
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

    async function beforeSubmit(v) {
      const isValid = await v.$validate()

      if (!isValid) return

      createPost()
    }

    return {
      beforeSubmit,
      resetForm,
      newPost,
      editMode,
      v$
    }
  }
})
</script>
