'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

import styles from './Particles.module.scss'; // Import as module

export default function Particles({ className }) {
    const sceneRef = useRef(null);
    const [hasWebGL, setHasWebGL] = useState(true);

    // Function to check WebGL support
    const checkWebGLSupport = () => {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    };

    useEffect(() => {
        if (!checkWebGLSupport() || typeof window === 'undefined') {
            setHasWebGL(false);
            return;
        }

        let renderer, scene, camera, particleGeometry, animationId;
        let particles, particleSystem;
        let mouseMoveHandler, resizeHandler;

        // Clean up any previous canvas
        if (sceneRef.current) {
            while (sceneRef.current.firstChild) {
                sceneRef.current.removeChild(sceneRef.current.firstChild);
            }
        }

        try {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                powerPreference: 'default'
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearAlpha(0);

            if (sceneRef.current) {
                sceneRef.current.appendChild(renderer.domElement);
            } else {
                setHasWebGL(false);
                return;
            }

            particles = new THREE.Group();
            particleGeometry = new THREE.BufferGeometry();
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.02,
                vertexColors: true,
            });

            const numParticles = 500;
            const positions = new Float32Array(numParticles * 3);
            const colors = new Float32Array(numParticles * 3);

            for (let i = 0; i < positions.length; i += 3) {
                positions[i] = (Math.random() - 0.5) * 10;
                positions[i + 1] = (Math.random() - 0.5) * 10;
                positions[i + 2] = (Math.random() - 0.5) * 10;

                if (i % 2 === 0) {
                    colors[i] = 1;
                    colors[i + 1] = 1;
                    colors[i + 2] = 1;
                } else {
                    colors[i] = 66 / 255;
                    colors[i + 1] = 118 / 255;
                    colors[i + 2] = 195 / 255;
                }
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            particleSystem = new THREE.Points(particleGeometry, particleMaterial);
            particles.add(particleSystem);
            scene.add(particles);

            camera.position.z = 5;

            const mouse = new THREE.Vector2(0, 0);
            const targetMouse = new THREE.Vector2(0, 0);

            mouseMoveHandler = (event) => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            };
            window.addEventListener('mousemove', mouseMoveHandler);

            const animate = () => {
                animationId = requestAnimationFrame(animate);
                const time = Date.now() * 0.0001;
                const positions = particleGeometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] = Math.sin(i / 100 + time);
                }
                particleGeometry.attributes.position.needsUpdate = true;
                targetMouse.x += (mouse.x * 0.2 - targetMouse.x) * 0.02;
                targetMouse.y += (-mouse.y * 0.2 - targetMouse.y) * 0.02;
                gsap.to(particles.rotation, {
                    x: targetMouse.x,
                    y: targetMouse.y,
                    duration: 1,
                });
                renderer.render(scene, camera);
            };
            animate();

            resizeHandler = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', resizeHandler);

        } catch (error) {
            setHasWebGL(false);
            return;
        }

        // Clean up Three.js resources on component unmount
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('resize', resizeHandler);
            if (renderer) {
                renderer.dispose();
                if (renderer.domElement && renderer.domElement.parentNode) {
                    renderer.domElement.parentNode.removeChild(renderer.domElement);
                }
            }
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, []);

    if (!hasWebGL) {
        return <div className={className}>WebGL not supported or failed to initialize.</div>;
    }
    return <div className={className} ref={sceneRef}></div>;
}