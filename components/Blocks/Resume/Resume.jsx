'use client';

import React, { useRef } from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import styles from './Resume.module.scss';

import Image from "next/image";
import Container from "@/components/UI/Layout/Layout";
import FancyButton from "@/components/UI/Elements/Button/Button";
import commonConfig from "@/database/config/metadata.json";
import Link from "next/link";

export default function Resume() {
    const container = useRef();
    const cardGroup = useRef();

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // CV Card
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardGroup.current,
                start: 'top 75%',
                end: 'top top',
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
        tl.to(`.${styles.cardV1}`, {
            rotate: '-6deg',
            scale: 1.05,
        }, 0);
        tl.to(`.${styles.cardV2}`, {
            rotate: '6deg',
            scale: 1.05,
            x: '5%'
        }, 0);

    }, { scope: container })


    return (
        <section className={styles.section} ref={container} id={'resume'}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.cardGroup} ref={cardGroup}>
                        <div className={`${styles.card} ${styles.cardV1}`}>
                            <div className={styles.cardInner}>
                                <div className={styles.cardTitle}>Kunal Maurya</div>
                                <hr/>
                                <p>Innovative Software developer, skillfull at independent projects, with good accent on development. I am curently looking for an opportunity to work in an environment that will help me to progress for my future goals which is as developer.
                                </p>
                                <div >
                                    <Link className={styles.font} href={`mailto:${commonConfig.personal.email}`} target={'_blank'}>
                                        {commonConfig.personal.email}
                                    </Link>
                                    <span className={styles.font}>{commonConfig.personal.city}, {commonConfig.personal.state}</span>
                                </div>
                                <hr/>
                                <div className={styles.cardSectionTitle}>Education</div>
                                <p>
                                    Bachelors in Computer Application | KIT <br/>
                                    12th Standard | Vanita Public School <br/>
                                    10th Standard | S.H.P.S 
                                </p>
                            </div>
                            <figure className={styles.figure}>
                                <Image src="/kunal.png" alt="Kunal Maurya" width={150} height={150}/>
                            </figure>
                        </div>
                        <div className={`${styles.card} ${styles.cardV2}`}>
                            <div className={styles.cardInner}>
                                <Image src="/code-snippet.svg" alt="Code Snippet" width={330} height={480}/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.cta}>
                        <FancyButton theme='button-1' target={'_blank'} link={commonConfig.personal.resumeURL}>View
                            Resume</FancyButton>
                    </div>
                    <div className={styles.links}>
                        <Link href={`${commonConfig.social.linkedin}`} target={'_blank'}>LinkedIn</Link>
                        <Link href={`${commonConfig.social.github}`} target={'_blank'}>GitHub</Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}