<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 class="text-lg font-semibold mb-4 text-center">Editar en Masa</h2>
            <form @submit.prevent="onSave" class="grid grid-cols-2 gap-4">
                <!-- Muestra el listado de empleados seleccionados -->
                <div class="col-span-2">
                    <p class="text-sm font-medium text-gray-700">
                        Modificando para {{ selectedEmployees.length }} empleados
                    </p>
                    <ul class="text-sm text-gray-600">
                        <li v-for="employee in selectedEmployees" :key="employee.id">
                            - {{ employee.name }}
                        </li>
                    </ul>
                </div>

                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Justificación entre las fechas de:</label>
                    <DatePicker v-model="dataProxy.dateRange" selection-mode="range"
                        placeholder="Selecciona rango de fechas"
                        class="mt-1 block w-full h-10 border border-gray-300 rounded-lg shadow-sm text-sm"
                        input-class="h-10 w-full text-center text-sm rounded-lg" />
                </div>

                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Estado</label>
                    <select v-model="dataProxy.action"
                        class="block w-full border-gray-300 rounded-md shadow-sm mt-1 text-sm">
                        <option value="">Selecciona un estado</option>
                        <option value="inasistencia">Inasistencia</option>
                        <option value="permiso">Permiso</option>
                        <option value="vacacion">Vacaciones</option>
                    </select>
                </div>

                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Comentario</label>
                    <textarea v-model="dataProxy.comment" rows="3"
                        class="block w-full border-gray-300 rounded-md shadow-sm mt-1 text-sm"></textarea>
                </div>

                <div class="col-span-2 flex justify-end gap-4">
                    <button type="submit"
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Guardar</button>
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from 'vue';
import DatePicker from "primevue/datepicker";

const props = defineProps({
    show: Boolean,
    selectedEmployees: { // Prop para empleados seleccionados
        type: Array,
        default: () => [],
    },
    data: { // Datos del formulario
        type: Object,
        default: () => ({ dateRange: null, action: '', comment: '' }),
    },
});

const emit = defineEmits(['close', 'save']);

const dataProxy = reactive({
    dateRange: props.data.dateRange || null,
    action: props.data.action || '',
    comment: props.data.comment || '',
});

function onSave() {
    console.log('Guardando para los empleados:', props.selectedEmployees);
    console.log('Datos del formulario:', dataProxy);
    emit('save', { ...dataProxy, employees: props.selectedEmployees });
}
</script>

<style scoped>
button {
    transition: background-color 0.3s;
}
</style>
