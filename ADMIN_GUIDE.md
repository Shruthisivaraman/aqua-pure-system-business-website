# AQUA PURE SYSTEM - Admin Panel Guide

## Quick Start Guide for Admin Features

### Accessing the Admin Panel

#### Step 1: Go to Admin Login
Open your browser and navigate to:
```
http://localhost:3000/admin-login.html
```

Or from any page, you can manually navigate by typing the URL in the address bar.

---

### Step 2: Login with Admin Credentials

**Demo Credentials:**
```
Username: admin
OR
Email: admin@aquapure.com

Password: admin123
```

**Note**: These are demo credentials for testing. For production, implement proper authentication:
1. Create backend endpoint at `/api/auth/admin-login`
2. Verify credentials against database
3. Return JWT token or session cookie
4. Update the login form to use your backend

---

### Step 3: Access Gallery Management

After successful login, you'll be redirected to:
```
http://localhost:3000/admin-gallery.html
```

You'll see:
- **Admin username** displayed in the top-right navbar
- **Logout button** to exit admin panel
- **Upload form** for adding new gallery images
- **Gallery grid** showing all uploaded images

---

## 📸 Uploading Gallery Images

### Form Fields

1. **Image Title** (Required)
   - Example: "RO Water Purifier Installation - Kitchen"
   - Keep it descriptive and customer-friendly

2. **Service Type** (Required)
   - Options:
     - RO Water Purifier
     - Non-Electric Purifier
     - Installation Service
     - Maintenance & Repair
     - Other

3. **Category** (Optional)
   - Examples: "Residential", "Commercial", "Before-After", "New Installation"
   - Use consistent naming for filtering and organization

4. **Tags** (Optional)
   - Comma-separated keywords: "kitchen, natural light, quality installation"
   - Helps with searchability and organization

5. **Description** (Optional)
   - Detailed text about the image (60 character preview shown in gallery)
   - Example: "Professional RO system installation with TDS meter display..."

6. **Image File** (Required)
   - Supported formats: JPG, PNG, GIF, WebP
   - Maximum file size: 5MB
   - Recommended size: 800px × 600px to 1200px × 800px

### Upload Process

1. **Click "Click to select or drag & drop image"**
   - Select from file browser OR
   - Drag-and-drop an image file into the box

2. **Image Preview Appears**
   - See your selected image before uploading
   - Verify it looks correct

3. **Fill in Image Details**
   - Title (required)
   - Service Type (required)
   - Category, tags, description (optional)

4. **Click "Upload Image" Button**
   - You'll see a loading overlay
   - Wait for upload to complete

5. **Success Message Appears**
   - ✓ Image uploaded successfully!
   - Form resets for next image
   - New image appears in gallery below

---

## 🖼️ Managing Uploaded Images

### Viewing Uploaded Images

Your uploaded images appear in the **Uploaded Images** section below the upload form.

Each image card shows:
- **Thumbnail** of the image
- **Title** of the image
- **Service Type** tag
- **Category** (if provided)
- **Description preview** (first 60 characters)
- **Edit** button (placeholder)
- **Delete** button

### Viewing Full Gallery

To see how your images appear to customers:
1. Go to: `http://localhost:3000/gallery.html`
2. Your uploaded images will appear in the gallery grid
3. Customers can view service types, categories, and full details

### Editing Images

The **Edit** button is a placeholder for future functionality. To edit:
1. Delete the current image
2. Upload a new version with updated details

### Deleting Images

1. Click the **Delete** button on any image
2. Confirm deletion in the popup dialog
3. Image is removed from database
4. Gallery refreshes automatically

---

## 🔒 Security Features

### Authentication
- Uses browser localStorage for session management
- Admin token stored locally and sent with each request
- `x-admin-token` header used for API authentication

### File Validation
- **File size limit**: 5MB per image
- **File type validation**: Only image formats allowed
- **Server-side validation**: Backend also validates uploads

### Best Practices
1. **Don't share credentials**: Keep admin passwords secure
2. **Log out after use**: Click Logout button when done
3. **Clear history**: On shared computers, clear browser history
4. **Use HTTPS**: On production, always use encrypted HTTPS
5. **Change demo password**: Update `admin123` for production

---

## 🐛 Troubleshooting

### Issue: Login Page Shows Error
**Solution**: 
- Check username and password (case-sensitive)
- Ensure localStorage is enabled in browser
- Try clearing browser cache and reload
- Check browser console (F12) for error messages

