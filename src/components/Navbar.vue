<template>
  <nav class="fixed top-0 left-0 right-0 bg-white shadow z-50 h-[104px]"> <!-- h-26 manual -->
    <div class="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
      
      <!-- Logo / Judul -->
      <h1 class="text-3xl font-extrabold text-[#4B2E2E] tracking-wide flex items-center gap-2">
        ☕ Kasir <span class="text-[#6B4F4F]">Café</span>
      </h1>

      <!-- Menu -->
      <ul class="flex gap-10 text-base font-semibold text-gray-700">
        <li>
          <router-link
            to="/"
            class="hover:text-[#6B4F4F] transition"
            :class="{ 'text-[#6B4F4F] border-b-2 border-[#6B4F4F] pb-1': $route.path === '/' }"
          >
            Transaksi
          </router-link>
        </li>
        <li>
          <router-link
            to="/riwayat"
            class="hover:text-[#6B4F4F] transition"
            :class="{ 'text-[#6B4F4F] border-b-2 border-[#6B4F4F] pb-1': $route.path === '/riwayat' }"
          >
            Riwayat
          </router-link>
        </li>
        <li>
          <router-link
            to="/laporan"
            class="hover:text-[#6B4F4F] transition"
            :class="{ 'text-[#6B4F4F] border-b-2 border-[#6B4F4F] pb-1': $route.path === '/laporan' }"
          >
            Laporan
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
</style>
