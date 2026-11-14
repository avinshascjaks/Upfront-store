export type Image = { src: string; alt: string };

type CropOptions = {
  /** Zoomed detail crop around a focal point (0–1). */
  focal?: { x: number; y: number; zoom: number };
};

/** Unsplash (imgix) URL. Sized generously; next/image resizes per viewport. */
export function unsplash(id: string, { focal }: CropOptions = {}) {
  const base = `https://images.unsplash.com/photo-${id}?auto=format&q=80`;
  if (!focal) return `${base}&fit=crop&w=2400`;
  return `${base}&fit=crop&crop=focalpoint&fp-x=${focal.x}&fp-y=${focal.y}&fp-z=${focal.zoom}&w=1600&h=2000`;
}
