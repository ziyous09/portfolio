"use client";

import React, { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import styles from './Achivement.module.scss';
import Achievements from '@/database/Achievements.json';
import Title from "@/components/UI/Elements/Title/Title";
import TextReveal from "@/components/UI/Elements/TextReveal/TextReveal";
import Container from "@/components/UI/Layout/Layout";
import Blobs from "@/components/UI/Elements/Blobs/Blobs";
export default function Achivement() {
    const container = useRef();
    const cardsListRef = useRef();
    const { contextSafe } = useGSAP({scope: container});
    const [activeIndex, setActiveIndex] = useState(0); // Start with first card active
    const activeIndexRef = useRef(0);
    const achievements = Achievements;

    // Only allow manual activation on desktop; mobile is scroll-driven
    const isDesktop = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 769px)').matches;
    const handleActivate = (idx) => {
        if (isDesktop()) setActiveIndex(idx);
    };

    // Detect which card is in center of viewport on scroll (mobile only)
    React.useEffect(() => {
        const cardsList = cardsListRef.current;
        if (!cardsList) return;

        const enableMobile = () => window.innerWidth <= 768;
        let rafId = null;

        const handleScroll = () => {
            if (!enableMobile()) return;
            const cards = cardsList.querySelectorAll(`.${styles.card}`);
            if (!cards || !cards.length) return;
            const containerRect = cardsList.getBoundingClientRect();
            const centerX = containerRect.left + containerRect.width / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            cards.forEach((card, idx) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const distance = Math.abs(centerX - cardCenterX);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = idx;
                }
            });

            // toggle inView class for visual clarity
            cards.forEach((card, i) => {
                if (i === closestIndex) {
                    card.classList.add(styles.inView);
                } else {
                    card.classList.remove(styles.inView);
                }
            });

            if (closestIndex !== activeIndexRef.current) {
                activeIndexRef.current = closestIndex;
                setActiveIndex(closestIndex);
            }
        };

        const onScroll = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(handleScroll);
        };

        const onResize = () => {
            // Re-evaluate active card after layout changes or breakpoint switches
            handleScroll();
        };

        // Initial check
        handleScroll();

        cardsList.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        return () => {
            cardsList.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    // keep ref in sync for non-mobile paths where handlers may set state
    React.useEffect(() => {
        // IntersectionObserver approach to keep active card synced while scrolling, including momentum
        const setupObserver = () => {
            const list = cardsListRef.current;
            if (!list || window.innerWidth > 768) return () => {};

            const isXS = window.innerWidth <= 576;
            const cards = Array.from(list.querySelectorAll(`.${styles.card}`));
            if (!cards.length) return () => {};

            let raf = null;
            const observer = new IntersectionObserver((entries) => {
                if (raf) cancelAnimationFrame(raf);
                raf = requestAnimationFrame(() => {
                    // Pick the entry with the highest visibility
                    let bestIdx = activeIndexRef.current;
                    let bestMetric = -1;

                    for (const entry of entries) {
                        const idxAttr = entry.target.getAttribute('data-index');
                        const idx = idxAttr ? parseInt(idxAttr, 10) : NaN;
                        if (Number.isNaN(idx)) continue;

                        // For xs (horizontal scroller), use intersectionRatio
                        // For sm (grid), also use intersectionRatio against viewport
                        const metric = entry.intersectionRatio;
                        if (metric > bestMetric) {
                            bestMetric = metric;
                            bestIdx = idx;
                        }
                    }

                    // toggle inView on all cards first
                    cards.forEach((el, i) => {
                        if (i === bestIdx) el.classList.add(styles.inView);
                        else el.classList.remove(styles.inView);
                    });

                    if (bestIdx !== activeIndexRef.current) {
                        activeIndexRef.current = bestIdx;
                        setActiveIndex(bestIdx);
                    }
                });
            }, { root: isXS ? list : null, rootMargin: '0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

            cards.forEach((el) => observer.observe(el));

            return () => {
                observer.disconnect();
                if (raf) cancelAnimationFrame(raf);
            };
        };

        const cleanup = setupObserver();
        const onResize = () => {
            if (cleanup) cleanup();
            // re-init with new root depending on breakpoint
            const newCleanup = setupObserver();
            // store new cleanup by overriding variable (closure safety)
            if (typeof cleanup === 'function') {
                // no-op, we can't reassign const; rely on effect rerun
            }
        };
        window.addEventListener('resize', onResize);

        return () => {
            if (cleanup) cleanup();
            window.removeEventListener('resize', onResize);
        };
    }, []);

    React.useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);


    // deterministic pseudo-random generator for stable layouts per index
    const pseudo = (n) => Math.abs(Math.sin(n * 12.9898) * 43758.5453) % 1;

    const getCardStyle = (idx, isActive) => {
        // Tighter grid-like distribution
        const totalCards = achievements.length;
        const rowCount = Math.ceil(Math.sqrt(totalCards));
        const gridX = (idx % rowCount) / (rowCount - 1); // 0 to 1
        const gridY = Math.floor(idx / rowCount) / (rowCount - 1); // 0 to 1
        
        // Smaller random offsets for tighter clustering
        const randX = pseudo(idx) * 40 - 20; // ±20px random offset
        const randY = pseudo(idx + 3) * 40 - 20; // different random offset
        
        // Tighter spread, centered and shifted up
        const x = -150 + (gridX * 300) + randX; // Spread across 300px width
        const y = -160 + (gridY * 200) + randY; // Start higher up (-160 instead of -100)
        
        // Subtle rotation
        const rot = -8 + pseudo(idx + 7) * 16; // ±8 deg
        
        // Scale handling
        let scale = 0.85; // default smaller to make active state more dramatic
        let targetX = x;
        let targetY = y;
        let targetRot = rot;
        
        if (isActive) {
            scale = 1.2; // bigger when active
            targetX = 0; // center X
            targetY = 0; // center Y
            targetRot = 0; // no rotation when active
        }

        return {
            transform: `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) rotate(${targetRot}deg) scale(${scale})`,
            left: '50%',
            top: '50%',
            zIndex: isActive ? 1000 : (totalCards - idx),
            transition: 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
            // Explicitly clear blur/opacity when active to avoid CSS race conditions on mobile
            ...(isActive ? { opacity: 1, filter: 'none' } : {})
        };
    };


    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        /*gsap.from(`.${styles.sliderItem}`, {
            x: '-50%',
            stagger: 0.1,
            duration: 1,
            scrollTrigger: {
                trigger: `.${styles.sliderItem}`,
                start: 'top 80%',
            }
        });*/
    }, {scope: container});

    return (
        <section className={styles.section} ref={container} id="films">
            <Blobs type={'v2'} classVariable={`${styles.blob}`}/>
            <Container>
                <header className={styles.header}>
                    <Title color={'white'}><span>Achivements</span> </Title>
                </header>
                <div className={styles.films}>
                    <div className={styles.film}>
                        <div className={styles.cardsWrapper}>
                            <div 
                                className={styles.cardsList}
                                ref={cardsListRef}
                                onMouseLeave={() => {
                                    // Only reset on desktop hover, keep active on mobile
                                    if (window.innerWidth > 768) {
                                        setActiveIndex(null);
                                    }
                                }}
                            >
                                {achievements.map((a, idx) => (
                                    <button
                                        key={idx}
                                        className={`${styles.card} ${activeIndex === idx ? styles.isActive : ''} ${activeIndex === idx ? (styles.inView || '') : ''}`}
                                        data-index={idx}
                                        style={getCardStyle(idx, activeIndex === idx)}
                                        onMouseEnter={() => handleActivate(idx)}
                                        onClick={() => handleActivate(idx)}
                                        onFocus={() => handleActivate(idx)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleActivate(idx); }}
                                        aria-label={`${a.title} ${a.subtitle}`}
                                    >
                                        <Image
                                            src={a.image}
                                            alt={a.title}
                                            width={600}
                                            height={400}
                                            className={styles.cardImage}
                                            loading={'lazy'}
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className={styles.details}>
                                {achievements.map((a, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`${styles.detailItem} ${activeIndex === idx ? styles.isActive : ''}`} 
                                        aria-hidden={activeIndex !== idx}
                                        style={{
                                            // Ensure visibility on mobile
                                            visibility: activeIndex === idx ? 'visible' : 'hidden'
                                        }}
                                    >
                                        <h3 className={styles.detailTitle}>{a.title} <br/> <span className={styles.detailSub}>{a.subtitle}</span></h3>
                                        <TextReveal className={styles.description}>
                                            {a.description}
                                        </TextReveal>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>


            <Container>

            </Container>

        </section>
    );
}