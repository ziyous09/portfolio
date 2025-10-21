'use client';
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss'
import Navigation from '@/components/Layout/Navigation/Navigation';
import commonConfig from '@/database/config/metadata.json';
export default function Header() {
    const [currentTime, setCurrentTime] = useState('');
    useEffect(() => {
        // Get current time in Seattle, WA (PST) on the client side
        const timeZone = commonConfig.metadata.timeZone;
        const clientTime = new Date().toLocaleString(commonConfig.metadata.locale, {
            timeZone: timeZone,
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZoneName: 'short'
        });
        setCurrentTime(clientTime);
    }, []);

    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}>
            <div className={styles.inner}>
                <div className={styles.logo}>
                    <h1>PORTF<span>O</span>OLIO</h1>

                </div>
                <Navigation isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}></Navigation>
                <button type={'button'} className={styles.menuToggle} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    )
}