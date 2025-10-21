import React from 'react';
import styles from './Ticker.module.scss';

import Marquee from "react-fast-marquee";

export default function Ticker({
                                   words,
                                   direction = 'right',
                                   delay = 0,
                                   speed = 50,
                                   className,
                               }) {

    const elements = [];
    words.forEach((word, index) => {
        elements.push(
            <span key={`word-${index}`} className={`${styles.ticker__text} ${className}`}>
                {word}
                <svg key={`svg-${index}`} width="48" height="48" viewBox="0 0 48 48" fill="none">
                        
                    </svg>
            </span>
        );
    });

    return (
        <section className={styles.section}>
            <Marquee direction={direction} delay={delay} speed={speed}>
                {elements}
            </Marquee>
        </section>
    )
}