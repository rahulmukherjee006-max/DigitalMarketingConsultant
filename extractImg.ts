import https from 'https';

async function fetchMeta() {
  const url = 'https://photos.app.goo.gl/Ra4deHuZ55eSfMU37';
  
  try {
    const res = await fetch(url);
    const html = await res.text();
    const match = html.match(/<meta property="og:image" content="([^"]+)">/);
    if (match) {
        console.log(match[1]);
    } else {
        console.log("No og:image found");
    }
  } catch (e) {
    console.error(e);
  }
}

fetchMeta();
