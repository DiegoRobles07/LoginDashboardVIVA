<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 class="text-lg font-semibold mb-4 text-center">Editar Día</h2>
            <form @submit.prevent="onSave" class="grid grid-cols-2 gap-4">
                <div class="col-span-2 grid grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Empleado</label>
                        <input type="text" v-model="dataProxy.employee" disabled
                            class="block w-full border-gray-300 rounded-md shadow-sm mt-1 text-sm" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Extensión</label>
                        <input type="text" v-model="dataProxy.extension" disabled
                            class="block w-full border-gray-300 rounded-md shadow-sm mt-1 text-sm" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Entrada</label>
                        <input type="time" v-model="dataProxy.entryTime" disabled
                            class="block w-full border-gray-300 rounded-md shadow-sm mt-1 text-sm" />
                    </div>
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
                        <option value="incapacidad">Incapacidad</option>
                        <option value="inasistencia">Inasistencia</option>
                        <option value="permiso">Permiso</option>
                        <option value="vacacion">Vacaciones</option>
                    </select>
                </div>
                <div v-if="dataProxy.action === 'incapacidad'" class="col-span-2">
                    <label for="upload" class="block text-sm font-medium text-gray-700">Subir Constancia Médica</label>
                    <input type="file" id="upload" accept="image/*" @change="handleFileUpload"
                        class="block w-full text-sm border border-gray-300 rounded-lg shadow-sm mt-1" />
                    <p v-if="uploadedFile" class="text-sm text-green-600 mt-1">Archivo seleccionado: {{
                        uploadedFile.name }}</p>
                    <div v-if="imagePreview" class="relative mt-2">
                        <img :src="imagePreview" alt="Vista previa"
                            class="w-full h-32 object-contain border border-gray-300 rounded-md" />
                        <button @click="clearImagePreview"
                            class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-center">
                            &times;
                        </button>
                    </div>
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
import { defineProps, defineEmits, reactive, ref, watch } from 'vue';
import DatePicker from "primevue/datepicker";

const props = defineProps({
    show: Boolean,
    data: {
        type: Object,
        default: () => ({ employee: '', day: '', minutes: 0, dateRange: null, action: '', comment: '', extension: '', entryTime: '' }),
    },
});

const emit = defineEmits(['close', 'save']);

const dataProxy = reactive({
    employee: '',
    day: '',
    minutes: 0,
    dateRange: null,
    action: '',
    comment: '',
    extension: '',
    entryTime: '',
});

const uploadedFile = ref(null);
const imagePreview = ref(null);

// Actualiza dataProxy cuando el prop data cambia
watch(
    () => props.data,
    (newData) => {
        dataProxy.employee = newData.employee || '';
        dataProxy.day = newData.day || '';
        dataProxy.minutes = newData.minutes || 0;
        dataProxy.dateRange = newData.dateRange || null;
        dataProxy.action = newData.action || '';
        dataProxy.comment = newData.comment || '';
        dataProxy.extension = newData.extension || '';
        dataProxy.entryTime = newData.entryTime || '';
    },
    { immediate: true }
);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        uploadedFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
        console.log('Archivo seleccionado:', file);
    }
}

function clearImagePreview() {
    uploadedFile.value = null;
    imagePreview.value = null;
}

function onSave() {
    console.log('Guardando datos:', dataProxy, 'Archivo:', uploadedFile.value);
    emit('save', { ...dataProxy, uploadedFile: uploadedFile.value });
}
</script>

<style scoped>
button {
    transition: background-color 0.3s;
}
</style>