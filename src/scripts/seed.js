import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

// We need to define models locally for the script or import them if using ES modules
// Since we are running this as a standalone script node, let's redefine minimal schemas
const plantSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    category: String,
    inStock: Boolean,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "user" },
});

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);

const samplePlants = [
    // Indoor
    {
        name: "Monstera Deliciosa",
        description: "Famous for its natural leaf holes, this tropical plant adds instant jungle vibes to any indoor space.",
        price: 45.00,
        category: "Indoor",
        imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Snake Plant",
        description: "Extremely hardy and an excellent air purifier. Tolerates low light and drought.",
        price: 32.50,
        category: "Indoor",
        imageUrl: "https://images.unsplash.com/photo-1593482892290-f561111d4e02?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "ZZ Plant",
        description: "Nearly indestructible with glossy, dark green leaves. Perfect for beginners.",
        price: 28.00,
        category: "Indoor",
        imageUrl: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Fiddle Leaf Fig",
        description: "A popular statement plant with large, lush, violin-shaped leaves.",
        price: 65.00,
        category: "Indoor",
        imageUrl: "https://images.unsplash.com/photo-1597055181300-e3621d1bba4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: false
    },

    // Succulents
    {
        name: "Aloe Vera",
        description: "A practical succulent known for its soothing gel and modern architectural look.",
        price: 18.00,
        category: "Succulents",
        imageUrl: "https://images.unsplash.com/photo-1596547609652-9cb5d8d737bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "String of Pearls",
        description: "A beautiful cascading succulent that looks like a beaded necklace. Great for hanging baskets.",
        price: 22.00,
        category: "Succulents",
        imageUrl: "https://images.unsplash.com/photo-1629853316142-d621b135c3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Echeveria Elegans",
        description: "A classic rosette-shaped succulent with beautiful pastel blue-green leaves.",
        price: 15.00,
        category: "Succulents",
        imageUrl: "https://images.unsplash.com/photo-1509423350716-97f9a2ea9c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Jade Plant",
        description: "A symbol of good luck, this tree-like succulent is incredibly resilient.",
        price: 24.00,
        category: "Succulents",
        imageUrl: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },

    // Flowering
    {
        name: "Peace Lily",
        description: "Elegant white blooms and dark green leaves. A classic shade-loving flowering plant.",
        price: 35.00,
        category: "Flowering",
        imageUrl: "https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Moth Orchid",
        description: "Stunning, long-lasting blooms make this orchid a favorite for elegant indoor displays.",
        price: 45.00,
        category: "Flowering",
        imageUrl: "https://images.unsplash.com/photo-1579621379105-9610f4def66b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Anthurium",
        description: "Known for its bright red, heart-shaped waxy 'flowers' that bloom year-round.",
        price: 38.00,
        category: "Flowering",
        imageUrl: "https://images.unsplash.com/photo-1600854279584-60e0a52d3ced?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },

    // Pet-Friendly
    {
        name: "Spider Plant",
        description: "Fast-growing and fun, producing 'babies' that cascade down. Completely safe for dogs and cats.",
        price: 26.00,
        category: "Pet-Friendly",
        imageUrl: "https://images.unsplash.com/photo-1615568571064-9694acfc9b08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Boston Fern",
        description: "Offers lush, feathery fronds that are completely non-toxic to your furry friends.",
        price: 30.00,
        category: "Pet-Friendly",
        imageUrl: "https://images.unsplash.com/photo-1611077759247-ba215ea3abce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Calathea Rattlesnake",
        description: "Striking patterned leaves that fold up at night. Safe for pets and gorgeous to look at.",
        price: 42.00,
        category: "Pet-Friendly",
        imageUrl: "https://images.unsplash.com/photo-1601614217112-9c18d36006e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Ponytail Palm",
        description: "A fun, sturdy plant with curling leaves. Not a true palm, but totally safe for pets.",
        price: 48.00,
        category: "Pet-Friendly",
        imageUrl: "https://images.unsplash.com/photo-1613521255531-9b63a23cb997?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: false
    }
];

const seedDB = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error("Missing MONGODB_URI in .env.local");
        }
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // Clear existing plants
        await Plant.deleteMany({});
        console.log("Cleared existing plants");

        // Insert sample plants
        await Plant.insertMany(samplePlants);
        console.log(`Inserted ${samplePlants.length} sample plants`);

        // Create an Admin user if one doesn't exist
        const adminEmail = "admin@leafandpetal.com";
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await User.create({
                name: "Super Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "admin",
            });
            console.log(`Created admin user: ${adminEmail} / password: admin123`);
        } else {
            console.log(`Admin user ${adminEmail} already exists`);
        }

        console.log("Database seeding completed successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
