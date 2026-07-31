export const artImages = {
  hero: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1400&q=80",
  brushes: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
  city: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=900&q=80",
  landscape: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=900&q=80",
  flower: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=900&q=80",
  portrait: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  artists: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  easel: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
  map: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80",
};

export const competitions = [
  {
    slug: "international-art-championship-2026",
    title: "International Art Championship 2026",
    category: "Painting",
    prize: "$25K",
    entryFee: "$25",
    date: "May 15, 2026",
    image: artImages.landscape,
    button: "Register Now",
  },
  {
    slug: "global-photography-awards-2026",
    title: "Global Photography Awards 2026",
    category: "Photography",
    prize: "$20K",
    entryFee: "$20",
    date: "June 10, 2026",
    image: artImages.portrait,
    button: "Register Now",
  },
  {
    slug: "digital-art-excellence-2026",
    title: "Digital Art Excellence 2026",
    category: "Digital Art",
    prize: "$15K",
    entryFee: "$15",
    date: "July 5, 2026",
    image: artImages.city,
    button: "Apply Now",
  },
  {
    slug: "young-artist-award-2026",
    title: "Young Artist Award 2026",
    category: "Open for Entry",
    prize: "$10K",
    entryFee: "$10",
    date: "May 18, 2026",
    image: artImages.flower,
    button: "Register Now",
  },
];

export const gallery = [
  [artImages.hero, "Premium Exhibition"],
  [artImages.landscape, "Current Exhibition"],
  [artImages.city, "Award Winning"],
  [artImages.flower, "Premium Exhibition"],
  [artImages.brushes, "Current Exhibition"],
  [artImages.portrait, "Award Winning"],
  [artImages.easel, "Premium Exhibition"],
  [artImages.artists, "Award Winning"],
];

export const downloads = [
  ["Competition Prospectus 2026", "PDF File (2.4 MB)", "purple"],
  ["Submission Guidelines", "PDF File (1.8 MB)", "purple"],
  ["Entry Form", "PDF File (1.2 MB)", "orange"],
  ["Terms & Conditions", "PDF File (980 KB)", "slate"],
  ["Copyright Policy", "PDF File (750 KB)", "rose"],
];

export const news = [
  {
    slug: "international-art-championship-2026-announced",
    title: "International Art Championship 2026 Announced",
    date: "Apr 20, 2026",
    category: "News",
    image: artImages.city,
  },
  {
    slug: "tips-for-photographing-artworks-like-a-pro",
    title: "Tips For Photographing Artworks Like a Pro",
    date: "Apr 15, 2026",
    category: "Photography",
    image: artImages.landscape,
  },
  {
    slug: "meet-our-esteemed-jury-panel-2026",
    title: "Meet Our Esteemed Jury Panel 2026",
    date: "Apr 10, 2026",
    category: "Updates",
    image: artImages.artists,
  },
  {
    slug: "how-to-prepare-your-artwork-for-competition",
    title: "How to Prepare Your Artwork for Competition",
    date: "Apr 05, 2026",
    category: "Guides",
    image: artImages.easel,
  },
];

export const categories = ["All Categories", "Painting", "Photography", "Digital Art", "Tips & Guides", "Events"];
