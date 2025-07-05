// tests/stores/menuStore.test.js
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useMenuStore } from '@/stores/menuStore'

describe('menuStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useMenuStore()
  })

  it('should have default menu list length of 21', () => {
    expect(store.menuList.length).toBe(21)
  })

  it('should filter menu by kategori "Minuman"', () => {
    const minuman = store.menuByKategori('Minuman')
    expect(minuman.length).toBeGreaterThan(0)
    expect(minuman.every(item => item.kategori === 'Minuman')).toBe(true)
  })

  it('should filter menu by kategori "Makanan Ringan"', () => {
    const makanan = store.menuByKategori('Makanan Ringan')
    expect(makanan.length).toBe(6)
    expect(makanan[0].nama).toBe('Croissant')
  })

  it('should filter menu by kategori "Dessert"', () => {
    const dessert = store.menuByKategori('Dessert')
    expect(dessert.length).toBe(5)
    expect(dessert.some(item => item.nama === 'Tiramisu')).toBe(true)
  })

  it('should return empty array for unknown kategori', () => {
    const result = store.menuByKategori('Tidak Ada')
    expect(result).toEqual([])
  })
})
