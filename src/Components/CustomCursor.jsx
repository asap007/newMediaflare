import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const trailsRef = useRef([]);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const animateCursor = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;

        // Magnetic effect
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        // Update cursor position
        cursorOuterRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorInnerRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

        // Calculate speed
        const speed = Math.sqrt(Math.pow(mouseX - cursorX, 2) + Math.pow(mouseY - cursorY, 2));

        // Create new trail
        if (speed > 1) {
          const trail = document.createElement('div');
          trail.className = 'cursor-trail';
          trail.style.left = `${cursorX}px`;
          trail.style.top = `${cursorY}px`;
          document.body.appendChild(trail);
          trailsRef.current.push({ element: trail, life: 100 });
        }

        // Update trails
        trailsRef.current.forEach((trail, index) => {
          trail.life -= deltaTime * 0.1;
          if (trail.life <= 0) {
            trail.element.remove();
            trailsRef.current.splice(index, 1);
          } else {
            trail.element.style.opacity = trail.life / 100;
            trail.element.style.transform = `scale(${trail.life / 100})`;
          }
        });
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateCursor);
    };

    const mouseMoveHandler = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      cancelAnimationFrame(requestRef.current);
      trailsRef.current.forEach(trail => trail.element.remove());
    };
  }, []);

  return (
    <>
      <div ref={cursorOuterRef} className="cursor-outer" />
      <div ref={cursorInnerRef} className="cursor-inner" />
    </>
  );
};

export default CustomCursor;