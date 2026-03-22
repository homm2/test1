const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, 'videos', 'Birds');
const result = {};

function scanDir(dir, folderName, category) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    result[category] = [];
    files.forEach(file => {
        if (file.toLowerCase().endsWith('.mp4')) {
            result[category].push(`videos/Birds/${folderName}/${file}`);
        }
    });
}

scanDir(path.join(videosDir, 'Birds'), 'Birds', 'Birds');
scanDir(path.join(videosDir, 'Squirrels'), 'Squirrels', 'Squirrels');
scanDir(path.join(videosDir, 'mice'), 'mice', 'Mice');

const outputContent = `const videoData = ${JSON.stringify(result, null, 2)};`;
fs.writeFileSync(path.join(__dirname, 'video_list.js'), outputContent);
console.log('Successfully generated video_list.js with ' + 
    (result['Birds'].length + result['Squirrels'].length + result['Mice'].length) + ' videos.');
