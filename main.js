function generateTable() {
    const range = document.querySelector('input[name="range"]:checked').value.split('-');
    const columns = parseInt(document.querySelector('input[name="columns"]:checked').value, 10);
    const startingNumber = parseInt(document.getElementById('startingNumber').value, 10);

    const from = startingNumber;
    const to = startingNumber + (range[1] - range[0]);

    const table = document.createElement('table');
    let row = table.insertRow();
    let number = from;

    for (let i = from; i <= to; i++) {
        if ((i - from) % columns === 0 && i !== from) {
            row = table.insertRow();
        }
        let cell = row.insertCell();
        cell.innerHTML = number;
        number++;

        // Add click event listener to toggle circle overlay
        cell.onclick = function() {
            toggleCircle(this);
        };
    }

    const container = document.getElementById('carton-rifa');
    container.innerHTML = ''; // Clear previous tables
    container.appendChild(table);

    // Show the customization form after the table is generated
    document.getElementById('backgroundForm').style.display = 'block';
    document.getElementById('download-carton').style.display = 'block';
}

function applyCustomizations() {
    const container = document.getElementById('carton-rifa');
    const table = container.querySelector('table'); // Assuming there's only one table
    const bgColor = document.getElementById('backgroundColor').value;
    const imageFile = document.getElementById('backgroundImage').files[0];
    const borderColor = document.getElementById('borderColor').value;
    const textColor = document.getElementById('textColor').value;

    if (table) {
        // Apply border and text colors
        table.style.borderColor = borderColor;
        table.style.color = textColor;

        // Apply CSS to all cells
        Array.from(table.querySelectorAll('td, th')).forEach(cell => {
            cell.style.borderColor = borderColor;
            cell.style.color = textColor;
        });
    }

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            container.style.backgroundImage = `url(${e.target.result})`;
            container.style.backgroundColor = ""; // Clear any solid color when using an image
        };
        reader.readAsDataURL(imageFile);
    } else if (bgColor) {
        container.style.backgroundColor = bgColor;
        container.style.backgroundImage = ""; // Clear the image if color is chosen
    }
}

function toggleCircle(cell) {
    // Check if a circle is already present
    if (cell.querySelector('.circle')) {
      // Remove the circle if it exists
      cell.removeChild(cell.querySelector('.circle'));
    } else {
      // Create and add a new circle
      const circle = document.createElement('div');
      circle.className = 'circle';
      circle.innerHTML = cell.innerHTML; // Keep the number visible on the circle
      cell.appendChild(circle);
    }
  }

function downloadAsImage() {
    const element = document.getElementById('carton-rifa');
    html2canvas(element, { scale: 2 }) // Adjust scale as needed for higher resolution
        .then(canvas => {
            // Create an image from the canvas
            const image = canvas.toDataURL('image/png');

            // Create a link and set the URL as the link's href attribute
            const link = document.createElement('a');
            link.download = 'carton-rifa.png';
            link.href = image;
            link.click(); // Automatically click the link to trigger the download
        })
        .catch(error => {
            console.error('Error capturing the image:', error);
        });
}