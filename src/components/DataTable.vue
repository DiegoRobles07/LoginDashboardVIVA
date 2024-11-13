<template>
  <div class="relative">
    <!-- Tabla de agentes -->
    <DataTable
      :value="value"
      stripedRows
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 15]"
      tableStyle="min-width: 20rem"
    >
      <Column
        field="agent.name"
        header="Agent"
        style="width: 25%"
        :headerClass="'text-center'"
      ></Column>
      <Column
        field="agent.extension"
        header="Extension"
        style="width: 10%"
        :headerClass="'text-center'"
      ></Column>
      <Column
        field="agent.entry"
        header="Entry"
        style="width: 10%"
        :headerClass="'text-center'"
      ></Column>
      <Column
        field="agent.exit"
        header="Exit"
        style="width: 10%"
        :headerClass="'text-center'"
      ></Column>
      <Column
        field="agent.justify"
        header="Justify"
        style="width: 10%"
        :headerClass="'text-center'"
      ></Column>
      <Column
        field="agent.notes"
        header="Notes"
        style="width: 30%"
        :headerClass="'text-center'"
      ></Column>

      <!-- Columna para el botón de acción -->
      <Column header="Actions" style="width: 5%" :headerClass="'text-center'">
        <template #body="slotProps">
          <div class="flex justify-center">
            <Button
              label=""
              icon="pi pi-pen-to-square"
              class="btnAction rounded-2xl"
              @click="editAgent(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <!-- Overlay oscuro cuando se muestra el componente de edición -->
    <div v-if="selectedAgent" class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

    <!-- Componente de edición centrado -->
    <EditComponent
      v-if="selectedAgent"
      :agent="selectedAgent"
      @close="selectedAgent = null"
      @save="saveAgentChanges"
      class="fixed z-50 inset-0 flex items-center justify-center"
    />
  </div>
</template>

<script>
// Importar componentes
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import EditComponent from './EditComponent.vue'

