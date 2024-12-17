<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm mt-12">
      <img class="mx-auto h-30 w-auto"
        src="https://res.cloudinary.com/dmn4qnkrz/image/upload/v1727660766/VIVA%20imgs/osq2mkglbjsvsz1wl6as.png"
        alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- Usamos @submit.prevent para capturar el evento de enviar -->
      <form class="space-y-6" @submit.prevent="login">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>

          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginForm',
  setup() {
    //variables para guardar el email y la password respectivas.
    const email = ref('')
    const password = ref('')

    // Acceso al router
    const router = useRouter()

    // Función para manejar el login
    const login = () => {
      //realizar el login, de forma de sencilla, arreglar mas adelante
      if (email.value && password.value) {
        console.log('Noe' + email.value)
        console.log('Anth' + password.value)
        // Si el email y password son válidos, redirige al Dashboard
        router.push({ path: '/dashboard' })
      } else {
        alert('Please fill in both fields.')
      }
    }
    return {
      email,
      password,
      login
    }
  }
}
</script>

<style scoped>
/* Añade cualquier estilo adicional si es necesario */
</style>