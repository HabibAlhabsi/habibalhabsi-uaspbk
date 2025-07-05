<template>
  <div class="p-6 max-w-5xl mx-auto mt-24">
    <h1 class="text-3xl font-bold text-[#4B2E2E] mb-6">📋 Riwayat Transaksi</h1>

    <div v-if="transaksiStore.transaksiList.length === 0" class="text-center py-20 text-gray-400">
      <p class="text-5xl mb-4">📭</p>
      <p class="text-sm">Belum ada transaksi yang tersimpan</p>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="(trx, index) in transaksiStore.transaksiList"
        :key="index"
        class="bg-white rounded-lg shadow-md border border-gray-200 p-5"
      >
        <div class="flex justify-between items-center mb-2">
          <div class="text-sm text-gray-600">
            <span class="font-semibold">Tanggal:</span>
            {{ formatTanggal(trx.tanggal) }}
          </div>
          <div class="text-sm font-medium text-green-600">
            Total: Rp {{ hitungTotal(trx.pesanan).toLocaleString() }}
          </div>
        </div>

        <div class="divide-y divide-gray-100">
          <div
            v-for="item in trx.pesanan"
            :key="item.id_menu + item.nama_menu"
            class="py-2 flex justify-between text-sm"
          >
            <div>
              <p class="font-medium">{{ item.nama_menu }}</p>
              <p class="text-gray-500 text-xs">
                Rp {{ item.harga.toLocaleString() }} × {{ item.jumlah }}
              </p>
            </div>
            <div class="text-gray-700 font-semibold">
              Rp {{ (item.harga * item.jumlah).toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()

onMounted(() => {
  transaksiStore.fetchTransaksi()
})

const hitungTotal = (pesanan) => {
  return pesanan.reduce((total, item) => total + item.harga * item.jumlah, 0)
}

const formatTanggal = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
