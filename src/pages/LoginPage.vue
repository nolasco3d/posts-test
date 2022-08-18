<template>
  <q-page class="row flex-center">
    <div class="col-4 text-center">
      <div>Já está cadastrado? <br /> Faça seu login.</div>
      <q-form @submit="onSubmit">
        <q-input class="" label="E-mail" v-model="email" />
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
import { api } from 'src/boot/axios'

import { Notify } from 'quasar'
import { useRouter } from 'vue-router'



export default defineComponent({
  name: 'UserForm',
  async setup() {
    const store = useUserStore()
    const email = ref('')
    const router = useRouter()


    const onSubmit = async () => {
      try {
        const dataUser = await api.get(`users?email=${email.value}`)
        // .then(res => {
        //   // TODO: TREAT MULTIPLES RESULTS
        //   if (res.data.length === 1) {
        //     store.$patch(state => {
        //       state.isAuthenticated = true
        //       state.user = res.data[0]
        //     })
        //     return true
        //   }
        // })
        debugger
        const [user] = dataUser.data
        store.$patch(state => {
          state.isAuthenticated = true
          state.user = user
        })

        console.log(dataUser)
      } catch (error) {
        console.log(error)
      }
      finally {
        router.push('/')
        Notify.create({
          message: 'Logado com sucesso!',
          icon: 'check',
          progress: true,
          type: 'positive'
        })

      }
    }

    // function onReset() {
    //   form = {
    //     email: '',
    //     name: '',
    //     gender: '',
    //     status: 'active'
    //   }
    // }

    return {
      store,
      email,
      onSubmit
    }
  },
})
</script>
