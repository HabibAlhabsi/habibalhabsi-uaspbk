import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuList: [
      // MINUMAN
      { id: 1, nama: 'Kopi Susu', harga: 15000, kategori: 'Minuman' },
      { id: 2, nama: 'Americano', harga: 12000, kategori: 'Minuman' },
      { id: 3, nama: 'Cappuccino', harga: 16000, kategori: 'Minuman' },
      { id: 4, nama: 'Matcha Latte', harga: 17000, kategori: 'Minuman' },
      { id: 5, nama: 'Cokelat', harga: 14000, kategori: 'Minuman' },
      { id: 6, nama: 'Vanilla Latte', harga: 16000, kategori: 'Minuman' },
      { id: 7, nama: 'Hazelnut Coffee', harga: 18000, kategori: 'Minuman' },
      { id: 8, nama: 'Caramel Macchiato', harga: 19000, kategori: 'Minuman' },
      { id: 9, nama: 'Tea (Teh)', harga: 10000, kategori: 'Minuman' },
      { id: 10, nama: 'Lemon Tea', harga: 12000, kategori: 'Minuman' },

      // MAKANAN RINGAN
      { id: 11, nama: 'Croissant', harga: 12000, kategori: 'Makanan Ringan' },
      { id: 12, nama: 'Donat', harga: 8000, kategori: 'Makanan Ringan' },
      { id: 13, nama: 'Roti Bakar', harga: 10000, kategori: 'Makanan Ringan' },
      { id: 14, nama: 'French Fries', harga: 13000, kategori: 'Makanan Ringan' },
      { id: 15, nama: 'Chicken Nugget', harga: 15000, kategori: 'Makanan Ringan' },
      { id: 16, nama: 'Mini Sandwich', harga: 14000, kategori: 'Makanan Ringan' },

      // DESSERT
      { id: 17, nama: 'Red Velvet Cake', harga: 20000, kategori: 'Dessert' },
      { id: 18, nama: 'Cheesecake', harga: 21000, kategori: 'Dessert' },
      { id: 19, nama: 'Tiramisu', harga: 22000, kategori: 'Dessert' },
      { id: 20, nama: 'Brownies', harga: 17000, kategori: 'Dessert' },
      { id: 21, nama: 'Cookies', harga: 7000, kategori: 'Dessert' }
    ]
  }),

  getters: {
    menuByKategori: (state) => (kategori) => {
      return state.menuList.filter(item => item.kategori === kategori)
    }
  }
})
