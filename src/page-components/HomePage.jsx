import classes from "./HomePage.module.css";

import { NavLink, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import MultiLayerParallax from "../UI/MultiLayerParallax";

export default function HomePage() {

//   const opacityImg = useTransform(
//     scrollY,
//     [0, 100, 200, 300],
//     [1, 0.7, 0.5, 0.3]
//   );
//   const yImg = useTransform(scrollY, [0, 200], [0, -100]);

//   const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);
//   const yText = useTransform(scrollY, [0, 100, 200, 300], [0, 50, 50, 300]);

 
  return (
    <main className={classes.mainHome}>
      <MultiLayerParallax/>
      <div className={classes.text}>
        <div>
            <h2>About Us</h2>
            <p>
            Discover the Art of Light and Shadow. At Echoes in Gray, we celebrate
            the beauty of black-and-white photography, transforming fleeting
            moments into timeless pieces of art. Explore our carefully curated
            collection of monochrome prints that evoke emotion, depth, and a sense
            of nostalgia. Let your walls tell a story with shades of gray.
            </p>
        </div>
        <div>
            <h2>Our Philosophy</h2>
            <p>
            At Echoes in Gray, we view photography as more than a medium—it's a
            window into the soul of each subject. Black and white images have a
            unique ability to strip away distractions, allowing the viewer to
            focus on the pure essence of the captured moment. By removing color,
            we bring forward textures, shapes, and contrasts that evoke a sense of
            timelessness.
            </p>
            <p>
            Our philosophy is rooted in the idea that simplicity is powerful.
            Every photo is an invitation to slow down and explore details often
            missed in the fast pace of life. We carefully select each image to
            spark curiosity and invite viewers to interpret the story in their own
            way, creating a personal connection with the art.
            </p>
        </div>
        <div>
            <h2>Why Monochrome?</h2>
            <p>
            The absence of color shifts the focus to composition, light, and
            shadow, creating an atmosphere that feels both nostalgic and modern.
            Monochrome photography has a universal language—it doesn't require
            vibrant colors to convey emotions. Instead, the nuanced tones of gray,
            black, and white offer subtle, introspective beauty.
            </p>
            <p>
            Monochrome images encourage viewers to pause, to look deeper, and to
            reflect. They can transform a room by adding a quiet sophistication, a
            sense of mystery, or an element of calm. Whether it's a sweeping
            landscape or an intimate portrait, black-and-white photography brings
            a distinct character to any space.
            </p>
        </div>
        <div>
            <h2>Meet the Artists</h2>
            <p>
            Our collection is crafted by photographers who share our passion for
            monochrome art. Each artist brings their unique perspective, capturing
            scenes from urban streets, nature's landscapes, and the simple beauty
            of everyday moments. Their work emphasizes the delicate balance
            between light and shadow, breathing life into each image.
            </p>
            <p>
            We are proud to collaborate with artists who understand the power of
            subtlety, transforming the ordinary into the extraordinary. By
            exploring different techniques in lighting, exposure, and composition,
            they bring out the soul of their subjects, inviting viewers to
            experience the world through their eyes.
            </p>
        </div>
        <div>
            <h2>What Our Customers Say</h2>
            <p className={classes.testimonial}>
            "Echoes in Gray transformed my living room with art that speaks to my
            soul. Each piece tells a story, and the quality is exceptional."
            <span className={classes.testimonialName}>- Sarah L.</span> 
            
            </p>
            <p className={classes.testimonial}>
            "I was captivated by the depth and emotion in each photograph. It's
            rare to find a collection that resonates so personally. Echoes in Gray
            is a treasure."
            <span className={classes.testimonialName}>- David R.</span>  
            </p>
            <p className={classes.testimonial}>
            "I love how these prints bring a sense of calm to my space. The
            monochrome tones add elegance and simplicity to my home. Highly
            recommend Echoes in Gray for anyone looking to elevate their decor."
            <span className={classes.testimonialName}>- Emily K.</span>  
            </p>
        </div>
      </div>
    </main>
  );
}
