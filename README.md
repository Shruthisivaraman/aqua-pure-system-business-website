# AQUA PURE SYSTEM - Complete Full-Stack Website

A professional, modern, and responsive full-stack website for **AQUA PURE SYSTEM**, a water filter installation, maintenance, and repair service provider.

## 🌐 Project Overview

AQUA PURE SYSTEM is a comprehensive web solution that includes:

- **6 Static Frontend Pages** with responsive design (Mobile, Tablet, Desktop)
- **Production-Ready Backend API** with Node.js, Express.js, and MongoDB
- **Business Features** including enquiry management, customer reviews, and gallery system
- **WhatsApp Integration** for real-time enquiry notifications
- **Admin Authentication** for secure backend operations

---

## 📁 Project Structure

```
AQUA-PURE-SYSTEM/
│
├── client/                          # Frontend (Static Website)
│   ├── index.html                   # Home Page
│   ├── services.html                # Services Page
│   ├── about.html                   # About Us Page
│   ├── gallery.html                 # Gallery Page
│   ├── reviews.html                 # Customer Reviews Page
│   ├── contact.html                 # Contact Page
│   │
│   ├── css/
│   │   └── style.css                # Main stylesheet with responsive design
│   │
│   ├── js/
│   │   └── script.js                # Frontend interactions & animations
│   │
│   └── assets/
│       └── images/                  # Product and service images
│
├── server/                          # Backend (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── db.js                    # MongoDB connection setup
│   │
│   ├── models/
│   │   ├── Enquiry.js               # Enquiry data model
│   │   ├── Review.js                # Customer review model
│   │   └── Gallery.js               # Gallery image model
│   │
│   ├── controllers/
│   │   ├── enquiryController.js     # Enquiry business logic
│   │   ├── reviewController.js      # Review business logic
│   │   └── galleryController.js     # Gallery business logic
│   │
│   ├── routes/
│   │   ├── enquiryRoutes.js         # Enquiry API routes
│   │   ├── reviewRoutes.js          # Review API routes
│   │   └── galleryRoutes.js         # Gallery API routes
│   │
│   ├── middleware/
│   │   └── authMiddleware.js        # Admin authentication
│   │
│   ├── uploads/                     # Gallery images storage
│   │
│   ├── server.js                    # Express server setup
│   └── .env                         # Environment variables
│
├── package.json                     # Node.js dependencies
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or MongoDB Atlas)
- Twilio Account (for WhatsApp notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AQUA-PURE-SYSTEM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Edit server/.env with your configuration
   cp server/.env server/.env.local
   # Add your Twilio credentials and MongoDB URI
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

5. **Access the website**
   - Open browser: `http://localhost:5000`
   - API Health Check: `http://localhost:5000/api/health`

---

## 📋 Features

### Frontend Features

#### ✅ Home Page (index.html)
- Hero banner with call-to-action buttons
- Founder profile card with experience badge
- 4 key services showcase with hover effects
- Gallery preview with 3 installation images
- Quick enquiry form
- Contact information card
- Professional footer

#### ✅ Services Page (services.html)
- Detailed service cards for 7 different services:
  - Domestic RO Systems
  - Domestic Water Purifiers
  - Industrial RO Systems
  - Spares & Maintenance Services
  - Installation Services
  - Repair & Replacement
  - AMC (Annual Maintenance Contract)
- "Why Choose Us" highlight section with 4 features
- Consistent design matching home page

#### ✅ About Us Page (about.html)
- Company information and history
- Mission statement
- Founder profile with education details
- 22+ years experience highlight
- Trust indicators and testimonials
- Professional layout

#### ✅ Gallery Page (gallery.html)
- Responsive image grid (3-column desktop, 2-column tablet, 1-column mobile)
- Lightbox modal for image preview
- Hover zoom effects
- Placeholder messages for empty state
- Future API integration ready

#### ✅ Customer Reviews Page (reviews.html)
- Review submission form with validation
- 5-star rating selector
- Customer review display cards
- Helpful/Not Helpful voting system
- Trust indicators and statistics
- Empty state messaging

#### ✅ Contact Page (contact.html)
- Contact information display
- Phone and WhatsApp quick call buttons
- Email address with clickable link
- Business location details
- Google Maps embedded location
- Business hours and trust badges

### Design Features

