"use client";

import { useState } from "react";
import { Logo } from "../svgs/logo";
import Image from "next/image";

export default function IntegrationImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [imageError, setImageError] = useState(false);

  return imageError ? (
    <Logo className="w-full" />
  ) : (
    <Image
      loader={() => src}
      src={src}
      unoptimized
      width={500}
      height={500}
      alt={alt}
      className="w-full"
      onError={() => setImageError(true)}
    />
  );
}
