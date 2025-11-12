<template>
    <div class="h-screen flex flex-col">
        <div class="border-b border-gray-200 pb-3 mb-4">
            <h3 class="text-center font-bold text-lg">Roles de Personal</h3>
        </div>
        <div class="flex-1 overflow-y-auto p-2">
            <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div v-for="rol in roles" :key="rol.id_rol"
                    class="bg-white border rounded-xl shadow px-5 py-4 flex flex-col justify-between"
                    style="min-width:290px;">
                    <div>
                        <div class="flex items-center mb-2">
                            <Icon icon="mdi:shield-account" width="28" height="28" class="text-indigo-600" />
                            <span class="pl-2 text-xl font-bold">{{ rol.nombre_rol }}</span>
                        </div>
                        <span class="block text-gray-500 font-semibold text-base mb-4">ID: {{ rol.id_rol }}</span>
                    </div>
                    <div class="flex gap-2 mt-4">
                        <button
                            class="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors gap-1 w-full"
                            @click="mostrarDetalles(rol)">
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
                @click="modalNuevoRol = true">
                <Icon icon="material-symbols:add" width="25" height="25" class="mr-2" /> Nuevo Rol
            </button>
        </div>
        <div v-if="modalNuevoRol" class="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
            <div class="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg relative">
                <button class="absolute top-2 right-2 text-2xl font-bold text-gray-500"
                    @click="modalNuevoRol = false">&times;</button>
                <h4 class="font-bold text-lg mb-4 text-center">Nuevo Rol</h4>
                <form @submit.prevent="agregarRol">
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Nombre del Rol</label>
                        <input v-model="nuevoRol.nombre_rol" required class="w-full border px-3 py-2 rounded"
                            type="text" />
                    </div>
                    <div class="flex justify-end gap-2 mt-5">
                        <button type="button" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            @click="modalNuevoRol = false">Cancelar</button>
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
                <h4 class="font-bold text-lg mb-2 text-center">Detalles de Rol</h4>
                <div class="space-y-2">
                    <div>
                        <span class="font-medium text-gray-600">ID Rol:</span> {{ detallesActual.id_rol }}
                    </div>
                    <div>
                        <span class="font-medium text-gray-600">Nombre Rol:</span> {{ detallesActual.nombre_rol }}
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

// BD: roles_personal: id_rol, nombre_rol
const roles = ref([
    {
        id_rol: 1,
        nombre_rol: 'Técnico de Sonido'
    },
    {
        id_rol: 2,
        nombre_rol: 'Coordinador de Eventos'
    },
    {
        id_rol: 3,
        nombre_rol: 'Especialista Audiovisual'
    }
])

const modalNuevoRol = ref(false)
const modalDetalles = ref(false)
const detallesActual = ref({})

const nuevoRol = ref({
    nombre_rol: ''
})

const mostrarDetalles = (rol) => {
    detallesActual.value = rol
    modalDetalles.value = true
}

const agregarRol = async () => {
    try {
        await api.post('/api/roles_personal', nuevoRol.value)
        modalNuevoRol.value = false
        nuevoRol.value = { nombre_rol: '' }
        // getRoles() (para recargar en lógica futura)
    } catch (err) {
        alert('No se pudo agregar el rol')
        console.error(err)
    }
}
</script>
