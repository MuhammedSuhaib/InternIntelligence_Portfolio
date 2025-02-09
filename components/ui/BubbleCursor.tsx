'use client';
import React, { useEffect, useRef } from 'react';

interface BubbleCursorProps {
  wrapperElement?: HTMLElement;
}

class Particle {
  lifeSpan: number;
  initialLifeSpan: number;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  baseDimension: number;

  constructor(x: number, y: number) {
    this.initialLifeSpan = Math.floor(Math.random() * 40 + 40); // ⬅️ Reduced lifespan for fewer particles
    this.lifeSpan = this.initialLifeSpan;
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 15), // ⬅️ Less random movement
      y: -0.2 + Math.random() * -0.6, // ⬅️ Slower rise
    };
    this.position = { x, y };
    this.baseDimension = 3; // ⬅️ Smaller particles for subtle effect
  }

  update(context: CanvasRenderingContext2D) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 1.5) / 100;
    this.velocity.y -= Math.random() / 700;
    this.lifeSpan--;

    const scale = 0.2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;

    context.fillStyle = 'rgba(230, 241, 247, 0.6)'; // ⬅️ More transparency for softer look
    context.strokeStyle = 'rgba(58, 146, 197, 0.5)';
    context.beginPath();
    context.arc(
      this.position.x - (this.baseDimension / 2) * scale,
      this.position.y - this.baseDimension / 2,
      this.baseDimension * scale,
      0,
      2 * Math.PI
    );

    context.stroke();
    context.fill();
    context.closePath();
  }
}

const BubbleCursor: React.FC<BubbleCursorProps> = ({ wrapperElement }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let canvas: HTMLCanvasElement | null = null;
    let context: CanvasRenderingContext2D | null = null;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const init = () => {
      if (prefersReducedMotion.matches) {
        console.log('Reduced motion enabled, skipping effect.');
        return false;
      }

      canvas = canvasRef.current;
      if (!canvas) return;

      context = canvas.getContext('2d');
      if (!context) return;

      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.pointerEvents = 'none';

      if (wrapperElement) {
        canvas.style.position = 'absolute';
        wrapperElement.appendChild(canvas);
        canvas.width = wrapperElement.clientWidth;
        canvas.height = wrapperElement.clientHeight;
      } else {
        canvas.style.position = 'fixed';
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
      }

      bindEvents();
      loop();
    };

    const bindEvents = () => {
      const element = wrapperElement || document.body;
      element.addEventListener('mousemove', onMouseMove);
      element.addEventListener('touchmove', onTouchMove, { passive: true });
      element.addEventListener('touchstart', onTouchMove, { passive: true });
      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      if (!canvasRef.current) return;

      if (wrapperElement) {
        canvasRef.current.width = wrapperElement.clientWidth;
        canvasRef.current.height = wrapperElement.clientHeight;
      } else {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        for (let i = 0; i < e.touches.length; i++) {
          addParticle(e.touches[i].clientX, e.touches[i].clientY);
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (wrapperElement) {
        const boundingRect = wrapperElement.getBoundingClientRect();
        cursorRef.current.x = e.clientX - boundingRect.left;
        cursorRef.current.y = e.clientY - boundingRect.top;
      } else {
        cursorRef.current.x = e.clientX;
        cursorRef.current.y = e.clientY;
      }

      addParticle(cursorRef.current.x, cursorRef.current.y);
    };

    const addParticle = (x: number, y: number) => {
      if (particlesRef.current.length < 50) {
        // ⬅️ Reduced max number of particles
        particlesRef.current.push(new Particle(x, y));
      }
    };

    const updateParticles = () => {
      if (!canvas || !context) return;

      if (particlesRef.current.length === 0) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Update
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update(context);
      }

      // Remove dead particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        if (particlesRef.current[i].lifeSpan < 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      if (particlesRef.current.length === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    init();

    return () => {
      if (canvas) {
        canvas.remove();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      const element = wrapperElement || document.body;
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [wrapperElement]);

  return <canvas ref={canvasRef} />;
};

export default BubbleCursor;