### Issue: Upload Fails with "File Size Must Not Exceed 5MB"
**Solution**:
- Compress your image before uploading
- Use online tools: TinyPNG.com, ImageOptim, etc.
- Recommended size: 800-1000px width
- JPG compression: 80-85% quality is sufficient

### Issue: Image Not Showing in Gallery After Upload
**Solution**:
- Check backend `/api/gallery` endpoint is working
- Verify database connection to MongoDB
- Check `/server/uploads` directory has image file
- Review browser console for API errors
- Try refreshing the page manually

### Issue: Can't Access Admin Page (Redirect to Login)
**Solution**:
- You must be logged in to access admin-gallery.html
- Go to admin-login.html first
- Use demo credentials (admin / admin123)
- Check localStorage token: Open DevTools → Application → Local Storage

### Issue: Edit Button Not Working
**Solution**:
- Edit functionality is coming soon (placeholder)
- For now, use Delete → Re-upload workflow

---

## 📊 Admin Dashboard Statistics

### Current Features
- Total images uploaded (count in gallery grid)
- Service type distribution (visible in image cards)
- Upload history (by date added)

### Future Enhancements
- View counter per image
- User interaction analytics
- Image performance metrics
- Bulk upload functionality
- Advanced image editing

---

## 🔗 Navigation Links

### From Admin Gallery Page
- **Home**: Click "Home" in sidebar or menu
- **Gallery (Customer View)**: `/gallery.html`
- **Logout**: Click "Logout" button (top-right navbar)

### From Other Pages
- **Admin Login**: `/admin-login.html`
- **Admin Gallery**: `/admin-gallery.html` (requires login)

---

## 🛠️ Backend Integration Notes

### API Endpoints Used

#### Upload Image
```
POST /api/gallery/upload
Headers: { 'x-admin-token': token }
Body: FormData with file + metadata
Response: { success: true, data: { imageId, imageUrl, ... } }
```

#### Get All Images
```
GET /api/gallery
Headers: { 'x-admin-token': token }
Response: [ { _id, imageUrl, title, serviceType, ... }, ... ]
```

#### Delete Image
```
DELETE /api/gallery/:id
Headers: { 'x-admin-token': token }
Response: { success: true, message: "Image deleted" }
```

### Backend Requirements
- Express.js server with `/api/` routes
- MongoDB database with Gallery model
- Multer middleware for file uploads
- Auth middleware checking `x-admin-token` header
- Image storage at `/server/uploads` directory

---

## 📱 Mobile Usage

The admin panel is fully responsive and works on:
- **Desktop**: All features available
- **Tablet**: Touch-friendly buttons, scrollable gallery
- **Mobile**: Single-column layout, optimized forms

### Mobile Tips
1. Use portrait orientation for better form layout
2. Tap and hold to drag-drop images (if supported)
3. Use file picker dialog to select images
4. Scroll to see all gallery images

---

## ⚙️ Advanced Configuration

### Change Demo Credentials
Edit `admin-login.html` line ~180:
```javascript
if ((username === 'admin' || username === 'admin@aquapure.com') && password === 'admin123') {
```

Replace with your actual credentials or API call.

### Change API Endpoints
In `admin-gallery.html`, find these API calls:
```javascript
fetch('/api/gallery/upload', ...)
fetch('/api/gallery', ...)
fetch(`/api/gallery/${imageId}`, ...)
```

Update URLs if your backend uses different paths.

### Adjust Upload File Size Limit
- Frontend max: 5MB (hardcoded in validation)
- Backend max: Configure in Multer (default ~50MB)
- Edit `/server/routes/galleryRoutes.js` for backend limit

---

## 📞 Support & Help

For issues or questions:
1. Check this guide for troubleshooting
2. Review `/client/assets/README.md` for image specifications
3. Check `/UPDATES_SUMMARY.md` for implementation details
4. Open browser DevTools (F12) → Console for error messages
5. Review server logs for API errors

---

## Quick Command Reference

| Task | Action |
|------|--------|
| Access Admin Panel | Go to `/admin-login.html` |
| Upload Image | Fill form + click "Upload Image" |
| View Gallery | Go to `/gallery.html` |
| Edit Image | Delete old, upload new |
| Delete Image | Click "Delete" button on image |
| Logout | Click "Logout" button |
| Check Uploads | Look in server `/uploads` directory |

---

**Created**: 2024
**Status**: Production Ready
**Version**: 2.1
