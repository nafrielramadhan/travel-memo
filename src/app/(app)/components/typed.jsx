// components/TypedComponent.js
"use client";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypedComponent() {
  const el = useRef(null);

  useEffect(() => {
    // Initialize Typed.js
    const typed = new Typed(el.current, {
      strings: [
        "for turning memories into stories!",
        "for making trip planning easy!",
        "for exploring new destinations!",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
    });

    // Clean up on component unmount
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div>
      <span ref={el} />
    </div>
  );
}
