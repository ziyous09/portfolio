'use client';

import React, { useEffect } from 'react';
import Lenis from "@studio-freight/lenis";

export default function LenisScroller() {

    useEffect(() => {
        const lenisScroll = new Lenis({
            lerp: 0,
            wheelMultiplier: 1.3,
            smoothWheel: true,
            smoothTouch: true
        });

        // Prevent initial hash scroll
        if (window.location.hash) {
            window.scrollTo(0, 0);
            setTimeout(() => {
                window.history.replaceState({}, '', window.location.pathname);
            }, 0);
        }

        function raf(time) {
            lenisScroll.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisScroll.destroy();
        };
    }, []);

    return <></>;
}
