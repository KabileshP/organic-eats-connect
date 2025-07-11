// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "Heritage Tomatoes",
    farmer: "Green Valley Farm",
    price: 8.99,
    rating: 4.9,
    image: "🍅",
    description: "Vine-ripened heirloom tomatoes bursting with flavor",
    badge: "Bestseller",
    category: "vegetables",
    inStock: true,
    quantity: 50
  },
  {
    id: 2,
    name: "Fresh Spinach Bundle",
    farmer: "Sunny Acres",
    price: 5.49,
    rating: 4.8,
    image: "🥬",
    description: "Crisp organic spinach, perfect for salads",
    badge: "New",
    category: "leafy-greens",
    inStock: true,
    quantity: 30
  },
  {
    id: 3,
    name: "Rainbow Carrots",
    farmer: "Earth & Sky Farm",
    price: 6.99,
    rating: 4.9,
    image: "🥕",
    description: "Colorful organic carrots with incredible sweetness",
    badge: "Seasonal",
    category: "vegetables",
    inStock: true,
    quantity: 25
  },
  {
    id: 4,
    name: "Artisan Lettuce Mix",
    farmer: "Harvest Moon",
    price: 7.49,
    rating: 4.7,
    image: "🥗",
    description: "Premium mixed greens for gourmet salads",
    badge: "Premium",
    category: "leafy-greens",
    inStock: true,
    quantity: 20
  },
  {
    id: 5,
    name: "Organic Broccoli",
    farmer: "Green Valley Farm",
    price: 4.99,
    rating: 4.6,
    image: "🥦",
    description: "Fresh organic broccoli crowns",
    badge: "Fresh",
    category: "vegetables",
    inStock: true,
    quantity: 35
  },
  {
    id: 6,
    name: "Sweet Bell Peppers",
    farmer: "Sunny Acres",
    price: 9.99,
    rating: 4.8,
    image: "🫑",
    description: "Colorful sweet bell peppers",
    badge: "Popular",
    category: "vegetables",
    inStock: true,
    quantity: 40
  }
];

// Mock farmers data
const mockFarmers = [
  {
    id: 1,
    name: "Sarah Johnson",
    farm: "Green Valley Organic Farm",
    location: "Sonoma County, CA",
    specialty: "Heirloom Vegetables",
    years: 15,
    avatar: "👩‍🌾",
    rating: 4.9,
    products: 24,
    description: "Third-generation farmer specializing in rare heirloom varieties",
    email: "sarah@greenvalley.com",
    phone: "(555) 123-4567"
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    farm: "Sunny Acres",
    location: "Central Valley, CA",
    specialty: "Leafy Greens",
    years: 8,
    avatar: "👨‍🌾",
    rating: 4.8,
    products: 18,
    description: "Sustainable farming practices with focus on premium salad greens",
    email: "miguel@sunnyacres.com",
    phone: "(555) 234-5678"
  },
  {
    id: 3,
    name: "Emma Chen",
    farm: "Harvest Moon Farm",
    location: "Napa Valley, CA",
    specialty: "Root Vegetables",
    years: 12,
    avatar: "👩‍🌾",
    rating: 4.9,
    products: 31,
    description: "Biodynamic farming methods producing exceptional root vegetables",
    email: "emma@harvestmoon.com",
    phone: "(555) 345-6789"
  }
];

// Mock partner applications data
let mockPartnerApplications = [
  {
    id: 1,
    name: "David Wilson",
    email: "david@organicvalley.com",
    phone: "(555) 987-6543",
    farmName: "Organic Valley Farm",
    farmLocation: "Monterey County, CA",
    farmSize: "150 acres",
    experience: "12 years",
    description: "Specializing in organic vegetables and herbs. Currently growing tomatoes, peppers, lettuce, and various herbs using sustainable farming practices.",
    status: "pending",
    appliedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@freshfields.com",
    phone: "(555) 456-7890",
    farmName: "Fresh Fields Organic",
    farmLocation: "San Luis Obispo, CA",
    farmSize: "75 acres",
    experience: "8 years",
    description: "Family-owned farm focusing on seasonal produce. We grow strawberries, broccoli, cauliflower, and root vegetables using biodynamic methods.",
    status: "approved",
    appliedAt: "2024-01-10T14:20:00Z"
  },
  {
    id: 3,
    name: "James Thompson",
    email: "james@greenacres.com",
    phone: "(555) 234-5678",
    farmName: "Green Acres Farm",
    farmLocation: "Fresno County, CA",
    farmSize: "200 acres",
    experience: "15 years",
    description: "Large-scale organic operation specializing in leafy greens and citrus fruits. USDA certified organic since 2015.",
    status: "rejected",
    appliedAt: "2024-01-05T09:15:00Z"
  },
  {
    id: 4,
    name: "Lisa Chen",
    email: "lisa@sunshinefarm.com",
    phone: "(555) 345-6789",
    farmName: "Sunshine Organic Farm",
    farmLocation: "Ventura County, CA",
    farmSize: "90 acres",
    experience: "10 years",
    description: "Sustainable farming with focus on berries and stone fruits. We practice regenerative agriculture and have been certified organic for 5 years.",
    status: "pending",
    appliedAt: "2024-01-20T16:45:00Z"
  }
];

