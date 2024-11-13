<template>
  <!-- Contenedor principal que ocupa todo el ancho -->
  <div class="w-full p-4 bg-white rounded-lg mb-3">
    <!-- Flex container para los inputs y los botones en la misma fila -->
    <div class="flex items-end justify-between w-full">
      <!-- Flex container para los inputs -->
      <div class="flex space-x-4 w-full">
        <!-- DatePicker -->
        <div class="w-1/4">
          <label for="date" class="ml-px flex text-sm font-medium text-gray-900"> Date </label>
          <DatePicker
            v-model="date"
            placeholder="Select Date"
            class="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-100 sm:text-sm"
          />
        </div>

        <!-- Input para el Schedule -->
        <div class="w-1/4">
          <label for="schedule" class="ml-1 block text-sm font-medium text-gray-900">
            Schedule
          </label>
          <input
            type="text"
            name="schedule"
            id="schedule"
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            placeholder=""
          />
        </div>

        <!-- Input para el Team -->
        <div class="w-1/4">
          <label for="team" class="ml-1 block text-sm font-medium text-gray-900"> Team </label>
          <input
            type="text"
            name="team"
            id="team"
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            placeholder=""
          />
        </div>
      </div>

      <!-- Contenedor de los botones alineado a la derecha -->
      <div class="ml-auto flex space-x-2">
        <!-- Botón para aplicar filtros -->
        <button
          type="button"
          class="inline-flex items-center px-7 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-700"
        >
          <i class="pi pi-search mr-2"></i>
          <!-- Icono PrimeIcons -->
          Search
        </button>

        <!-- Botón para limpiar los filtros -->
        <button
          type="button"
          class="inline-flex items-center px-7 py-2 border border-transparent text-sm font-medium rounded-md shadow-lg text-white bg-[#3e9cbb] hover:bg-[#2d7188]"
        >
          <i class="pi pi-send mr-2"></i>
          <!-- Icono PrimeIcons -->
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// Importa el componente DatePicker de PrimeVue
import DatePicker from 'primevue/datepicker'

export default {
  components: {
    DatePicker // Registrar el DatePicker
  },
  data() {
    return {
      date: null // Almacenar la fecha seleccionada
    }
  }
}
</script>

<style scoped>
/* Asegura que el contenedor principal ocupe todo el ancho disponible */
.container {
  width: 100%;
}
</style>
