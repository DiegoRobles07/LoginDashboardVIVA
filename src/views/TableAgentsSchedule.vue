<template>
    <div class="mt-3">
        <DataTable :data="filteredData" :selected-employees="selectedEmployees"
            @update-selected="updateSelectedEmployees" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import DataTable from '../components/DataTable.vue';

// Datos iniciales para la tabla
const tableData = ref({
    semanas: [
        {
            numero: 48,
            dias: ["Do-01", "Lu-02", "Ma-03", "Mi-04", "Ju-05", "Vi-06", "Sa-07"],
            empleados: [
                { grupo: "Admins", nombre: "Anthony Vasquez", minutos: [143, 13, 10, 15, 1440, 9, 1440], totalSemanal: 2914 },
                { grupo: "Admins", nombre: "Diego Robles", minutos: [1440, 1440, 1440, 1440, 1440, 1440, 1440], totalSemanal: 10080 },
            ],
        },
        {
            numero: 49,
            dias: ["Do-08", "Lu-09", "Ma-10", "Mi-11", "Ju-12", "Vi-13", "Sa-14"],
            empleados: [
                { grupo: "Customer Services", nombre: "Jocelyn Santos", minutos: [0, 0, 0, 2, 553, 0, 0], totalSemanal: 555 },
            ],
        },
    ],
    totalMensual: [
        { empleado: "Anthony Vasquez", total: 3057 },
        { empleado: "Diego Robles", total: 10080 },
        { empleado: "Jocelyn Santos", total: 555 },
    ],
});

// Filtros de búsqueda
const filters = ref({
    date: null,
    schedule: "",
    team: "",
});

// Lista de empleados seleccionados
const selectedEmployees = ref([]);

// Filtrar datos según los filtros aplicados
const filteredData = computed(() => {
    return {
        semanas: tableData.value.semanas.map((semana) => ({
            ...semana,
            empleados: semana.empleados.filter((empleado) =>
                (!filters.value.team || empleado.grupo.includes(filters.value.team))
            ),
        })),
        totalMensual: tableData.value.totalMensual.filter((total) =>
            !filters.value.team || total.empleado.includes(filters.value.team)
        ),
    };
});

// Actualizar la lista de empleados seleccionados
const updateSelectedEmployees = (selected) => {
    selectedEmployees.value = selected;
    console.log("Selected Employees:", selectedEmployees.value);
    this.$emit("update-selected", selected)
};
</script>