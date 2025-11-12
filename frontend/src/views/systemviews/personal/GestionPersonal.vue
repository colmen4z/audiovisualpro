<template>
    <div class="h-screen flex flex-col">
        <div class="border-b border-gray-200 pb-3 mb-4">
            <h3 class="text-center font-bold text-lg">Gestión de Personal</h3>
        </div>
        <div class="flex-1 overflow-y-auto p-2">
            <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div v-for="persona in personal" :key="persona.idpersonal"
                    class="bg-white border rounded-xl shadow px-5 py-4 flex flex-col justify-between"
                    style="min-width:290px;">
                    <div>
                        <div class="flex items-center mb-2">
                            <Icon icon="material-symbols:account-circle" width="28" height="28" class="text-blue-500" />
                            <span class="pl-2 text-xl font-bold">{{ persona.nombrepersonal }}</span>
                        </div>
                        <span class="block font-medium mb-2 text-gray-700 text-base">Rol: <span class="font-normal">{{
                                persona.rol }}</span></span>
                        <span class="block text-gray-500 font-semibold text-sm mb-2">Cédula: {{ persona.cedulapersonal
                            }}</span>
                        <span class="block text-gray-500 font-semibold text-sm mb-2">Correo: {{ persona.emailpersonal
                            }}</span>
                        <span class="block text-gray-500 font-semibold text-sm mb-2">Teléfono: {{ persona.telefono
                            }}</span>
                        <span class="block text-gray-500 font-semibold text-sm mb-2">Salario: <span
                                class="text-green-600 font-bold">Bs. {{ persona.salario }}</span></span>
                    </div>
                    <div class="flex gap-2 mt-4">
                        <button
                            class="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors gap-1 w-full">
                            <Icon icon="material-symbols:edit" width="20" height="20" /> Editar
                        </button>
                        <button
                            class="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors gap-1 w-full">
                            <Icon icon="material-symbols:delete" width="20" height="20" /> Eliminar
                        </button>
                    </div>
                    <button
                        class="mt-3 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg px-4 py-2 transition-colors w-full"
                        @click="mostrarDetalles(persona)">
                        <Icon icon="material-symbols:info-outline" width="18" height="18" class="mr-2" /> Ver Detalles
                    </button>
                </div>
            </div>
        </div>
        <div class="flex justify-end mt-4">
            <button
                class="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-lg transition-colors"
                @click="modalNuevoPersonal = true">
                <Icon icon="material-symbols:add" width="25" height="25" class="mr-2" /> Nuevo Personal
            </button>
        </div>
        <div v-if="modalNuevoPersonal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
            <div class="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg relative">
                <button class="absolute top-2 right-2 text-2xl font-bold text-gray-500"
                    @click="modalNuevoPersonal = false">&times;</button>
                <h4 class="font-bold text-lg mb-4 text-center">Nuevo Personal</h4>
                <form @submit.prevent="agregarPersonal">
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Nombre</label>
                        <input v-model="nuevoPersonal.nombrepersonal" required class="w-full border px-3 py-2 rounded"
                            type="text" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Cédula</label>
                        <input v-model="nuevoPersonal.cedulapersonal" required class="w-full border px-3 py-2 rounded"
                            type="text" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Rol</label>
                        <input v-model="nuevoPersonal.rol" required class="w-full border px-3 py-2 rounded"
                            type="text" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Salario</label>
                        <input v-model="nuevoPersonal.salario" required class="w-full border px-3 py-2 rounded"
                            type="number" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Correo</label>
                        <input v-model="nuevoPersonal.emailpersonal" class="w-full border px-3 py-2 rounded"
                            type="email" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Teléfono</label>
                        <input v-model="nuevoPersonal.telefono" class="w-full border px-3 py-2 rounded" type="text" />
                    </div>
                    <div class="flex justify-end gap-2 mt-5">
                        <button type="button" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            @click="modalNuevoPersonal = false">Cancelar</button>
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
                <h4 class="font-bold text-lg mb-2 text-center">Detalles del Personal</h4>
                <div class="space-y-2">
                    <div>
                        <span class="font-medium text-gray-600">ID:</span> {{ detallesActual.idpersonal }}
                    </div>
                    <div>
                        <span class="font-medium text-gray-600">Nombre:</span> {{ detallesActual.nombrepersonal }}
                    </div>
                    <div>
                        <span class="font-medium text-gray-600">Cédula:</span> {{ detallesActual.cedulapersonal }}
                    </div>
                    <div>
                        <span class="font-medium text-gray-600">Rol (ID):</span> {{ detallesActual.rol }} <span
                            v-if="detallesActual.idrol">({{ detallesActual.idrol }})</span>
                    </div>
                    <div>
                        <span class="font-medium text-gray-600">Salario:</span> Bs. {{ detallesActual.salario }}
                    </div>
                    <div>
                        <span class="font-medium text-gray-600">Correo:</span> {{ detallesActual.emailpersonal }}
                    </div>
                    <div>
                        <span class="font-medium text-gray-600">Teléfono:</span> {{ detallesActual.telefono }}
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

// Usa todos los campos del modelo BD: id_personal, nombre_personal, cedula_personal, id_rol, salario, email_personal, telefono
const personal = ref([
    {
        idpersonal: 1,
        nombrepersonal: 'Juan García',
        cedulapersonal: '18792234',
        rol: 'Técnico de Sonido',
        idrol: 1,
        salario: 2800,
        emailpersonal: 'juan.garcia@ejemplo.com',
        telefono: '0424-5551111'
    },
    {
        idpersonal: 2,
        nombrepersonal: 'Laura Mendoza',
        cedulapersonal: '20654112',
        rol: 'Coordinadora de Eventos',
        idrol: 2,
        salario: 3500,
        emailpersonal: 'laura.mendoza@ejemplo.com',
        telefono: '0412-9872331'
    },
    {
        idpersonal: 3,
        nombrepersonal: 'Pedro Díaz',
        cedulapersonal: '14567342',
        rol: 'Especialista Audiovisual',
        idrol: 3,
        salario: 3000,
        emailpersonal: 'pedro.diaz@ejemplo.com',
        telefono: '0426-1329987'
    }
])

const modalNuevoPersonal = ref(false)
const modalDetalles = ref(false)
const detallesActual = ref({})

const nuevoPersonal = ref({
    nombrepersonal: '',
    cedulapersonal: '',
    rol: '',
    idrol: '',
    salario: '',
    emailpersonal: '',
    telefono: ''
})

const mostrarDetalles = (persona) => {
    detallesActual.value = persona
    modalDetalles.value = true
}

const agregarPersonal = async () => {
    try {
        await api.post('/apipersonal', nuevoPersonal.value)
        modalNuevoPersonal.value = false
        nuevoPersonal.value = { nombrepersonal: '', cedulapersonal: '', rol: '', idrol: '', salario: '', emailpersonal: '', telefono: '' }
        // getPersonal() 
    } catch (err) {
        alert('No se pudo agregar el personal')
        console.error(err)
    }
}
</script>
