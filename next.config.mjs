import fs from 'fs';
import path from 'path';
import https from 'https';

// Pre-startup image manager script
const runStartupScript = async () => {
  console.log("--------------------------------------------------");
  console.log("KN Portfolio - Startup Asset Syncing...");
  console.log("--------------------------------------------------");

  const publicDir = path.resolve('./public');
  const portfolioDir = path.join(publicDir, 'portfolio');

  // 1. Ensure directories exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(portfolioDir)) {
    fs.mkdirSync(portfolioDir, { recursive: true });
  }

  // 2. Copy the uploaded images
  const brainDir = "C:\\Users\\Srini\\.gemini\\antigravity-ide\\brain\\42c5bba1-f884-4609-b8a1-61e677d07235";
  
  const filesToCopy = [
    { src: 'media__1780238781345.jpg', dest: path.join(publicDir, 'hero.jpg'), name: 'Hero' },
    { src: 'media__1780237082121.jpg', dest: path.join(publicDir, 'lookbook.jpg'), name: 'Lookbook' },
    { src: 'media__1780239624825.jpg', dest: path.join(portfolioDir, 'img-1.jpg'), name: 'Portfolio 1' },
    { src: 'media__1780239626113.jpg', dest: path.join(portfolioDir, 'img-2.jpg'), name: 'Portfolio 2' },
    { src: 'media__1780239639263.jpg', dest: path.join(portfolioDir, 'img-3.jpg'), name: 'Portfolio 3' },
    { src: 'media__1780239661439.jpg', dest: path.join(portfolioDir, 'img-4.jpg'), name: 'Portfolio 4' },
    { src: 'media__1780239661682.jpg', dest: path.join(portfolioDir, 'img-5.jpg'), name: 'Portfolio 5' },
    { src: 'media__1780237082121.jpg', dest: path.join(portfolioDir, 'img-6.jpg'), name: 'Portfolio 6' },
    { src: 'media__1780240389972.jpg', dest: path.join(portfolioDir, 'img-7.jpg'), name: 'Portfolio 7' },
    { src: 'media__1780240393000.jpg', dest: path.join(portfolioDir, 'img-8.jpg'), name: 'Portfolio 8' },
    { src: 'media__1780240393719.jpg', dest: path.join(portfolioDir, 'img-9.jpg'), name: 'Portfolio 9' },
    { src: 'media__1780240393862.jpg', dest: path.join(portfolioDir, 'img-10.jpg'), name: 'Portfolio 10' }
  ];

  for (const item of filesToCopy) {
    const srcPath = path.join(brainDir, item.src);
    if (fs.existsSync(srcPath)) {
      try {
        fs.copyFileSync(srcPath, item.dest);
        console.log(`✓ Sync: Copied ${item.name} to ${item.dest}`);
      } catch (err) {
        console.error(`✕ Sync: Error copying ${item.name}:`, err.message);
      }
    } else {
      console.warn(`⚠ Sync: Source ${item.name} not found at: ${srcPath}`);
    }
  }

  // 3. Download Google Drive Folder Images
  const folderId = "1k5NJCsm1Xvp4PIO6d-evtY2MyQattbcw";
  const folderUrl = `https://drive.google.com/drive/folders/${folderId}`;

  const fetchUrlText = (url) => {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          fetchUrlText(res.headers.location).then(resolve).catch(reject);
          return;
        }
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });
  };

  const checkUrlHeaders = (url) => {
    return new Promise((resolve) => {
      const parsedUrl = new URL(url);
      const options = {
        method: 'HEAD',
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
        timeout: 5000
      };
      const req = https.request(options, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          checkUrlHeaders(res.headers.location).then(resolve);
          return;
        }
        resolve(res.headers);
      });
      req.on('error', () => resolve({}));
      req.end();
    });
  };

  const downloadToFile = (url, destPath) => {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          downloadToFile(res.headers.location, destPath).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Failed download, Status: ${res.statusCode}`));
          return;
        }
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
        fileStream.on('error', (err) => {
          fs.unlink(destPath, () => {});
          reject(err);
        });
      }).on('error', reject);
    });
  };

  try {
    console.log("Connecting to Google Drive folder...");
    const html = await fetchUrlText(folderUrl);
    
    // Search for 33-char alphanumeric Google Drive IDs
    const idRegex = /\b1[a-zA-Z0-9_-]{32}\b/g;
    const candidates = Array.from(new Set(html.match(idRegex) || []));
    
    // Filter out known static drive asset IDs & the folder ID itself
    const filteredCandidates = candidates.filter(id => id !== folderId);
    console.log(`Found ${filteredCandidates.length} candidate Google Drive IDs. Testing for images...`);

    let downloadCount = 0;
    for (const id of filteredCandidates) {
      if (downloadCount >= 10) break; // Limit to first 10 valid images
      
      const downloadLink = `https://drive.google.com/uc?export=download&id=${id}&confirm=t`;
      const headers = await checkUrlHeaders(downloadLink);
      const contentType = headers['content-type'] || '';
      
      if (contentType.startsWith('image/')) {
        const ext = contentType.includes('png') ? 'png' : 'jpg';
        const filename = `img-${downloadCount + 1}.${ext}`;
        const destPath = path.join(portfolioDir, filename);
        
        console.log(`Downloading valid image (ID: ${id}) to ${filename}...`);
        try {
          await downloadToFile(downloadLink, destPath);
          console.log(`✓ Saved ${filename}`);
          downloadCount++;
        } catch (err) {
          console.error(`✕ Failed to download ${filename}:`, err.message);
        }
      }
    }
    console.log(`--------------------------------------------------`);
    console.log(`Sync complete. Synced ${downloadCount} portfolio images.`);
    console.log(`--------------------------------------------------`);
  } catch (err) {
    console.error("✕ Error fetching Google Drive folder:", err.message);
    console.log(`--------------------------------------------------`);
  }
};

// Fire script in background on module load
runStartupScript();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
    ],
  },
};

export default nextConfig;
