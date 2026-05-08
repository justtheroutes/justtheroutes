import Image from "next/image";

type Props = {
  src: string;

  alt: string;

  className?: string;

  fill?: boolean;

  width?: number;

  height?: number;

  priority?: boolean;

  sizes?: string;
};

export default function CloudinaryImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  priority,
  sizes,
}: Props) {
  const cloudName =
    process.env
      .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${src}`;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      sizes={
        sizes ||
        "(max-width: 768px) 100vw, 50vw"
      }
    />
  );
}