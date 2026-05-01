async function getColors() {
  const res = await fetch('https://solvency.webflow.io/');
  const html = await res.text();
  const cssMatch = html.match(/href="([^"]+\.webflow\.[a-z0-9]+\.css[^"]*)"/);
  if (cssMatch) {
    const cssRes = await fetch(cssMatch[1]);
    const css = await cssRes.text();
    const colors = {};
    for (const match of css.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)) {
        colors[match[0].toLowerCase()] = (colors[match[0].toLowerCase()] || 0) + 1;
    }
    const sorted = Object.entries(colors).sort((a: any, b: any) => (b[1] as number) - (a[1] as number));
    console.log(sorted.slice(0, 20));
  } else {
    // Try catching any css
    const allCss = html.match(/href="([^"]+\.css[^"]*)"/g);
    console.log("Found CSS links:", allCss);
  }
}
getColors();
