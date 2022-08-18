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
import { api } from 'boot/axios'

import { Notify } from 'quasar'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user-store'

export default defineComponent({
  name: 'UserForm',
  async setup() {
    const store = useUserStore()
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
      try {
        const dataUser = await api.post(`users/`, form)
        const newUser = dataUser.data

        console.log(newUser)

        store.$patch(state => {
          state.user = newUser
          state.isAuthenticated = true
        })

        onReset()
      } catch (error) {
        console.log(error)
        throw error.response.data
      } finally {

        router.push('/login')
        Notify.create({
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

    const user = { id: 5209, name: "xur", email: "user@gmail.com", gender: "female", status: "active" }



    return { form, genderOptions, onSubmit, onReset }
  },
})
</script>
