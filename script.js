document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
      const originalImg = new Image();
      originalImg.onload = function() {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = originalImg.width;
          canvas.height = originalImg.height;

          canvas.style.width = "100%";

          ctx.drawImage(originalImg, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          const binaryThreshold = parseFloat(document.getElementById('binaryThresholdSlider').value);
          
         
   // Background removal implementation with binary threshold adjustment
   if (document.getElementById('backgroundRemovalCheckbox').checked) {
    let binaryThreshold = parseFloat(document.getElementById('binaryThresholdSlider').value);
    removeBackground(data, binaryThreshold);
}
          if (document.getElementById('grayscaleCheckbox').checked) {
              grayscale(data);
          }

          if (document.getElementById('colorHueCheckbox').checked) {
              applyColorHue(data);
          }

          if (document.getElementById('adjustmentsOptions').checked) {
              applyAdjustments(data);
          }

          const selectedFilter = document.getElementById('filterSelect').value;
          applyFilter(data, selectedFilter);

          ctx.putImageData(imageData, 0, 0);
          const img = document.getElementById('processed-img');
          img.src = canvas.toDataURL();
          const processedContainer = document.getElementById('processed-container');
          processedContainer.style.display = 'block';
      };
      originalImg.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

  
  document.getElementById('convertBtn').addEventListener('click', function() {
    processImage(); 
  });
  
  function processImage() {
    const originalImg = document.getElementById('original-img');
    if (originalImg.src === "" || originalImg.src === "#" || originalImg.src === "about:blank" || originalImg.complete === false) {
      alert("Please select an image first.");
      return;
    }
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    canvas.width = originalImg.width; 
    canvas.height = originalImg.height; 
  
    canvas.style.width = "100%";
  
    ctx.drawImage(originalImg, 0, 0, canvas.width, canvas.height); 
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
  
    if (document.getElementById('grayscaleCheckbox').checked) {
      grayscale(data);
    }
  
    if (document.getElementById('binaryCheckbox').checked) {
      binary(data);
    }

   // Background removal implementation with binary threshold adjustment
   if (document.getElementById('backgroundRemovalCheckbox').checked) {
    let binaryThreshold = parseFloat(document.getElementById('binaryThresholdSlider').value);
    removeBackground(data, binaryThreshold);
}

    if (document.getElementById('colorHueCheckbox').checked) {
      applyColorHue(data);
    }
  
    if (document.getElementById('adjustmentsOptions').checked) {
      applyAdjustments(data);
    }
  
    const selectedFilter = document.getElementById('filterSelect').value;
    applyFilter(data, selectedFilter);
  
    ctx.putImageData(imageData, 0, 0);
    const img = document.getElementById('processed-img');
    img.src = canvas.toDataURL();
    const processedContainer = document.getElementById('processed-container');
    processedContainer.style.display = 'block';
  }

  document.getElementById('colorHueCheckbox').addEventListener('change', function(event) {
    const colorHueOptions = document.getElementById('colorHueOptions');
    colorHueOptions.style.display = event.target.checked ? 'block' : 'none';
  });
  
  document.getElementById('adjustmentsOptions').addEventListener('change', function(event) {
    if (event.target.checked) {
      const adjustmentsContainer = document.getElementById('adjustmentsContainer');
      adjustmentsContainer.style.display = 'block';
    } else {
      const adjustmentsContainer = document.getElementById('adjustmentsContainer');
      adjustmentsContainer.style.display = 'none';
    }
  });
  
  document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const originalImg = document.getElementById('original-img');
      originalImg.onload = function() {
        processImage(); 
      };
      originalImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  
  document.getElementById('grayscaleCheckbox').addEventListener('change', function(event) {
    const grayscaleThresholdContainer = document.getElementById('grayscaleThresholdContainer');
    grayscaleThresholdContainer.style.display = event.target.checked ? 'block' : 'none';
    processImage();
  });
  
  document.getElementById('binaryCheckbox').addEventListener('change', function(event) {
    const binaryThresholdContainer = document.getElementById('binaryThresholdContainer');
    binaryThresholdContainer.style.display = event.target.checked ? 'block' : 'none';
    processImage();
  });
  
  document.getElementById('grayscaleThresholdSlider').addEventListener('input', function() {
    updateSliderValue('grayscaleThresholdSlider', 'grayscaleThresholdValue');
    processImage();
  });
  
  document.getElementById('binaryThresholdSlider').addEventListener('input', function() {
    updateSliderValue('binaryThresholdSlider', 'binaryThresholdValue');
    processImage();
  });
  
  document.getElementById('redSlider').addEventListener('input', function() {
    updateSliderValue('redSlider', 'redValue');
    processImage();
  });
  
  document.getElementById('greenSlider').addEventListener('input', function() {
    updateSliderValue('greenSlider', 'greenValue');
    processImage();
  });
  
  document.getElementById('blueSlider').addEventListener('input', function() {
    updateSliderValue('blueSlider', 'blueValue');
    processImage();
  });
  
  document.getElementById('brightnessSlider').addEventListener('input', function() {
    updateSliderValue('brightnessSlider', 'brightnessValue');
    processImage();
  });
  
  document.getElementById('contrastSlider').addEventListener('input', function() {
    updateSliderValue('contrastSlider', 'contrastValue');
    processImage();
  });
  
  document.getElementById('opacitySlider').addEventListener('input', function() {
    updateSliderValue('opacitySlider', 'opacityValue');
    processImage();
  });
  
  document.getElementById('saturationSlider').addEventListener('input', function() {
    updateSliderValue('saturationSlider', 'saturationValue');
    processImage();
  });
  
  document.getElementById('sharpnessSlider').addEventListener('input', function() {
    updateSliderValue('sharpnessSlider', 'sharpnessValue');
    processImage();
  });
  
  document.getElementById('blurSlider').addEventListener('input', function() {
    updateSliderValue('blurSlider', 'blurValue');
    processImage();
  });
  document.getElementById('filterSelect').addEventListener('change', processImage);
  
  function updateSliderValue(sliderId, outputId) {
    const slider = document.getElementById(sliderId);
    const output = document.getElementById(outputId);
    output.textContent = slider.value;
  }
  
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  function grayscale(data) {
    const threshold = parseFloat(document.getElementById('grayscaleThresholdSlider').value);
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const grayscaleValue = avg > threshold ? 255 : avg;
      data[i] = grayscaleValue;
      data[i + 1] = grayscaleValue;
      data[i + 2] = grayscaleValue;
    }
  }
  
  function binary(data) {
    const threshold = parseFloat(document.getElementById('binaryThresholdSlider').value);
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const binaryValue = avg > threshold ? 255 : 0;
      data[i] = binaryValue;
      data[i + 1] = binaryValue;
      data[i + 2] = binaryValue;
    }
  }
