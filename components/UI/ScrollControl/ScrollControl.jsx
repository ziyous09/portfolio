'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ScrollControl() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Force scroll to top on page load
            window.scrollTo(0, 0);
            
            // Remove hash from URL without triggering navigation
            if (window.location.hash) {
                window.history.pushState('', document.title, window.location.pathname);
            }
        }
    }, []);

    return null;
}