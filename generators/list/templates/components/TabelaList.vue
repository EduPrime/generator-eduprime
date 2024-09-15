<script setup lang="ts">
import { ref, onMounted } from 'vue';
import <%= serviceName %> from '../services/<%= serviceName %>';
const service = new <%= serviceName %>();

const dataList = ref([]);
const tableName = '<%= tableName %>';
const fields = [<%- tableFields.map(field => `'${field}'`).join(', ') %>]; // Inserindo campos corretamente com aspas


onMounted(async () => {
  dataList.value = await service.getAll();
});
</script>

<template>
  <div>
    <h1>Lista de {{ tableName }}</h1>
    <ul>
      <li v-for="item in dataList" :key="item.id">
        <div v-for="field in fields" :key="field">
          <strong>{{ field }}:</strong> {{ item[field] }}<br>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Seus estilos aqui */
</style>
