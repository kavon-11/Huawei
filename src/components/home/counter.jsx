import {
  motion,
  useMotionValue,
  animate,
  useInView,
  useTransform,
} from "framer-motion"
import { useEffect, useRef } from "react"

 function Counter({
  start = 0,
  end = 100,
  duration = 2,
  prefix = "",
  suffix = "",
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const count = useMotionValue(start)
  const rounded = useTransform(count, (v) => Math.floor(v))

  useEffect(() => {
    if (!isInView) return

    const controls = animate(count, end, {
      duration,
      ease: "easeOut",
    })

    return controls.stop
  }, [isInView, end])

  return (
    <span ref={ref}>
      {prefix}
      
      <motion.span className="m-1">{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default Counter ;