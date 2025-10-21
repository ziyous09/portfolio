'use client';

import React, { useRef } from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

import styles from './BoldTitle.module.scss';
import Container from "@/components/UI/Layout/Layout";
import TextReveal from "@/components/UI/Elements/TextReveal/TextReveal";
import Blobs from "@/components/UI/Elements/Blobs/Blobs";

export default function BoldTitle() {
    const boldTitle = useRef();
    const boldTitleLeft = useRef();
    const boldTitleRight = useRef();

    useGSAP(() => {
        if (!boldTitle.current || !boldTitleLeft.current || !boldTitleRight.current) return;

        gsap.registerPlugin(ScrollTrigger);

        // Animate the whole left/right lines instead of per-character
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: boldTitle.current,
                start: 'top bottom',
                end: '+=150%', // extend scroll distance so animation progresses slower
                scrub: 1.2, // add smoothing so motion feels slower and more fluid
                toggleActions: 'play none none reverse',
            }
        });

        // Left line slides in from left to center
        tl.fromTo(
            boldTitleLeft.current,
            { xPercent: -100 },
            { xPercent: 0, ease: 'power3.out' },
            0
        );

        // Right line slides in from right to center
        tl.fromTo(
            boldTitleRight.current,
            { xPercent: 100 },
            { xPercent: 0, ease: 'power3.out' },
            0
        );
    });

    return(

        <section className={styles.section}>
            <Container className={styles.grid}>
                <TextReveal className={styles.paragraph}>
                    A software engineer dedicated to turning complex challenges into elegant, scalable, and user-friendly solutions. I thrive on architecting and building software that makes a tangible impact.
                </TextReveal>
                <h2 className={styles.boldTitle} ref={boldTitle}>
                    <span className={styles.boldTitleLeft} ref={boldTitleLeft}>Creative</span>
                    <span>Software</span>
                    <span className={styles.boldTitleRight} ref={boldTitleRight}>Developer</span>
                </h2>
                <TextReveal className={`${styles.paragraph} ${styles.paragraphAlt}`}>
                    A passionate technologist fueled by a love for travel and continuous learning. I thrive on exploring new horizons, both in code and on the map.
                </TextReveal>

                <Blobs type={'v3'} classVariable={styles.blob} />
            </Container>
        </section>

    );
}
