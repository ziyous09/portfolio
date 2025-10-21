'use client';

import React, {useEffect, useState, useRef} from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from './Hero.module.scss';
import commonConfig from '@/database/config/metadata.json';
import PreLoader from "@/components/Blocks/PreLoader/PreLoader";
import Blobs from "@/components/UI/Elements/Blobs/Blobs";
import Particles from "@/components/UI/Cards/Particles/Particles";
import Typewriter from 'typewriter-effect';


export default function Hero() {
    const [preloaderComplete, setPreloaderComplete] = useState(false);
    const container = useRef();
    const fakeContainer = useRef();
    const textRef = useRef(null);
    const descRef = useRef();
    const {contextSafe} = useGSAP({scope: container});
    const boldTitle = useRef();
    const boldTitleLeft = useRef();
    const boldTitleRight = useRef();

    const handlePreloaderComplete = () => {
        setPreloaderComplete(true);
    };

    // GSAP Animations
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Basic SVG stroke animation using standard GSAP
        gsap.set(`.${styles.line} svg path`, {
            strokeDasharray: '1000',
            strokeDashoffset: 1000,
        });

        gsap.set(descRef.current, { autoAlpha: 0 });

        if (preloaderComplete) {
            // Line Animation using standard strokeDashoffset
            gsap.to(`.${styles.lineRight} svg path`, {
                strokeDashoffset: 0,
                duration: 1,
                stagger: 0.1,
            });
            gsap.to(`.${styles.lineLeft} svg path`, {
                strokeDashoffset: 0,
                duration: 1,
                stagger: 0.1,
            });

            // Image Reveal
            gsap.to(`.${styles.reveal}`, {
                x: '-100%',
                delay: 0.5,
                duration: 1,
                onComplete: () => {
                    gsap.to(`.${styles.heroImg}`, {
                        x: '-30%',
                        scale: 1.3,
                        scrollTrigger: {
                            trigger: fakeContainer.current,
                            scrub: true,
                            start: 'top top',
                            end: 'bottom 50%'
                        }
                    });
                }
            });

            // Scale Content
            gsap.to(`.${styles.inner}`, {
                scale: 0.8,
                scrollTrigger: {
                    trigger: fakeContainer.current,
                    scrub: true,
                    start: 'top top',
                    end: 'bottom top',
                },
            });

            // Container Animation
            gsap.to(container.current, {
                scrollTrigger: {
                    trigger: container.current,
                    pin: true,
                    toggleActions: "restart pause resume reverse",
                    start: "top top",
                    end: "bottom top",
                    pinSpacing: false,
                },
            });
        }
    }, [preloaderComplete]);


    return (
        <>
            <PreLoader onComplete={handlePreloaderComplete}/>
            <section className={styles.hero}>
                <div ref={container}>
                    <div className={styles.inner}>
                        <div className={styles.title}>
                            <h2 className={styles.boldTitle} ref={boldTitle}>
                                <span className={styles.boldTitleLeft} ref={boldTitleLeft}>I&apos;am Kunal</span>
                                <Typewriter className={styles.boldTitleRight}
                                    options={{
                                        strings: ['Full Stack Developer', 'Java Developer', 'Cloud Engineer'],
                                        autoStart: true,
                                        loop: true,
                                        cursor: null,
                                    }}    
                                    
                                /> 
                            </h2>
                        </div>
                        <div className={styles.image}>
                                <Image
                                    src="/stick.png"
                                    alt="win"
                                    style={{
                                        width:'auto',
                                        height: '100%',
                                    }}
                                    width={1152}
                                    height={1536}
                                    loading={'lazy'}
                                />

                        </div>
                        
                       
                    </div>
                    <div className={styles.background}>

                        <div className={styles.noise}></div>
                        
                        <Particles className={styles.particlesBG} />

                        <Blobs type={'v1'}/>
                        <Blobs type={'v2'}/>
                        <Blobs type={'v3'}/>
                    </div>
                </div>
            </section>
        </>
    );
}