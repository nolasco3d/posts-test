<template>
  <q-page class="row flex-center">
    <div class="col-12 col-md-4 col-lg-3 text-center q-pa-md">
      <div class="text-h3 q-mb-lg">Crie seu usuário</div>
      <q-form @submit="beforeSubmit(v$)" @reset="onReset">
        <q-input label="E-mail" v-model="v$.email.$model"
          :error="v$.email.$error" error-message="Insira um email válido" />

        <q-input label="Nome" v-model="v$.name.$model" :error="v$.name.$error"
          error-message="Insira um nome válido" />

        <q-select label="Gênero" :options="genderOptions"
          v-model="v$.gender.$model" emit-value :error="v$.gender.$error"
          error-message="Insira um gênero" />

        <div class="q-mt-md">
          <q-btn label="Limpar" type="reset" color="primary" flat />
          <q-btn label="Enviar" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'

import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user-store'

import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'

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
    const rules = {
      email: { required, email },
      name: { required, minLength: minLength(4) },
      gender: { required }
    }

    const v$ = useVuelidate(rules, form)

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

    async function beforeSubmit(v) {
      const isValid = await v.$validate()

      if (!isValid) return

      onSubmit()
    }

    return {
      form,
      genderOptions,
      beforeSubmit,
      onReset,
      v$
    }
  },
})
</script>
