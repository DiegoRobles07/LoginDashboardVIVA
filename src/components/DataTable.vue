<template>
    <div class="w-full overflow-hidden rounded-xl border border-gray-300 shadow-md">
        <table class="table-auto bg-white w-full border-collapse text-center" id="schedule-agents-table">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border px-2 py-1">
                        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                    </th>
                    <th class="border px-2 py-1">Grupo</th>
                    <th class="border px-2 py-1">Empleado</th>
                    <template v-for="semana in data.semanas" :key="semana.numero">
                        <th class="border px-2 py-1" :colspan="semana.dias?.length + 1">
                            Semana {{ semana.numero }}
                        </th>
                    </template>
                    <th class="border px-2 py-1">Tiempo Mensual</th>
                </tr>
                <tr>
                    <td class="border px-2 py-1"></td>
                    <td class="border px-2 py-1" colspan="2"></td>
                    <template v-for="semana in data.semanas" :key="semana.numero">
                        <th v-for="dia in semana.dias || []" :key="dia" class="border px-2 py-1">
                            {{ dia }}
                        </th>
                        <th class="border px-2 py-1">Total Min.</th>
                    </template>
                    <td class="border px-2 py-1"></td>
                </tr>
            </thead>
            <tbody>
                <template v-for="(empleado, index) in allEmpleados" :key="index">
                    <tr>
                        <td class="border px-2 py-1">
                            <input type="checkbox" v-model="selectedEmployees" :value="empleado.nombre" />
                        </td>
                        <td class="border px-2 py-1">{{ empleado.grupo }}</td>
                        <td class="border px-2 py-1">{{ empleado.nombre }}</td>
                        <template v-for="semana in data.semanas" :key="semana.numero">
                            <td v-for="(minutos, i) in semana.empleados?.[index]?.minutos || []" :key="i"
                                :class="getCellClass(minutos)" class="border px-2 py-1 cursor-pointer"
                                @click="$emit('cell-click', { agente: empleado, dia: semana.dias[i], minutos })">
                                {{ minutos || "-" }}
                            </td>
                            <td class="border px-2 py-1">{{ semana.empleados?.[index]?.totalSemanal || "-" }}</td>
                        </template>
                        <td class="border px-2 py-1">{{ getTotalMensual(empleado.nombre) }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
            default: () => ({ semanas: [], totalMensual: [] }),
        },
    },
    data() {
        return {
            selectedEmployees: [], // Lista de empleados seleccionados
            selectAll: false, // Estado del checkbox principal
        };
    },
    computed: {
        allEmpleados() {
            if (!this.data?.semanas) return [];
            const empleados = [];
            this.data.semanas.forEach((semana) => {
                semana.empleados?.forEach((empleado) => {
                    if (!empleados.find((e) => e.nombre === empleado.nombre)) {
                        empleados.push({
                            nombre: empleado.nombre,
                            grupo: empleado.grupo,
                        });
                    }
                });
            });
            return empleados;
        },
    },
    watch: {
        // Sincronizar el estado del checkbox "Select All" con los empleados seleccionados
        selectedEmployees: {
            inmediate: true,
            handler(newValue) {
                this.selectAll = newValue.length === this.allEmpleados.length;
                this.$emit("update-selected", newValue); // Emitir empleados seleccionados
                console.log("SearchFilter empleados seleccionados:", newValue);
            },
        },
    },
    methods: {
        getCellClass(minutos) {
            if (minutos === 1440) return "bg-red-300"; // Resalta en rojo si son 1440 minutos
            if (minutos > 0) return "bg-blue-300"; // Resalta en azul si hay minutos adicionales
            return ""; // Sin estilo adicional si es 0 o vacío
        },
        getTotalMensual(nombre) {
            const total = this.data.totalMensual?.find((item) => item.empleado === nombre);
            return total?.total || 0;
        },
        toggleSelectAll() {
            if (this.selectAll) {
                this.selectedEmployees = this.allEmpleados.map((e) => e.nombre);
            } else {
                this.selectedEmployees = [];
            }
        },
    },
};
</script>