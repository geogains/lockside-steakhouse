import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  /** Object position, used to keep focal points correct across crops. */
  objectPosition?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
};

/**
 * Image with a graceful, non-technical fallback. If a file is missing the user
 * sees a quiet placeholder rather than a broken-image icon or an empty box that
 * collapses the layout.
 */
export const ImageWithFallback = ({
  src,
  alt,
  width,
  height,
  className,
  objectPosition,
  loading = "lazy",
  fetchPriority,
  sizes,
}: ImageWithFallbackProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-elevated text-fg-subtle",
          className,
        )}
      >
        <ImageOff className="h-6 w-6" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      sizes={sizes}
      {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
      style={objectPosition ? { objectPosition } : undefined}
      className={className}
      onError={() => setFailed(true)}
    />
  );
};
