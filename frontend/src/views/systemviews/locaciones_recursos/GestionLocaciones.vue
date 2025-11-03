<template>
    <div class="h-screen flex flex-col">
        <div class="border-b border-gray-200 pb-3 mb-4">
            <h3 class="text-center font-bold text-lg">Gestión de Locaciones</h3>
        </div>
        <div
            class="flex-1 overflow-y-auto border border-gray-200 rounded-lg min-h-[400px] max-h-[calc(100vh-240px)] p-3">
            <table class="table-auto w-full">
                <thead>
                    <tr class="bg-green-100 text-green-900">
                        <th class="px-4 py-2 text-left">ID</th>
                        <th class="px-4 py-2 text-left">Nombre</th>
                        <th class="px-4 py-2 text-left">Dirección</th>
                        <th class="px-4 py-2 text-left">Descripción</th>
                        <th class="px-4 py-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="locacion in locaciones" :key="locacion.idlocacion"
                        class="border-b border-green-100 hover:bg-green-50 transition">
                        <td class="px-4 py-2">{{ locacion.idlocacion }}</td>
                        <td class="px-4 py-2">{{ locacion.nombrelocacion }}</td>
                        <td class="px-4 py-2">{{ locacion.direccion }}</td>
                        <td class="px-4 py-2">{{ locacion.descripcionlocacion }}</td>
                        <td class="px-4 py-2 flex items-center gap-1">
                            <button
                                class="flex items-center text-center justify-center cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-1 rounded-lg transition-colors">
                                <Icon icon="material-symbols:edit" width="20" height="20" class="mr-2" /> Editar
                            </button>
                            <button
                                class="flex items-center text-center justify-center cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-lg transition-colors">
                                <Icon icon="material-symbols:delete" width="20" height="20" class="mr-2" /> Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-end mt-4">
            <button
                class="w-50 flex items-center text-center justify-center cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-lg transition-colors"
                @click="modalNuevaLocacion = true">
                <Icon icon="material-symbols:add" width="25" height="25" class="mr-2" /> Nueva Locación
            </button>
        </div>
        <div v-if="modalNuevaLocacion" class="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
            <div class="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg relative">
                <button class="absolute top-2 right-2 text-2xl font-bold text-gray-500"
                    @click="modalNuevaLocacion = false">&times;</button>
                <h4 class="font-bold text-lg mb-4 text-center">Nueva Locación</h4>
                <form @submit.prevent="crearLocacion">
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Nombre</label>
                        <input v-model="nuevaLocacion.nombrelocacion" required class="w-full border px-3 py-2 rounded"
                            type="text" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Dirección</label>
                        <input v-model="nuevaLocacion.direccion" class="w-full border px-3 py-2 rounded" type="text" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Descripción</label>
                        <textarea v-model="nuevaLocacion.descripcionlocacion" class="w-full border px-3 py-2 rounded"
                            rows="3" />
                    </div>
                    <div class="flex justify-end gap-2 mt-5">
                        <button type="button" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            @click="modalNuevaLocacion = false">Cancelar</button>
                        <button type="submit"
                            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import api from '../../../services/api.js'

const locaciones = ref([
    {
        idlocacion: 1,
        nombrelocacion: 'Hotel Tiffany (Salón Tabure)',
        direccion: 'Urb. Nueva Segovia, Calle 2 entre Carrera 1 y Av. Lara.',
        descripcionlocacion: 'Salones versátiles y exclusivos con servicios de organización de eventos corporativos y sociales de alto nivel.'
    },
    {
        idlocacion: 2,
        nombrelocacion: 'Lidotel Barquisimeto (Gran Salón Doral)',
        direccion: 'C.C. Sambil Barquisimeto, Av. Venezuela con Av. Argimiro Bracamonte.',
        descripcionlocacion: 'Modernas instalaciones en el centro comercial Sambil, con varios salones de alta tecnología audiovisual y servicio exclusivo de banquetes.'
    }
])
const modalNuevaLocacion = ref(false)
const nuevaLocacion = ref({
    nombrelocacion: '',
    direccion: '',
    descripcionlocacion: ''
})

const getLocaciones = async () => {
    try {
        const res = await api.get('/apilocaciones')
        locaciones.value = [...locaciones.value, ...(res.data || [])]
    } catch (err) {
        console.error('Error al obtener las locaciones', err)
    }
}

const crearLocacion = async () => {
    try {
        await api.post('/apilocaciones', nuevaLocacion.value)
        modalNuevaLocacion.value = false
        nuevaLocacion.value = { nombrelocacion: '', direccion: '', descripcionlocacion: '' }
        getLocaciones()
    } catch (err) {
        alert('No se pudo crear la locación')
        console.error(err)
    }
}

onMounted(getLocaciones)
</script>