// Mock admin user
let mockAdmin = {
  id: 1,
  email: "admin@farmfresh.com",
  isAdmin: true,
  isAuthenticated: false
};

// Mock user data
let mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isAuthenticated: false,
  cart: [] as Array<{id: number, quantity: number}>,
  orders: [] as Array<any>
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  // Products
  async getProducts() {
    await delay(500);
    return mockProducts;
  },

  async getProduct(id: number) {
    await delay(300);
    return mockProducts.find(p => p.id === id);
  },

  async getFeaturedProducts() {
    await delay(400);
    return mockProducts.slice(0, 4);
  },

  // Farmers
  async getFarmers() {
    await delay(600);
    return mockFarmers;
  },

  async getFarmer(id: number) {
    await delay(300);
    return mockFarmers.find(f => f.id === id);
  },

  // User authentication
  async login(email: string, password: string) {
    await delay(800);
    if (email && password) {
      mockUser.isAuthenticated = true;
      return { success: true, user: mockUser };
    }
    return { success: false, error: "Invalid credentials" };
  },

  async logout() {
    await delay(300);
    mockUser.isAuthenticated = false;
    mockUser.cart = [];
    return { success: true };
  },

  async register(userData: any) {
    await delay(1000);
    mockUser = { ...mockUser, ...userData, isAuthenticated: true };
    return { success: true, user: mockUser };
  },

  // Cart management
  async addToCart(productId: number, quantity: number = 1) {
    await delay(400);
    const existingItem = mockUser.cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      mockUser.cart.push({ id: productId, quantity });
    }
    return { success: true, cart: mockUser.cart };
  },

  async removeFromCart(productId: number) {
    await delay(300);
    mockUser.cart = mockUser.cart.filter(item => item.id !== productId);
    return { success: true, cart: mockUser.cart };
  },

  async updateCartQuantity(productId: number, quantity: number) {
    await delay(300);
    const item = mockUser.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
    return { success: true, cart: mockUser.cart };
  },

  async getCart() {
    await delay(200);
    const cartWithProducts = mockUser.cart.map(item => {
      const product = mockProducts.find(p => p.id === item.id);
      return { ...product, cartQuantity: item.quantity };
    });
    return cartWithProducts;
  },

  // Orders
  async createOrder(orderData: any) {
    await delay(1200);
    const order = {
      id: Date.now(),
      ...orderData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    mockUser.orders.push(order);
    mockUser.cart = []; // Clear cart after order
    return { success: true, order };
  },

  async getOrders() {
    await delay(500);
    return mockUser.orders;
  },

  // Newsletter
  async subscribeNewsletter(email: string) {
    await delay(600);
    console.log(`Newsletter subscription for: ${email}`);
    return { success: true, message: "Successfully subscribed to newsletter!" };
  },

  // Contact/Support
  async sendContactMessage(messageData: any) {
    await delay(800);
    console.log("Contact message sent:", messageData);
    return { success: true, message: "Message sent successfully!" };
  },

  // Admin authentication
  async adminLogin(email: string, password: string) {
    await delay(800);
    if (email === "admin@farmfresh.com" && password === "admin123") {
      mockAdmin.isAuthenticated = true;
      return { success: true, admin: mockAdmin };
    }
    return { success: false, error: "Invalid admin credentials" };
  },

  async adminLogout() {
    await delay(300);
    mockAdmin.isAuthenticated = false;
    return { success: true };
  },

  // Partner applications management
  async getPartnerApplications() {
    await delay(600);
    return mockPartnerApplications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
  },

  async approvePartnerApplication(applicationId: number) {
    await delay(500);
    const application = mockPartnerApplications.find(app => app.id === applicationId);
    if (application) {
      application.status = "approved";
      return { success: true, application };
    }
    return { success: false, error: "Application not found" };
  },

  async rejectPartnerApplication(applicationId: number) {
    await delay(500);
    const application = mockPartnerApplications.find(app => app.id === applicationId);
    if (application) {
      application.status = "rejected";
      return { success: true, application };
    }
    return { success: false, error: "Application not found" };
  },

  async submitPartnerApplication(applicationData: any) {
    await delay(1000);
    const newApplication = {
      id: Date.now(),
      ...applicationData,
      status: "pending",
      appliedAt: new Date().toISOString()
    };
    mockPartnerApplications.push(newApplication);
    return { success: true, application: newApplication };
  }
};
