"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const REVIEWS = [
  {
    id: 1,
    author: "Jmsl lsmj",
    rating: 5,
    text: "I had an absolutely amazing stay at Lay Day Hostel. The rooms are beautiful, modern, and super clean. The whole property, especially the pool area, is really nice – perfect for chilling during the day but also great if you’re in the mood to party. It’s super easy to meet people and make new friends... I’ll definitely be back!"
  },
  {
    id: 2,
    author: "Jack Miller",
    rating: 5,
    text: "Excellent hostel. Convenient location and easy access to nearby amenities. The rooms were clean and well maintained. The staff is very friendly, and Erick from the bar always created the perfect atmosphere for the themed nights. Highly recommend staying here! 🤙🏼"
  },
  {
    id: 3,
    author: "Nasser Al-Naama",
    rating: 4,
    text: "I spent a few nights at Lay Day, my first time experiencing a hostel, and I’m grateful I got to experience it. The hostel does an excellent job of creating the atmosphere it is known for: a lively, Western-style social scene, which is great for meeting new people... Overall, it was a great introduction to hostel life."
  },
  {
    id: 4,
    author: "larissachazanas",
    rating: 5,
    text: "Experiência muito positiva. Ótimo lugar para quem quer conhecer pessoas e se hospedar em um ambiente animado e receptivo. Staff muito atencioso e bar do hotel muito animado, com opções de jogos para incentivar as intereções entre as pessoas."
  },
  {
    id: 5,
    author: "Kiana-Alize Diaz",
    rating: 5,
    text: "Eu e minha amiga adoramos nossa estadia – o ambiente era ótimo e tudo estava muito limpo. Ficamos em um quarto privativo em uma vila, a apenas 3 minutos de caminhada, em um local muito tranquilo, e nos sentimos como se tivéssemos nossa própria vila particular na maior parte do tempo."
  },
  {
    id: 6,
    author: "Lili",
    rating: 5,
    text: "Tive uma experiência incrível aqui!!! Os quartos eram maravilhosos e o ambiente era fantástico. A equipe foi sempre muito gentil, fez de tudo para ajudar e tinha uma energia incrível. Jonas sempre mantinha a energia lá em cima. Queria ficar 3 noites, mas acabei ficando 8… a atmosfera é contagiante!"
  },
  {
    id: 7,
    author: "Eleanor Moyse",
    rating: 5,
    text: "Sinceramente, foi ótimo! Já fiquei em tantos hostels, mas o Dwa foi incrível, super simpático e todo mundo adora a vida noturna, mas também tem a combinação perfeita de tranquilidade e uma localização perfeita. Imbatível! Estendemos a estadia porque era muito bom."
  },
  {
    id: 8,
    author: "Julia Stewart",
    rating: 5,
    text: "Tive uma estadia maravilhosa aqui! Os funcionários foram super acolhedores. Bella e Eric cuidaram muito bem de mim :) O espaço é muito confortável e social, e as piscinas são ótimas! Sempre havia atividades divertidas todas as noites para quem quisesse participar."
  },
  {
    id: 9,
    author: "Ella Byers",
    rating: 5,
    text: "Eu me diverti muito no Layday! O ambiente é descontraído e os funcionários foram super simpáticos desde o momento em que entrei! Os drinks estavam deliciosos e a atmosfera é perfeita para relaxar com os amigos ou curtir uma tarde preguiçosa."
  },
  {
    id: 10,
    author: "Dylan Golding",
    rating: 5,
    text: "Uau, que experiência incrível no Layday! Fui acolhido e me senti em casa imediatamente! A equipe é o que torna este lugar especial, sempre com um sorriso no rosto e disposta a ajudar. Os quartos são confortáveis e a área comum é ótima para conhecer novas pessoas."
  }
];

export function ReviewsSection() {
  return (
    <section className="py-16 bg-[#004A61] text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading tracking-wide mb-4">WHAT OUR GUESTS SAY</h2>
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="font-bold text-xl">4.7</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-[#EE5B2B] text-[#EE5B2B]" />
              ))}
            </div>
          </div>
          <p className="text-white/80 font-medium">Based on over 1,200 Google Reviews for Lay Day Hostels</p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {REVIEWS.map((review) => (
                <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white text-[#004A61] p-8 relative h-full flex flex-col min-h-[350px]"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#EE5B2B]" />
                    
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'fill-[#EE5B2B] text-[#EE5B2B]' : 'fill-gray-300 text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    
                    <p className="italic text-sm leading-relaxed mb-6 flex-grow font-medium">
                      "{review.text}"
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#EBE6D8] flex items-center justify-center font-bold text-[#004A61] shrink-0">
                        {review.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-sm tracking-wide line-clamp-1">{review.author}</p>
                        <div className="text-xs text-gray-500 flex items-center gap-1 select-none pointer-events-none">
                          <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="" className="w-3 h-3" width={12} height={12} />
                          Google Review
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="bg-[#EE5B2B] text-white hover:bg-[#EE5B2B]/90 border-none -left-6" />
              <CarouselNext className="bg-[#EE5B2B] text-white hover:bg-[#EE5B2B]/90 border-none -right-6" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
