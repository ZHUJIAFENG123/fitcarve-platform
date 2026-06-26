import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useImageLazyLoad(threshold = 0.1, rootMargin = '200px') {
  const observer = ref<IntersectionObserver | null>(null)

  function observe(el: HTMLElement, src: string, placeholder?: string) {
    if (!observer.value) return

    const img = el.tagName === 'IMG' ? (el as HTMLImageElement) : el.querySelector('img')
    if (!img) return

    if (placeholder) {
      img.src = placeholder
    }
    img.dataset.src = src
    observer.value.observe(img)
  }

  function loadImage(img: HTMLImageElement) {
    const src = img.dataset.src
    if (!src) return

    const tempImg = new Image()
    tempImg.onload = () => {
      img.src = src
      img.classList.add('lazy-loaded')
    }
    tempImg.onerror = () => {
      img.classList.add('lazy-error')
    }
    tempImg.src = src
  }

  onMounted(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('img[data-src]').forEach(img => {
        loadImage(img as HTMLImageElement)
      })
      return
    }

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target as HTMLImageElement)
          observer.value?.unobserve(entry.target)
        }
      })
    }, { rootMargin, threshold })
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return { observe }
}
