const fs = require('fs');
const content = fs.readFileSync('app/coimbatore/page.tsx', 'utf8');

// A simple regex parser to extract JSX tags
// We want to match: <tag ...> or </tag> (ignoring self-closing like <img ... /> or <Image ... /> or <input ... />)
const tagRegex = /<\/?[a-zA-Z0-9]+(?:\s+[a-zA-Z0-9\-]+(?:="[^"]*"|='[^']*'|=\{[^\}]*\}|[^>]*))?\s*\/?>/g;

const lines = content.split('\n');
const stack = [];

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  let match;
  
  // Find all tag-like patterns in the line
  const regex = /<(\/?[a-zA-Z0-9]+)(?:\s+[^>]*?)?(\/?)>/g;
  while ((match = regex.exec(line)) !== null) {
    const tagNameWithSlash = match[1];
    const isSelfClosing = match[2] === '/';
    
    // Skip comments or things inside braces
    if (tagNameWithSlash.startsWith('!--')) continue;
    
    if (isSelfClosing) {
      // Self-closing tag like <Image /> or <br />, skip
      continue;
    }
    
    if (tagNameWithSlash.startsWith('/')) {
      const tagName = tagNameWithSlash.substring(1);
      if (stack.length === 0) {
        console.log(`Error on line ${lineNum}: Closing tag </${tagName}> without open tag.`);
      } else {
        const lastOpen = stack.pop();
        if (lastOpen.name !== tagName) {
          console.log(`Error on line ${lineNum}: Closing tag </${tagName}> mismatches open tag <${lastOpen.name}> from line ${lastOpen.lineNum}.`);
        }
      }
    } else {
      const tagName = tagNameWithSlash;
      // Some tags are standard self-closing in HTML, but in JSX everything must be self-closing or have close tag.
      // In JSX, tags like <Image> or <input> or <hr> must be closed.
      // So we push all non-self-closing tags
      stack.push({ name: tagName, lineNum });
    }
  }
});

console.log('Unclosed tags remaining in stack:');
stack.forEach(tag => {
  console.log(`<${tag.name}> from line ${tag.lineNum}`);
});
