import fs from 'fs';
async function getBody() {
  const res = await fetch('https://cdn.prod.website-files.com/67adaf776f78a657729f252b/css/solvency.webflow.shared.90a82fded.css');
  const css = await res.text();
  fs.writeFileSync('./solvency.css', css);
}
getBody();
