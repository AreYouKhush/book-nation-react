import * as React from "react";
import { motion } from "framer-motion";

export const MenuSvg = (props) => {
  return (
    <motion.svg
        // width={240}
        // height={200}
      viewBox="0 0 240 200"
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
        <motion.path
          d="M10 10H230"
          stroke="white"
          strokeWidth={20}
          strokeLinecap="round"
        />
        <motion.path
          d="M10 100H230"
          stroke="white"
          strokeWidth={20}
          strokeLinecap="round"
        />
        <motion.path
          d="M10 190H230"
          stroke="white"
          strokeWidth={20}
          strokeLinecap="round"
        />
      </motion.g>
    </motion.svg>
  );
};
