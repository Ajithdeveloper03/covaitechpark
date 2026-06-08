const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const pages = [
  path.join(projectRoot, 'app/page.tsx'),
  path.join(projectRoot, 'app/coimbatore/page.tsx'),
  path.join(projectRoot, 'app/contact/page.tsx'),
  path.join(projectRoot, 'app/about-us/page.tsx'),
  path.join(projectRoot, 'app/private-office-space/page.tsx'),
];

pages.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add imports for Header and Footer if they don't exist
  if (!content.includes("import Header from")) {
    content = content.replace(
      /import Image from "next\/image";/g,
      'import Image from "next/image";\nimport Header from "../components/Header";\nimport Footer from "../components/Footer";'
    );
    // For app/page.tsx where the path might differ
    if (filePath.endsWith('page.tsx') && !filePath.includes('coimbatore') && !filePath.includes('contact') && !filePath.includes('about-us') && !filePath.includes('private-office-space')) {
      content = content.replace(
        /import Header from "\.\.\/components\/Header";/g,
        'import Header from "./components/Header";'
      ).replace(
        /import Footer from "\.\.\/components\/Footer";/g,
        'import Footer from "./components/Footer";'
      );
    }
  }

  // 2. Replace the Header block
  // We match from <header to </header> (including nested structures)
  const headerRegex = /<header[\s\S]*?<\/header>/g;
  content = content.replace(headerRegex, (match) => {
    if (filePath.endsWith('page.tsx') && !filePath.includes('coimbatore') && !filePath.includes('contact') && !filePath.includes('about-us') && !filePath.includes('private-office-space')) {
      return '<Header ctaText="Book Space" ctaAction={() => handleOpenBooking("Book Space")} />';
    } else if (filePath.endsWith('coimbatore/page.tsx')) {
      return '<Header ctaText="Book Space" ctaAction={() => handleOpenBooking("Book Space")} />';
    } else if (filePath.endsWith('private-office-space/page.tsx')) {
      return '<Header ctaText="Book Cabin" ctaAction={() => handleOpenBooking("Private Office Cabin")} />';
    } else if (filePath.endsWith('about-us/page.tsx')) {
      return '<Header ctaText="Inquire Now" ctaAction={() => setBookingOpen(true)} />';
    } else if (filePath.endsWith('contact/page.tsx')) {
      return '<Header ctaText="Write Message" />';
    }
    return '<Header />';
  });

  // 3. Replace the Footer block
  // We match from <footer to </footer>
  const footerRegex = /<footer[\s\S]*?<\/footer>/g;
  content = content.replace(footerRegex, (match) => {
    if (filePath.endsWith('page.tsx') && !filePath.includes('coimbatore') && !filePath.includes('contact') && !filePath.includes('about-us') && !filePath.includes('private-office-space')) {
      return '<Footer onCtaClick={() => handleOpenBooking("General Inquiry")} />';
    } else if (filePath.endsWith('coimbatore/page.tsx')) {
      return '<Footer onCtaClick={() => handleOpenBooking("General Inquiry")} />';
    } else if (filePath.endsWith('private-office-space/page.tsx')) {
      return '<Footer onCtaClick={() => handleOpenBooking("Private Office Cabin")} />';
    } else if (filePath.endsWith('about-us/page.tsx')) {
      return '<Footer onCtaClick={() => setBookingOpen(true)} />';
    } else if (filePath.endsWith('contact/page.tsx')) {
      return '<Footer />';
    }
    return '<Footer />';
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Integrated Header/Footer components in: ${filePath}`);
});
