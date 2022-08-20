<template>
  <q-page class="row flex-center">
    <div class="col-4 text-center">
      <div>Já está cadastrado? <br /> Faça seu login.</div>
      <q-form @submit="beforeSubmit(v$)" @reset="onReset">
        <q-input label="E-mail" v-model="v$.email.$model"
          :error="v$.email.$error" error-message="Insira um email válido." />
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
import { defineComponent, reactive } from 'vue'
import { useUserStore } from 'src/stores/user-store'
import { Notify, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default defineComponent({
  name: 'UserForm',
  setup() {
    const $q = useQuasar()

    const userStore = useUserStore()
    const router = useRouter()

    const form = reactive({
      email: ''
    })

    const rules = {
      email: { required, email }
    }



    const onSubmit = async () => {
      $q.loading.show()

      const logged = await userStore.loginUser(form.email)

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

    async function beforeSubmit(v) {
      const isValid = await v.$validate()

      if (!isValid) return

      onSubmit()
    }

    function onReset() {
      form.email = ''
    }

    const v$ = useVuelidate(rules, form)

    return {
      form,
      onSubmit,
      onReset,
      v$,
      beforeSubmit
    }
  },
})
</script>
