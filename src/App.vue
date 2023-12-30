<script setup>
import { onMounted, ref } from 'vue';
const src = ref('')
const isload = ref(false)
async function onMessageToElectron() {
  const res = await window.electronAPI.startWeb()
  console.log(res)
  src.value = res
}
onMounted(() => {
  onMessageToElectron()
})
</script>
<template>
  <div>
    <iframe ref="web" :src="src" frameborder="0" class="full" id="iframe"></iframe>
  </div>
</template>

<style scoped>
.full {
  width: 100%;
  height: calc(100vh - 4px);
}
</style>
