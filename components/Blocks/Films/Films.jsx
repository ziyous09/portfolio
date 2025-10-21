// "use client";

// import React, { useRef } from "react";

// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import Image from "next/image";
// import styles from './Films.module.scss';
// import Link from "next/link";
// import Title from "@/components/UI/Elements/Title/Title";
// import FancyButton from "@/components/UI/Elements/Button/Button";
// import TextReveal from "@/components/UI/Elements/TextReveal/TextReveal";
// import commonConfig from '@/database/config/metadata.json';
// import Arts from '@/database/Arts.json';
// import Container from "@/components/UI/Layout/Layout";
// import Blobs from "@/components/UI/Elements/Blobs/Blobs";
// import Magnet from "@/components/UI/Magnet/Magnet";
// export default function Films() {
//     const container = useRef();
//     const { contextSafe } = useGSAP({scope: container});


//     useGSAP(() => {
//         gsap.registerPlugin(ScrollTrigger);
//         /*gsap.from(`.${styles.sliderItem}`, {
//             x: '-50%',
//             stagger: 0.1,
//             duration: 1,
//             scrollTrigger: {
//                 trigger: `.${styles.sliderItem}`,
//                 start: 'top 80%',
//             }
//         });*/
//     }, {scope: container});

//     return (
//         <section className={styles.section} ref={container} id="films">
//             <Blobs type={'v2'} classVariable={`${styles.blob}`}/>
//             <Container>
//                 <header className={styles.header}>
//                     <Title color={'white'}><span>Short</span> <br />Films</Title>
//                     <FancyButton theme='button-1' target="_blank" link={commonConfig.social.youtube}>View on Youtube</FancyButton>
//                 </header>
//                 <div className={styles.films}>
//                     <div className={styles.film}>
//                         <div className={styles.video}>
//                             <video width="100%" autoPlay loop muted >
//                                 <source src="/videos/Reelpre.mp4" type="video/mp4" />
//                                 Your browser does not support the video tag.
//                             </video>
//                         </div>
//                         <div className={styles.name}>
//                         <h2 className={styles.font}>Pre-Wedding Film</h2>
//                         <TextReveal className={styles.description}>

//                                 In their pre-wedding shoot, Parag and Aayushi illuminated every frame with their radiant love and genuine connection. Against mesmerizing backdrops, they shared tender moments that painted a vivid portrait of their journey together.
//                         </TextReveal>
//                             <Magnet>
//                                 <Link target={'_blank'} className={styles.redirect} href="https://youtu.be/H6Xj0ZlDovU?si=vBESmLQW4Oa4vXAY">
//                                     <span>Watch Now</span>
//                                     <svg width="93" height="93" viewBox="0 0 93 93" fill="none"
//                                         xmlns="http://www.w3.org/2000/svg">
//                                         <rect width="93" height="93" rx="46.5" fill="white" />
//                                         <path
//                                             d="M30.0541 60.6172C29.2717 61.3969 29.2717 62.6611 30.0541 63.4407C30.8365 64.2204 32.105 64.2204 32.8874 63.4407L30.0541 60.6172ZM64.56 31.0512C64.56 29.9486 63.663 29.0547 62.5565 29.0547H44.5252C43.4188 29.0547 42.5218 29.9486 42.5218 31.0512C42.5218 32.1538 43.4188 33.0477 44.5252 33.0477H60.553V49.0199C60.553 50.1225 61.45 51.0164 62.5565 51.0164C63.663 51.0164 64.56 50.1225 64.56 49.0199V31.0512ZM32.8874 63.4407L63.9732 32.463L61.1398 29.6395L30.0541 60.6172L32.8874 63.4407Z"
//                                             fill="black" />
//                                     </svg>
//                                 </Link>
//                             </Magnet>
//                         </div>
                        
//                     </div>
//                     <div className={styles.film}>
//                         <div className={styles.video1}>
//                             <video width="100%" autoPlay loop muted >
//                                 <source src="/videos/braj.mp4" type="video/mp4" />
//                                 Your browser does not support the video tag.
//                             </video>
//                         </div>
                        
//                         <div className={styles.name}>
//                         <h2 className={styles.font}>Braj Ki Holi</h2>
//                         <TextReveal className={styles.description}>
//                                 BRAJ KI HOLI is a vibrant short film that encapsulates the essence of the traditional Holi celebrations in the Braj region of India. Through stunning visuals and captivating storytelling, it explores the cultural richness and jubilant spirit of this ancient festival.
//                         </TextReveal>
//                             <Magnet>
//                                 <Link target={'_blank'} className={styles.redirect} href="https://youtu.be/ZjJnRm-HIz8?si=6XgnbyURqpaWanis">
//                                     <span>Watch Now</span>
//                                     <svg width="93" height="93" viewBox="0 0 93 93" fill="none"
//                                         xmlns="http://www.w3.org/2000/svg">
//                                         <rect width="93" height="93" rx="46.5" fill="white" />
//                                         <path
//                                             d="M30.0541 60.6172C29.2717 61.3969 29.2717 62.6611 30.0541 63.4407C30.8365 64.2204 32.105 64.2204 32.8874 63.4407L30.0541 60.6172ZM64.56 31.0512C64.56 29.9486 63.663 29.0547 62.5565 29.0547H44.5252C43.4188 29.0547 42.5218 29.9486 42.5218 31.0512C42.5218 32.1538 43.4188 33.0477 44.5252 33.0477H60.553V49.0199C60.553 50.1225 61.45 51.0164 62.5565 51.0164C63.663 51.0164 64.56 50.1225 64.56 49.0199V31.0512ZM32.8874 63.4407L63.9732 32.463L61.1398 29.6395L30.0541 60.6172L32.8874 63.4407Z"
//                                             fill="black" />
//                                     </svg>
//                                 </Link>
//                             </Magnet>
//                         </div>
//                         <div className={styles.video2} >
//                             <video width="100%" autoPlay loop muted >
//                                 <source src="/videos/braj.mp4" type="video/mp4" />
//                                 Your browser does not support the video tag.
//                             </video>
//                         </div>
//                     </div>
//                 </div>
//             </Container>


//             <Container>

//             </Container>

//         </section>
//     );
// }