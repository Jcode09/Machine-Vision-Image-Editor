// Function to detect shapes in an image
function detectShapes() {
    // Reading image
    const img = new Image();
    img.onload = function() {
        // Creating canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Converting image into grayscale image
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const grayscaleData = grayscale(imageData);

        // Setting threshold of gray image
        const thresholdedData = threshold(grayscaleData);

        // Using findContours() function
        const contours = findContours(thresholdedData);

        // Drawing contours and identifying shapes
        for (let i = 0; i < contours.length; i++) {
            const contour = contours[i];

            // Approximating the shape
            const approx = approxPolyDP(contour);

            // Drawing contours
            drawContours(ctx, contour);

            // Finding center point of shape
            const moments = calculateMoments(contour);
            const x = Math.round(moments.m10 / moments.m00);
            const y = Math.round(moments.m01 / moments.m00);

            // Putting shape name at center of each shape
            let shapeName;
            if (approx.length === 3) {
                shapeName = 'Triangle';
            } else if (approx.length === 4) {
                shapeName = 'Quadrilateral';
            } else if (approx.length === 5) {
                shapeName = 'Pentagon';
            } else if (approx.length === 6) {
                shapeName = 'Hexagon';
            } else {
                shapeName = 'Circle';
            }

            // Displaying shape name
            ctx.font = '14px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(shapeName, x, y);
        }

        // Displaying the image after drawing contours
        document.body.appendChild(canvas);
    };
    img.src = 'shapes.png';
}

// Function to convert image into grayscale
function grayscale(imageData) {
    // Convert to grayscale
    const grayscaleData = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
        const gray = Math.round((imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3);
        grayscaleData.push(gray, gray, gray, imageData.data[i + 3]);
    }
    return new ImageData(new Uint8ClampedArray(grayscaleData), imageData.width, imageData.height);
}

// Function to set threshold
function threshold(imageData) {
    const thresholdValue = 127;
    const thresholdedData = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
        const intensity = imageData.data[i];
        const color = intensity > thresholdValue ? 255 : 0;
        thresholdedData.push(color, color, color, imageData.data[i + 3]);
    }
    return new ImageData(new Uint8ClampedArray(thresholdedData), imageData.width, imageData.height);
}

// Function to find contours
// Function to find contours
function findContours(imageData) {
    const contours = [];
    const visited = new Uint8Array(imageData.data.length / 4);
    const width = imageData.width;
    const height = imageData.height;

    function isValidNeighbor(x, y) {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    function isBlack(x, y) {
        const index = (y * width + x) * 4;
        return imageData.data[index] === 0; // Assuming thresholded image is binary
    }

    function markVisited(x, y) {
        visited[y * width + x] = 1;
    }

    function isVisited(x, y) {
        return visited[y * width + x] === 1;
    }

    function traceContour(startX, startY) {
        const contour = [];
        let x = startX;
        let y = startY;
        let direction = 0;

        do {
            contour.push([x, y]);
            markVisited(x, y);

            // Check surrounding pixels for next contour point
            let foundNext = false;
            for (let i = 0; i < 8; i++) {
                const nx = x + [[1, 1, 0, -1, -1, -1, 0, 1][i]];
                const ny = y + [[0, -1, -1, -1, 0, 1, 1, 1][i]];

                if (isValidNeighbor(nx, ny) && !isVisited(nx, ny) && isBlack(nx, ny)) {
                    x = nx;
                    y = ny;
                    direction = i;
                    foundNext = true;
                    break;
                }
            }

            // Change direction to continue tracing
            if (!foundNext) {
                direction = (direction + 1) % 8;
                x += [[1, 1, 0, -1, -1, -1, 0, 1][direction]];
                y += [[0, -1, -1, -1, 0, 1, 1, 1][direction]];
            }
        } while (x !== startX || y !== startY);

        return contour;
    }

    // Traverse the image to find contours
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            if (!isVisited(x, y) && isBlack(x, y)) {
                const contour = traceContour(x, y);
                contours.push(contour);
            }
        }
    }

    return contours;
}


// Function to approximate the shape
function approxPolyDP(contour, epsilon = 0.01) {
    const approximated = [];
    const n = contour.length;
    if (n <= 2) {
        return contour; // Contour too small to approximate
    }

    let p1 = contour[n - 1];
    for (let i = 0; i < n; i++) {
        const p2 = contour[i];
        const dx = p2[0] - p1[0];
        const dy = p2[1] - p1[1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > epsilon) {
            approximated.push(p1);
            p1 = p2;
        }
    }

    approximated.push(contour[n - 1]); // Add the last point
    return approximated;
}


// Function to draw contours
function drawContours(ctx, contour) {
    ctx.beginPath();
    ctx.moveTo(contour[0][0], contour[0][1]);
    for (let i = 1; i < contour.length; i++) {
        ctx.lineTo(contour[i][0], contour[i][1]);
    }
    ctx.closePath();
    ctx.strokeStyle = 'red'; // Set contour color
    ctx.lineWidth = 2; // Set contour line width
    ctx.stroke();
}


// Function to calculate moments
function calculateMoments(contour) {
    let m00 = 0;
    let m01 = 0;
    let m10 = 0;
    
    for (let i = 0; i < contour.length; i++) {
        const x = contour[i][0];
        const y = contour[i][1];
        m00 += 1;
        m10 += x;
        m01 += y;
    }
    
    return {
        m00: m00,
        m01: m01,
        m10: m10
    };
}

// Calling the function to detect shapes
detectShapes();
