import classes from "./MultiLayerParallax.module.css";
// import homeImg from "../../assets/home-img/background.png";
// import mountains from '../../assets/home-img/subtractBg2.png'
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MultiLayerParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0,1], ['0%', '100%'])
  const opacityY = useTransform(scrollYProgress, [0,0.3,0.5, 1], ['100%','50%','25%', '0%'])

  const textY = useTransform(scrollYProgress, [0,1], ['0%', '200%'])

  const buttonY = useTransform(scrollYProgress, [0,0.2], ['100%', '0%'])


  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/products");
  }
  return (
    <div className={classes.home} ref={ref}>
      <motion.img src='/home-img/background.png' alt="home-image" style={{opacity: opacityY, y: backgroundY,} }/>
      <img src='/home-img/subtractBg2.png' alt="home-image" />
      <motion.h1 className={classes.title} style={{y: textY}}>
        <span>Echoes in Gray: </span>Timeless Monochrome Photography
      </motion.h1>
      <motion.div className={classes.button} style={{opacity: buttonY}}>
        <Button onClick={handleNavigate}>Explore the Collection</Button>
      </motion.div>
    </div>
  );
}
