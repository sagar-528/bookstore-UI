const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 8080;
const JWT_SECRET = 'bookstore-secret-key-local-dev';

app.use(cors());
app.use(express.json());
app.use(express.text());

// ─── In-Memory Data Store ───────────────────────────────────────────────────

const db = {
  users: [],
  books: [],
  cart: [],       // { userId, bookId, bookQuantity }
  wishlist: [],   // { userId, bookId }
  customers: [],  // { userId, name, pincode, locality, address, city, landmark, addressType }
  orders: [],     // { orderId, userId }
  nextOrderId: 1001,
  nextBookId: 13,
};

// ─── Seed Books ─────────────────────────────────────────────────────────────

db.books = [
  { id: 1, nameOfBook: "Don't Make Me Think", author: "Steve Krug", price: 350, description: "A practical guide to web usability. Since Don't Make Me Think was first published in 2000, hundreds of thousands of Web designers have relied on usability guru Steve Krug's guide to help them understand the principles of intuitive navigation and information design.", picPath: "https://images-na.ssl-images-amazon.com/images/I/51pnouuPO5L._SX387_BO1,204,203,200_.jpg" },
  { id: 2, nameOfBook: "The Design of Everyday Things", author: "Don Norman", price: 450, description: "The Design of Everyday Things shows that good, usable design is possible. The rules are simple: make things visible, exploit natural relationships that couple function and control.", picPath: "https://images-na.ssl-images-amazon.com/images/I/410RTJeuhbL._SX326_BO1,204,203,200_.jpg" },
  { id: 3, nameOfBook: "Hooked", author: "Nir Eyal", price: 280, description: "How do successful companies create products people can't put down? Hooked presents a four-step process embedded into the products of many successful companies to subtly encourage customer behavior.", picPath: "https://images-na.ssl-images-amazon.com/images/I/41VnFKk9ylL._SX329_BO1,204,203,200_.jpg" },
  { id: 4, nameOfBook: "Lean Startup", author: "Eric Ries", price: 320, description: "Most startups fail. But many of those failures are preventable. The Lean Startup is a new approach being adopted across the globe, changing the way companies are built and new products are launched.", picPath: "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg" },
  { id: 5, nameOfBook: "Clean Code", author: "Robert C. Martin", price: 500, description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Clean Code is a must-read for any developer who wants to be better at their craft.", picPath: "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg" },
  { id: 6, nameOfBook: "You Don't Know JS", author: "Kyle Simpson", price: 200, description: "No matter how much experience you have with JavaScript, odds are you don't fully understand the language. This concise yet in-depth guide takes you inside the core mechanisms of JS.", picPath: "https://images-na.ssl-images-amazon.com/images/I/41T5H8u7fUL._SX331_BO1,204,203,200_.jpg" },
  { id: 7, nameOfBook: "Eloquent JavaScript", author: "Marijn Haverbeke", price: 380, description: "JavaScript lies at the heart of almost every modern web application. Eloquent JavaScript dives deep into the JavaScript language to show you how to write beautiful, effective code.", picPath: "https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" },
  { id: 8, nameOfBook: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell", price: 600, description: "I am not a recruiter. I am a software engineer. And as such, I know what it's like to be asked to whip up brilliant algorithms on the spot and then write flawless code on a whiteboard.", picPath: "https://images-na.ssl-images-amazon.com/images/I/51l5XzLln%2BL._SX348_BO1,204,203,200_.jpg" },
  { id: 9, nameOfBook: "Introduction to Algorithms", author: "Thomas H. Cormen", price: 750, description: "Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness.", picPath: "https://images-na.ssl-images-amazon.com/images/I/41SNoh5ZhOL._SX440_BO1,204,203,200_.jpg" },
  { id: 10, nameOfBook: "The Pragmatic Programmer", author: "David Thomas", price: 420, description: "The Pragmatic Programmer is one of those rare tech books you'll read, re-read, and read again over the years. Whether you're new to the field or an experienced practitioner.", picPath: "https://images-na.ssl-images-amazon.com/images/I/51cUVaBWZzL._SX380_BO1,204,203,200_.jpg" },
  { id: 11, nameOfBook: "Head First Java", author: "Kathy Sierra", price: 340, description: "Head First Java combines puzzles, strong visuals, mysteries, and soul-searching interviews with famous Java objects to engage you in many different ways.", picPath: "https://images-na.ssl-images-amazon.com/images/I/51UpmYWFRkL._SX258_BO1,204,203,200_.jpg" },
  { id: 12, nameOfBook: "Refactoring", author: "Martin Fowler", price: 480, description: "For more than twenty years, experienced programmers worldwide have relied on Martin Fowler's Refactoring to improve the design of existing code and to enhance software maintainability.", picPath: "https://images-na.ssl-images-amazon.com/images/I/41LBzpPXCOL._SX379_BO1,204,203,200_.jpg" },
];

// ─── Seed Default Users ──────────────────────────────────────────────────────

db.users.push({
  id: 1,
  username: 'admin',
  password: bcrypt.hashSync('admin123', 8),
  email: 'admin@bookstore.com',
  phoneNumber: '9876543210',
  role: ['admin'],
});

db.users.push({
  id: 2,
  username: 'user',
  password: bcrypt.hashSync('user123', 8),
  email: 'user@bookstore.com',
  phoneNumber: '9876543211',
  role: ['user'],
});

// ─── Auth Middleware ─────────────────────────────────────────────────────────

function authenticateToken(req, res, next) {
  const token = req.headers['token'];
  if (!token) return res.status(401).send('No token provided');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role || [];
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
}

function requireAdmin(req, res, next) {
  if (!req.userRole || !req.userRole.includes('admin')) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

// ─── Auth Routes ────────────────────────────────────────────────────────────

app.post('/api/auth/signup', (req, res) => {
  const { username, password, email, phoneNumber, role } = req.body;

  if (db.users.find(u => u.username === username)) {
    return res.status(400).send('Username already exists');
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = {
    id: db.users.length + 1,
    username,
    password: hashedPassword,
    email,
    phoneNumber,
    role: role || ['user'],
  };
  db.users.push(user);
  res.send('User registered successfully');
});

app.post('/api/auth/signin', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username);

  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const accessToken = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ accessToken, role: user.role });
});

