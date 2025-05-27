const fs = require('fs');
const { execSync } = require('child_process');

// Function to convert SVG to PNG using ImageMagick (if available) or creating a web-based converter
function createPngIcons() {
    console.log('Creating PNG icons for TabMan extension...');

    // Define icon sizes
    const sizes = [16, 32, 48, 128];
    
    sizes.forEach(size => {
        const inputSvg = `icons/icon${size}.svg`;
        const outputPng = `icons/icon${size}.png`;
        
        try {
            // Try using ImageMagick convert command
            execSync(`convert ${inputSvg} ${outputPng}`, { stdio: 'inherit' });
            console.log(`✅ Created ${outputPng}`);
        } catch (error) {
            console.log(`❌ ImageMagick not available. Please install ImageMagick or use the HTML converter.`);
            console.log(`   Try: sudo apt-get install imagemagick (Ubuntu/Debian)`);
            console.log(`   Or use the create_icons.html file in a browser.`);
            return;
        }
    });
}

// Run the conversion
createPngIcons(); 