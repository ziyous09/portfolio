"use client";

import React, {useRef} from 'react';
import styles from './Experience.module.scss';
import Item from "@/components/Blocks/Experience/Item/Item";
import Title from "@/components/UI/Elements/Title/Title";
import Companies from '@/database/Companies.json';
import Blobs from "@/components/UI/Elements/Blobs/Blobs";

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

export default function ExperienceBlock() {
    const container = useRef();
    gsap.registerPlugin(ScrollTrigger);

    // GSAP Animations
    useGSAP(() => {

    }, { scope: container });

    return (
        <section className={styles.section} id={'experience'} ref={container}>
            <Blobs type={'v2'} classVariable={`${styles.blob}`}/>
            <header className={styles.header}>
                <Title color={'white'}>Certifications <br/></Title>
            </header>
            {Companies.map((item, index) => {
                return (
                    <Item index={index}
                          company={item.company}
                          position={item.position}
                          duration={item.duration}
                          url={item.url}
                          color={item.color}
                          key={index}/>
                );
            })}
        </section>
    );
}