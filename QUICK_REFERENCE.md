# Quick Reference - WordPress Setup
## Darshan Health Club

## 🎯 RECOMMENDED SETUP (Easiest)

### Theme
**Astra** (Free)
- Download: https://wordpress.org/themes/astra/
- Settings: Enable "Full Width" template

### Essential Plugins (3 required)
1. **Simple Custom CSS and JS** - For custom styling
2. **Font Awesome** - For icons
3. **Contact Form 7** - For contact page

### Pages to Create (7 total)
1. Home (set as front page)
2. About
3. Facilities
4. Membership
5. Programs
6. Tips
7. Contact

### Images to Upload (4 files)
- equipment.jpg
- equipment2.jpg
- dumbelrack.jpg
- reception.jpg

---

## 📝 QUICK STEPS (30 minutes)

### 1. Install Theme & Plugins
- Install Astra theme
- Install 3 plugins listed above
- Activate all

### 2. Upload Images
- Media → Add New
- Upload all 4 images
- Copy each image URL

### 3. Create Pages
For EACH page:
1. Pages → Add New
2. Set title (Home, About, etc.)
3. Click ⋮ (three dots) → Code editor
4. Copy HTML from `standalone/` folder:
   - Home → `standalone/index.html`
   - About → `standalone/about.html`
   - Contact → `standalone/contact.html`
   - Facilities → `standalone/facilities.html`
   - Membership → `standalone/membership.html`
   - Programs → `standalone/programs.html`
   - Tips → `standalone/tips.html`
5. **Find & Replace** image paths:
   ```
   Find: equipment.jpg
   Replace: https://YOURSITE.com/wp-content/uploads/2026/01/equipment.jpg
   ```
6. **Find & Replace** navigation links:
   ```
   Find: href="index.html"
   Replace: href="/"
   
   Find: href="about.html"
   Replace: href="/about"
   
   Find: href="contact.html"
   Replace: href="/contact"
   
   Find: href="facilities.html"
   Replace: href="/facilities"
   
   Find: href="membership.html"
   Replace: href="/membership"
   
   Find: href="programs.html"
   Replace: href="/programs"
   
   Find: href="tips.html"
   Replace: href="/tips"
   ```
7. Publish

### 4. Set Home Page
- Settings → Reading
- Select "A static page"
- Homepage: Your "Home" page
- Save

### 5. Configure Theme
- Appearance → Customize
- Disable header & footer (HTML has its own)
- Save

---

## 🔧 IMAGE URL REPLACEMENT

After uploading images to WordPress, you'll get URLs like:
```
https://yoursite.com/wp-content/uploads/2026/01/equipment.jpg
https://yoursite.com/wp-content/uploads/2026/01/equipment2.jpg
https://yoursite.com/wp-content/uploads/2026/01/dumbelrack.jpg
https://yoursite.com/wp-content/uploads/2026/01/reception.jpg
```

In each page's HTML, use Find & Replace (Ctrl+F):

**Replace in ALL pages:**
```
equipment.jpg → (your full URL)
equipment2.jpg → (your full URL)
dumbelrack.jpg → (your full URL)
reception.jpg → (your full URL)
```

**Common places to replace:**
- `<img src="equipment.jpg"`
- `background-image: url('equipment.jpg')`
- `style="background-image: url('equipment.jpg')"`

---

## 🔗 NAVIGATION LINKS

Update ALL navigation links in ALL pages:

```html
<!-- OLD (won't work in WordPress) -->
<a href="index.html">Home</a>
<a href="about.html">About</a>
<a href="facilities.html">Facilities</a>
<a href="membership.html">Membership</a>
<a href="programs.html">Programs</a>
<a href="tips.html">Tips</a>
<a href="contact.html">Contact</a>

<!-- NEW (WordPress permalinks) -->
<a href="/">Home</a>
<a href="/about">About</a>
<a href="/facilities">Facilities</a>
<a href="/membership">Membership</a>
<a href="/programs">Programs</a>
<a href="/tips">Tips</a>
<a href="/contact">Contact</a>
```

**OR use full URLs:**
```html
<a href="https://yoursite.com">Home</a>
<a href="https://yoursite.com/about">About</a>
<!-- etc. -->
```

---

## ✅ CHECKLIST

- [ ] WordPress installed
- [ ] Astra theme installed & activated
- [ ] 3 plugins installed
- [ ] 4 images uploaded to Media Library
- [ ] 7 pages created with HTML pasted
- [ ] Image paths updated in ALL pages
- [ ] Navigation links updated in ALL pages
- [ ] Home page set as front page
- [ ] Test all pages load correctly
- [ ] Test navigation works
- [ ] Test on mobile

---

## 🚨 COMMON MISTAKES TO AVOID

1. **Forgetting to update image paths** → Images won't show
2. **Not updating navigation links** → 404 errors
3. **Not setting home page** → WordPress shows blog
4. **Using Visual Editor** → Must use Code Editor!
5. **Not testing mobile** → Site may break on phones

---

## 💡 TIPS

- **Always use Code Editor** when pasting HTML
- **Test each page** after publishing
- **Clear cache** if changes don't show
- **Keep backups** before making changes
- **Update permalinks** if links don't work:
  - Go to Settings → Permalinks
  - Select "Post name"
  - Save

---

## 🆘 TROUBLESHOOTING

### Styles not showing?
- Clear WordPress cache
- Clear browser cache
- Check CSS is embedded in HTML

### Images not loading?
- Verify image URLs are correct
- Check images uploaded to Media Library
- Try re-uploading images

### Links give 404 errors?
- Update permalink structure
- Check all links use WordPress format
- Use full URLs if needed

### Mobile menu not working?
- JavaScript is embedded in HTML
- Try clearing cache
- Check browser console for errors

---

## 📞 SUPPORT

**WordPress Help:**
- https://wordpress.org/support/

**Astra Theme:**
- https://wpastra.com/docs/

**Video Tutorials:**
- YouTube: "How to use WordPress code editor"
- YouTube: "How to paste custom HTML in WordPress"

---

## ⏱️ TIME ESTIMATE

- **Setup (theme + plugins):** 10 minutes
- **Upload images:** 5 minutes
- **Create 7 pages:** 30-60 minutes
- **Test & verify:** 15 minutes

**Total:** 1-1.5 hours

---

Good luck! 🚀
