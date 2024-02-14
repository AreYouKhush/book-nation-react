import * as React from "react";
import { motion } from "framer-motion";

const CloseMenuSvg = (props) => (
  
  <svg
    // width={218}
    // height={222}
    viewBox="0 0 218 222"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <motion.g
      animate={{
        rotate: [null, 360],
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
    >
      <path
        d="M9 211L209 11"
        stroke="white"
        strokeWidth={20}
        strokeLinecap="round"
      />
      <path
        d="M9 11L209 211"
        stroke="white"
        strokeWidth={20}
        strokeLinecap="round"
      />
    </motion.g>
  </svg>
);
export default CloseMenuSvg;
