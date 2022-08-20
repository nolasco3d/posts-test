<template>
  <q-page class="row flex-center">
    <div class="col-8 text-center">
      <q-form @submit="onSubmit" @reset="onReset">
        <q-input label="E-mail" v-model="form.email" />

        <q-input label="Nome" v-model="form.name" />

        <q-select label="Gênero" :options="genderOptions" v-model="form.gender"
          emit-value />

        <q-toggle :label="form.status" false-value="inactive"
          true-value="active" v-model="form.status" />

        <div class="q-mt-md">
          <q-btn label="Enviar" type="submit" color="primary" />
          <q-btn label="Limpar" type="reset" color="primary" flat />
        </div>
      </q-form>
    </div>
    <div class="col-8">
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'

import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user-store'

export default defineComponent({
  name: 'UserForm',
  setup() {
    const $q = useQuasar()
    const userStore = useUserStore()
    const router = useRouter()

    const genderOptions = [
      {
        label: 'Masculino',
        value: 'male'
      },
      {
        label: 'Feminino',
        value: 'female'
      },
    ]
    const form = reactive({
      email: '',
      name: '',
      gender: '',
      status: 'active'
    })

    const onSubmit = async () => {
      $q.loading.show()
      const result = await userStore.createUser(form)
      if (result) {
        onReset()
        router.push('/')
        $q.notify({
          message: 'Usuário criado com sucesso!',
          icon: 'check',
          progress: true,
          type: 'positive'
        })
      }
    }

    function onReset() {
      form.email = ''
      form.name = ''
      form.gender = ''
    }

    return { form, genderOptions, onSubmit, onReset }
  },
})
</script>
