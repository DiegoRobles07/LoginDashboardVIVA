<template>
  <div class="flex flex-wrap lg:flex-row items-center gap-6 p-4 bg-white rounded-lg shadow">
    <!-- DatePicker con Rango -->
    <div class="w-full lg:w-1/4">
      <label for="date-range" class="block text-sm font-medium text-black">Selecciona fecha</label>
      <DatePicker id="date-range" v-model="localFilters.dateRange" selection-mode="range"
        placeholder="Selecciona rango de fechas" class="mt-1 block w-full h-10 border border-black rounded-lg shadow-sm"
        input-class="h-10 w-full text-center text-sm rounded-lg" />
    </div>

    <!-- Combobox para Schedule -->
    <div class="w-full lg:w-1/4 relative" ref="scheduleDropdown">
      <label for="schedule" class="block text-sm font-medium text-black">Horario</label>
      <input type="text" id="schedule" v-model="scheduleQuery" @input="filterScheduleOptions"
        @focus="showDropdown('schedule')"
        class="mt-1 block w-full h-10 text-sm border border-black rounded-lg shadow-sm" placeholder="Buscar..." />
      <ul v-if="showScheduleDropdown && filteredScheduleOptions.length"
        class="absolute z-10 w-full bg-white border-black rounded-lg shadow-md max-h-48 overflow-y-auto">
        <li v-for="option in filteredScheduleOptions" :key="option.id" @mousedown.prevent="selectSchedule(option.name)"
          class="p-2 hover:bg-blue-100 text-sm cursor-pointer">
          {{ option.name }}
        </li>
      </ul>
    </div>

    <!-- Combobox para Team -->
    <div class="w-full lg:w-1/4 relative" ref="teamDropdown">
      <label for="team" class="block text-sm font-medium text-black">Equipo</label>
      <input type="text" id="team" v-model="teamQuery" @input="filterTeamOptions" @focus="showDropdown('team')"
        class="mt-1 block text-sm w-full h-10 border border-black rounded-lg shadow-sm" placeholder="Buscar..." />
      <ul v-if="showTeamDropdown && filteredTeamOptions.length"
        class="absolute z-10 w-full bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto">
        <li v-for="option in filteredTeamOptions" :key="option.id" @mousedown.prevent="selectTeam(option.name)"
          class="p-2 text-sm hover:bg-blue-100 cursor-pointer">
          {{ option.name }}
        </li>
      </ul>
    </div>

    <!-- Botón de Búsqueda -->
    <div>
      <button type="button" @click="emitFilters"
        class="mt-5 px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800">
        Buscar
      </button>
    </div>

    <!-- Botón de Modificar varios -->
    <div>
      <button :disabled="!selectedEmployees || selectedEmployees.length === 0" @click="$emit('open-mass-edit')"
        class="mt-5 btn-modify px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700">
        Modificar
      </button>
    </div>
  </div>
</template>

<script>
import DatePicker from "primevue/datepicker";

export default {
  components: {
    DatePicker,
  },
  props: {
    selectedEmployees: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      localFilters: {
        dateRange: null,
        schedule: "",
        team: "",
      },
      scheduleQuery: "",
      teamQuery: "",
      showScheduleDropdown: false,
      showTeamDropdown: false,
      scheduleOptions: [
        { id: 1, name: "Morning Shift" },
        { id: 2, name: "Evening Shift" },
        { id: 3, name: "Night Shift" },
      ],
      teamOptions: [
        { id: 1, name: "Admins" },
        { id: 2, name: "Customer Service" },
        { id: 3, name: "Tech Support" },
      ],
      filteredScheduleOptions: [],
      filteredTeamOptions: [],
    };
  },
  methods: {
    filterScheduleOptions() {
      this.filteredScheduleOptions = this.scheduleOptions.filter((option) =>
        option.name.toLowerCase().includes(this.scheduleQuery.toLowerCase())
      );
    },
    filterTeamOptions() {
      this.filteredTeamOptions = this.teamOptions.filter((option) =>
        option.name.toLowerCase().includes(this.teamQuery.toLowerCase())
      );
    },
    selectSchedule(name) {
      this.localFilters.schedule = name;
      this.scheduleQuery = name;
      this.showScheduleDropdown = false;
    },
    selectTeam(name) {
      this.localFilters.team = name;
      this.teamQuery = name;
      this.showTeamDropdown = false;
    },
    showDropdown(type) {
      if (type === "schedule") {
        this.showScheduleDropdown = true;
        this.showTeamDropdown = false;
      } else if (type === "team") {
        this.showTeamDropdown = true;
        this.showScheduleDropdown = false;
      }
    },
    handleClickOutside(event) {
      if (this.$refs.scheduleDropdown && !this.$refs.scheduleDropdown.contains(event.target)) {
        this.showScheduleDropdown = false;
      }
      if (this.$refs.teamDropdown && !this.$refs.teamDropdown.contains(event.target)) {
        this.showTeamDropdown = false;
      }
    },
    emitFilters() {
      this.$emit("filter-change", { ...this.localFilters });
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    this.filteredScheduleOptions = this.scheduleOptions;
    this.filteredTeamOptions = this.teamOptions;
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.btn-modify {
  transition: background-color 0.3s;
}
</style>