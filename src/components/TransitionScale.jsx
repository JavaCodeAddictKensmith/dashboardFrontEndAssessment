import { motion } from "framer-motion";
const opacityAnimation = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};
function TransitionScale({ children, className }) {
  return (
    <motion.div
      className={className}
      transition={{
        ease: "easeInOut",
        duration: 0.6,
      }}
      variants={opacityAnimation}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      {children}
    </motion.div>
  );
}

export default TransitionScale;
