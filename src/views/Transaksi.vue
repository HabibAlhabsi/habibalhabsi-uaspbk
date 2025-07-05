<template>
    <div class="flex bg-[#fdfcfb]">

        <!-- === SIDEBAR KATEGORI (FIXED) === -->
        <aside class="fixed top-20 left-0 h-screen w-52 bg-[#fff7f1] border-r border-gray-200 p-5 z-40">
            <h2 class="text-lg font-bold text-[#6B4F4F] mb-6">Kategori</h2>
            <ul class="space-y-2">
                <li v-for="kategori in kategoriList" :key="kategori">
                    <button @click="selectedKategori = kategori" :class="[
                        'w-full text-left px-3 py-2 rounded-md font-medium transition',
                        selectedKategori === kategori
                            ? 'bg-[#6B4F4F] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                    ]">
                        {{ kategori }}
                    </button>
                </li>
            </ul>
        </aside>

        <!-- === KONTEN MENU (TENGAH) === -->
        <main class="flex-1 ml-52 mr-[370px] p-6 min-h-screen">
            <h1 class="text-2xl font-bold text-[#4B2E2E] mb-6">
                🍽️ Pilih Menu - <span class="text-sm font-normal">{{ selectedKategori }}</span>
            </h1>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <div v-for="item in menuStore.menuByKategori(selectedKategori)" :key="item.id" @click="pilihMenu(item)"
                    class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg border hover:border-[#6B4F4F] cursor-pointer transition-all duration-200 group">
                    <div class="flex flex-col justify-between h-full">
                        <div>
                            <p class="font-bold text-[#6B4F4F] group-hover:text-[#3A2323] transition">{{ item.nama }}
                            </p>
                            <p class="text-sm text-gray-500 mt-1">Rp {{ item.harga.toLocaleString() }}</p>
                        </div>
                        <p class="text-xs mt-4 text-[#c4a484] italic">Klik untuk tambah</p>
                    </div>
                </div>
            </div>
        </main>

        <!-- === KERANJANG (FIXED RIGHT) === -->
        <aside
            class="fixed top-20 right-0 h-[calc(100vh-5rem)] w-[370px] bg-white border-l border-gray-200 shadow-md p-6 flex flex-col justify-between">
            <div>
                <h2 class="text-xl font-bold text-[#4B2E2E] mb-4">🛒 Keranjang</h2>

                <div v-if="transaksiStore.pesanan.length === 0" class="text-center text-gray-400 text-sm py-20">
                    Belum ada pesanan
                </div>

                <div v-else class="overflow-y-auto h-78 pr-2 space-y-3" style="max-height: calc(100vh - 260px)">
                    <div v-for="item in transaksiStore.pesanan" :key="item.id_menu + item.nama_menu"
                        class="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm">
                        <div>
                            <p class="text-sm font-semibold">{{ item.nama_menu }}</p>
                            <p class="text-xs text-gray-500">
                                Rp {{ item.harga.toLocaleString() }} × {{ item.jumlah }}
                            </p>
                        </div>
                        <div class="flex items-center gap-1">
                            <button @click="transaksiStore.kurangiPesanan(item.id_menu, item.nama_menu)"
                                class="w-6 h-6 text-white bg-red-500 rounded hover:bg-red-600">−</button>
                            <button
                                @click="transaksiStore.tambahPesanan({ id: item.id_menu, nama: item.nama_menu, harga: item.harga })"
                                class="w-6 h-6 text-white bg-green-500 rounded hover:bg-green-600">+</button>
                            <button @click="transaksiStore.hapusPesanan(item.id_menu, item.nama_menu)"
                                class="text-red-400 hover:text-red-600 text-xs">x</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TOTAL DAN TOMBOL TETAP DI BAWAH -->
            <div class="mt-6 border-t pt-3 bg-white">
                <p class="text-right font-bold text-lg text-gray-700 mb-3">
                    Total: Rp {{ transaksiStore.totalPesanan.toLocaleString() }}
                </p>
                <button @click="simpanTransaksi"
                    class="w-full bg-[#4B2E2E] hover:bg-[#3a2323] text-white py-2 rounded font-semibold">
                    ✅ Selesai
                </button>
            </div>
        </aside>


        <!-- === MODAL VARIAN === -->
        <div v-if="modalMinuman" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 shadow-lg w-80">
                <h3 class="text-lg font-bold mb-4 text-center">Pilih Varian</h3>
                <p class="text-center mb-4">{{ selectedMenu?.nama }}</p>
                <div class="flex justify-around">
                    <button @click="pilihVarian('Panas')"
                        class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">
                        Panas
                    </button>
                    <button @click="pilihVarian('Dingin')"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold">
                        Dingin
                    </button>
                </div>
                <button @click="modalMinuman = false"
                    class="mt-5 text-sm text-gray-500 hover:underline block text-center">Batal</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menuStore'
import { useTransaksiStore } from '@/stores/transaksiStore'

const menuStore = useMenuStore()
const transaksiStore = useTransaksiStore()

const kategoriList = ['Minuman', 'Makanan Ringan', 'Dessert']
const selectedKategori = ref(kategoriList[0])

const modalMinuman = ref(false)
const selectedMenu = ref(null)

const pilihMenu = (item) => {
    if (item.kategori === 'Minuman') {
        selectedMenu.value = item
        modalMinuman.value = true
    } else {
        transaksiStore.tambahPesanan(item)
    }
}

const pilihVarian = (varian) => {
    transaksiStore.tambahPesanan({
        id: selectedMenu.value.id,
        nama: `${selectedMenu.value.nama} - ${varian}`,
        harga: selectedMenu.value.harga
    })
    modalMinuman.value = false
    selectedMenu.value = null
}

const simpanTransaksi = async () => {
    await transaksiStore.simpanTransaksi()
    alert('Transaksi berhasil disimpan!')
}
</script>
