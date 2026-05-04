"use client";

import Image from "next/image";


export function InstagramFeed({ images }: { images: string[] }) {
  const displayImages = images.slice(0, 8); // exactly 8 images

  return (
    <section className="py-10 bg-[#EBE6D8]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Row 1 */}
          <div className="flex items-center justify-start md:pr-10">
            <h2 className="text-4xl md:text-5xl font-heading text-[#083248] tracking-wider leading-tight">
              LEGENDARY LAY DAY MOMENTS
            </h2>
          </div>
          
          {displayImages.slice(0, 2).map((post, i) => (
            <div key={`r1-${i}`} className="relative aspect-square w-full border-4 border-[#EE5B2B]">
              <Image 
                src={post} 
                alt={`Instagram post ${i}`} 
                fill 
                className="object-cover"
              />
            </div>
          ))}

          {/* Row 2 & 3 */}
          {displayImages.slice(2, 8).map((post, i) => (
            <div key={`r23-${i}`} className="relative aspect-square w-full border-4 border-[#EE5B2B]">
              <Image 
                src={post} 
                alt={`Instagram post ${i + 2}`} 
                fill 
                className="object-cover"
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
