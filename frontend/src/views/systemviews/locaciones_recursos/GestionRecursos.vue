<template>
    <div class="h-screen flex flex-col">
        <div class="border-b border-gray-200 pb-3 mb-4">
            <h3 class="text-center font-bold text-lg">Gestión de Recursos</h3>
        </div>
        <div
            class="flex-1 overflow-y-auto border border-gray-200 rounded-lg min-h-[400px] max-h-[calc(100vh-240px)] p-3">
            <table class="table-auto w-full">
                <thead>
                    <tr class="bg-green-100 text-green-900">
                        <th class="px-4 py-2 text-left">ID</th>
                        <th class="px-4 py-2 text-left">Nombre del Equipo</th>
                        <th class="px-4 py-2 text-left">Tipo de Recurso</th>
                        <th class="px-4 py-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="recurso in recursos" :key="recurso.idrecurso"
                        class="border-b border-green-100 hover:bg-green-50 transition">
                        <td class="px-4 py-2">{{ recurso.idrecurso }}</td>
                        <td class="px-4 py-2">{{ recurso.nombreequipo }}</td>
                        <td class="px-4 py-2">{{ recurso.nombretipo }}</td>
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
                @click="modalNuevoRecurso = true">
                <Icon icon="material-symbols:add" width="25" height="25" class="mr-2" /> Nuevo Recurso
            </button>
        </div>
        <div v-if="modalNuevoRecurso" class="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
            <div class="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg relative">
                <button class="absolute top-2 right-2 text-2xl font-bold text-gray-500"
                    @click="modalNuevoRecurso = false">&times;</button>
                <h4 class="font-bold text-lg mb-4 text-center">Nuevo Recurso</h4>
                <form @submit.prevent="crearRecurso">
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Nombre del Equipo</label>
                        <input v-model="nuevoRecurso.nombreequipo" required class="w-full border px-3 py-2 rounded"
                            type="text" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Tipo de Recurso</label>
                        <input v-model="nuevoRecurso.nombretipo" required class="w-full border px-3 py-2 rounded"
                            type="text" />
                    </div>
                    <div class="flex justify-end gap-2 mt-5">
                        <button type="button" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            @click="modalNuevoRecurso = false">Cancelar</button>
                        <button type="submit"
                            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import api from '../../../services/api.js'

const recursos = ref([
    {
        idrecurso: 1,
        nombreequipo: 'Consola Yamaha MG16XU',
        nombretipo: 'Consola de Audio'
    },
    {
        idrecurso: 2,
        nombreequipo: 'Micrófono Shure SM58',
        nombretipo: 'Micrófono'
    },
    {
        idrecurso: 3,
        nombreequipo: 'Proyector Epson EB-U42',
        nombretipo: 'Proyector'
    }
])

const modalNuevoRecurso = ref(false)
const nuevoRecurso = ref({
    nombreequipo: '',
    nombretipo: ''
})

// Agregar la lógica real después, por ahora dejé la estructura de como PIENSO que debería hacerse.
const crearRecurso = async () => {
    try {
        await api.post('/apirecursos', nuevoRecurso.value)
        modalNuevoRecurso.value = false
        nuevoRecurso.value = { nombreequipo: '', nombretipo: '' }
        // getRecursos() y de acá parto cuando sepa como hacerle ;P
    } catch (err) {
        alert('No se pudo crear el recurso')
        console.error(err)
    }
}
</script>
