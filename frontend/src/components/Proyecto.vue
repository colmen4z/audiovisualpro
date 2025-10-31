<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
    nombreProyecto: { type: String, required: true, default: 'Nombre del Proyecto' },
    tipoProyecto: { type: String, required: true, default: 'Tipo del Proyecto' },
    estadoProyecto: { type: String, required: true, default: 'Estado del Proyecto' },
    fechaInicio: { type: String, required: true, default: '' },
    fechaFinEstimada: { type: String, required: true, default: ''},
    presupuesto: { type: Number, required: true, default: 0 },
    locacion: { type: String, required: true, default: 'Locacion del Proyecto' },
})

const eliminarProyecto = () => {
    console.log("Eliminar proyecto")
}

const editarProyecto = () => {
    console.log("Editar proyecto")
}

const verDetalles = () => {
    console.log("Ver detalles del proyecto")
}
</script>

<template>
    <div class="bg-white rounded-xl shadow-lg p-3 border border-green-100 hover:border-green-500 transition">
        <div class="mb-3">
            <div class="flex-col">
                <h3 class="font-semibold text-lg">{{ nombreProyecto }}</h3>
                <div class="text-sm text-gray-500">
                    <p><span class="font-semibold">Tipo:</span> {{ tipoProyecto }}</p>
                    <p><span class="font-semibold">Estado:</span> {{ estadoProyecto }}</p>
                    <p><span class="font-semibold">Fecha de inicio:</span> {{ fechaInicio }}</p>
                    <p><span class="font-semibold">Fecha de finalizacion estimada:</span> {{ fechaFinEstimada }}</p>
                    <p>
                        <span class="font-semibold">Presupuesto: </span>
                        <span class="text-green-500 font-semibold">
                            Bs. {{ presupuesto }} 
                        </span>
                    </p>
                    <p><span class="font-semibold">Locacion:</span> {{ locacion }}</p>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2 font-semibold">
            <button @click="editarProyecto" class="items-center text-center flex justify-center bg-blue-500 rounded-lg text-white p-1 cursor-pointer hover:bg-blue-600 transition">
                <Icon icon="material-symbols:edit" width="20" height="20" class="mr-2" />
                Editar
            </button>
            <button @click="eliminarProyecto" class="items-center text-center flex justify-center bg-red-500 rounded-lg text-white p-1 cursor-pointer hover:bg-red-600 transition">
                <Icon icon="material-symbols:delete" width="20" height="20" class="mr-2" />
                Eliminar
            </button>
            <button @click="verDetalles" class="col-span-2 items-center text-center flex justify-center bg-yellow-300 rounded-lg text-black p-1 cursor-pointer hover:bg-yellow-500 transition">
                <Icon icon="clarity:details-solid" width="20" height="20" class="mr-2" />
                Ver Detalles
            </button>
        </div>
    </div>
</template>