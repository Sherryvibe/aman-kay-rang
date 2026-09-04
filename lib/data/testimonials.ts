export interface Testimonial {
  id: string;
  name: string;
  city: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "review-1",
    name: "Ayla Khan",
    city: "Islamabad",
    quote: "The fabric feels like skin. It's rare to find heritage block printing executed with such an elegant, modern, soft hand feel.",
    rating: 5
  },
  {
    id: "review-2",
    name: "Zainab Shah",
    city: "Karachi",
    quote: "Every time I wear the Gul-e-Naz suit, I receive endless compliments. The quality of the cambric lawn is unmatched.",
    rating: 5
  },
  {
    id: "review-3",
    name: "Mariam Malik",
    city: "Lahore",
    quote: "Beautiful tribute to traditional artisans. The brand details, narrative, packaging, and soft aesthetics are incredibly premium.",
    rating: 5
  }
];