export default {
  components: { DataTable, Column, Button, EditComponent },
  data() {
    return {
      value: [
        {
          agent: {
            name: 'Michael Miller',
            extension: '668',
            entry: '08:00',
            exit: '16:00',
            justify: 'Absence',
            notes: 'Completed all tasks'
          }
        },
        {
          agent: {
            name: 'Jane Smith',
            extension: '978',
            entry: '09:00',
            exit: '17:00',
            justify: 'On time',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'Jane Smith',
            extension: '462',
            entry: '08:00',
            exit: '16:00',
            justify: 'Late entry',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'Liam King',
            extension: '772',
            entry: '08:00',
            exit: '16:00',
            justify: 'On time',
            notes: 'Handled client meetings'
          }
        },
        {
          agent: {
            name: 'Alice Johnson',
            extension: '438',
            entry: '10:00',
            exit: '18:00',
            justify: 'Absence',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'Robert Brown',
            extension: '792',
            entry: '10:00',
            exit: '18:00',
            justify: 'Late entry',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'Emily Davis',
            extension: '124',
            entry: '10:00',
            exit: '18:00',
            justify: 'On time',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'Liam King',
            extension: '642',
            entry: '09:00',
            exit: '17:00',
            justify: 'Late entry',
            notes: 'Participated in training'
          }
        },
        {
          agent: {
            name: 'Daniel White',
            extension: '599',
            entry: '09:00',
            exit: '17:00',
            justify: 'On time',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'John Doe',
            extension: '571',
            entry: '09:00',
            exit: '17:00',
            justify: 'Late entry',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'John Doe',
            extension: '680',
            entry: '08:00',
            exit: '16:00',
            justify: 'On time',
            notes: 'Completed all tasks'
          }
        },
        {
          agent: {
            name: 'Michael Miller',
            extension: '162',
            entry: '10:00',
            exit: '18:00',
            justify: 'Absence',
            notes: 'Handled client meetings'
          }
        },
        {
          agent: {
            name: 'Liam King',
            extension: '130',
            entry: '09:00',
            exit: '17:00',
            justify: 'On time',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'Noah Scott',
            extension: '741',
            entry: '10:00',
            exit: '18:00',
            justify: 'Late entry',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'Mason Green',
            extension: '203',
            entry: '09:00',
            exit: '17:00',
            justify: 'Absence',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'James Lee',
            extension: '161',
            entry: '09:00',
            exit: '17:00',
            justify: 'Late entry',
            notes: 'Handled client meetings'
          }
        },
        {
          agent: {
            name: 'Daniel White',
            extension: '336',
            entry: '09:00',
            exit: '17:00',
            justify: 'Absence',
            notes: 'Handled client meetings'
          }
        },
        {
          agent: {
            name: 'Isabella Wright',
            extension: '401',
            entry: '09:00',
            exit: '17:00',
            justify: 'Late entry',
            notes: 'Participated in training'
          }
        },
        {
          agent: {
            name: 'Michael Miller',
            extension: '539',
            entry: '10:00',
            exit: '18:00',
            justify: 'On time',
            notes: 'Participated in training'
          }
        },
        {
          agent: {
            name: 'Emma Young',
            extension: '842',
            entry: '08:00',
            exit: '16:00',
            justify: 'Late entry',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'Michael Miller',
            extension: '530',
            entry: '08:00',
            exit: '16:00',
            justify: 'Absence',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'Mason Green',
            extension: '335',
            entry: '08:00',
            exit: '16:00',
            justify: 'Absence',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'Mason Green',
            extension: '264',
            entry: '08:00',
            exit: '16:00',
            justify: 'Absence',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'Daniel White',
            extension: '782',
            entry: '08:00',
            exit: '16:00',
            justify: 'Late entry',
            notes: 'Participated in training'
          }
        },
        {
          agent: {
            name: 'Laura Taylor',
            extension: '400',
            entry: '09:00',
            exit: '17:00',
            justify: 'Absence',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'Jane Smith',
            extension: '173',
            entry: '10:00',
            exit: '18:00',
            justify: 'Absence',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'Michael Miller',
            extension: '630',
            entry: '08:00',
            exit: '16:00',
            justify: 'Late entry',
            notes: 'Handled client meetings'
          }
        },
        {
          agent: {
            name: 'David Moore',
            extension: '157',
            entry: '08:00',
            exit: '16:00',
            justify: 'On time',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'Robert Brown',
            extension: '498',
            entry: '10:00',
            exit: '18:00',
            justify: 'On time',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'David Moore',
            extension: '131',
            entry: '10:00',
            exit: '18:00',
            justify: 'Late entry',
            notes: 'Completed all tasks'
          }
        },
        {
          agent: {
            name: 'Emily Davis',
            extension: '631',
            entry: '08:00',
            exit: '16:00',
            justify: 'Late entry',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'Robert Brown',
            extension: '703',
            entry: '09:00',
            exit: '17:00',
            justify: 'On time',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'Mason Green',
            extension: '795',
            entry: '09:00',
            exit: '17:00',
            justify: 'Late entry',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'Isabella Wright',
            extension: '141',
            entry: '08:00',
            exit: '16:00',
            justify: 'On time',
            notes: 'Participated in training'
          }
        },
        {
          agent: {
            name: 'Emily Davis',
            extension: '863',
            entry: '08:00',
            exit: '16:00',
            justify: 'Late entry',
            notes: 'Participated in training'
          }
        },
        {
          agent: {
            name: 'Chris Anderson',
            extension: '934',
            entry: '09:00',
            exit: '17:00',
            justify: 'Late entry',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'Daniel White',
            extension: '226',
            entry: '09:00',
            exit: '17:00',
            justify: 'Late entry',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'Mason Green',
            extension: '821',
            entry: '09:00',
            exit: '17:00',
            justify: 'Absence',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'Sarah Wilson',
            extension: '430',
            entry: '08:00',
            exit: '16:00',
            justify: 'Late entry',
            notes: 'Handled client meetings'
          }
        },
        {
          agent: {
            name: 'Liam King',
            extension: '452',
            entry: '10:00',
            exit: '18:00',
            justify: 'Late entry',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'Mason Green',
            extension: '522',
            entry: '09:00',
            exit: '17:00',
            justify: 'Absence',
            notes: 'Participated in training'
          }
        },
        {
          agent: {
            name: 'Robert Brown',
            extension: '814',
            entry: '09:00',
            exit: '17:00',
            justify: 'On time',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'Alice Johnson',
            extension: '318',
            entry: '10:00',
            exit: '18:00',
            justify: 'Late entry',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'David Moore',
            extension: '751',
            entry: '10:00',
            exit: '18:00',
            justify: 'On time',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'Emily Davis',
            extension: '158',
            entry: '09:00',
            exit: '17:00',
            justify: 'On time',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'Isabella Wright',
            extension: '190',
            entry: '10:00',
            exit: '18:00',
            justify: 'On time',
            notes: 'Participated in training'
          }
        },
        {
          agent: {
            name: 'James Lee',
            extension: '524',
            entry: '08:00',
            exit: '16:00',
            justify: 'Late entry',
            notes: 'Handled client meetings'
          }
        },
        {
          agent: {
            name: 'James Lee',
            extension: '652',
            entry: '10:00',
            exit: '18:00',
            justify: 'Late entry',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'Laura Taylor',
            extension: '263',
            entry: '08:00',
            exit: '16:00',
            justify: 'On time',
            notes: 'Participated in training'
          }
        },
        {
          agent: {
            name: 'Ava Hill',
            extension: '237',
            entry: '10:00',
            exit: '18:00',
            justify: 'Absence',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'Laura Taylor',
            extension: '649',
            entry: '10:00',
            exit: '18:00',
            justify: 'Late entry',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'Laura Taylor',
            extension: '123',
            entry: '08:00',
            exit: '16:00',
            justify: 'Late entry',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'Laura Taylor',
            extension: '668',
            entry: '09:00',
            exit: '17:00',
            justify: 'On time',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'Olivia Harris',
            extension: '990',
            entry: '08:00',
            exit: '16:00',
            justify: 'On time',
            notes: 'Participated in training'
          }
        },
        {
          agent: {
            name: 'Alice Johnson',
            extension: '316',
            entry: '09:00',
            exit: '17:00',
            justify: 'Late entry',
            notes: 'Worked remotely'
          }
        },
        {
          agent: {
            name: 'Emily Davis',
            extension: '260',
            entry: '08:00',
            exit: '16:00',
            justify: 'Late entry',
            notes: 'Took care of urgent issues'
          }
        },
        {
          agent: {
            name: 'Alice Johnson',
            extension: '302',
            entry: '09:00',
            exit: '17:00',
            justify: 'Late entry',
            notes: 'Completed all tasks'
          }
        },
        {
          agent: {
            name: 'James Lee',
            extension: '607',
            entry: '09:00',
            exit: '17:00',
            justify: 'On time',
            notes: 'Completed all tasks'
          }
        },
        {
          agent: {
            name: 'Sophia Thomas',
            extension: '483',
            entry: '09:00',
            exit: '17:00',
            justify: 'On time',
            notes: 'Assisted clients'
          }
        },
        {
          agent: {
            name: 'Liam King',
            extension: '529',
            entry: '08:00',
            exit: '16:00',
            justify: 'On time',
            notes: 'Participated in training'
          }
        }
        // Agrega más agentes "dummy" aquí
      ],
      selectedAgent: null // Para manejar el agente seleccionado
    }
  },
  methods: {
    editAgent(agentData) {
      // Asignar los datos del agente seleccionado
      this.selectedAgent = { ...agentData }
    },
    saveAgentChanges(updatedAgent) {
      // Actualiza los datos del agente en la tabla
      const index = this.value.findIndex(
        (agent) => agent.agent.extension === updatedAgent.extension
      )
      if (index !== -1) {
        this.$set(this.value, index, { agent: updatedAgent })
      }
      this.selectedAgent = null // Cerrar el componente de edición
    }
  }
}
</script>

<style scoped>
/* Estilo para desactivar la interacción con el fondo cuando se abre el componente de edición */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-black {
  background-color: black;
}

.bg-opacity-50 {
  opacity: 0.5;
}

.z-40 {
  z-index: 40;
}

.z-50 {
  z-index: 50;
}
</style>
