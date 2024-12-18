<template>
  <div>
    <div class="mt-3">
      <!-- Tabla principal -->
      <DataTable :data="filteredData" @cell-click="handleCellClick" />

      <!-- Modal dinámico -->
      <div v-if="showModal" class="modal-backdrop">
        <div class="modal-content">
          <header>
            <h2>Editar Día</h2>
          </header>
          <main>
            <form @submit.prevent="saveEdit">
              <label>Empleado:
                <input v-model="currentAgent.nombre" type="text" class="input" disabled />
              </label>
              <label>Grupo:
                <input v-model="currentAgent.grupo" type="text" class="input" disabled />
              </label>
              <label>Día Seleccionado:
                <input v-model="selectedDay" type="text" class="input" disabled />
              </label>
              <label>Minutos:
                <input v-model="selectedMinutes" type="number" class="input" />
              </label>
              <button type="submit" class="btn-save">Guardar</button>
              <button type="button" @click="closeModal" class="btn-close">Cancelar</button>
            </form>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import DataTable from '@/components/DataTable.vue';

const showModal = ref(false);
const currentAgent = ref({});
const selectedDay = ref('');
const selectedMinutes = ref('');

const tableData = ref({
  semanas: [
    {
      numero: 48,
      dias: ["Do-01", "Lu-02", "Ma-03", "Mi-04", "Ju-05", "Vi-06", "Sa-07"],
      empleados: [
        { grupo: "Admins", nombre: "Anthony Vasquez", minutos: [143, 13, 10, 15, 1440, 9, 1440] },
        { grupo: "Admins", nombre: "Diego Robles", minutos: [1440, 1440, 1440, 1440, 1440, 1440, 1440] },
      ],
    },
  ],
});

const filteredData = computed(() => tableData.value);

function handleCellClick({ agente, dia, minutos }) {
  // Capturar la información específica de la celda
  currentAgent.value = agente;
  selectedDay.value = dia;
  selectedMinutes.value = minutos;
  showModal.value = true;
}

function saveEdit() {
  console.log('Guardando cambios para:', {
    agente: currentAgent.value,
    dia: selectedDay.value,
    minutos: selectedMinutes.value,
  });
  closeModal();
}

function closeModal() {
  showModal.value = false;
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 400px;
}

.input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-save,
.btn-close {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-close {
  background-color: #ef4444;
  margin-left: 0.5rem;
}

.btn-save:hover {
  background-color: #2563eb;
}

.btn-close:hover {
  background-color: #dc2626;
}
</style>
