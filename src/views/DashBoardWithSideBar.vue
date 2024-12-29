<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
            leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <div class="flex h-16 shrink-0 items-center">
                  <img class="h-14 w-auto mx-auto mt-5"
                    src="https://res.cloudinary.com/dmn4qnkrz/image/upload/v1727660766/VIVA%20imgs/osq2mkglbjsvsz1wl6as.png"
                    alt="Your Company" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a :href="item.href" :class="[item.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                            <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
        <div class="flex h-20 shrink-0 items-center">
          <img class="h-14 w-auto mt-9 mx-auto"
            src="https://res.cloudinary.com/dmn4qnkrz/image/upload/v1727660766/VIVA%20imgs/osq2mkglbjsvsz1wl6as.png"
            alt="Your Company" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <a :href="item.href" :class="[item.current
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <main>
        <div>
          <h1 class="text-4xl text-center text-white mb-3">
            <span class="pi pi-stopwatch" style="font-size: 1.9rem"></span> Schedule Agents VIVA
          </h1>
          <!-- SearchFilter recibe los empleados seleccionados -->
          <SearchFilter :selectedEmployees="selectedEmployees" @open-mass-edit="openMassEditModal" />
          <!-- TableAgentsSchedule actualiza los empleados seleccionados -->
        </div>
        <div class="mt-2">
          <TableAgentsSchedule @update-selected="updateSelectedEmployees" @cell-click="openIndividualEditModal" />
        </div>

        <!-- Modales -->
        <MassEditModal :show="showMassEditModal" :employees="selectedEmployees" @close="closeMassEditModal"
          @save="saveMassEdit" />


        <IndividualEditModal :show="showIndividualEditModal" :data="currentEditData" @close="closeIndividualEditModal"
          @save="saveIndividualEdit" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue';
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';
import TableAgentsSchedule from '@/views/TableAgentsSchedule.vue';
import SearchFilter from '@/components/SearchFilter.vue';
import MassEditModal from '@/components/modals/MassEditModal.vue';
import IndividualEditModal from '@/components/modals/IndividualEditModal.vue';

const selectedEmployees = ref([]);
const sidebarOpen = ref(false);
const showMassEditModal = ref(false); // Estado del modal de edición en masa
const showIndividualEditModal = ref(false); // Estado del modal de edición individual
const currentEditData = ref({ employee: '', day: '', minutes: 0 });

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Productividad', href: '#', icon: UsersIcon, current: false },
  { name: 'Calificaciones', href: '#', icon: FolderIcon, current: false },
  { name: 'Monitor', href: '#', icon: CalendarIcon, current: false },
  { name: 'Usuarios', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Colas', href: '#', icon: ChartPieIcon, current: false }
];

function updateSelectedEmployees(selected) {
  selectedEmployees.value = selected;
}

function openMassEditModal() {
  if (selectedEmployees.value.length > 1) {
    showMassEditModal.value = true;
  } else {
    alert("Selecciona al menos dos empleados para la edición en masa.");
  }
}


function saveMassEdit(employees) {
  console.log("Empleados guardados:", employees);
  // Aquí puedes procesar los datos o enviarlos al backend
  closeMassEditModal();
}

function closeMassEditModal() {
  showMassEditModal.value = false;
}

function openIndividualEditModal({ agente, dia, minutos }) {
  console.log('Datos recibidos para el modal:', { agente, dia, minutos });
  currentEditData.value = { employee: agente.nombre, day: dia, minutes: minutos };
  showIndividualEditModal.value = true;
}

function saveIndividualEdit() {
  console.log('Guardando cambios individuales para:', currentEditData.value);
  closeIndividualEditModal();
}

function closeIndividualEditModal() {
  showIndividualEditModal.value = false;
}
</script>

<style></style>
