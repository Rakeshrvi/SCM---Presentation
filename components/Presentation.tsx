import React, { useLayoutEffect, useRef, useState } from 'react';
import { SlideData } from '../types';
import SlideSection from './Slide';

// Declare the GSAP global object and its plugins for TypeScript
declare const gsap: any;
declare const ScrollTrigger: any;
declare const ScrollToPlugin: any;

interface PresentationProps {
  slides: SlideData[];
}

const Presentation: React.FC<PresentationProps> = ({ slides }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const currentIndex = useRef(0);
  const allSectionsRef = useRef<HTMLElement[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  useLayoutEffect(() => {
    // Initially set all animatable children to be hidden
    gsap.set('.anim-child', { opacity: 0, y: 50 });
    
    if (!isStarted) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const sections: HTMLElement[] = gsap.utils.toArray('.slide-section');
    const footer: HTMLElement | null = document.querySelector('footer');
    allSectionsRef.current = footer ? [...sections, footer] : sections;

    const ctx = gsap.context(() => {
      // --- Animate First Slide In ---
      const firstSlideElems = sections[0].querySelectorAll('.anim-child');
      gsap.to(firstSlideElems, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.15,
      });

      // --- Animate Scroll Progress Bar ---
      gsap.to(".scroll-progress-bar", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      // --- Animate elements within each subsequent section ---
      allSectionsRef.current.forEach((section: HTMLElement, index) => {
        if (index === 0) return; // Already handled
        const elems = section.querySelectorAll(".anim-child");
        if (elems.length > 0) {
          gsap.to(elems, { // Use .to() since initial state is already set
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reset',
            },
          });
        }
      });

      // --- Unified Navigation Function ---
      const navigateTo = (index: number) => {
        const sections = allSectionsRef.current;
        if (index < 0 || index >= sections.length || isAnimating.current) {
          return;
        }

        isAnimating.current = true;
        currentIndex.current = index;

        gsap.to(window, {
          scrollTo: { y: sections[index], autoKill: false },
          duration: 1.0,
          ease: 'power2.inOut',
          onComplete: () => {
            setTimeout(() => {
              isAnimating.current = false;
            }, 200); // Debounce to prevent rapid re-triggering
          },
        });
      };

      // --- Mouse Wheel Navigation ---
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (isAnimating.current) return;

        if (e.deltaY > 0) { // Scrolling down
          navigateTo(currentIndex.current + 1);
        } else { // Scrolling up
          navigateTo(currentIndex.current - 1);
        }
      };

      // --- Keyboard Navigation ---
      const handleKeyDown = (e: KeyboardEvent) => {
        if (isAnimating.current) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          navigateTo(currentIndex.current + 1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          navigateTo(currentIndex.current - 1);
        }
      };
      
      // --- "Scroll Down" Button Handler ---
      const handleScrollBtnClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if(target.closest('.scroll-down-button')) {
              e.preventDefault();
              navigateTo(1); // Navigate to the second slide
          }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleScrollBtnClick);

      // Cleanup
      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('click', handleScrollBtnClick);
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }, mainRef);

    return () => ctx.revert();
  }, [isStarted, slides]);

  if (!isStarted) {
    return (
      <div
        className="bg-[#F9F8F6] text-[#1B3C53] w-screen h-screen flex items-center justify-center cursor-pointer"
        onClick={() => setIsStarted(true)}
      >
        <p className="text-2xl font-semibold animate-pulse">Click anywhere to start</p>
      </div>
    );
  }

  return (
    <div ref={mainRef}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-[#F0F2F5] z-50">
        <div className="scroll-progress-bar h-full bg-[#1B3C53] scale-x-0"></div>
      </div>
      
      {/* Sections */}
      {slides.map((slide) => (
        <SlideSection key={slide.id} slide={slide} />
      ))}

      {/* Footer */}
      <footer className="w-full text-center py-12 bg-[#F0F2F5] text-[#1B3C53]">
        <div className="container mx-auto px-8 md:px-20">
            <p className="anim-child font-semibold text-[#1B3C53]">Apollo Tyres | SCM Transformation Presentation</p>
            <p className="anim-child text-sm mt-1">End of Presentation</p>
        </div>
      </footer>
    </div>
  );
};

export default Presentation;