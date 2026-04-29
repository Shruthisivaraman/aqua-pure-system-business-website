# AQUA PURE SYSTEM - Assets Directory

This directory contains image assets for the AQUA PURE SYSTEM website.

## Required Images

Please add the following images to this directory for the website to display correctly:

### 1. **logo.png** (REQUIRED)
- **Purpose**: Company logo displayed in the navbar
- **Recommended Size**: 40px height (auto-scaled width)
- **Format**: PNG with transparent background preferred
- **Location**: Used in all page navbars
- **Description**: Your company/business logo - typically includes the company name, icon, or both

### 2. **hero-image.jpg** (RECOMMENDED)
- **Purpose**: Main hero/banner image on the homepage
- **Recommended Size**: 500px × 450px or larger (responsive)
- **Format**: JPG/JPEG (can use PNG if needed)
- **Location**: Homepage hero section (right side)
- **Description**: High-quality image of your water purification system, RO system, or water purifier product in action

### 3. **founder.jpg** (RECOMMENDED)
- **Purpose**: Founder/Owner profile photo
- **Recommended Size**: 300px × 400px or similar portrait ratio
- **Format**: JPG/JPEG (can use PNG if needed)
- **Location**: 
  - About page (right side founder card)
  - Homepage (Left side of About Founder section) - as a fallback preview
- **Description**: Professional photo of the business founder/owner, SIVARAMAN K

## Implementation Notes

1. **Image Fallbacks**: The website is designed with image fallback functionality. If any image fails to load, a placeholder icon will display with instructions.

2. **File Naming**: 
   - Use exactly the filenames specified above (case-sensitive on Linux/Mac)
   - Windows is not case-sensitive, but it's good practice

3. **Image Quality**: 
   - Ensure images are properly compressed to keep file sizes small
   - For JPG: Use quality 80-90% for good balance
   - For PNG: Use PNG compression tools to reduce file size

4. **Responsive Design**: 
   - Images use `object-fit: cover` for proper scaling on all screen sizes
   - Images will adapt to mobile, tablet, and desktop screens automatically

5. **Admin Gallery Images**:
   - The admin panel allows uploading additional gallery images
   - These are uploaded via `/api/gallery/upload` endpoint
   - Gallery images are displayed in `/gallery.html`

## Image Placement Examples

### Logo in Navbar
```html
<img src="assets/logo.png" alt="AQUA PURE SYSTEM Logo" class="me-2" style="height: 40px;">
```

### Hero Image (Homepage)
```html
<img src="assets/hero-image.jpg" alt="Water Purifier System" style="height: 450px; object-fit: cover;">
```

### Founder Photo
```html
<img src="assets/founder.jpg" alt="Sivaraman K - Founder" style="object-fit: cover;">
```

## Admin Panel Image Upload

To upload additional gallery images:

1. Go to: `admin-login.html`
   - Username: `admin` or `admin@aquapure.com`
   - Password: `admin123`

2. After login, access: `admin-gallery.html`
   - Upload images with titles, descriptions, and categories
   - Maximum file size: 5MB per image
   - Supported formats: JPG, PNG, GIF, WebP, etc.

## Troubleshooting

If images don't display:

1. **Check file names**: Ensure filenames match exactly (case-sensitive on some systems)
2. **Check file path**: Ensure images are in the `/client/assets/` directory
3. **Check console**: Open browser DevTools (F12) → Console tab for any error messages
4. **Clear cache**: Web browsers may cache old versions of images
   - Try Ctrl+Shift+Delete (or your browser's cache clear command)

## SEO & Accessibility

All images include proper `alt` attributes for:
- Search engine optimization (SEO)
- Accessibility for screen readers
- Better user experience when images don't load

## Future Enhancements

Consider adding:
- Certificate/Award images
- Team photos
- Project before/after images
- Custom icons or illustrations
- Background images for sections

---

Last Updated: 2024
For assistance with images, contact: meenakshishivaraman@gmail.com
