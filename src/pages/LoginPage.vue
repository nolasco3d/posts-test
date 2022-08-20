<template>
  <q-page class="row flex-center">
    <div class="col-4 text-center">
      <div>Já está cadastrado? <br /> Faça seu login.</div>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-input label="E-mail" v-model="email" />
        <div class="q-mt-md">
          <q-btn label="Logar" type="submit" color="primary" flat />
        </div>
      </q-form>
    </div>
    <div class="col-4 text-center">
      <div>Ou registre-se agora!</div>
      <q-btn label="Registrar" color="primary" to="/user/form" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useUserStore } from 'src/stores/user-store'

import { Notify, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'UserForm',
  async setup() {
    const $q = useQuasar()
    const userStore = useUserStore()
    const email = ref('')
    const router = useRouter()


    const onSubmit = async () => {
      $q.loading.show()

      const logged = await userStore.loginUser(email.value)

      if (logged) {
        onReset()
        router.push('/')
        Notify.create({
          message: 'Logado com sucesso!',
          icon: 'check',
          progress: true,
          type: 'positive'
        })
      } else {
        onReset('')
        Notify.create({
          message: 'Usuário não encontrado!',
          icon: 'error',
          progress: true,
          type: 'negative',
          position: 'center'
        })
      }

    }

    function onReset() {
      email.value = ''
    }

    return {
      email,
      onSubmit,
      onReset
    }
  },
})
</script>
