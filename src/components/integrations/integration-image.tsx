"use client";

import { useState } from "react";
import { Logo } from "../svgs/logo";

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
    <img
      src={src}
      width={500}
      height={500}
      alt={alt}
      className="w-full"
      onError={() => setImageError(true)}
    />
  );
}
