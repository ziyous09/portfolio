"use client";

import React, { useRef, useEffect } from 'react';
import styles from './PreLoader.module.scss';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/components/UI/Elements/Logo/Logo";

export default function PreLoader({ onComplete }) {
    const container = useRef();

    useGSAP(() => {
        if (!container.current) return;
        
        const tl = gsap.timeline();
        const tl2 = gsap.timeline();
        const progressEl = container.current.querySelector(`.${styles.progress}`);
        
        if (!progressEl) return;

        // Set initial text
        progressEl.textContent = "LOADING";
        
        // Fade in
        tl.to(progressEl, {
            autoAlpha: 1,
            duration: 0.6
        }, 0);

        // Animate dots
        const dots = "...";
        let count = 0;
        
        // Text reveal animation
        tl.to(progressEl, {
            duration: 2,
            onUpdate: function() {
                const progress = Math.floor(this.progress() * 100);
                const numDots = Math.floor((count++ / 10) % 4);
                progressEl.textContent = "LOADING" + dots.slice(0, numDots) + " " + progress + "%";
            },
            onComplete: () => {
                progressEl.textContent = "LOADING THE WEBSITE";
                
                // Slide out animation
                tl2.to(container.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "sine.out",
                    onUpdate: () => {
                        if(tl2.progress() >= 0.4){
                            onComplete();
                        }
                    }
                });
            }
        }, 0);
    }, { scope: container });

    return (
        <section className={styles.container} ref={container}>
            <div className={styles.progress}></div>
        </section>
    );
}