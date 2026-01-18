import { useEffect, useState, useRef } from 'react'

/**
 * Hook para animação de contagem numérica
 * Anima de 0 até o valor final em aproximadamente 800ms
 */
export function useCountAnimation(value: number, duration: number = 800) {
  const [displayValue, setDisplayValue] = useState(0)
  const animationRef = useRef<number | null>(null)
  const startValueRef = useRef(0)

  useEffect(() => {
    // Cancela animação anterior se existir
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
    }

    const startValue = displayValue
    startValueRef.current = startValue
    const endValue = value
    const difference = endValue - startValue

    if (Math.abs(difference) < 0.01) {
      setDisplayValue(endValue)
      return
    }

    let startTime: number | null = null

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3)

      const currentValue = startValueRef.current + difference * eased
      setDisplayValue(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(endValue)
        animationRef.current = null
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [value, duration])

  return displayValue
}
