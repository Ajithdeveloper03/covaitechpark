const fs = require('fs');
const path = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const hookRegex = /const scrollGalleryNext = useCallback\(\(\) => \{\n\s*if \(galleryApi\) galleryApi.scrollNext\(\);\n\s*\}, \[galleryApi\]\);/;

const injection = `const scrollGalleryNext = useCallback(() => {
    if (galleryApi) galleryApi.scrollNext();
  }, [galleryApi]);

  useEffect(() => {
    if (!galleryApi) return;
    const interval = setInterval(() => {
      galleryApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [galleryApi]);`;

content = content.replace(hookRegex, injection);
fs.writeFileSync(path, content, 'utf8');
console.log('Added auto-slide to Gallery section!');
