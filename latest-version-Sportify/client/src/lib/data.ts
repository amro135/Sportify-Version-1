// Mock product data with diverse categories
export const products = [
    // Running Shoes
    {
        id: "1",
        name: "AeroMax Running Shoes",
        price: 129.99,
        category: "Running Shoes",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
        description: "Lightweight running shoes with superior cushioning"
    },
    {
        id: "2",
        name: "SprintPro Elite",
        price: 149.99,
        category: "Running Shoes",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2070&auto=format&fit=crop",
        description: "Professional-grade running shoes for athletes"
    },
    {
        id: "3",
        name: "TrailBlazer X1",
        price: 139.99,
        category: "Running Shoes",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2012&auto=format&fit=crop",
        description: "All-terrain running shoes for outdoor adventures"
    },

    // Training Apparel
    {
        id: "4",
        name: "Performance Training Shirt",
        price: 45.99,
        category: "Apparel",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop",
        description: "Moisture-wicking fabric for intense workouts"
    },
    {
        id: "5",
        name: "Athletic Performance Shorts",
        price: 39.99,
        category: "Apparel",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop",
        description: "Lightweight performance shorts with moisture-wicking fabric"
    },
    {
        id: "6",
        name: "Pro Compression Leggings",
        price: 54.99,
        category: "Apparel",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1974&auto=format&fit=crop",
        description: "High-performance compression for recovery"
    },

    // Basketball
    {
        id: "7",
        name: "HoopMaster Basketball",
        price: 34.99,
        category: "Basketball",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format&fit=crop",
        description: "Official size indoor/outdoor basketball"
    },
    {
        id: "8",
        name: "SlamDunk Pro Shoes",
        price: 159.99,
        category: "Basketball",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop",
        description: "High-top basketball shoes with ankle support"
    },

    // Fitness Equipment
    {
        id: "9",
        name: "PowerGrip Dumbbells Set",
        price: 89.99,
        category: "Equipment",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=2070&auto=format&fit=crop",
        description: "Adjustable dumbbell set 5-25 lbs"
    },
    {
        id: "10",
        name: "Yoga Mat Premium",
        price: 29.99,
        category: "Equipment",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2080&auto=format&fit=crop",
        description: "Non-slip eco-friendly yoga mat"
    },
    {
        id: "11",
        name: "Resistance Bands Pro Set",
        price: 24.99,
        category: "Equipment",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=2074&auto=format&fit=crop",
        description: "5-piece resistance band set with handles"
    },

    // Soccer
    {
        id: "12",
        name: "StrikerPro Soccer Ball",
        price: 39.99,
        category: "Soccer",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=1974&auto=format&fit=crop",
        description: "FIFA-approved match ball"
    },
    {
        id: "13",
        name: "SpeedBolt Cleats",
        price: 119.99,
        category: "Soccer",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=2064&auto=format&fit=crop",
        description: "Lightweight soccer cleats for speed"
    },

    // Tennis
    {
        id: "14",
        name: "AcePro Tennis Racket",
        price: 179.99,
        category: "Tennis",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop",
        description: "Professional carbon fiber racket"
    },
    {
        id: "15",
        name: "CourtMaster Tennis Shoes",
        price: 109.99,
        category: "Tennis",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
        description: "Durable court shoes with grip"
    },

    // Accessories
    {
        id: "16",
        name: "HydroFlow Water Bottle",
        price: 19.99,
        category: "Accessories",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
        description: "Insulated 32oz sports bottle"
    },
    // New Equipment
    {
        id: "17",
        name: "Pro Boxing Gloves",
        price: 59.99,
        category: "Equipment",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1974&auto=format&fit=crop",
        description: "Premium leather boxing gloves for training"
    },
    {
        id: "18",
        name: "Kettlebell Set",
        price: 79.99,
        category: "Equipment",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=1974&auto=format&fit=crop",
        description: "Cast iron kettlebells for functional training"
    },
    {
        id: "19",
        name: "Jump Rope Speed",
        price: 14.99,
        category: "Equipment",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&auto=format&fit=crop",
        description: "Adjustable speed rope for cardio"
    },
    // More Products
    {
        id: "20",
        name: "Smart Fitness Watch",
        price: 199.99,
        category: "Accessories",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
        description: "Track your heart rate, steps, and sleep"
    },
    {
        id: "21",
        name: "Gym Duffel Bag",
        price: 49.99,
        category: "Accessories",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
        description: "Spacious bag with shoe compartment"
    },
    {
        id: "22",
        name: "Foam Roller",
        price: 24.99,
        category: "Equipment",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?q=80&w=2070&auto=format&fit=crop",
        description: "High-density foam roller for muscle recovery"
    },
    {
        id: "23",
        name: "Pro Court Tennis Balls",
        price: 12.99,
        category: "Tennis",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop",
        description: "3-pack of high-durability tennis balls"
    },
    {
        id: "24",
        name: "Tennis Racket Grip Tape",
        price: 8.99,
        category: "Tennis",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop",
        description: "Anti-slip grip tape for tennis rackets"
    },
    {
        id: "25",
        name: "Soccer Goalie Gloves",
        price: 45.99,
        category: "Soccer",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&auto=format&fit=crop",
        description: "Professional grade goalie gloves with finger protection"
    },
    {
        id: "26",
        name: "Training Cones Set",
        price: 19.99,
        category: "Soccer",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
        description: "Set of 20 agility training cones"
    },
    {
        id: "27",
        name: "Women's Yoga Leggings",
        price: 49.99,
        category: "Apparel",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1974&auto=format&fit=crop",
        description: "High-waisted seamless yoga leggings"
    },
    {
        id: "28",
        name: "Men's Athletic Hoodie",
        price: 55.99,
        category: "Apparel",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop",
        description: "Warm and breathable athletic hoodie"
    },
    {
        id: "29",
        name: "Marathon Runner Vest",
        price: 34.99,
        category: "Running Shoes",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop",
        description: "Lightweight reflective running vest"
    },
    {
        id: "30",
        name: "Pro Basketball Jersey",
        price: 49.99,
        category: "Basketball",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=1974&auto=format&fit=crop",
        description: "Breathable mesh basketball jersey"
    },
    {
        id: "31",
        name: "Sport Headband",
        price: 14.99,
        category: "Accessories",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1606889464198-fcb18894cf50?w=800&auto=format&fit=crop",
        description: "Moisture-wicking sports headband"
    },
    {
        id: "32",
        name: "2kg Gym Dumbbell",
        price: 30.00,
        category: "Equipment",
        rating: 4.5,
        image: "/dumbbell-2kg.jpg",
        description: "Professional 2kg gym dumbbell with ergonomic grip"
    }
];

export const categories = [
    "All",
    "Running Shoes",
    "Apparel",
    "Basketball",
    "Soccer",
    "Tennis",
    "Equipment",
    "Accessories"
];
