# 🚀 AQUA PURE SYSTEM - Quick Start Guide

Welcome! This is your complete full-stack website for AQUA PURE SYSTEM water filter services.

---

## 📋 What You Have

### ✅ Frontend (6 Beautiful Pages)
1. **Home Page** - Hero section, services preview, enquiry form
2. **Services Page** - Detailed service descriptions
3. **About Us Page** - Company history and founder profile
4. **Gallery Page** - Installation and service work photos
5. **Customer Reviews Page** - Review submission and ratings
6. **Contact Page** - Contact info and Google Maps location

### ✅ Backend Server (Node.js + Express + MongoDB)
- Enquiry management system with WhatsApp notifications
- Customer review system with ratings
- Gallery image management with admin uploads
- Secure admin authentication
- RESTful API for all operations

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
# Copy the example file
cp server/.env.example server/.env

# Edit server/.env with your:
# - MongoDB connection string
# - Twilio credentials (optional, for WhatsApp)
# - Admin secret token
```

### Step 3: Start the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

### Step 4: Access Your Website
```
🌐 Home:     http://localhost:5000
🔌 API:      http://localhost:5000/api/health
```

---

## 🎯 Next Steps

### 1. Update Business Information
Edit these files to add your actual contact details:
- All `.html` files - Phone, email, address
- Contact details in `footer` sections

### 2. Add Real Images
- Place product images in `client/assets/images/`
- Upload gallery images via `/api/gallery/upload` (requires admin token)

### 3. Set Up WhatsApp Notifications
- Create Twilio account: https://www.twilio.com
- Get WhatsApp Business Account approval
- Add credentials to `server/.env`
- Now admin gets instant WhatsApp alerts for new enquiries!

### 4. Deploy to Server
See README.md for detailed deployment instructions

---

## 📱 Page Locations

```
Frontend Pages:
├── /                  → Home page
├── /index.html        → Home page
├── /services.html     → Services
├── /about.html        → About us
├── /gallery.html      → Gallery
├── /reviews.html      → Reviews
└── /contact.html      → Contact

Backend API:
├── POST   /api/enquiry              → Submit enquiry
├── GET    /api/reviews              → Get reviews
├── POST   /api/gallery/upload       → Upload image (admin)
└── GET    /api/health               → Health check
```

---

## 🔐 Admin Features

### Access Admin Features
Add this header to your API requests:
```
x-admin-token: admin123
```

**⚠️ IMPORTANT**: Change `admin123` to a strong password in `server/.env`

### Available Admin Operations
- View all enquiries
- Update enquiry status
- Upload gallery images
- Approve/reject reviews
- Delete content

---

## 🧪 Test the System

### Test Contact Form
1. Go to home page
2. Fill and submit the enquiry form
3. Check browser console (or your WhatsApp if configured)

### Test Review System
1. Go to `reviews.html`
2. Submit a review with 5-star rating
3. Review appears on page immediately

### Test Gallery Upload (Admin)
```bash
curl -X POST http://localhost:5000/api/gallery/upload \
  -H "x-admin-token: admin123" \
  -F "image=@image.jpg" \
  -F "title=My Installation"
```

---

## 🛠️ Common Tasks

### Change Primary Color
Edit `client/css/style.css`:
```css
:root {
    --primary-color: #3b82f6;  /* Change this color */
}
```

### Update Company Details
Find and replace in all HTML files:
- Old Phone: `9962647678` → Your phone
- Old Email: `meenakshishivaraman@gmail.com` → Your email
- Old Address: Update in footer and contact page

### Add Google Maps
Edit `contact.html` line with embed iframe:
- Go to https://maps.google.com
- Search your location
- Click Share → Embed Map
- Copy the iframe src
- Replace in contact.html

### Enable WhatsApp Notifications
1. Create Twilio account
2. Get API credentials
3. Update `server/.env`:
   ```
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ADMIN_WHATSAPP_NUMBER=whatsapp:+919962647678
   ```

---

## 📊 Database Models

### Enquiry (Auto-saved)
```javascript
{
  name: "Customer Name",
  phone: "9876543210",
  service: "Installation|Maintenance|Repair|AMC",
  message: "Customer message",
  createdAt: "2024-01-01T10:00:00.000Z"
}
```

### Review (Auto-saved)
```javascript
{
  name: "Customer Name",
  rating: 5,
  comment: "Great service!",
  createdAt: "2024-01-01T10:00:00.000Z"
}
```

### Gallery Image
```javascript
{
  imageUrl: "/uploads/gallery-xxxxx.jpg",
  title: "Installation Photo",
  serviceType: "Installation",
  views: 150,
  createdAt: "2024-01-01T10:00:00.000Z"
}
```

---

## 🔍 Troubleshooting

### "Cannot find module 'mongoose'"
```bash
npm install
```

### "MongoDB connection failed"
- Install MongoDB: https://docs.mongodb.com/manual/installation/
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Port 5000 already in use
```bash
# Change port in server/.env
PORT=5001
```

### WhatsApp not sending
- Check Twilio credentials in `.env`
- Verify phone numbers have country code
- Check Twilio account has funds

---

## 📚 Important Files

| File | Purpose |
|------|---------|
| `client/index.html` | Home page |
| `client/css/style.css` | All styling & responsive design |
| `client/js/script.js` | Frontend interactions |
| `server/server.js` | Main backend server |
| `server/.env` | Configuration settings |
| `package.json` | Dependencies list |
| `README.md` | Full documentation |

---

## 🎓 Learning Resources

- **HTML/CSS/JavaScript**: https://developer.mozilla.org/
- **Node.js**: https://nodejs.org/docs/
- **Express.js**: https://expressjs.com/
- **MongoDB**: https://docs.mongodb.com/
- **Bootstrap**: https://getbootstrap.com/
- **Twilio**: https://www.twilio.com/docs/

---

## 🚀 Deployment Ready

This project is production-ready! See README.md for:
- Deployment steps
- Security checklist
- Performance optimization
- Scaling guide

---

## 💬 Need Help?

1. Check README.md for detailed documentation
2. Review code comments in backend files
3. Check Twilio/MongoDB documentation
4. Contact AQUA PURE SYSTEM team

---

## ✨ Features Included

✅ 6 Full HTML Pages
✅ Responsive Mobile Design
✅ Professional CSS Styling
✅ Interactive JavaScript
✅ Express.js Backend
✅ MongoDB Database
✅ File Upload System
✅ Admin Authentication
✅ WhatsApp Integration
✅ Email-ready Structure
✅ API Documentation
✅ Error Handling
✅ Security Middleware
✅ Production Ready

---

## 🎉 You're All Set!

Your complete full-stack website is ready to use. Start with the quick start above, customize with your details, and launch!

**Happy coding! 🚀**

---

**Version**: 1.0.0
**Last Updated**: March 2, 2026
**Status**: Production Ready ✅
