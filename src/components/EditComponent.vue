<template>
  <!-- Asegurar que el contenedor del modal tenga un z-index alto y no tenga opacidad -->
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
    <!-- Modal con fondo completamente sólido -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 z-50">
      <h2 class="text-lg font-bold mb-6 text-center">Add comment</h2>

      <!-- Formulario -->
      <div class="space-y-4">
        <!-- Input para el nombre -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="localAgent.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <!-- Input para la extensión -->
        <div>
          <label for="extension" class="block text-sm font-medium text-gray-700">Extension</label>
          <input
            type="text"
            id="extension"
            v-model="localAgent.extension"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled
          />
        </div>

        <!-- Justify y Status alineados en fila -->
        <div class="flex space-x-4">
          <div class="flex-1">
            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              v-model="localAgent.status"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-s focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option>On time</option>
              <option>Late entry</option>
              <option>Absence</option>
            </select>
          </div>

          <div class="flex items-center mt-6">
            <input
              type="checkbox"
              v-model="localAgent.justify"
              class="h-4 w-4 text-blue- border-gray-300 rounded focus:ring-1 focus:outline-none"
            />
            <label class="ml-1 text-sm text-gray-700">Late entry justifiable</label>
          </div>
        </div>

        <!-- Input para los comentarios -->
        <div>
          <label for="comments" class="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            id="comments"
            v-model="localAgent.notes"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-blue-500 sm:text-sm"
            rows="3"
          ></textarea>
        </div>
      </div>
      <!-- Botones de cerrar y guardar -->
      <div class="mt-6 flex justify-end space-x-2">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-600 text-white"
        >
          Cancel
        </button>
        <button
          @click="saveChanges"
          class="px-4 py-2 bg-[#3e9cbb] rounded-md text-white hover:bg-[#2d7188]"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    agent: Object // Recibe el agente seleccionado como prop
  },
  data() {
    return {
      localAgent: { ...this.agent } // Crear una copia local del agente para modificar
    }
  },
  methods: {
    saveChanges() {
      // Emitir el evento 'save' con el agente actualizado
      this.$emit('save', this.localAgent)
    }
  }
}
</script>

<style scoped>
/* Aseguramos que el modal esté por encima */
.z-50 {
  z-index: 50;
}

.bg-opacity-75 {
  background-color: rgba(0, 0, 0, 0.85); /* Fondo oscuro semitransparente */
}

.bg-white {
  background-color: white; /* Asegura que el fondo del modal sea sólido */
}

/* Opcional: Si aún es necesario aumentar el z-index */
.fixed {
  z-index: 100;
}
</style>
