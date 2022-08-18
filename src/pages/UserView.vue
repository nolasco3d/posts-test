<template>
  <q-page class="row flex-center">
    <div class="col-8 text-center">
      <div class="row flex-center">
        <q-card class="col-auto">
          <q-card-section>
            <div>Nome: {{ store.user.name }}</div>
            <div>E-mail: {{ store.user.email }}</div>
            <div>Gênero: {{ store.user.gender }}</div>
            <div>Status: {{ store.user.status }}</div>
          </q-card-section>
        </q-card>
      </div>
      <!-- <q-form @submit="onSubmit" @reset="onReset">
        <q-input label="E-mail" v-model="form.email" />

        <q-input label="Nome" v-model="form.name" />

        <q-select label="Gênero" :options="genderOptions" v-model="form.gender"
          emit-value />

        <q-toggle :label="form.status" false-value="inactive"
          true-value="active" v-model="form.status" />

        <div class="q-mt-md">
          <q-btn label="Enviar" type="submit" color="primary" />
          <q-btn label="Resetar" type="reset" color="primary" flat />
        </div>
      </q-form> -->
    </div>
    <div class="col-8">
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
// import { api } from 'boot/axios'
import { useUserStore } from 'src/stores/user-store'

export default defineComponent({
  name: 'UserForm',
  async setup() {
    const store = useUserStore()

    // const genderOptions = [
    //   {
    //     label: 'Masculino',
    //     value: 'male'
    //   },
    //   {
    //     label: 'Feminino',
    //     value: 'female'
    //   },
    // ]

    // const form = reactive({
    //   email: '',
    //   name: '',
    //   gender: '',
    //   status: 'active'
    // })

    // const onSubmit = async () => {
    //   debugger
    //   try {
    //     const newUser = await api.post(`users/`, form)
    //       .then(res => {
    //         debugger
    //         return res.data
    //       })
    //       .then(() => onReset())
    //     console.log(newUser)

    //     store.$patch(state => {
    //       state.user = newUser,
    //         state.isAuthenticated = true
    //     })
    //   } catch (error) {
    //     console.log(error)
    //     throw error.response.data
    //   }
    // }

    // function onReset() {
    //   form = {
    //     email: '',
    //     name: '',
    //     gender: '',
    //     status: 'active'
    //   }
    // }

    const user = { id: 5209, name: "xur", email: "user@gmail.com", gender: "female", status: "active" }



    return { user, store }
  },
})
</script>
