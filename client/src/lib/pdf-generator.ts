import { jsPDF } from "jspdf";

// --- 1. ASSET LOADING HELPERS ---

const loadLogo = (src: string): Promise<string> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) { reject(new Error("Failed to get canvas context")); return; }
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = () => reject(new Error(`Failed to load logo: ${src}`));
        img.src = src;
    });

const loadImage = (src: string): Promise<string> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            // Resize extremely large images to prevent PDF bloat
            const maxDim = 1500;
            let width = img.width;
            let height = img.height;
            if (width > maxDim || height > maxDim) {
                if (width > height) {
                    height *= maxDim / width;
                    width = maxDim;
                } else {
                    width *= maxDim / height;
                    height = maxDim;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("Canvas context failed"));
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.8)); // Compress slightly
        };
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });

// --- 2. MAIN GENERATOR FUNCTION ---

export const generateCompanyBrochure = async (): Promise<void> => {
    try {
        // --- A. LOAD ASSETS ---
        const logo = await loadLogo("/logo.png");

        // Featured Project: Wonderla
        const wonderlaPaths = [
            "/Wonderla Site Project/IMG-20251009-WA0006.jpg", // Hero
            "/Wonderla Site Project/IMG-20251009-WA0008.jpg",
            "/Wonderla Site Project/IMG-20251009-WA0016.jpg",
            "/Wonderla Site Project/IMG-20251011-WA0002.jpg",
            "/Wonderla Site Project/IMG-20251011-WA0004.jpg"
        ];

        // Site Operations (Process)
        const processPaths = [
            "/Wonderla Site Project/WhatsApp Image 2025-10-12 at 13.56.11_715da06b.jpg", // Mixing
            "/Wonderla Site Project/WhatsApp Image 2025-10-12 at 13.56.12_a53513df.jpg", // Raw Material
            "/Wonderla Site Project/WhatsApp Image 2025-10-13 at 14.00.46_f0f5a169.jpg", // Laying
            "/installation.jpg" // Finished/Worker
        ];

        // Core Assets
        const [
            epdmTile, colorGrid, colorJars,
            labInterior, labDurometer, 
            sampleStrips, epdmSheet, 
            gym, playground, court, 
            certificationsImg, factoryExt
        ] = await Promise.all([
            loadImage("/epdm-tile.jpg"),
            loadImage("/color-grid.jpg"),
            loadImage("/color-jars.jpg"),
            loadImage("/lab-interior.jpg"),
            loadImage("/lab-durometer.jpg"),
            loadImage("/sample-strips.jpg"),
            loadImage("/blue-sheet.jpg"),
            loadImage("/gym.jpg"),
            loadImage("/playground.jpg"),
            loadImage("/court.jpg"),
            loadImage("/certifications and awards.jpg"),
            loadImage("/donga.jpg")
        ]);

        const wonderlaImages = await Promise.all(wonderlaPaths.map(src => loadImage(src)));
        const processImages = await Promise.all(processPaths.map(src => loadImage(src)));

        // --- B. PDF SETUP ---
        const pdf = new jsPDF('p', 'mm', 'a4');
        const W = 210;
        const H = 297;
        const margin = 15;

        // Brand Colors
        const colBlue: [number, number, number] = [15, 23, 42];   // Slate 950 (Dark Blue)
        const colAccent: [number, number, number] = [245, 158, 11]; // Amber 500
        const colGray: [number, number, number] = [241, 245, 249]; // Slate 100
        const colText: [number, number, number] = [51, 65, 85];    // Slate 700

        // --- C. HELPER FUNCTIONS ---

        // 1. Stylish Header
        const drawHeader = (title: string, subtitle?: string) => {
            // Top colored bar
            pdf.setFillColor(...colBlue);
            pdf.rect(0, 0, W, 4, 'F');
            pdf.setFillColor(...colAccent);
            pdf.rect(0, 4, W, 1, 'F');

            // Title
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(22);
            pdf.setTextColor(...colBlue);
            pdf.text(title.toUpperCase(), margin, 20);

            if (subtitle) {
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(10);
                pdf.setTextColor(100, 100, 100);
                pdf.text(subtitle, margin, 26);
            }

            // Logo on right
            pdf.addImage(logo, 'PNG', W - 30, 10, 15, 15);
        };

        // 2. Footer with page number
        const drawFooter = (pageNo: number) => {
            pdf.setFillColor(245, 245, 245);
            pdf.rect(0, H - 15, W, 15, 'F');
            
            pdf.setFontSize(8);
            pdf.setTextColor(100, 100, 100);
            pdf.text("Mayim Dazzle Poly Tech | www.polytech.mayimdazzle.com", margin, H - 6);
            pdf.text(`Page ${pageNo}`, W - margin, H - 6, { align: 'right' });
        };

        // 3. Section Title Bar
        const drawSectionTitle = (text: string, y: number) => {
            pdf.setFillColor(...colBlue);
            pdf.rect(margin, y, 1.5, 8, 'F'); // Vertical accent bar
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(14);
            pdf.setTextColor(...colBlue);
            pdf.text(text, margin + 5, y + 6);
            return y + 15;
        };

        // --- D. PAGE GENERATION ---

        // === PAGE 1: COVER ===
        // Full bleed background
        pdf.addImage(playground, 'JPEG', 0, 0, W, H);
        
        // Dark Overlay
        pdf.setFillColor(15, 23, 42); // Blue-Black
        pdf.saveGraphicsState();
        pdf.setGState(pdf.GState({ opacity: 0.85 }));
        pdf.rect(0, 0, W, H, 'F');
        pdf.restoreGraphicsState();

        // Decorative Shapes
        pdf.setFillColor(...colAccent);
        pdf.circle(W, 0, 80, 'F'); // Top right corner
        pdf.setDrawColor(255, 255, 255);
        pdf.setLineWidth(1);
        pdf.line(margin, H - 40, W - margin, H - 40);

        // Logo & Branding
        pdf.addImage(logo, 'PNG', (W/2) - 25, 60, 50, 50);
        
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(32);
        pdf.text("PREMIUM EPDM", W/2, 130, { align: 'center' });
        pdf.text("RUBBER GRANULES", W/2, 145, { align: 'center' });

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(14);
        pdf.setTextColor(200, 200, 200);
        pdf.text("Manufacturing Excellence Since 2003", W/2, 160, { align: 'center' });

        pdf.setFillColor(...colAccent);
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.roundedRect((W/2) - 40, 175, 80, 10, 5, 5, 'F');
        pdf.text("COMPANY PROFILE 2025", W/2, 181, { align: 'center' });

        // Bottom Info
        pdf.setTextColor(255, 255, 255);
        pdf.text("www.polytech.mayimdazzle.com", W/2, H - 25, { align: 'center' });

        // === PAGE 2: ABOUT & SPECS ===
        pdf.addPage();
        drawHeader("Company Profile", "Innovating Sports & Safety Surfaces");

        // Intro Text
        let y = 40;
        pdf.setFontSize(10);
        pdf.setTextColor(...colText);
        const intro = "Mayim Dazzle Poly Tech is the industrial manufacturing arm of MayimDazzle India Pvt Ltd. With over 20 years of expertise, we specialize in high-grade EPDM granules that set the industry standard for color consistency, UV resistance, and durability.";
        const splitIntro = pdf.splitTextToSize(intro, W - (margin * 2));
        pdf.text(splitIntro, margin, y);
        y += 25;

        // Image strip (Factory/Lab)
        pdf.addImage(factoryExt, 'JPEG', margin, y, 55, 35);
        pdf.addImage(labInterior, 'JPEG', margin + 60, y, 55, 35);
        pdf.addImage(colorJars, 'JPEG', margin + 120, y, 55, 35);
        y += 45;

        // Technical Data Sheet (Table)
        y = drawSectionTitle("Technical Specifications", y);
        
        const headers = ["Property", "Test Method", "Typical Value"];
        const data = [
            ["Hardness", "ASTM D2240", "60 ± 5 Shore A"],
            ["Density", "ASTM D792", "1.60 ± 0.05 g/cm³"],
            ["Polymer Content", "TGA Analysis", "> 20% / > 22%"],
            ["Tensile Strength", "ASTM D412", "> 4.0 Mpa"],
            ["Elongation at Break", "ASTM D412", "> 400%"],
            ["UV Resistance", "ASTM G154", "No Chalking (2000 hrs)"]
        ];

        // Draw Table Header
        pdf.setFillColor(...colBlue);
        pdf.rect(margin, y, W - (margin * 2), 8, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.text(headers[0], margin + 5, y + 5);
        pdf.text(headers[1], margin + 70, y + 5);
        pdf.text(headers[2], margin + 130, y + 5);
        y += 8;

        // Draw Table Rows
        pdf.setTextColor(...colText);
        pdf.setFont("helvetica", "normal");
        data.forEach((row, i) => {
            if (i % 2 === 0) pdf.setFillColor(...colGray);
            else pdf.setFillColor(255, 255, 255);
            
            pdf.rect(margin, y, W - (margin * 2), 7, 'F');
            pdf.text(row[0], margin + 5, y + 5);
            pdf.text(row[1], margin + 70, y + 5);
            pdf.text(row[2], margin + 130, y + 5);
            y += 7;
        });
        y += 10;

        // Key Features
        y = drawSectionTitle("Why Choose Us?", y);
        const features = [
            "✔ NABL Accredited Laboratory Testing",
            "✔ 100% Virgin Rubber Base (No Recycle)",
            "✔ Peroxide & Sulphur Cured Options",
            "✔ Custom Size Grading (0.5-1.5mm to 1-4mm)"
        ];
        pdf.setFontSize(10);
        pdf.setTextColor(...colText);
        features.forEach(f => {
            pdf.text(f, margin + 5, y);
            y += 6;
        });

        drawFooter(2);

        // === PAGE 3: PRODUCT GALLERY ===
        pdf.addPage();
        drawHeader("Product Portfolio", "Vibrant Colors & Premium Quality");
        
        y = 40;
        // Big Feature Image
        pdf.addImage(colorGrid, 'JPEG', margin, y, W - (margin*2), 70);
        
        // Label
        pdf.setFillColor(0, 0, 0); 
        pdf.rect(margin, y + 60, 40, 10, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.text("Standard Colors", margin + 5, y + 66);
        y += 80;

        // 2x2 Grid of details
        const gridH = 55;
        const gridW = (W - (margin * 2) - 10) / 2;
        
        pdf.addImage(sampleStrips, 'JPEG', margin, y, gridW, gridH);
        pdf.addImage(epdmSheet, 'JPEG', margin + gridW + 10, y, gridW, gridH);
        
        pdf.setFontSize(9);
        pdf.setTextColor(0, 0, 0);
        pdf.text("Custom Color Matching", margin, y + gridH + 5);
        pdf.text("EPDM Rolls & Sheets", margin + gridW + 10, y + gridH + 5);
        y += gridH + 15;

        pdf.addImage(epdmTile, 'JPEG', margin, y, gridW, gridH);
        pdf.addImage(labDurometer, 'JPEG', margin + gridW + 10, y, gridW, gridH);

        pdf.text("Interlocking Tiles", margin, y + gridH + 5);
        pdf.text("Quality Testing (Hardness)", margin + gridW + 10, y + gridH + 5);

        drawFooter(3);

        // === PAGE 4: INSTALLATION PROCESS ===
        pdf.addPage();
        drawHeader("Installation Methodology", "Professional Application Steps");
        
        y = 40;
        const steps = [
            { img: processPaths[1], title: "1. Material Prep", desc: "Segregating high-quality granules and PU binder." },
            { img: processPaths[0], title: "2. Mixing", desc: "Precise ratio mixing in automated drums." },
            { img: processPaths[2], title: "3. Laying & Screeding", desc: "Uniform spreading and leveling of the surface." },
            { img: processPaths[3], title: "4. Finishing", desc: "Compaction and curing for 24-48 hours." }
        ];

        steps.forEach((step, i) => {
            // Alternating layout
            const imgSize = 50;
            const yPos = y + (i * 55);
            
            // Image Box
            if (processImages[i]) {
                pdf.setDrawColor(...colAccent);
                pdf.setLineWidth(0.5);
                pdf.rect(margin, yPos, imgSize, imgSize); // Frame
                pdf.addImage(processImages[i], 'JPEG', margin + 1, yPos + 1, imgSize - 2, imgSize - 2);
            }

            // Text
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12);
            pdf.setTextColor(...colBlue);
            pdf.text(step.title, margin + imgSize + 10, yPos + 15);
            
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.setTextColor(...colText);
            pdf.text(step.desc, margin + imgSize + 10, yPos + 25);

            // Connector Line (except last)
            if (i < steps.length - 1) {
                pdf.setDrawColor(200, 200, 200);
                pdf.setLineWidth(1);
                pdf.setLineDashPattern([2, 2], 0);
                pdf.line(margin + (imgSize/2), yPos + imgSize + 2, margin + (imgSize/2), yPos + imgSize + 8);
                pdf.setLineDashPattern([], 0);
            }
        });

        drawFooter(4);

        // === PAGE 5: FEATURED PROJECT (WONDERLA) ===
        pdf.addPage();
        drawHeader("Featured Project", "Wonderla Amusement Parks");

        y = 40;
        // Hero Image
        if (wonderlaImages[0]) {
            pdf.addImage(wonderlaImages[0], 'JPEG', margin, y, W - (margin*2), 80);
            // Caption overlay
            pdf.setFillColor(...colAccent);
            pdf.rect(W - margin - 50, y + 70, 50, 10, 'F');
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "bold");
            pdf.text("Safety Flooring Zone", W - margin - 45, y + 76);
        }
        y += 90;

        pdf.setFontSize(11);
        pdf.setTextColor(...colText);
        pdf.setFont("helvetica", "normal");
        const wDesc = "We are proud to be the flooring partner for Wonderla, providing high-impact safety surfaces for their water parks and dry rides. Our surfaces ensure slip resistance and fall protection for thousands of daily visitors.";
        pdf.text(pdf.splitTextToSize(wDesc, W - (margin*2)), margin, y);
        y += 25;

        // Mosaic of other Wonderla images
        const wGridSize = (W - (margin * 2) - 5) / 2;
        if (wonderlaImages[1]) pdf.addImage(wonderlaImages[1], 'JPEG', margin, y, wGridSize, 50);
        if (wonderlaImages[2]) pdf.addImage(wonderlaImages[2], 'JPEG', margin + wGridSize + 5, y, wGridSize, 50);
        y += 55;
        if (wonderlaImages[3]) pdf.addImage(wonderlaImages[3], 'JPEG', margin, y, wGridSize, 50);
        if (wonderlaImages[4]) pdf.addImage(wonderlaImages[4], 'JPEG', margin + wGridSize + 5, y, wGridSize, 50);

        drawFooter(5);

        // === PAGE 6: APPLICATIONS & CERTIFICATIONS ===
        pdf.addPage();
        drawHeader("Applications", "Versatile Solutions");

        y = 40;
        const apps = [
            { img: gym, label: "Professional Gyms" },
            { img: court, label: "Basketball/Tennis Courts" },
            { img: playground, label: "Kids Play Areas" }
        ];

        // 3-Column Layout
        const appW = (W - (margin*2) - 10) / 3;
        apps.forEach((app, i) => {
            const xPos = margin + (i * (appW + 5));
            pdf.addImage(app.img, 'JPEG', xPos, y, appW, 40);
            pdf.setFontSize(9);
            pdf.setTextColor(...colBlue);
            pdf.setFont("helvetica", "bold");
            pdf.text(app.label, xPos + (appW/2), y + 45, { align: 'center' });
        });

        y += 60;
        
        // Certifications
        y = drawSectionTitle("Quality Assurance", y);
        pdf.addImage(certificationsImg, 'JPEG', margin, y, W - (margin * 2), 60);

        drawFooter(6);

        // === PAGE 7: CONTACT / BACK COVER ===
        pdf.addPage();
        
        // Background Split
        pdf.setFillColor(...colBlue);
        pdf.rect(0, 0, W, H, 'F');
        
        // Map Placeholder Graphic
        pdf.setDrawColor(255, 255, 255);
        pdf.setLineWidth(0.5);
        pdf.circle(W/2, H/3, 50, 'S');
        pdf.circle(W/2, H/3, 40, 'S');
        pdf.circle(W/2, H/3, 30, 'S');

        // Contact Content
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(30);
        pdf.text("GET IN TOUCH", W/2, H/2, { align: 'center' });

        pdf.setFillColor(...colAccent);
        pdf.rect((W/2) - 15, (H/2) + 10, 30, 2, 'F'); // Underline

        const contactY = (H/2) + 30;
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(14);
        
        pdf.text("Factory & Office:", W/2, contactY, { align: 'center' });
        pdf.setTextColor(200, 200, 200);
        pdf.text("Dharmapuri, Tamil Nadu, India", W/2, contactY + 8, { align: 'center' });

        pdf.setTextColor(255, 255, 255);
        pdf.text("Contact:", W/2, contactY + 25, { align: 'center' });
        pdf.setTextColor(200, 200, 200);
        pdf.text("+91 94883 94000", W/2, contactY + 33, { align: 'center' });
        pdf.text("info@polytech.mayimdazzle.com", W/2, contactY + 41, { align: 'center' });

        // Parent Company Footer
        pdf.setFillColor(0, 0, 0);
        pdf.rect(0, H - 30, W, 30, 'F');
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text("A Subsidiary of", W/2, H - 18, { align: 'center' });
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        pdf.text("MAYIMDAZZLE INDIA PRIVATE LIMITED", W/2, H - 12, { align: 'center' });

        // Save
        pdf.save("Mayim-Dazzle-Polytech-Brochure.pdf");
        
    } catch (error) {
        console.error("PDF Generation Error", error);
        throw error;
    }
};