import { defineStore } from 'pinia'
import axios from 'axios'

export const useTransaksiStore = defineStore('transaksi', {
  state: () => ({
    pesanan: [],           // Keranjang aktif
    transaksiList: []      // Riwayat transaksi
  }),

  getters: {
    totalPesanan(state) {
      return state.pesanan.reduce((total, item) => {
        return total + item.harga * item.jumlah
      }, 0)
    }
  },

  actions: {
    tambahPesanan(item) {
      // `item` di sini bisa mengandung properti seperti id, nama, harga, varian
      const namaLengkap = item.varian ? `${item.nama} (${item.varian})` : item.nama

      const existing = this.pesanan.find(p =>
        p.id_menu === item.id && p.nama_menu === namaLengkap
      )

      if (existing) {
        existing.jumlah++
      } else {
        this.pesanan.push({
          id_menu: item.id,
          nama_menu: namaLengkap,
          harga: item.harga,
          jumlah: 1
        })
      }
    },

    kurangiPesanan(id_menu, nama_menu) {
      const index = this.pesanan.findIndex(
        p => p.id_menu === id_menu && p.nama_menu === nama_menu
      )
      if (index !== -1) {
        if (this.pesanan[index].jumlah > 1) {
          this.pesanan[index].jumlah--
        } else {
          this.pesanan.splice(index, 1)
        }
      }
    },

    hapusPesanan(id_menu, nama_menu) {
      this.pesanan = this.pesanan.filter(
        p => !(p.id_menu === id_menu && p.nama_menu === nama_menu)
      )
    },

    async simpanTransaksi() {
      const data = {
        tanggal: new Date().toISOString(),
        pesanan: JSON.parse(JSON.stringify(this.pesanan)) // deep copy
      }

      try {
        await axios.post('http://localhost:3000/transaksi', data)
        this.pesanan = []
        await this.fetchTransaksi()
      } catch (error) {
        console.error('❌ Gagal simpan transaksi:', error)
      }
    },

    async fetchTransaksi() {
      try {
        const res = await axios.get('http://localhost:3000/transaksi')
        this.transaksiList = res.data
      } catch (error) {
        console.error('❌ Gagal mengambil transaksi:', error)
      }
    }
  }
})
