/**
 * Performance optimization utilities
 * Includes memoization, lazy loading helpers, and performance monitoring
 */

// Simple memoization function
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = fn(...args)
    cache.set(key, result)

    return result
  }) as T
}

// Memoization with expiration
export function memoizeWithExpiry<T extends (...args: any[]) => any>(
  fn: T,
  expiryMs: number = 60000
): T {
  const cache = new Map<string, { value: ReturnType<T>; timestamp: number }>()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    const now = Date.now()

    const cached = cache.get(key)
    if (cached && now - cached.timestamp < expiryMs) {
      return cached.value
    }

    const result = fn(...args)
    cache.set(key, { value: result, timestamp: now })

    return result
  }) as T
}

// Debounced state update helper for React
export function createDebouncedUpdater<T>(
  setter: (value: T) => void,
  delay: number = 300
): (value: T) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (value: T) => {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      setter(value)
      timeoutId = null
    }, delay)
  }
}

// Throttled function execution
export function createThrottledFunction<T extends (...args: any[]) => any>(
  fn: T,
  limit: number = 200
): (...args: Parameters<T>) => void {
  let inThrottle = false
  let lastArgs: Parameters<T> | null = null

  return (...args: Parameters<T>) => {
    lastArgs = args

    if (!inThrottle) {
      fn(...args)
      inThrottle = true

      setTimeout(() => {
        if (lastArgs) {
          fn(...lastArgs)
        }
        inThrottle = false
        lastArgs = null
      }, limit)
    }
  }
}

// Lazy load images with intersection observer
export function lazyLoadImage(
  imgElement: HTMLImageElement,
  src: string,
  options?: IntersectionObserverInit
): () => void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        imgElement.src = src
        observer.disconnect()
      }
    })
  }, options || { threshold: 0.1 })

  observer.observe(imgElement)

  return () => observer.disconnect()
}

// Performance measurement utility
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map()
  private measures: Map<string, number> = new Map()

  mark(name: string): void {
    this.marks.set(name, performance.now())
  }

  measure(name: string, startMark: string): number {
    const startTime = this.marks.get(startMark)

    if (!startTime) {
      console.warn(`Start mark "${startMark}" not found`)
      return 0
    }

    const duration = performance.now() - startTime
    this.measures.set(name, duration)

    return duration
  }

  getMeasure(name: string): number | undefined {
    return this.measures.get(name)
  }

  getAllMeasures(): Record<string, number> {
    return Object.fromEntries(this.measures)
  }

  clear(): void {
    this.marks.clear()
    this.measures.clear()
  }

  logMeasures(): void {
    console.table(this.getAllMeasures())
  }
}

// Create a performance monitor instance
export const perfMonitor = new PerformanceMonitor()

// Batch state updates helper
export function batchUpdates<T>(
  updates: Array<() => void>,
  delay: number = 0
): void {
  if (delay === 0) {
    updates.forEach((update) => update())
  } else {
    setTimeout(() => {
      updates.forEach((update) => update())
    }, delay)
  }
}

// Virtual scrolling helper for large lists
export interface VirtualScrollConfig {
  itemHeight: number
  containerHeight: number
  overscan?: number
}

export function calculateVirtualScroll(
  scrollTop: number,
  totalItems: number,
  config: VirtualScrollConfig
): { startIndex: number; endIndex: number; offsetY: number } {
  const { itemHeight, containerHeight, overscan = 3 } = config

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const endIndex = Math.min(
    totalItems - 1,
    startIndex + visibleCount + overscan * 2
  )
  const offsetY = startIndex * itemHeight

  return { startIndex, endIndex, offsetY }
}

// Prefetch data helper
export async function prefetchData<T>(
  fetchFn: () => Promise<T>,
  cacheKey: string,
  cacheTime: number = 300000 // 5 minutes
): Promise<T> {
  const cached = sessionStorage.getItem(cacheKey)

  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < cacheTime) {
        return data as T
      }
    } catch {
      // Invalid cache, continue to fetch
    }
  }

  const data = await fetchFn()

  try {
    sessionStorage.setItem(
      cacheKey,
      JSON.stringify({ data, timestamp: Date.now() })
    )
  } catch {
    // Storage quota exceeded, ignore
  }

  return data
}

// Optimize re-renders by comparing objects
export function shallowEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true
  if (!obj1 || !obj2) return false

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  return keys1.every((key) => obj1[key] === obj2[key])
}

// Deep equal for complex objects
export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true
  if (!obj1 || !obj2) return false
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  return keys1.every((key) => {
    const val1 = obj1[key]
    const val2 = obj2[key]

    if (typeof val1 === 'object' && typeof val2 === 'object') {
      return deepEqual(val1, val2)
    }

    return val1 === val2
  })
}

// Request Animation Frame wrapper for smooth animations
export function rafSchedule(fn: Function): (...args: any[]) => void {
  let rafId: number | null = null

  return (...args: any[]) => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }

    rafId = requestAnimationFrame(() => {
      fn(...args)
      rafId = null
    })
  }
}

// Chunk large arrays for processing
export function* chunkArray<T>(array: T[], chunkSize: number): Generator<T[]> {
  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize)
  }
}

// Process large arrays in chunks with delays
export async function processInChunks<T, R>(
  array: T[],
  processor: (chunk: T[]) => R[],
  chunkSize: number = 100,
  delayMs: number = 0
): Promise<R[]> {
  const results: R[] = []

  for (const chunk of chunkArray(array, chunkSize)) {
    results.push(...processor(chunk))

    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }

  return results
}

// Optimize image loading
export interface OptimizedImageConfig {
  quality?: number
  format?: 'webp' | 'jpeg' | 'png'
  width?: number
  height?: number
}

export function getOptimizedImageUrl(
  src: string,
  config: OptimizedImageConfig = {}
): string {
  const { quality = 80, format = 'webp', width, height } = config

  // For Next.js Image Optimization
  const params = new URLSearchParams()
  if (width) params.set('w', width.toString())
  if (height) params.set('h', height.toString())
  params.set('q', quality.toString())
  params.set('f', format)

  return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`
}

// Resource hints for preloading
export function preloadResource(
  href: string,
  as: 'script' | 'style' | 'font' | 'image'
): void {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = as
  link.href = href

  if (as === 'font') {
    link.crossOrigin = 'anonymous'
  }

  document.head.appendChild(link)
}

// Web Worker helper for CPU-intensive tasks
export function createWorkerTask<T, R>(
  workerScript: string
): (data: T) => Promise<R> {
  return (data: T): Promise<R> => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(workerScript)

      worker.onmessage = (e: MessageEvent<R>) => {
        resolve(e.data)
        worker.terminate()
      }

      worker.onerror = (error) => {
        reject(error)
        worker.terminate()
      }

      worker.postMessage(data)
    })
  }
}

// Cache API wrapper for offline support
export class CacheManager {
  private cacheName: string

  constructor(cacheName: string = 'wiremi-cache-v1') {
    this.cacheName = cacheName
  }

  async cache(url: string, response: Response): Promise<void> {
    if ('caches' in window) {
      const cache = await caches.open(this.cacheName)
      await cache.put(url, response.clone())
    }
  }

  async get(url: string): Promise<Response | undefined> {
    if ('caches' in window) {
      const cache = await caches.open(this.cacheName)
      return await cache.match(url)
    }
  }

  async clear(): Promise<void> {
    if ('caches' in window) {
      await caches.delete(this.cacheName)
    }
  }
}

export const cacheManager = new CacheManager()
