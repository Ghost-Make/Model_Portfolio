"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  gridClass: string;
  size: string;
  cropClass?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "VOGUE Italia Editorial",
    category: "Lookbook",
    image: "/portfolio/img-1.jpg",
    gridClass: "md:col-span-2 md:row-span-1",
    size: "large"
  },
  {
    id: 2,
    title: "Milan Runway Campaign",
    category: "Lookbook",
    image: "/portfolio/img-2.jpg",
    gridClass: "md:col-span-1 md:row-span-2 h-full",
    size: "tall",
    cropClass: "origin-top-right scale-[200%]"
  },
  {
    id: 3,
    title: "Calvin Klein Monolith",
    category: "Lookbook",
    image: "/portfolio/img-3.jpg",
    gridClass: "md:col-span-1",
    size: "square",
    cropClass: "origin-bottom-left scale-[200%]"
  },
  {
    id: 4,
    title: "PRADA Winter Lookbook",
    category: "Lookbook",
    image: "/portfolio/img-4.jpg",
    gridClass: "md:col-span-1",
    size: "square",
    cropClass: "origin-bottom-right scale-[200%]"
  },
  {
    id: 5,
    title: "GQ France Cover Story",
    category: "Lookbook",
    image: "/portfolio/img-5.jpg",
    gridClass: "md:col-span-2 md:row-span-1",
    size: "large",
    cropClass: "origin-top-left scale-[200%]"
  },
  {
    id: 6,
    title: "DIOR Haute Couture",
    category: "Lookbook",
    image: "/portfolio/img-6.jpg",
    gridClass: "md:col-span-1 md:row-span-2 h-full",
    size: "tall",
    cropClass: "origin-bottom-right scale-[200%]"
  },
  {
    id: 7,
    title: "VOGUE Editorial Story",
    category: "Lookbook",
    image: "/portfolio/img-7.jpg",
    gridClass: "md:col-span-1",
    size: "square",
    cropClass: "origin-center scale-[100%]"
  },
  {
    id: 8,
    title: "Milan Campaign II",
    category: "Lookbook",
    image: "/portfolio/img-8.jpg",
    gridClass: "md:col-span-1",
    size: "square",
    cropClass: "origin-top scale-[110%]"
  },
  {
    id: 9,
    title: "PRADA Lookbook II",
    category: "Lookbook",
    image: "/portfolio/img-9.jpg",
    gridClass: "md:col-span-2 md:row-span-1",
    size: "large",
    cropClass: "origin-center scale-[100%]"
  },
  {
    id: 10,
    title: "GQ France Cover II",
    category: "Lookbook",
    image: "/portfolio/img-10.jpg",
    gridClass: "md:col-span-1",
    size: "square",
    cropClass: "origin-center scale-[100%]"
  }
];

