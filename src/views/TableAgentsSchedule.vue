<template>
  <div>
    <DataTable :data="tableData" :selected-employees="selectedEmployees" @update-selected="updateSelectedEmployees"
      @cell-click="emitCellClick" />
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';

export default {
  components: { DataTable },
  data() {
    return {
      tableData: {
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
      },
      selectedEmployees: [],
    };
  },
  methods: {
    updateSelectedEmployees(selected) {
      this.selectedEmployees = selected;
      this.$emit('update-selected', selected); // Propaga al padre
    },
    emitCellClick(payload) {
      this.$emit('cell-click', payload); // Propaga el evento cell-click al padre
    },
  },
};
</script>