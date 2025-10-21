'use client';

import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './Title.module.scss';


export default function Title({heading, color, children, className}) {
    const textRef = useRef(null);

    useGSAP(() => {
        if (!textRef.current) return;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Split text into characters manually into a fragment (safer)
        const el = textRef.current;
        if (!el) return;
        const text = el.textContent || '';
        el.textContent = '';
        el.style.opacity = '1';

        const frag = document.createDocumentFragment();
        const chars = text.split('').map(char => {
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(120px)';
            span.textContent = char;
            return span;
        });

        // Create word wrappers inside fragment
        let wordWrapper = document.createElement('span');
        wordWrapper.className = styles.splitLine;
        chars.forEach(ch => {
            if (ch.textContent === ' ') {
                frag.appendChild(wordWrapper);
                wordWrapper = document.createElement('span');
                wordWrapper.className = styles.splitLine;
                frag.appendChild(document.createTextNode(' '));
            } else {
                wordWrapper.appendChild(ch);
            }
        });
        if (wordWrapper.childNodes.length > 0) frag.appendChild(wordWrapper);

        // Append fragment once
        el.appendChild(frag);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textRef.current,
                toggleActions: "restart pause resume reverse",
                start: "top 90%",
            }
        });

        tl.to(chars, {
            duration: 0.4,
            opacity: 1,
            y: 0,
            ease: "power1.out",
            stagger: 0.01,
            onComplete: () => {
                textRef.current.classList.add('animated');
            }
        });
    }, { scope: textRef });

    const HeadingElement = heading ? heading : "h2";
    const colorClass = color === 'white' ? styles.white : color === 'black' ? styles.black : '';

    return (
        <HeadingElement className={`${styles.title} ${colorClass}`} ref={textRef}>
            {children}
        </HeadingElement>
    );
}