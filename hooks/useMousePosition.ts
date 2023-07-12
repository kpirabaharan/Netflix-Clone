import { useState, useEffect } from 'react';

interface MousePositionProps {
  x: number | null;
  y: number | null;
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePositionProps>({
    x: null,
    y: null,
  });

  const [mouseMoving, setMouseMoving] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });

      if (ev.clientX !== mousePosition.x || ev.clientY !== mousePosition.y) {
        clearTimeout(timer);
        setMouseMoving(true);
        timer = setTimeout(() => {
          setMouseMoving(false);
        }, 2500);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return mouseMoving;
};
export default useMousePosition;
