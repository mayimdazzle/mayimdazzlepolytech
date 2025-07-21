import { jsPDF } from "jspdf";

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



export const generateCompanyBrochure = async (): Promise<void> => {
    const logo = await loadLogo("/logo.png"); // path from public folder
    const pdf = new jsPDF();
    const pageWidth = 210;
    const pageHeight = 297;

    // Colors
    const primaryColor: [number, number, number] = [59, 130, 246]; // Blue
    const accentColor: [number, number, number] = [245, 158, 11]; // Amber
    const textColor: [number, number, number] = [15, 23, 42]; // Slate-900
    const lightColor: [number, number, number] = [241, 245, 249]; // Slate-100

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
    pdf.setFontSize(20);
    pdf.text('EPDM Rubber Granules', 20, 28);

    // Content
    pdf.setTextColor(...textColor);
    pdf.setFontSize(16);
    pdf.text('Our Products', 20, 60);

    pdf.setFontSize(12);
    const productText = `Our premium EPDM rubber granules are engineered for superior performance in demanding applications. We offer complete customization in both color and size to meet your specific project requirements.

Key Features:
• Custom granule sizes from 1-3mm to 7-8mm
• Unlimited color combinations available
• Superior weather resistance
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
    pdf.text('Available Colors:', 20, 200);

    colors.forEach((color, index) => {
        const x = 30 + (index % 4) * 40;
        const y = 210 + Math.floor(index / 4) * 20;
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
    pdf.setFontSize(20);
    pdf.text('About Our Company', 20, 28);

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

    // Save the PDF
    pdf.save('Mayim-Dazzle-Polytech-Brochure.pdf');
};