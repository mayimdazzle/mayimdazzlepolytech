# 📄 Mayim Dazzle Polytech PDF Brochure Generator

This project generates a multi-page, visually styled PDF brochure for **Mayim Dazzle Polytech**, a subsidiary of MayimDazzle India Private Limited, using the [`jsPDF`](https://github.com/parallax/jsPDF) JavaScript library.

## ✨ Features

- Custom cover page with logo, title, tagline, and decorative elements
- Detailed product information page for EPDM Rubber Granules
- Available color samples represented as colored circles
- Company history and contact information section
- Fully programmatic and customizable layout
- Supports async image loading with CORS-safe Base64 conversion

---

## 📦 Tech Stack

- **TypeScript**
- **jsPDF**
- **HTML5 Canvas** for image processing

---

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/polytech-brochure-generator.git
cd polytech-brochure-generator
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Folder Structure

```
public/
  └── logo.png            # Company logo for the cover page

src/
  └── brochure.ts         # Main brochure generation logic
```

### 4. Run the Generator

Import and invoke the generator function in your frontend app (e.g. a React component or a button click handler):

```ts
import { generateCompanyBrochure } from './brochure';

generateCompanyBrochure();
```

---

## 📸 Brochure Preview

**Pages:**

1. **Cover** – Logo, title, subtitle, contact
2. **Product Details** – EPDM granules, features, applications, colors
3. **Company Info** – History, highlights, contact block

---

## 🔧 Troubleshooting

* **CORS Issue for Logo:** Make sure `logo.png` is in the `public/` folder so it loads properly with CORS enabled.
* **Canvas Context Null:** The project safely checks for `null` context, but ensure browser supports `<canvas>` fully.

---

## 📁 License

This project is licensed under the **MIT License**. Feel free to use, modify, or distribute.

---

## 👥 Author

**Dazzle Organic / Mayim Dazzle Polytech**
Website: [mayimdazzle.com](https://mayimdazzle.com)
Contact: [info@polytech.mayimdazzle.com](mailto:info@polytech.mayimdazzle.com)

---
