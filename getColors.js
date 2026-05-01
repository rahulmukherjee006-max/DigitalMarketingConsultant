async function getColors() {
  const res = await fetch('https://solvency.webflow.io/');
  const html = await res.text();
  const cssMatch = html.match(/href="([^"]+\.webflow\.css[^"]*)"/);
  if (cssMatch) {
    const cssRes = await fetch(cssMatch[1]);
    const css = await cssRes.text();
    const colors = {};
    for (const match of css.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)) {
        colors[match[0].toLowerCase()] = (colors[match[0].toLowerCase()] || 0) + 1;
    }
    const sorted = Object.entries(colors).sort((a, b) => b[1] - a[1]);
    console.log(sorted.slice(0, 20));
  } else {
    console.log("No webflow css found");
  }
}
getColors();
