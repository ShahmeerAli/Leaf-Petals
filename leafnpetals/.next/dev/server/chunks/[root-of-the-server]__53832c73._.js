module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/db/mongodb.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */ let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            console.log("MongoDB Connected Successfully");
            return mongoose;
        }).catch((err)=>{
            console.error("MongoDB Connection Error: ", err);
            throw err;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectDB;
}),
"[project]/src/models/Plant.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const plantSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].Schema({
    name: {
        type: String,
        required: [
            true,
            "Please provide the plant name"
        ]
    },
    description: {
        type: String,
        required: [
            true,
            "Please provide a description"
        ]
    },
    price: {
        type: Number,
        required: [
            true,
            "Please provide the price"
        ]
    },
    imageUrl: {
        type: String,
        required: [
            true,
            "Please provide an image URL"
        ]
    },
    category: {
        type: String,
        required: [
            true,
            "Please provide a category"
        ]
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
const Plant = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Plant || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("Plant", plantSchema);
const __TURBOPACK__default__export__ = Plant;
}),
"[project]/src/models/User.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const userSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].Schema({
    name: {
        type: String,
        required: [
            true,
            "Please provide your name"
        ]
    },
    email: {
        type: String,
        required: [
            true,
            "Please provide your email"
        ],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [
            true,
            "Please provide a password"
        ],
        minlength: 6
    },
    role: {
        type: String,
        enum: [
            "user",
            "admin"
        ],
        default: "user"
    }
}, {
    timestamps: true
});
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("User", userSchema);
const __TURBOPACK__default__export__ = User;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/app/api/seed/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/mongodb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Plant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Plant.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/User.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
;
;
;
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
    },
    {
        name: "Parlor Palm",
        description: "A classic Victorian-era houseplant. Very tolerant of low light and completely pet safe.",
        price: 35.00,
        category: "Pet-Friendly",
        imageUrl: "https://images.unsplash.com/photo-1596547609652-9cb5d8d737bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "African Violet",
        description: "Produces stunning purple blooms. Non-toxic to cats and dogs and brightens any windowsill.",
        price: 22.00,
        category: "Pet-Friendly",
        imageUrl: "https://images.unsplash.com/photo-1629853316142-d621b135c3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Watermelon Peperomia",
        description: "Leaves that look exactly like tiny watermelons. 100% pet-friendly and highly sought after.",
        price: 28.00,
        category: "Pet-Friendly",
        imageUrl: "https://images.unsplash.com/photo-1601614217112-9c18d36006e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Neon Pothos",
        description: "Incredibly vibrant, almost glowing lime green leaves. A fast-growing trailing plant.",
        price: 18.00,
        category: "Indoor",
        imageUrl: "https://images.unsplash.com/photo-1593482892290-f561111d4e02?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Rubber Tree",
        description: "Striking burgundy-green thick leaves. A fantastic statement piece for a bright room.",
        price: 55.00,
        category: "Indoor",
        imageUrl: "https://images.unsplash.com/photo-1597055181300-e3621d1bba4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Bird of Paradise",
        description: "Brings serious tropical flair with its massive, paddle-shaped leaves.",
        price: 85.00,
        category: "Indoor",
        imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: false
    },
    {
        name: "Bromeliad",
        description: "A vivid, tropical splash of color in a sea of green. Easy to care for and incredibly exotic.",
        price: 40.00,
        category: "Flowering",
        imageUrl: "https://images.unsplash.com/photo-1600854279584-60e0a52d3ced?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Zebra Haworthia",
        description: "A spiky succulent with stunning pearl-white stripes. Looks like a mini aloe vera.",
        price: 16.00,
        category: "Succulents",
        imageUrl: "https://images.unsplash.com/photo-1509423350716-97f9a2ea9c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    },
    {
        name: "Burro's Tail",
        description: "A quirky succulent with trailing stems of plump, tear-drop shaped leaves.",
        price: 24.00,
        category: "Succulents",
        imageUrl: "https://images.unsplash.com/photo-1629853316142-d621b135c3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true
    }
];
async function GET() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // Clear existing
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Plant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].deleteMany({});
        // Insert new
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Plant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].insertMany(samplePlants);
        // Check admin
        const adminEmail = "admin@leafandpetal.com";
        const existingAdmin = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email: adminEmail
        });
        if (!existingAdmin) {
            const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash("admin123", 10);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
                name: "Super Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "admin"
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Database seeded successfully with 15 plants and admin user."
        });
    } catch (error) {
        console.error("Seed error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__53832c73._.js.map