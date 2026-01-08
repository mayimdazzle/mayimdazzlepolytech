import { jsPDF, RGBAData } from "jspdf";

// Load logo
const loadLogo = (src: string): Promise<string> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("Failed to get canvas context"));
                return;
            }
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png");
            resolve(dataURL); // Base64 image string
        };
        img.onerror = reject;
        img.src = src;
    });


const loadImage = (src: string): Promise<string> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("Canvas context failed"));
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/jpg"));
        };
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });



export const generateCompanyBrochure = async (): Promise<void> => {
    const logo = await loadLogo("/logo.png");
    const [
        tile, colorGrid, colorJars,
        labInterior, hardnessTest, mixer,
        sampleStrips, epdmSheet, installation, gym, playground, court, pinksheet, labContainer, labDurometer, labTimer, companyPlaceImg, certificationsImg
    ] = await Promise.all([
        loadImage("/epdm-tile.jpg"),
        loadImage("/color-grid.jpg"),
        loadImage("/color-jars.jpg"),
        loadImage("/lab-interior.jpg"),
        loadImage("/lab-durometer.jpg"),
        loadImage("/mixer.jpg"),
        loadImage("/sample-strips.jpg"),
        loadImage("/blue-sheet.jpg"),
        loadImage("/installation.jpg"),
        loadImage("/gym.jpg"),
        loadImage("/playground.jpg"),
        loadImage("/court.jpg"),
        loadImage("/pinksheet.jpg"),
        loadImage("/lab-container.jpg"),
        loadImage("/lab-durometer.jpg"),
        loadImage("/lab-timer.jpg"),
        loadImage("/donga.jpg"),
        loadImage("/certifications and awards.jpg")
    ]);


    const pdf = new jsPDF();
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const thinLine = 0.5;

    const primaryColor: [number, number, number] = [59, 130, 246];
    const accentColor: [number, number, number] = [245, 158, 11];
    const textColor: [number, number, number] = [15, 23, 42];
    const lightColor: [number, number, number] = [241, 245, 249];
    const darkGray: [number, number, number] = [80, 80, 80]; // Medium Dark Gray
    const lightBlue: [number, number, number] = [220, 230, 240]; // Softer Blue

    const imgW = 85, imgH = 55, gridX = margin, gridY = 70, gutter = 10;
    const frameThickness = 2; // Thicker frame
    const largeImgY = gridY + 2 * (imgH + gutter) + 15;
    // Function to draw an image with a professional frame
    const drawProfessionalFramedImage = (imgData: string, x: number, y: number, width: number, height: number) => {
        const frameThickness = 2; // Thicker frame
        // Define the outer dimensions of the frame (including border)
        const frameOuterX = x;
        const frameOuterY = y;
        const frameOuterWidth = width;
        const frameOuterHeight = height;

        // Define the inner dimensions where the image will sit
        const imageInnerX = frameOuterX + frameThickness;
        const imageInnerY = frameOuterY + frameThickness;
        const imageInnerWidth = frameOuterWidth - (2 * frameThickness);
        const imageInnerHeight = frameOuterHeight - (2 * frameThickness); // Corrected this line

        // Draw the rounded rectangle frame (filled white, with light blue border)
        pdf.setFillColor(255, 255, 255); // White background for frame
        pdf.setDrawColor(...lightBlue); // Light blue border
        pdf.setLineWidth(frameThickness);
        pdf.roundedRect(frameOuterX, frameOuterY, frameOuterWidth, frameOuterHeight, 8, 8, 'FD'); // Fill and stroke

        // Place the image inside the frame, ensuring it fills the inner area
        // We need to ensure imageInnerWidth and imageInnerHeight are positive
        if (imageInnerWidth > 0 && imageInnerHeight > 0) {
            pdf.addImage(imgData, 'JPEG', imageInnerX, imageInnerY, imageInnerWidth, imageInnerHeight, '', 'FAST');
        }
    };



    // Page 1 - Cover
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Company logo area (simulated)
    pdf.setFillColor(255, 255, 255);
    pdf.circle(105, 60, 25, 'F');
    //pdf.setFillColor(...accentColor);
    pdf.circle(105, 60, 20, 'F');
    pdf.addImage(logo, 'PNG', 90, 50, 30, 30); // x, y, width, height

    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.text('MAYIMDAZZLE POLYTECH', 105, 120, { align: 'center' });

    pdf.setFontSize(18);
    pdf.text('EPDM Rubber Granules', 105, 140, { align: 'center' });

    pdf.setFontSize(12);
    pdf.text('A Legacy of Innovation Since 2003', 105, 160, { align: 'center' });
    pdf.text('A Subsidiary of MayimDazzle India Private Limited', 105, 175, { align: 'center' });

    // Decorative elements
    pdf.setFillColor(...accentColor);
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * pageWidth;
        const y = 200 + Math.random() * 80;
        pdf.circle(x, y, Math.random() * 3 + 1, 'F');
    }

    // Contact info at bottom
    pdf.setFontSize(10);
    pdf.text('Dharmapuri, Tamil Nadu, India', 105, 260, { align: 'center' });
    pdf.text('info@polytech.mayimdazzle.com', 105, 270, { align: 'center' });
    pdf.text('Visit: mayimdazzle.com', 105, 280, { align: 'center' });

    // Page 2 - Products
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EPDM Rubber Granules', pageWidth / 2, 28, { align: 'center' });
    pdf.setFont('helvetica', 'normal');

    // Content
    pdf.setTextColor(...textColor);
    pdf.setFontSize(16);
    pdf.text('Our Products', 20, 60);

    pdf.setFontSize(12);
    const productText = `Our premium EPDM rubber granules are engineered for superior performance in demanding applications. We offer complete customization in both color and size to meet your specific project requirements.Currently Mayim dazzle polytech having experienced rubber Technologists and collaborated with a MNC having facility of in-house R&D  with NABL accredited 
Laboratory.


Our Capabilities :
• Customized Rubber compounds All Kind of Rubber Compounds( NR, SBE, EPDM, NBR, FKM, HNBR, ACM and AEM ) 
• Customized Rubber Components
• Compression molding / Injection Molding components
• Customized Rubber Mats 
• Manufacturing of EPDM Rubber granules and Installation 


Key Features:
• Custom granule sizes and colors
• Unlimited color combinations available
• Superior weather resistance both Sulphur and Peroxide cure
• Excellent durability and longevity
• Premium quality materials

Applications:
• Sports flooring and athletic surfaces
• Playground safety surfaces
• Industrial safety flooring
• Decorative landscape applications
• Safety walkways and paths
• Commercial and residential projects`;

    const lines = pdf.splitTextToSize(productText, 170);
    pdf.text(lines, 20, 80);

    // Color samples
    const colors: [number, number, number][] = [
        [239, 68, 68],   // Red
        [59, 130, 246],  // Blue
        [16, 185, 129],  // Green
        [245, 158, 11],  // Amber
        [139, 92, 246],  // Purple
        [236, 72, 153],  // Pink
        [249, 115, 22],  // Orange
        [6, 182, 212]    // Cyan
    ];

    pdf.setFontSize(14);
    pdf.text('Available Colors:', 20, 240);

    colors.forEach((color, index) => {
        const x = 30 + (index % 4) * 40;
        const y = 250 + Math.floor(index / 4) * 20;
        pdf.setFillColor(...color);
        pdf.circle(x, y, 5, 'F');
    });

    // Page 3 - Company Info
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header
    pdf.setFillColor(...accentColor);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('About Our Company', pageWidth / 2, 28, { align: 'center' });
    pdf.setFont('helvetica', 'normal');

    // Company info
    pdf.setTextColor(...textColor);
    pdf.setFontSize(16);
    pdf.text('Our Heritage', 20, 60);

    pdf.setFontSize(12);
    const companyText = `Mayim Dazzle Polytech is the newest subsidiary of MayimDazzle India Private Limited, a company that draws its rich legacy from Dazzle Infomedia—a trusted name in software and industrial solutions for over 20 years.

Our Journey:
• 2003: Dazzle Infomedia established
• 2014: Dazzle Systech India Private Limited founded
• 2023: MayimDazzle India Private Limited founded
• 2024: Mayim Dazzle Polytech launched

Operating from India, we focus on manufacturing EPDM Rubber Granules with unmatched flexibility in color and size customization. Backed by experienced rubber technologists, we offer tailored solutions for your specific requirements.

Why Choose Us:
• 20+ years of industrial experience
• Expert rubber technologists
• Custom formulation capabilities
• Quality assurance and testing
• Competitive pricing
• Reliable delivery schedules
• Comprehensive customer support`;

    const companyLines = pdf.splitTextToSize(companyText, 170);
    pdf.text(companyLines, 20, 80);

    // Contact section
    pdf.setFillColor(...lightColor);
    pdf.rect(20, 220, 170, 60, 'F');

    pdf.setFontSize(14);
    pdf.setTextColor(...primaryColor);
    pdf.text('Contact Information', 30, 240);

    pdf.setFontSize(11);
    pdf.setTextColor(...textColor);
    pdf.text('Address: Dharmapuri, Tamil Nadu, India', 30, 255);
    pdf.text('Email: info@polytech.mayimdazzle.com', 30, 265);
    pdf.text('Parent Company: mayimdazzle.com', 30, 275);

    // ─── Page 4: Gallery ─────────────────────────────────────────────
    /*pdf.addPage();

    // Header
    pdf.setFillColor(...accentColor);
    pdf.rect(0, 0, pageWidth, 28, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.text('Application Showcase', pageWidth / 2, 19, { align: 'center' });

    pdf.setFontSize(12);
    pdf.setTextColor(...textColor);
    pdf.text('Real-world usage of our EPDM flooring solutions.', margin, 38);

    // Gallery grid: 2x2 images with padding/gutter
    // Gallery grid: 2x2 images with refined framing and spacing
    // Row 1
    drawProfessionalFramedImage(epdmSheet, gridX, gridY, imgW, imgH);
    drawProfessionalFramedImage(sampleStrips, gridX + imgW + gutter, gridY, imgW, imgH);
    // Row 2
    drawProfessionalFramedImage(hardnessTest, gridX, gridY + imgH + gutter, imgW, imgH);
    drawProfessionalFramedImage(mixer, gridX + imgW + gutter, gridY + imgH + gutter, imgW, imgH);

    // Large installation image - prominent with a clean title box
    /*const largeImgY = gridY + 2 * (imgH + gutter) + 15;
    pdf.setFillColor(...lightColor);
    pdf.roundedRect(margin, largeImgY, pageWidth - 2 * margin, 105, 18, 18, 'F'); // Large background box
    pdf.addImage(installation, 'JPEG', margin + 8, largeImgY + 8, pageWidth - 2 * margin - 16, 89, '', 'FAST');

    // Landscape caption
    pdf.setFontSize(14);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Installed across India: Playgrounds, courts, gyms & more.', pageWidth / 2, largeImgY + 105 + 10, { align: 'center' });


    // Row 1
    drawProfessionalFramedImage(epdmSheet, gridX, gridY, imgW, imgH);
    drawProfessionalFramedImage(sampleStrips, gridX + imgW + gutter, gridY, imgW, imgH);
    // Row 2
    drawProfessionalFramedImage(hardnessTest, gridX, gridY + imgH + gutter, imgW, imgH);
    drawProfessionalFramedImage(mixer, gridX + imgW + gutter, gridY + imgH + gutter, imgW, imgH);

    // Large installation image - prominent with a clean title box
   
    /*pdf.setFillColor(...lightColor);
    pdf.roundedRect(margin, largeImgY, pageWidth - 2 * margin, 105, 18, 18, 'F'); // Large background box
    pdf.addImage(installation, 'JPEG', margin + 8, largeImgY + 8, pageWidth - 2 * margin - 16, 89, '', 'FAST');

    // Landscape caption
    pdf.setFontSize(14);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Installed across India: Playgrounds, courts, gyms & more.', pageWidth / 2, largeImgY + 105 + 10, { align: 'center' });*/


    // ─── Page 5: Completed Projects ─────────────────────────────────────────────
    pdf.addPage();

    // Header
    pdf.setFillColor(...accentColor);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Completed Projects', pageWidth / 2, 28, { align: 'center' });

    pdf.setFontSize(13);
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Showcasing a selection of our successful installations.', margin, 55);

    // Gallery grid: 2x2 images
    drawProfessionalFramedImage(gym, gridX, gridY, imgW, imgH);
    drawProfessionalFramedImage(playground, gridX + imgW + gutter, gridY, imgW, imgH);
    drawProfessionalFramedImage(court, gridX, gridY + imgH + gutter, imgW, imgH);
    //drawProfessionalFramedImage(project4, gridX + imgW + gutter, gridY + imgH + gutter, imgW, imgH);

    // Additional text or call to action for projects
    pdf.setFontSize(12);
    pdf.setTextColor(...darkGray);
    pdf.text('Our commitment to quality and excellence shines through every project.', pageWidth / 2, largeImgY + 10, { align: 'center' });
    pdf.text('Contact us for a detailed portfolio.', pageWidth / 2, largeImgY + 20, { align: 'center' });


    // ─── Page 6: R&D (Research & Development) ─────────────────────────────────────────────
    pdf.addPage();

    // Header
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Research & Development', pageWidth / 2, 28, { align: 'center' });

    pdf.setFontSize(13);
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Innovation at the core of our advanced EPDM solutions.', margin, 55);

    // Gallery grid: 2x2 images
    drawProfessionalFramedImage(sampleStrips, gridX, gridY, imgW, imgH);
    drawProfessionalFramedImage(mixer, gridX + imgW + gutter, gridY, imgW, imgH);
    drawProfessionalFramedImage(epdmSheet, gridX, gridY + imgH + gutter, imgW, imgH);
    drawProfessionalFramedImage(pinksheet, gridX + imgW + gutter, gridY + imgH + gutter, imgW, imgH);
    drawProfessionalFramedImage(installation, gridX + imgW + gutter, gridY + imgH + gutter, imgW, imgH);

    // Additional text or call to action for R&D
    pdf.setFontSize(12);
    pdf.setTextColor(...darkGray);
    pdf.text('Our in-house R&D and NABL-accredited lab ensure cutting-edge products.', pageWidth / 2, largeImgY + 10, { align: 'center' });
    pdf.text('Driving the future of rubber granule technology.', pageWidth / 2, largeImgY + 20, { align: 'center' });


    // ─── Page 7: Granules (Production Process) ─────────────────────────────────────────────
    pdf.addPage();

    // Header
    pdf.setFillColor(...accentColor);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Granule Production Process', pageWidth / 2, 28, { align: 'center' });

    pdf.setFontSize(13);
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.text('The meticulous steps behind our premium EPDM granules.', margin, 55);

    // Gallery grid: 2x2 images
    drawProfessionalFramedImage(tile, gridX, gridY, imgW, imgH);
    drawProfessionalFramedImage(colorGrid, gridX + imgW + gutter, gridY, imgW, imgH);
    drawProfessionalFramedImage(colorJars, gridX, gridY + imgH + gutter, imgW, imgH);
    //drawProfessionalFramedImage(granuleProd4, gridX + imgW + gutter, gridY + imgH + gutter, imgW, imgH);

    // Additional text or call to action for Granules Production
    pdf.setFontSize(12);
    pdf.setTextColor(...darkGray);
    pdf.text('From raw materials to finished product, quality is our priority.', pageWidth / 2, largeImgY + 10, { align: 'center' });
    pdf.text('Precision manufacturing for consistent results.', pageWidth / 2, largeImgY + 20, { align: 'center' });


    // ─── Page 8: Lab (Testing & Quality Assurance) ─────────────────────────────────────────────
    // ─── Page 8: Lab (Testing & Quality Assurance) ─────────────────────────────────────────────
    pdf.addPage();

    // Header
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Laboratory & Quality Assurance', pageWidth / 2, 28, { align: 'center' });

    // Top description text (all in one place)
    pdf.setFontSize(13);
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.text(
        'Rigorous testing ensures superior performance and durability. ' +
        'Our NABL-accredited lab guarantees product reliability and is committed to the highest industry standards.',
        margin,
        55,
        { maxWidth: pageWidth - margin * 2 }
    );

    // === IMAGE SIZES ===
    let posX = margin;
    let posY = 80;

    // Row 1 (Lab images)
    drawProfessionalFramedImage(labInterior, posX, posY, imgW, imgH);
    drawProfessionalFramedImage(labContainer, posX + imgW + gutter, posY, imgW, imgH);

    // Row 2 (Lab images)
    posY += imgH + gutter;
    drawProfessionalFramedImage(labDurometer, posX, posY, imgW, imgH);
    drawProfessionalFramedImage(labTimer, posX + imgW + gutter, posY, imgW, imgH);

    // Row 3 (Company & Certifications)
    posY += imgH + gutter;
    drawProfessionalFramedImage(companyPlaceImg, posX, posY, imgW, imgH);
    drawProfessionalFramedImage(certificationsImg, posX + imgW + gutter, posY, imgW, imgH);


    // Page Numbers (each page, bottom-right)
    for (let i = 1; i <= pdf.getNumberOfPages(); i++) {
        pdf.setPage(i);
        pdf.setFontSize(9);
        pdf.setTextColor(180, 180, 180);
        pdf.text(`Page ${i}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
    }

    // ─── Save ─────────────────────────────────────────
    pdf.save("Mayim-Dazzle-Polytech-Brochure.pdf");
};

