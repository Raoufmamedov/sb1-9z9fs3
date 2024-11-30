import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

// Create output directory if it doesn't exist
const outputDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join(outputDir, 'text-segmentation-project.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', () => {
  console.log(`Archive created: ${archive.pointer()} total bytes`);
});

// Handle warnings and errors
archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files and directories
archive.glob('**/*', {
  ignore: [
    'node_modules/**',
    '.git/**',
    'dist/**',
    '.env',
    '.bolt/**'
  ]
});

// Finalize the archive
archive.finalize();