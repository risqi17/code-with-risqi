const fs = require('fs');
const path = require('path');

const siteDir = path.join('src', 'app', '(site)');

if (!fs.existsSync(siteDir)) {
    fs.mkdirSync(siteDir, { recursive: true });
    console.log('Created directory:', siteDir);
} else {
    console.log('Directory already exists:', siteDir);
}

const filesToMove = [
    { src: path.join('src', 'app', 'page.tsx'), dest: path.join(siteDir, 'page.tsx') },
];

const dirsToMove = [
    { src: path.join('src', 'app', 'projects'), dest: path.join(siteDir, 'projects') }
];

filesToMove.forEach(file => {
    if (fs.existsSync(file.src)) {
        fs.renameSync(file.src, file.dest);
        console.log(`Moved ${file.src} to ${file.dest}`);
    } else {
        console.log(`File not found: ${file.src}`);
    }
});

dirsToMove.forEach(dir => {
    if (fs.existsSync(dir.src)) {
        fs.renameSync(dir.src, dir.dest);
        console.log(`Moved ${dir.src} to ${dir.dest}`);
    } else {
        console.log(`Directory not found: ${dir.src}`);
    }
});