// Background removal function with binary threshold adjustment
function removeBackground(data, binaryThreshold) {
  const threshold = 100; // Adjust threshold value as needed
  const redThreshold = 100; // Red channel threshold
  const greenThreshold = 100; // Green channel threshold
  const blueThreshold = 100; // Blue channel threshold

  for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      // Check if binary checkbox is checked
      if (document.getElementById('binaryCheckbox').checked) {
          // Check if pixel color is close to the background color and below the binary threshold
          if (Math.abs(red - redThreshold) < threshold && Math.abs(green - greenThreshold) < threshold && Math.abs(blue - blueThreshold) < threshold && binaryThreshold < 128) {
              // Set alpha channel to 0 (transparent)
              data[i + 3] = 0;
          }
      } else {
          // Remove background entirely if binary checkbox is unchecked
          if (Math.abs(red - redThreshold) < threshold && Math.abs(green - greenThreshold) < threshold && Math.abs(blue - blueThreshold) < threshold) {
              // Set alpha channel to 0 (transparent)
              data[i + 3] = 0;
          }
      }
  }
}

  function applyColorHue(data) {
    const redValue = parseFloat(document.getElementById('redSlider').value);
    const greenValue = parseFloat(document.getElementById('greenSlider').value);
    const blueValue = parseFloat(document.getElementById('blueSlider').value);
    const isTouched = redValue > 0 || greenValue > 0 || blueValue > 0;
  
    if (isTouched) {
      const averageValue = (redValue + greenValue + blueValue) / 3;
      const isGrayscale = redValue === averageValue || greenValue === averageValue || blueValue === averageValue;
  
      if (isGrayscale && averageValue !== 255) {
        for (let i = 0; i < data.length; i += 4) {
          const avg = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
      } else {
        const maxSliderValue = 255;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = (data[i] + redValue * (maxSliderValue / 255)) % 500;
          data[i + 1] = (data[i + 1] + greenValue * (maxSliderValue / 255)) % 500;
          data[i + 2] = (data[i + 2] + blueValue * (maxSliderValue / 255)) % 500;
        }
      }
    }
  }
  
  function applyAdjustments(data) {
    const brightnessValue = parseFloat(document.getElementById('brightnessSlider').value);
    const contrastValue = parseFloat(document.getElementById('contrastSlider').value);
    const opacityValue = parseFloat(document.getElementById('opacitySlider').value);
    const saturationValue = parseFloat(document.getElementById('saturationSlider').value);
    const sharpnessValue = parseFloat(document.getElementById('sharpnessSlider').value);
    const blurValue = parseFloat(document.getElementById('blurSlider').value);
  
    if (sharpnessValue > 0) {
      applySharpness(data, sharpnessValue);
    }
  
    if (blurValue > 0) {
      applyBlur(data, blurValue);
    }
  
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
  
      r = clamp(contrastValue * (r - 128) + 128 + brightnessValue, 0, 255);
      g = clamp(contrastValue * (g - 128) + 128 + brightnessValue, 0, 255);
      b = clamp(contrastValue * (b - 128) + 128 + brightnessValue, 0, 255);
  
      data[i + 3] *= opacityValue;
  
      const avg = (r + g + b) / 3;
      data[i] = clamp(avg + saturationValue * (r - avg), 0, 255);
      data[i + 1] = clamp(avg + saturationValue * (g - avg), 0, 255);
      data[i + 2] = clamp(avg + saturationValue * (b - avg), 0, 255);
    }
  }
  
  function applySharpness(data, value) {
    const radius = value;
    const side = radius * 2 + 1;
  
    const newData = new Uint8ClampedArray(data);
  
    for (let i = 0; i < data.length; i += 4) {
      let rSum = 0, gSum = 0, bSum = 0;
  
      for (let y = -radius; y <= radius; y++) {
        for (let x = -radius; x <= radius; x++) {
          const index = i + (y * side + x) * 4;
          if (index >= 0 && index < data.length) {
            if (x === 0 && y === 0) {
              continue;
            }
  
            rSum += data[index];
            gSum += data[index + 1];
            bSum += data[index + 2];
          }
        }
      }
  
      const numNeighbors = Math.pow(side, 2) - 1;
      const rAvg = rSum / numNeighbors;
      const gAvg = gSum / numNeighbors;
      const bAvg = bSum / numNeighbors;
      const rDiff = data[i] - rAvg;
      const gDiff = data[i + 1] - gAvg;
      const bDiff = data[i + 2] - bAvg;
      
      newData[i] = data[i] + rDiff;
      newData[i + 1] = data[i + 1] + gDiff;
      newData[i + 2] = data[i + 2] + bDiff;
      newData[i + 3] = data[i + 3]; 
    }
  
    for (let i = 0; i < data.length; i++) {
      data[i] = newData[i];
    }
  }
  
  
  function applyBlur(data, value) {
    const radius = value;
    const side = radius * 2 + 1;
  
    const newData = new Uint8ClampedArray(data);
  
    for (let i = 0; i < data.length; i += 4) {
      let r = 0,
        g = 0,
        b = 0,
        count = 0;
  
      for (let y = -radius; y <= radius; y++) {
        for (let x = -radius; x <= radius; x++) {
          const index = i + (y * side + x) * 4;
          if (index >= 0 && index < data.length) {
            r += data[index];
            g += data[index + 1];
            b += data[index + 2];
            count++;
          }
        }
      }
  
      newData[i] = r / count;
      newData[i + 1] = g / count;
      newData[i + 2] = b / count;
      newData[i + 3] = data[i + 3]; 
    }
  
    for (let i = 0; i < data.length; i++) {
      data[i] = newData[i];
    }
  }
  
  
  function applyFilter(data, filter) {
    if (filter !== 'nofilter') {
      switch (filter) {
        case 'sepia':
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            data[i] = clamp(0.393 * r + 0.769 * g + 0.189 * b, 0, 255);
            data[i + 1] = clamp(0.349 * r + 0.686 * g + 0.168 * b, 0, 255);
            data[i + 2] = clamp(0.272 * r + 0.534 * g + 0.131 * b, 0, 255);
          }
          break;
        case 'vivid':
          for (let i = 0; i < data.length; i += 4) {
            data[i] = clamp(data[i] * 1.5, 0, 255);
            data[i + 1] = clamp(data[i + 1] * 1.5, 0, 255);
            data[i + 2] = clamp(data[i + 2] * 1.5, 0, 255);
          }
          break;
      case 'mono':
  
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        break;
      case 'noir':
  
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
          data[i + 3] = 255 - avg;
        }
        break;
      case 'lark':
  
        for (let i = 0; i < data.length; i += 4) {
          data[i] = clamp(data[i] * 1.1, 0, 255);
          data[i + 1] = clamp(data[i + 1] * 1.1, 0, 255);
          data[i + 2] = clamp(data[i + 2] * 0.9, 0, 255);
        }
        break;
      case 'amaro':
  
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          data[i] = clamp(0.5 * r + 0.5 * g, 0, 255);
          data[i + 1] = clamp(0.2 * r + 0.6 * g + 0.2 * b, 0, 255);
          data[i + 2] = clamp(0.2 * g + 0.8 * b, 0, 255);
        }
        break;
      case 'blackandwhite':
  
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const binaryValue = avg > 128 ? 255 : 0;
          data[i] = binaryValue;
          data[i + 1] = binaryValue;
          data[i + 2] = binaryValue;
        }
        break;
      case 'nofilter':
  
        break;
      case 'santorini':
  
        for (let i = 0; i < data.length; i += 4) {
          data[i] = clamp(data[i] * 0.8, 0, 255);
          data[i + 1] = clamp(data[i + 1] * 1.2, 0, 255);
          data[i + 2] = clamp(data[i + 2] * 1.1, 0, 255);
        }
        break;
      case 'tranquil':
  
        for (let i = 0; i < data.length; i += 4) {
          data[i] = clamp(data[i] * 1.1, 0, 255);
          data[i + 1] = clamp(data[i + 1] * 1.2, 0, 255);
          data[i + 2] = clamp(data[i + 2] * 1.3, 0, 255);
        }
        break;
      case 'gradient':
  
        for (let i = 0; i < data.length; i += 4) {
          data[i] = clamp(data[i] * 1.2, 0, 255);
          data[i + 1] = clamp(data[i + 1] * 1.2, 0, 255);
          data[i + 2] = clamp(data[i + 2] * 0.8, 0, 255);
        }
        break;
      case 'sunglow':
  
        for (let i = 0; i < data.length; i += 4) {
          data[i] = clamp(data[i] * 1.2, 0, 255);
          data[i + 1] = clamp(data[i + 1] * 1.2, 0, 255);
          data[i + 2] = clamp(data[i + 2] * 1.1, 0, 255);
        }
        break;
        case 'invert':
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
          }
          break;
        default:
          break;
    }
  }
  }
  
  document.getElementById('shapesColorDetectionBtn').addEventListener('click', function() {
    // Get the processed image data as base64
    const processedImgData = document.getElementById('processed-img').src;
    // Redirect to the external HTML file with image data as URL parameter
    window.location.href = `ShapesnColors/shapesncolor.html?imgData=${processedImgData}`;
  });


// Function to update the processed image in the external HTML
function updateExternalImage(src) {
    // Send the processed image source to the external HTML via localStorage
    localStorage.setItem('processedImageSrc', src);
}




// Function to handle file selection and image processing
document.getElementById('fileInput').addEventListener('change', function(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
      var imageData = e.target.result;
      // Pass image data to the external HTML page
      document.getElementById('content-iframe').contentWindow.postMessage(imageData, '*');
  };
  reader.readAsDataURL(file);
});
// Event listener for editing options changes
document.querySelectorAll('input[type="checkbox"], input[type="range"], select').forEach(function(input) {
  input.addEventListener('change', function() {
      // Retrieve the edited image data
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          // Convert the canvas to base64 image data
          var editedImageData = canvas.toDataURL();
          // Pass the edited image data to the external HTML page
          document.getElementById('content-iframe').contentWindow.postMessage(editedImageData, '*');
      };
      img.src = document.getElementById('processed-img').src;
  });
});
