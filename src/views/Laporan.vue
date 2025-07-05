<template>
  <div class="p-6 max-w-5xl mx-auto mt-24">
    <h1 class="text-3xl font-bold text-[#4B2E2E] mb-6">📊 Laporan Penjualan</h1>

    <div v-if="transaksiStore.transaksiList.length === 0" class="text-center py-20 text-gray-400">
      <p class="text-5xl mb-4">📉</p>
      <p class="text-sm">Belum ada data transaksi untuk ditampilkan</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Kartu Ringkasan -->
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-[#4B2E2E] mb-2">Total Transaksi</h2>
        <p class="text-2xl font-bold text-green-600">{{ totalTransaksi }}</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-[#4B2E2E] mb-2">Total Pendapatan</h2>
        <p class="text-2xl font-bold text-blue-600">Rp {{ totalPendapatan.toLocaleString() }}</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-[#4B2E2E] mb-2">Jumlah Item Terjual</h2>
        <p class="text-2xl font-bold text-purple-600">{{ totalItem }}</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-[#4B2E2E] mb-2">5 Menu Terlaris</h2>
        <ul class="mt-2 space-y-1 text-sm text-gray-700">
          <li v-for="(menu, index) in topMenu" :key="index" class="flex justify-between">
            <span>{{ menu.nama }}</span>
            <span class="text-gray-500">{{ menu.jumlah }}x</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()

onMounted(() => {
  transaksiStore.fetchTransaksi()
})

// Total transaksi
const totalTransaksi = computed(() => transaksiStore.transaksiList.length)

// Total pendapatan
const totalPendapatan = computed(() =>
  transaksiStore.transaksiList.reduce((sum, trx) => {
    return sum + trx.pesanan.reduce((s, p) => s + p.harga * p.jumlah, 0)
  }, 0)
)

// Total item terjual
const totalItem = computed(() =>
  transaksiStore.transaksiList.reduce((sum, trx) => {
    return sum + trx.pesanan.reduce((s, p) => s + p.jumlah, 0)
  }, 0)
)

// Top 5 menu
const topMenu = computed(() => {
  const menuMap = {}

  transaksiStore.transaksiList.forEach(trx => {
    trx.pesanan.forEach(p => {
      const key = p.nama_menu
      if (!menuMap[key]) {
        menuMap[key] = { nama: key, jumlah: 0 }
      }
      menuMap[key].jumlah += p.jumlah
    })
  })

  return Object.values(menuMap)
    .sort((a, b) => b.jumlah - a.jumlah)
    .slice(0, 5)
})
</script>