app.post('/api/auth/forgotpassword', (req, res) => {
  const email = typeof req.body === 'string' ? req.body : req.body.email;
  console.log('Forgot password requested for:', email);
  res.send('Password reset link has been sent to your email');
});

app.put('/api/auth/resetpassword', authenticateToken, (req, res) => {
  const user = db.users.find(u => u.id === req.userId);
  if (!user) return res.status(404).send('User not found');

  const newPassword = typeof req.body === 'string' ? req.body : req.body.password;
  user.password = bcrypt.hashSync(newPassword, 8);
  res.send('Password updated successfully');
});

// ─── Book Routes ────────────────────────────────────────────────────────────

app.get('/verifyaccount/all', (req, res) => {
  res.json(db.books);
});

app.get('/verifyaccount/sort-asc/price', (req, res) => {
  const sorted = [...db.books].sort((a, b) => a.price - b.price);
  res.json({ content: sorted });
});

app.get('/verifyaccount/sort-desc/price', (req, res) => {
  const sorted = [...db.books].sort((a, b) => b.price - a.price);
  res.json({ content: sorted });
});

app.get('/verifyaccount/searchbooks/:searchText', (req, res) => {
  const text = req.params.searchText.toLowerCase();
  const results = db.books.filter(b =>
    b.nameOfBook.toLowerCase().includes(text) ||
    b.author.toLowerCase().includes(text)
  );
  res.json(results);
});

// ─── Cart Routes ────────────────────────────────────────────────────────────

app.put('/home/user/cart/add-update', authenticateToken, (req, res) => {
  const { bookId, bookQuantity } = req.body;
  const existing = db.cart.find(c => c.userId === req.userId && c.bookId === bookId);

  if (existing) {
    existing.bookQuantity = bookQuantity;
  } else {
    db.cart.push({ userId: req.userId, bookId, bookQuantity });
  }
  res.send('Book added/updated in cart');
});

