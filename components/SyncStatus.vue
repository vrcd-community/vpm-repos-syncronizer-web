<template>
  <h2 class="text-2xl font-semibold mb-4">同步状态</h2>
  <UTable :loading="pending" :rows="result" :columns="columns" />
</template>

<script setup lang="ts">
const columns = [{
  key: 'url',
  label: '上游'
}, {
  key: 'syncStarted',
  label: '开始同步时间',
  sortable: true
}, {
  key: 'syncEnded',
  label: '同步完成时间',
  sortable: true
}, {
  key: 'status',
  label: '同步状态',
  sortable: true
}, {
  key: 'message',
  label: '状态信息'
}]

const { pending, data: status } = await useLazyFetch('https://vpm.vrczh.org/status/sync', {
  server: false
})

const result = ref(null)

watch(pending, (loading) => {
  if (loading)
    return

  (result.value as any) = (status.value as any[]).map((item) => formatStatusData(item))
})

function formatStatusData(item: any) {
  return {
    syncStarted: new Date(item.syncStarted).toLocaleString(),
    syncEnded: new Date(item.syncEnded).toLocaleString(),
    status: getStatusText(item.status),
    url: item.url,
    message: item.message == '' ? '无状态信息' : item.message
  }
}

function getStatusText(input: number) {
  switch (input) {
    case 0:
      return '✅同步成功'
    case 1:
      return '🔃正在同步'
    case 2:
      return '❌同步失败'
    case 3:
      return '未同步'
    default:
      return '❔未知'
  }
}
</script>