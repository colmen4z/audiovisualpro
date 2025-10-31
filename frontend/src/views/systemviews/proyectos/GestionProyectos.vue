<script setup>
import { Icon } from '@iconify/vue'
import Proyecto from '../../../components/Proyecto.vue'

const arrayTest = [1, 2, 3, 4, 5, 6, 7, 8]
</script>

<template>
    <div class="h-screen flex flex-col">
        <div class="border-b border-gray-200 pb-3 mb-4">
            <h3 class="text-center font-bold text-lg">Gestion de Proyectos</h3>
        </div>

        <div class="mb-3">
            <div class="flex justify-end">
                <button class="w-50 flex items-center text-center justify-center cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-lg transition-colors">
                    <Icon icon="ix:project-new" width="25" height="25" class="mr-2" />
                    Nuevo Proyecto
                </button>
            </div>
        </div>

        <div class="mb-3">
            <div class="flex space-x-2">
                <div class="relative flex-1">
                    <Icon
                        icon="material-symbols:search"
                        width="25"
                        height="25"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        class="transition w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Buscar proyecto"
                    >
                </div>
                <button class="flex items-center text-center justify-center cursor-pointer bg-green-500 text-white font-semibold p-2 rounded-lg transition-colors hover:bg-green-600">
                    <Icon icon="mi:filter" width="25" height="25" />
                </button>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-3 border border-gray-200 rounded-lg min-h-[400px] max-h-[calc(100vh-240px)]">
            <div class="grid grid-cols-2 gap-3">
                <div v-for="array in arrayTest">
                    <Proyecto />
                </div>
            </div>
        </div>
    </div>
</template>