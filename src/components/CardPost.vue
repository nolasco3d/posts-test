<template>
  <q-card class="" flat bordered>
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6 ellipsis" no-padding>{{ post.title }}</div>
        </div>
        <div class="col-auto"
          v-if="isAuthenticated && post.user_id === user.id">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable @click="modalDelete(post.id)">
                  <q-item-section>Delete this post</q-item-section>
                </q-item>

                <q-item clickable @click="sendToEdit(post)">
                  <q-item-section>Editar post</q-item-section>
                </q-item>

              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <p class="q-ma-0">{{ post.body }}</p>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat dense color="primary" :to="`/post/${post.id}`">
        Detalhes
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { usePostsStore } from 'src/stores/posts-store';
import { useUserStore } from 'src/stores/user-store';
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CardPost',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup() {
    const $q = useQuasar()
    const userStore = useUserStore()
    const postStore = usePostsStore()
    const router = useRouter()
    const { isAuthenticated, user } = storeToRefs(userStore)

    const deletePost = async (id) => {
      $q.loading.show()
      const result = await postStore.deletePost(id)
      if (result) {
        await postStore.getPostsByPage()
      }
    }

    const sendToEdit = (post) => {
      router.push({
        name: 'PostForm',
        params: {
          post: JSON.stringify(post)
        }
      })
    }

    const modalDelete = (id) => {
      $q.dialog({
        message: 'Deseja excluir esse post? Essa ação é irreversível!',
        ok: {
          label: 'Apagar',
          color: 'red'
        },
        cancel: {
          label: 'Cancelar',
          flat: true,
          color: 'primary'
        }
      }).onOk(async () => deletePost(id))
    }

    return {
      isAuthenticated,
      user,
      modalDelete,
      sendToEdit
    }
  }
})
</script>
