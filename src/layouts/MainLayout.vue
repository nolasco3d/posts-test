<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu"
          @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div v-if="goBack">
            <q-btn icon="arrow_back" label="Voltar" @click="goBackPage" flat
              rounded />
          </div>
          <div v-else>Posts</div>
        </q-toolbar-title>

        <div v-if="isAuthenticated">
          Olá <strong>{{ user.name }}</strong>, seja bem-vind{{ user.gender ===
              'female' ? 'a' : 'o'
          }}!
        </div>
        <div v-else>
          Faça seu login <router-link to="/login" class="text-white">aqui
          </router-link>.
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
      <q-list>

        <template v-if="isAuthenticated">
          <q-item-label header>
            Posts
          </q-item-label>

          <q-item clickable to="/post/form">
            <q-item-section avatar>
              <q-icon :name="`article`" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ `Novo Post` }}</q-item-label>
              <q-item-label caption>{{ `Crie um novo post` }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <q-item-label header>
          Acesso rápido
        </q-item-label>

        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon :name="`home`" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ `Início` }}</q-item-label>
            <q-item-label caption>{{ `Página inicial` }}
            </q-item-label>
          </q-item-section>
        </q-item>


        <q-item clickable v-if="isAuthenticated" @click="logoutUser">
          <q-item-section avatar>
            <q-icon :name="`logout`" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ `Logout` }}</q-item-label>
            <q-item-label caption>{{ `Finalizar sessão` }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <Suspense>
        <router-view />
        <template #fallback>
          <q-page class="flex flex-center">
            <q-spinner-ios color="primary" size="8em" />
          </q-page>
        </template>
      </Suspense>
    </q-page-container>
  </q-layout>
</template>

<script>
import { storeToRefs } from 'pinia'
import { Dialog, Notify } from 'quasar'
import { useUserStore } from 'src/stores/user-store'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  components: {},
  props: {
    goBack: { type: Boolean }
  },
  setup() {
    const leftDrawerOpen = ref(false)
    const store = useUserStore()
    const router = useRouter()
    const { user, isAuthenticated } = storeToRefs(store)

    const goBackPage = () => {
      router.go(-1)
    }

    const logoutUser = () => {
      Dialog.create({
        title: 'Logout',
        message: 'Deseja realmente encerrar sua sessão?',
        ok: {
          label: 'sair',
          color: 'red'
        },
        cancel: {
          label: 'voltar',
          flat: true
        },
        persistent: true
      }).onOk(() => {
        store.$reset()
        router.push('/')
        leftDrawerOpen.value = false
        Notify.create({
          message: 'Sessão finalizada.'
        })
      })
    }

    return {
      user,
      isAuthenticated,
      leftDrawerOpen,
      logoutUser,
      goBackPage,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
