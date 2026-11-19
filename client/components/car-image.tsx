import Image from "next/image";

export function CarImage({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "object-contain p-5",
  priority = false,
  reveal = false,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  reveal?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-muted ${className}`} data-scroll-image={reveal ? "" : undefined}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          unoptimized
          priority={priority}
          className={imageClassName}
        />
      ) : (
        <div className="grid h-full min-h-56 place-items-center text-sm text-muted-foreground">
          Image unavailable
        </div>
      )}
    </div>
  );
}
