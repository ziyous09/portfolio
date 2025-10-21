'use client';

import React, { useRef, useEffect } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './TextReveal.module.scss';


export default function TextReveal({className, children}) {
    const textRef = useRef();

    useGSAP(() => {
        if (!textRef.current) return;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Check if mobile - skip animation for better performance
        const isMobile = window.innerWidth <= 768;
        
        // Split text into words manually into fragment (safer)
        const el = textRef.current;
        if (!el) return;
        const text = el.textContent || '';
        el.textContent = '';

        const frag = document.createDocumentFragment();
        // use a local CSS-module class for spans to keep selectors pure
        const words = text.split(' ').map(word => {
            const span = document.createElement('span');
            span.className = styles.word; // local class
            
            // On mobile, make words immediately visible
            if (isMobile) {
                span.style.visibility = 'visible';
                span.style.opacity = '1';
            } else {
                span.style.visibility = 'hidden';
                span.style.opacity = '0';
            }
            
            span.textContent = word;
            return span;
        });

        words.forEach((w, idx) => {
            frag.appendChild(w);
            // append a normal space between words
            if (idx !== words.length - 1) frag.appendChild(document.createTextNode(' '));
        });

        el.appendChild(frag);

        // Only animate on desktop
        if (!isMobile) {
            gsap.to(words, {
                scrollTrigger: {
                    trigger: textRef.current,
                    toggleActions: "restart pause resume reverse",
                    start: "top 85%",
                },
                // make visible via CSS properties so styles remain consistent
                visibility: 'visible',
                opacity: 1,
                duration: 1,
                ease: "power1.out",
                stagger: 0.01
            });
        }
    }, { scope: textRef });

    return (
        (
            <p className={`${styles.root} ${className || ''}`} ref={textRef}>
                {children}
            </p>
        )
    );
}