export default function BentoGrid() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [imageSources, setImageSources] = useState<{ [key: number]: string }>({});

  const categories = ["All", "Lookbook"];

  const filteredItems = selectedFilter === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedFilter);

  // Zoom and Pan States
  const [zoomState, setZoomState] = useState({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Touch gesture states
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);
  const [touchStartScale, setTouchStartScale] = useState(1);
  const [touchStartCenter, setTouchStartCenter] = useState({ x: 0, y: 0 });
  const [lastTapTime, setLastTapTime] = useState(0);

  const imageContainerRef = React.useRef<HTMLDivElement>(null);

  const resetZoom = () => {
    setZoomState({ scale: 1, x: 0, y: 0 });
    setIsDragging(false);
    setTouchStartDist(null);
  };

  const handleNext = () => {
    if (activeImageIndex === null) return;
    resetZoom();
    setActiveImageIndex((activeImageIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    resetZoom();
    setActiveImageIndex((activeImageIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard navigation & body scroll locking for luxury lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    if (activeImageIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, filteredItems]);

  // Handle auto-hint & responsive check
  useEffect(() => {
    resetZoom();
    if (activeImageIndex !== null) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 3000);
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
      return () => clearTimeout(timer);
    }
  }, [activeImageIndex]);

  // Math helper to clamp coordinates so the image borders lock to container borders
  const clampPosition = (newScale: number, pos: { x: number; y: number }, containerWidth: number, containerHeight: number) => {
    if (newScale <= 1) return { x: 0, y: 0 };
    const maxX = Math.max(0, (containerWidth * (newScale - 1)) / 2);
    const maxY = Math.max(0, (containerHeight * (newScale - 1)) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, pos.x)),
      y: Math.max(-maxY, Math.min(maxY, pos.y)),
    };
  };

  // Setup Wheel Event Listener directly to control zoom & prevent native browser scaling
  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    const onWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = e.clientX - cx;
      const my = e.clientY - cy;

      const zoomIntensity = 0.15;
      const delta = -e.deltaY;
      const factor = delta > 0 ? (1 + zoomIntensity) : (1 - zoomIntensity);

      setZoomState((prev) => {
        let newScale = prev.scale * factor;
        newScale = Math.max(1, Math.min(4, newScale));
        
        if (newScale === prev.scale) return prev;

        const newX = mx - (mx - prev.x) * (newScale / prev.scale);
        const newY = my - (my - prev.y) * (newScale / prev.scale);
        
        return {
          scale: newScale,
          ...clampPosition(newScale, { x: newX, y: newY }, rect.width, rect.height)
        };
      });
    };

    container.addEventListener("wheel", onWheelEvent, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheelEvent);
    };
  }, [activeImageIndex]);

  // Double-tap or double-click to toggle zoom (1x <-> 2.5x)
  const handleZoomToggle = (clientX: number, clientY: number, containerRect: DOMRect) => {
    const cx = containerRect.left + containerRect.width / 2;
    const cy = containerRect.top + containerRect.height / 2;
    const mx = clientX - cx;
    const my = clientY - cy;

    setZoomState((prev) => {
      const isZoomed = prev.scale > 1.05;
      const targetScale = isZoomed ? 1 : 2.5;

      if (!isZoomed) {
        const newX = mx - (mx - prev.x) * (targetScale / prev.scale);
        const newY = my - (my - prev.y) * (targetScale / prev.scale);
        return {
          scale: targetScale,
          ...clampPosition(targetScale, { x: newX, y: newY }, containerRect.width, containerRect.height)
        };
      } else {
        return { scale: 1, x: 0, y: 0 };
      }
    });
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleZoomToggle(e.clientX, e.clientY, rect);
  };

  // Mouse drag panning handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomState.scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - zoomState.x,
        y: e.clientY - zoomState.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && zoomState.scale > 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setZoomState((prev) => ({
        ...prev,
        ...clampPosition(prev.scale, { x: newX, y: newY }, rect.width, rect.height)
      }));
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Mobile touch, pan and pinch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapTime < 300) {
        // Double tap zoom
        const touch = e.touches[0];
        handleZoomToggle(touch.clientX, touch.clientY, rect);
        setLastTapTime(0);
        return;
      }
      setLastTapTime(now);

      if (zoomState.scale > 1) {
        setIsDragging(true);
        const touch = e.touches[0];
        setDragStart({
          x: touch.clientX - zoomState.x,
          y: touch.clientY - zoomState.y
        });
      }
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      setTouchStartDist(dist);
      setTouchStartScale(zoomState.scale);

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const midX = (t1.clientX + t2.clientX) / 2 - cx;
      const midY = (t1.clientY + t2.clientY) / 2 - cy;
      
      setTouchStartCenter({ x: midX, y: midY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    if (e.touches.length === 1 && isDragging && zoomState.scale > 1) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      setZoomState((prev) => ({
        ...prev,
        ...clampPosition(prev.scale, { x: newX, y: newY }, rect.width, rect.height)
      }));
    } else if (e.touches.length === 2 && touchStartDist !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      
      const factor = dist / touchStartDist;
      let newScale = touchStartScale * factor;
      newScale = Math.max(1, Math.min(4, newScale));

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const midX = (t1.clientX + t2.clientX) / 2 - cx;
      const midY = (t1.clientY + t2.clientY) / 2 - cy;

      setZoomState((prev) => {
        const newX = midX - (midX - prev.x) * (newScale / prev.scale);
        const newY = midY - (midY - prev.y) * (newScale / prev.scale);
        
        return {
          scale: newScale,
          ...clampPosition(newScale, { x: newX, y: newY }, rect.width, rect.height)
        };
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchStartDist(null);
  };

  // Zoom control panel action triggers
  const zoomIn = () => {
    setZoomState((prev) => {
      const newScale = Math.min(4, prev.scale + 0.5);
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        return {
          scale: newScale,
          ...clampPosition(newScale, { x: prev.x * (newScale / prev.scale), y: prev.y * (newScale / prev.scale) }, rect.width, rect.height)
        };
      }
      return { ...prev, scale: newScale };
    });
  };

  const zoomOut = () => {
    setZoomState((prev) => {
      const newScale = Math.max(1, prev.scale - 0.5);
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        return {
          scale: newScale,
          ...clampPosition(newScale, { x: prev.x * (newScale / prev.scale), y: prev.y * (newScale / prev.scale) }, rect.width, rect.height)
        };
      }
      return { ...prev, scale: newScale };
    });
  };

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedFilter(category)}
            className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] transition-all duration-300 font-medium ${
              selectedFilter === category
                ? "bg-white text-black font-semibold shadow-xl"
                : "bg-white/5 text-white/60 border border-white/5 hover:bg-white/10 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid Container */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const imgSrc = imageSources[item.id] || item.image;
            const isFallback = imgSrc === "/lookbook.jpg";

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveImageIndex(index)}
                className={`${item.gridClass} group relative overflow-hidden rounded-3xl cursor-pointer border border-white/5 glass-panel-hover`}
              >
                {/* Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => {
                      setImageSources(prev => ({ ...prev, [item.id]: "/lookbook.jpg" }));
                    }}
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale hover:grayscale-0 duration-500 ${
                      isFallback ? (item.cropClass || "") : ""
                    }`}
                    priority={item.id <= 2}
                  />
                  
                  {/* Subtle luxury hover vignette effect */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                  
                  {/* Floating Zoom Action in bottom-right on hover */}
                  <div className="absolute bottom-6 right-6 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1]">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300">
                      <Maximize2 size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Image Zoom Viewer */}
      <AnimatePresence>
        {activeImageIndex !== null && (() => {
          const item = filteredItems[activeImageIndex];
          const imgSrc = imageSources[item.id] || item.image;
          const isFallback = imgSrc === "/lookbook.jpg";

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (zoomState.scale === 1) {
                  setActiveImageIndex(null);
                }
              }}
              className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 backdrop-blur-lg select-none"
              style={{
                cursor: zoomState.scale === 1 ? "zoom-out" : "default"
              }}
            >
              {/* Visual Hint Badge */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[110] bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] text-white/95 pointer-events-none shadow-2xl flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    {isMobile ? "Pinch or Double-tap to zoom" : "Scroll wheel or Double-click to zoom"}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Close Button - Google standard 48px touch target */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(null);
                }}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-[110] bg-white/10 hover:bg-white text-white hover:text-black w-12 h-12 flex items-center justify-center rounded-full transition-colors border border-white/10 shadow-2xl cursor-pointer"
                aria-label="Close Gallery"
              >
                <X size={20} />
              </button>

              {/* Left/Right Buttons - Subtle 48px Touch Controls */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 md:left-8 z-[110] bg-white/10 hover:bg-white text-white hover:text-black w-12 h-12 flex items-center justify-center rounded-full transition-colors border border-white/10 shadow-2xl cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 md:right-8 z-[110] bg-white/10 hover:bg-white text-white hover:text-black w-12 h-12 flex items-center justify-center rounded-full transition-colors border border-white/10 shadow-2xl cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight size={22} />
              </button>

              {/* Content Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative w-full max-w-5xl h-[75vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div 
                  ref={imageContainerRef}
                  className="relative w-full h-[65vh] select-none touch-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onDoubleClick={handleDoubleClick}
                  style={{
                    cursor: zoomState.scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in"
                  }}
                >
                  <div
                    style={{
                      transform: `translate(${zoomState.x}px, ${zoomState.y}px) scale(${zoomState.scale})`,
                      transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      transformOrigin: "center center",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      width: "100%",
                      height: "100%"
                    }}
                    className="relative pointer-events-none"
                  >
                    <Image
                      src={imgSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className={`object-contain ${
                        isFallback ? (item.cropClass || "") : ""
                      }`}
                      priority
                      quality={95}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Premium Floating Zoom Controls */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[110] bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full shadow-2xl flex items-center gap-4 transition-all hover:bg-white/10">
                <button
                  onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                  disabled={zoomState.scale <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
                  title="Zoom Out"
                >
                  -
                </button>
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/95 w-12 text-center select-none">
                  {Math.round(zoomState.scale * 100)}%
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                  disabled={zoomState.scale >= 4}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
                  title="Zoom In"
                >
                  +
                </button>
                {zoomState.scale > 1 && (
                  <>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <button
                      onClick={(e) => { e.stopPropagation(); resetZoom(); }}
                      className="text-[10px] uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
