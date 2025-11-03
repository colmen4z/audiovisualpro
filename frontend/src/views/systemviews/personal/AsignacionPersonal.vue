<template>
    <div class="h-screen flex flex-col">
        <div class="border-b border-gray-200 pb-3 mb-4">
            <h3 class="text-center font-bold text-lg">Asignación de Personal a Proyecto</h3>
        </div>
        <div class="flex-1 overflow-y-auto p-2">
            <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div v-for="asignacion in asignaciones" :key="asignacion.id_asignacion"
                    class="bg-white border rounded-xl shadow px-5 py-4 flex flex-col justify-between"
                    style="min-width:290px;">
                    <div>
                        <div class="flex items-center mb-2">
                            <Icon icon="material-symbols:work-history" width="28" height="28" class="text-green-600" />
                            <span class="pl-2 text-xl font-bold">Proyecto {{ asignacion.id_proyecto }}</span>
                        </div>
                        <span class="block font-medium mb-2 text-gray-700 text-base">Personal: <span
                                class="font-normal">{{ asignacion.id_personal }}</span></span>
                        <span class="block text-gray-500 font-semibold text-sm mb-2">Horas trabajadas: {{
                            asignacion.horas_trabajadas }}</span>
                        <span class="block text-gray-500 font-semibold text-sm mb-2">Fecha registro: {{
                            asignacion.fecha_registro }}</span>
                    </div>
                    <div class="flex gap-2 mt-4">
                        <button
                            class="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors gap-1 w-full"
                            @click="mostrarDetalles(asignacion)">
                            <Icon icon="material-symbols:info-outline" width="20" height="20" class="mr-1" /> Ver
                            Detalles
                        </button>
                        <button
                            class="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors gap-1 w-full">
                            <Icon icon="material-symbols:delete" width="20" height="20" /> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-end mt-4">
            <button
                class="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-lg transition-colors"
                @click="modalNuevaAsignacion = true">
                <Icon icon="material-symbols:add" width="25" height="25" class="mr-2" /> Nueva Asignación
            </button>
        </div>
        <div v-if="modalNuevaAsignacion" class="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
            <div class="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg relative">
                <button class="absolute top-2 right-2 text-2xl font-bold text-gray-500"
                    @click="modalNuevaAsignacion = false">&times;</button>
                <h4 class="font-bold text-lg mb-4 text-center">Nueva Asignación</h4>
                <form @submit.prevent="agregarAsignacion">
                    <div class="mb-4">
                        <label class="block font-medium mb-1">ID Proyecto</label>
                        <input v-model="nuevaAsignacion.id_proyecto" required class="w-full border px-3 py-2 rounded"
                            type="number" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-medium mb-1">ID Personal</label>
                        <input v-model="nuevaAsignacion.id_personal" required class="w-full border px-3 py-2 rounded"
                            type="number" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Horas Trabajadas</label>
                        <input v-model="nuevaAsignacion.horas_trabajadas" required
                            class="w-full border px-3 py-2 rounded" type="number" step="0.01" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Fecha Registro</label>
                        <input v-model="nuevaAsignacion.fecha_registro" required class="w-full border px-3 py-2 rounded"
                            type="date" />
                    </div>
                    <div class="flex justify-end gap-2 mt-5">
                        <button type="button" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            @click="modalNuevaAsignacion = false">Cancelar</button>
                        <button type="submit"
                            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="modalDetalles" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
                <button class="absolute top-2 right-2 text-2xl font-bold text-gray-500"
                    @click="modalDetalles = false">&times;</button>
                <h4 class="font-bold text-lg mb-2 text-center">Detalles de Asignación</h4>
                <div class="space-y-2">
                    <div>
                        <span class="font-medium text-gray-600">ID Asignación:</span> {{ detallesActual.id_asignacion }}
                    </div>
                    <div>
                        <span class="font-medium text-gray-600">ID Proyecto:</span> {{ detallesActual.id_proyecto }}
                    </div>
                    <div>
                        <span class="font-medium text-gray-600">ID Personal:</span> {{ detallesActual.id_personal }}
                    </div>
                    <div>
                        <span class="font-medium text-gray-600">Horas Trabajadas:</span> {{
                            detallesActual.horas_trabajadas }}
                    </div>
                    <div>
                        <span class="font-medium text-gray-600">Fecha de Registro:</span> {{
                        detallesActual.fecha_registro }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import api from '../../../services/api.js'

// Campos: id_asignacion, id_proyecto, id_personal, horas_trabajadas, fecha_registro
const asignaciones = ref([
    {
        id_asignacion: 1,
        id_proyecto: 101,
        id_personal: 1,
        horas_trabajadas: 15.5,
        fecha_registro: '2025-10-12'
    },
    {
        id_asignacion: 2,
        id_proyecto: 102,
        id_personal: 2,
        horas_trabajadas: 24,
        fecha_registro: '2025-10-13'
    },
    {
        id_asignacion: 3,
        id_proyecto: 103,
        id_personal: 1,
        horas_trabajadas: 10,
        fecha_registro: '2025-10-16'
    }
])

const modalNuevaAsignacion = ref(false)
const modalDetalles = ref(false)
const detallesActual = ref({})

const nuevaAsignacion = ref({
    id_proyecto: '',
    id_personal: '',
    horas_trabajadas: '',
    fecha_registro: ''
})

const mostrarDetalles = (asignacion) => {
    detallesActual.value = asignacion
    modalDetalles.value = true
}

const agregarAsignacion = async () => {
    try {
        await api.post('/api/asignacionpersonal', nuevaAsignacion.value)
        modalNuevaAsignacion.value = false
        nuevaAsignacion.value = { id_proyecto: '', id_personal: '', horas_trabajadas: '', fecha_registro: '' }
        // getAsignaciones() deberia continuar desde acá, después lo checo
    } catch (err) {
        alert('No se pudo agregar la asignación')
        console.error(err)
    }
}
</script>