- **Responsive Design**: Works perfectly on mobile (320px), tablet (768px), and desktop (1920px)
- **Modern UI**: Clean, professional blue-themed design
- **Animations**: Smooth fade-in, slide-in, and hover animations
- **Interactive Elements**: Button ripple effects, card hover states, smooth scrolling
- **Typography**: Poppins for headings, Inter for body text
- **Color Scheme**: Professional blue gradient (#1e3a8a to #3b82f6) with white accents

### Backend API Features

#### Enquiry Management
- **POST /api/enquiry** - Submit new customer enquiry
- **GET /api/enquiry** - Fetch all enquiries (admin protected)
- **GET /api/enquiry/:id** - Get specific enquiry details
- **PUT /api/enquiry/:id** - Update enquiry status
- **DELETE /api/enquiry/:id** - Delete enquiry records
- **WhatsApp Notifications**: Real-time admin notifications via Twilio

#### Review Management
- **POST /api/reviews** - Submit customer review with 1-5 star rating
- **GET /api/reviews** - Get all public approved reviews
- **GET /api/reviews/:id** - Get individual review
- **PUT /api/reviews/:id** - Update review approval status (admin)
- **DELETE /api/reviews/:id** - Delete review (admin)
- **PUT /api/reviews/:id/helpful** - Track helpful votes

#### Gallery Management
- **POST /api/gallery/upload** - Upload image (admin protected, max 5MB)
- **GET /api/gallery** - Get all public gallery images with pagination
- **GET /api/gallery/:id** - Get image with view counter
- **PUT /api/gallery/:id** - Update image metadata (admin)
- **DELETE /api/gallery/:id** - Delete image and file (admin)
- **GET /api/gallery/search/:tag** - Search images by tags
- **GET /api/gallery/stats/overview** - Gallery statistics

---

## 🔐 Authentication & Security

### Admin Authentication
- Simple token-based authentication
- Token passed via `x-admin-token` or `Authorization` header
- Protected routes for admin operations
- CORS protection for API endpoints
- Input validation and sanitization

### Default Admin Token
```
ADMIN_SECRET=admin123
```
⚠️ **Change this in production!**

---

## 📦 Dependencies

### Backend
```json
{
  "express": "Web framework",
  "mongoose": "MongoDB object modeling",
  "cors": "Cross-Origin Resource Sharing",
  "dotenv": "Environment variable management",
  "multer": "File upload handling",
  "twilio": "WhatsApp API integration",
  "helmet": "Security headers",
  "compression": "Response compression"
}
```

### Development
```json
{
  "nodemon": "Auto-reload on file changes",
  "jest": "Testing framework",
  "eslint": "Code linting"
}
```

---

## 🗄️ Database Schema

### Enquiry Model
```javascript
{
  name: String (required),
  phone: String (required, validated),
  service: String (enum: Installation, Maintenance, Repair, AMC),
  message: String (required, max 1000 chars),
  email: String (optional),
  status: String (new, contacted, completed, closed),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Review Model
```javascript
{
  name: String (required),
  email: String (optional),
  rating: Number (1-5, required),
  comment: String (required, max 1000 chars),
  isApproved: Boolean (default: true),
  isPublished: Boolean (default: true),
  serviceType: String (Installation, Maintenance, Repair, AMC, Other),
  helpful: Number (default: 0),
  notHelpful: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Gallery Model
```javascript
{
  imageUrl: String (required),
  fileName: String (required),
  title: String,
  description: String (max 500 chars),
  serviceType: String (Installation, Maintenance, Repair, AMC, Other),
  category: String (Domestic RO, Industrial RO, Water Purifiers, etc),
  tags: [String],
  isActive: Boolean (default: true),
  views: Number (default: 0),
  uploadedBy: String (default: admin),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔗 API Endpoints Reference

### Enquiry API
```
POST   /api/enquiry              - Submit enquiry
GET    /api/enquiry              - Get all (admin)
GET    /api/enquiry/:id          - Get one (admin)
PUT    /api/enquiry/:id          - Update (admin)
DELETE /api/enquiry/:id          - Delete (admin)
```

### Review API
```
POST   /api/reviews              - Submit review
GET    /api/reviews              - Get published reviews
GET    /api/reviews/:id          - Get review details
PUT    /api/reviews/:id/helpful  - Mark helpful
GET    /api/reviews/admin/all    - All reviews (admin)
PUT    /api/reviews/:id          - Update approval (admin)
DELETE /api/reviews/:id          - Delete (admin)
```

### Gallery API
```
POST   /api/gallery/upload       - Upload image (admin)
GET    /api/gallery              - Get all images
GET    /api/gallery/:id          - Get image details
GET    /api/gallery/search/:tag  - Search by tag
PUT    /api/gallery/:id          - Update image (admin)
DELETE /api/gallery/:id          - Delete image (admin)
GET    /api/gallery/stats/overview - Statistics
```

---

## 📝 Environment Configuration

Create `server/.env` file:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/aqua-pure-system

# Security
ADMIN_SECRET=admin123

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
ADMIN_WHATSAPP_NUMBER=whatsapp:+919962647678

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:5000
```

---

## 🧪 Testing the Application

### Test Enquiry Submission
```bash
curl -X POST http://localhost:5000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "service": "Installation",
    "message": "I need to install a water filter"
  }'
```

### Test Review Submission
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "rating": 5,
    "comment": "Excellent service and professional installation!",
    "serviceType": "Installation"
  }'
```

### Test Gallery Upload (Admin)
```bash
curl -X POST http://localhost:5000/api/gallery/upload \
  -H "x-admin-token: admin123" \
  -F "image=@/path/to/image.jpg" \
  -F "title=Installation Work" \
  -F "serviceType=Installation"
```

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

---

## 🎨 Customization Guide

### Change Company Details
Edit contact info in all HTML files:
- Phone: `9962647678`, `9677006923`
- Email: `meenakshishivaraman@gmail.com`
- Address: `No.8, RANI GOPAL COMPLEX, RANIJI NAGAR, MADANANDHAPURAM, CHENNAI -600125`
- Founder: `SIVARAMAN K`

### Change Colors
Edit CSS variables in `client/css/style.css`:
```css
:root {
    --primary-color: #3b82f6;
    --primary-dark: #1e3a8a;
    --primary-light: #dbeafe;
    /* ... more colors ... */
}
```

### Add Real Images
Replace placeholder images in:
- `client/assets/images/` - Product and service images
- Gallery uploads via `/api/gallery/upload`

### Update Service Descriptions
Edit service details in `services.html`

---

## 🚨 Important Notes

### For Production Deployment

1. **Security**
   - Change `ADMIN_SECRET` to a strong random string
   - Use HTTPS instead of HTTP
   - Set `NODE_ENV=production`
   - Use environment-specific `.env` files

2. **Database**
   - Use MongoDB Atlas or managed service
   - Set up automated backups
   - Use database-level authentication

3. **Twilio Setup**
   - Register Twilio account
   - Get WhatsApp Business Account
   - Add admin phone number to approved list

4. **Deployment**
   - Use PM2 or similar for process management
   - Set up reverse proxy (Nginx)
   - Configure domain/SSL certificates
   - Set up CDN for static files

5. **Performance**
   - Enable compression middleware
   - Implement caching strategies
   - Use CDN for images
   - Optimize database queries

---

## 📚 Additional Features (Future Implementation)

- [ ] Admin dashboard for enquiry management
- [ ] Email notifications
- [ ] SMS notifications via Twilio
- [ ] Payment integration (Razorpay/Stripe)
- [ ] Appointment booking system
- [ ] Service level agreements (SLA) tracking
- [ ] Customer communication portal
- [ ] Analytics and reporting
- [ ] Multi-language support
- [ ] SEO optimization

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Install MongoDB or use MongoDB Atlas connection string

### Twilio WhatsApp Error
```
Error: The From number is not a valid WhatsApp number
```
**Solution**: Update `TWILIO_WHATSAPP_NUMBER` and `ADMIN_WHATSAPP_NUMBER` in `.env`

### File Upload Error
```
Error: File size too large
```
**Solution**: Max file size is 5MB. Reduce image size before uploading

### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS
```
**Solution**: Update `CORS_ORIGIN` in `.env` with your domain

---

## 📧 Support & Contact

For issues, suggestions, or support:
- Email: support@aquapuresystem.com
- Phone: 9962647678 / 9677006923
- WhatsApp: Contact form on website

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👥 Team & Contributors

Developed by **AQUA PURE SYSTEM Development Team**

---

## 🙏 Acknowledgments

- Bootstrap 5 for responsive framework
- Poppins & Inter fonts for typography
- Font Awesome for icons
- Twilio for WhatsApp integration
- MongoDB for database management

---

## 📞 Version Information

- **Project**: AQUA PURE SYSTEM Website
- **Version**: 1.0.0
- **Release Date**: 2024
- **Node.js Requirement**: v14+
- **MongoDB**: v4.4+

---

**Last Updated**: March 2, 2026

⭐ If you find this project helpful, please consider giving it a star!
