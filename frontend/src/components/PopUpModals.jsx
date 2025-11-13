// src/components/PopUpModals.jsx
import React from "react";

/**
 * PopUpModals
 * - Single source of truth for scaling & centering.
 * - The FRAME is sized to the scaled footprint (targetW*k by targetH*k).
 * - The CONTENT is rendered at its natural size and visually scaled via CSS transform.
 * - Backdrop click & Esc to close.
 *
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - baseW: number   (design width of the content)
 *  - baseH: number   (design height of the content)
 *  - margin?: number (viewport padding)
 *  - minScale?: number
 *  - maxScale?: number
 *  - useChildSize?: boolean  (optional; if true, modal adopts child’s intrinsic size)
 */
export default function PopUpModals({
  open,
  onClose,
  margin = 24,
  baseW = 598.92,
  baseH = 814,
  minScale = 0.5,
  maxScale = 1,
  useChildSize = false,
  children,
}) {
  const contentRef = React.useRef(null);

  const [k, setK] = React.useState(1);
  const [childW, setChildW] = React.useState(baseW);
  const [childH, setChildH] = React.useState(baseH);

  // Measure child’s natural size when asked to adopt it (note: we measure the unscaled inner content)
  React.useEffect(() => {
    if (!open || !useChildSize) return;

    const measure = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      setChildW(w);
      setChildH(h);
    };

    // First measure after mount
    requestAnimationFrame(measure);

    // Observe intrinsic size changes of the inner content
    const ro = new ResizeObserver(measure);
    if (contentRef.current) ro.observe(contentRef.current);

    return () => ro.disconnect();
  }, [open, useChildSize, children]);

  const recomputeScale = React.useCallback(() => {
    const vw = Math.max(1, window.innerWidth - margin * 2);
    const vh = Math.max(1, window.innerHeight - margin * 2);

    const targetW = useChildSize ? childW : baseW;
    const targetH = useChildSize ? childH : baseH;

    const kW = vw / targetW;
    const kH = vh / targetH;
    const next = Math.min(kW, kH, maxScale);
    setK(Math.max(minScale, next));
  }, [margin, minScale, maxScale, baseW, baseH, useChildSize, childW, childH]);

  React.useEffect(() => {
    if (!open) return;
    recomputeScale();
    const onR = () => recomputeScale();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, [open, recomputeScale]);

  // Close on Esc
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Target (natural) design size for the dialog
  const targetW = useChildSize ? childW : baseW;
  const targetH = useChildSize ? childH : baseH;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose} // backdrop closes
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        padding: margin,
        overflow: "hidden",
        touchAction: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Frame sized to the SCALED footprint so flex centering is accurate */}
      <div
        onClick={(e) => e.stopPropagation()} // don't close when clicking content
        style={{
          position: "relative",
          width: `${targetW * k}px`,
          height: `${targetH * k}px`,
          background: "transparent",
          border: "none",
          borderRadius: 0,
          boxShadow: "none",
        }}
      >
        {/* Scale layer (applies visual scale to the natural-sized content) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: targetW,
            height: targetH,
            transform: `scale(${k})`,
            transformOrigin: "top left",
            willChange: "transform",
          }}
        >
          {/* Inner content at NATURAL size (unscaled). Measuring this gives real intrinsic size. */}
          <div
            ref={contentRef}
            style={{
              width: targetW,
              height: targetH,
              overflow: "visible",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