app.get('/home/user/cart/getall', authenticateToken, (req, res) => {
  const userCart = db.cart.filter(c => c.userId === req.userId);
  const cartWithDetails = userCart.map(item => {
    const book = db.books.find(b => b.id === item.bookId);
    if (!book) return null;
    return { ...book, bookQuantity: item.bookQuantity };
  }).filter(Boolean);
  res.json(cartWithDetails);
});

app.put('/home/user/cart/remove', authenticateToken, (req, res) => {
  const { bookId } = req.body;
  db.cart = db.cart.filter(c => !(c.userId === req.userId && c.bookId === bookId));
  res.send('Book removed from cart');
});

app.get('/home/user/cart/orderplaced/orderid', authenticateToken, (req, res) => {
  const orderId = db.nextOrderId++;
  db.orders.push({ orderId, userId: req.userId });
  db.cart = db.cart.filter(c => c.userId !== req.userId);
  res.send(String(orderId));
});

// ─── Wishlist Routes ────────────────────────────────────────────────────────

app.put('/home/user/wishlist/add', authenticateToken, (req, res) => {
  const { bookId } = req.body;
  const exists = db.wishlist.find(w => w.userId === req.userId && w.bookId === bookId);

  if (!exists) {
    db.wishlist.push({ userId: req.userId, bookId });
  }
  res.send('Book added to wishlist');
});

app.get('/home/user/wishlist/getall', authenticateToken, (req, res) => {
  const userWishlist = db.wishlist.filter(w => w.userId === req.userId);
  const wishlistWithDetails = userWishlist.map(item => {
    const book = db.books.find(b => b.id === item.bookId);
    return book || null;
  }).filter(Boolean);
  res.json(wishlistWithDetails);
});

app.put('/home/user/wishlist/remove', authenticateToken, (req, res) => {
  const { bookId } = req.body;
  db.wishlist = db.wishlist.filter(w => !(w.userId === req.userId && w.bookId === bookId));
  res.send('Book removed from wishlist');
});

// ─── Admin Routes ────────────────────────────────────────────────────────────

app.post('/admin/book/add', authenticateToken, requireAdmin, (req, res) => {
  const { nameOfBook, author, price, description, picPath } = req.body;
  if (!nameOfBook || !author || !price) {
    return res.status(400).json({ message: 'Name, author, and price are required' });
  }
  const book = {
    id: db.nextBookId++,
    nameOfBook,
    author,
    price: Number(price),
    description: description || '',
    picPath: picPath || 'https://via.placeholder.com/150x200?text=No+Cover',
  };
  db.books.push(book);
  res.json(book);
});

app.delete('/admin/book/delete/:id', authenticateToken, requireAdmin, (req, res) => {
  const bookId = Number(req.params.id);
  const idx = db.books.findIndex(b => b.id === bookId);
  if (idx === -1) return res.status(404).json({ message: 'Book not found' });

  db.books.splice(idx, 1);
  db.cart = db.cart.filter(c => c.bookId !== bookId);
  db.wishlist = db.wishlist.filter(w => w.bookId !== bookId);
  res.json({ message: 'Book deleted successfully' });
});

// ─── Customer Routes ────────────────────────────────────────────────────────

app.post('/home/customer/adddetails', authenticateToken, (req, res) => {
  const { name, pincode, locality, address, city, landmark, addressType } = req.body;
  const existing = db.customers.find(c => c.userId === req.userId);

  if (existing) {
    Object.assign(existing, { name, pincode, locality, address, city, landmark, addressType });
  } else {
    db.customers.push({ userId: req.userId, name, pincode, locality, address, city, landmark, addressType });
  }
  res.send('Customer details saved');
});

app.get('/home/customer/isexisted', authenticateToken, (req, res) => {
  const exists = db.customers.some(c => c.userId === req.userId);
  res.send(exists ? 'true' : 'false');
});

// ─── Start Server ───────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Bookstore backend running on http://localhost:${PORT}`);
});
