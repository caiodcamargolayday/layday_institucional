import { NextResponse } from 'next/server';
import { z } from 'zod';

const searchSchema = z.object({
  destination: z.string().optional(),
  priceMin: z.coerce.number().optional(),
  priceMax: z.coerce.number().optional(),
  amenities: z.string().optional(), // Comma separated
  rating: z.coerce.number().optional(),
  sort: z.enum(['price_asc', 'price_desc', 'rating_desc']).optional(),
});

// Mock database
const HOSTELS_DB = [
  {
    id: 1,
    name: "Lay Day Canggu",
    location: "Canggu, Indonesia",
    price: 15,
    rating: 4.8,
    amenities: ["pool", "wifi", "bar"],
    image: "/Lay%20Day%20Canggu/31d9344a0895af0b5808830a45cabfd957653de2.png",
    link: "/hotel/view/1/lay-day-canggu"
  },
  {
    id: 17,
    name: "Lay Day Uluwatu",
    location: "Uluwatu, Indonesia",
    price: 18,
    rating: 4.9,
    amenities: ["pool", "wifi", "yoga"],
    image: "/Lay%20Day%20Uluwatu%20Surf%20and%20Party%20Hostel/26f6a74f47ec995bf4d7b6d41e705bcb33ca2962.jpeg",
    link: "/hotel/view/17/lay-day-uluwatu"
  },
  {
    id: 18,
    name: "Lay Day Gili T",
    location: "Gili Trawangan, Indonesia",
    price: 12,
    rating: 4.7,
    amenities: ["beach", "wifi", "breakfast"],
    image: "/Lay%20Day%20Gili%20T%20Surf%20and%20Party%20Hostel/870220c8ccf7a0701047db37ca25dbbb1fc13813.jpeg",
    link: "/hotel/view/18/lay-day-gili-t"
  },
  {
    id: 20,
    name: "CoDay Uluwatu",
    location: "Uluwatu, Indonesia",
    price: 25,
    rating: 5.0,
    amenities: ["coworking", "wifi", "cafe"],
    image: "/Coday/43fb280fcb1e16c90538053a47da2f1400ba1ba4.jpeg",
    link: "/hotel/view/20/coday-uluwatu"
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    // Validate using Zod
    const validated = searchSchema.parse(query);

    let results = [...HOSTELS_DB];

    // Filter by destination
    if (validated.destination) {
      const dest = validated.destination.toLowerCase();
      results = results.filter(h => h.location.toLowerCase().includes(dest) || h.name.toLowerCase().includes(dest));
    }

    // Filter by price
    if (validated.priceMin !== undefined) {
      results = results.filter(h => h.price >= validated.priceMin!);
    }
    if (validated.priceMax !== undefined) {
      results = results.filter(h => h.price <= validated.priceMax!);
    }

    // Filter by rating
    if (validated.rating !== undefined) {
      results = results.filter(h => h.rating >= validated.rating!);
    }

    // Filter by amenities
    if (validated.amenities) {
      const requiredAmens = validated.amenities.split(',').map(a => a.trim().toLowerCase());
      results = results.filter(h => 
        requiredAmens.every(req => h.amenities.includes(req))
      );
    }

    // Sorting
    if (validated.sort) {
      switch (validated.sort) {
        case 'price_asc':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'rating_desc':
          results.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
