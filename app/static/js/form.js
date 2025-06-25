// Form validation and handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('part-form');
    
    // Validate form inputs
    function validateForm() {
        let isValid = true;
        
        // Plate width validation
        const plateWidth = parseFloat(document.getElementById('plate-width').value);
        if (isNaN(plateWidth) || plateWidth < 10 || plateWidth > 500) {
            alert('Plate width must be between 10mm and 500mm');
            isValid = false;
        }
        
        // Plate height validation
        const plateHeight = parseFloat(document.getElementById('plate-height').value);
        if (isNaN(plateHeight) || plateHeight < 10 || plateHeight > 500) {
            alert('Plate height must be between 10mm and 500mm');
            isValid = false;
        }
        
        // Plate thickness validation
        const plateThickness = parseFloat(document.getElementById('plate-thickness').value);
        if (isNaN(plateThickness) || plateThickness < 1 || plateThickness > 50) {
            alert('Plate thickness must be between 1mm and 50mm');
            isValid = false;
        }
        
        // Hole diameter validation
        const holeDiameter = parseFloat(document.getElementById('hole-diameter').value);
        if (isNaN(holeDiameter) || holeDiameter < 5 || holeDiameter > 100) {
            alert('Hole diameter must be between 5mm and 100mm');
            isValid = false;
        }
        
        // Hole position validation
        const holePositionX = parseFloat(document.getElementById('hole-position-x').value);
        const holePositionY = parseFloat(document.getElementById('hole-position-y').value);
        
        if (isNaN(holePositionX) || holePositionX < 0 || holePositionX > plateWidth) {
            alert('Hole position X must be between 0 and plate width');
            isValid = false;
        }
        
        if (isNaN(holePositionY) || holePositionY < 0 || holePositionY > plateHeight) {
            alert('Hole position Y must be between 0 and plate height');
            isValid = false;
        }
        
        // Check if hole fits within plate
        const holeRadius = holeDiameter / 2;
        if (holePositionX - holeRadius < 0 || 
            holePositionX + holeRadius > plateWidth || 
            holePositionY - holeRadius < 0 || 
            holePositionY + holeRadius > plateHeight) {
            alert('Hole must fit completely within the plate');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Add event listeners to form inputs for real-time validation
    const numericInputs = document.querySelectorAll('input[type="number"]');
    numericInputs.forEach(input => {
        input.addEventListener('change', () => {
            // Ensure value is within min/max range
            const min = parseFloat(input.getAttribute('min'));
            const max = parseFloat(input.getAttribute('max'));
            const value = parseFloat(input.value);
            
            if (value < min) {
                input.value = min;
            } else if (value > max) {
                input.value = max;
            }
        });
    });
    
    // Add event listener to get quote button
    document.getElementById('get-quote').addEventListener('click', () => {
        if (validateForm()) {
            // Collect form data
            const formData = {
                material: document.getElementById('material').value,
                surfaceTreatment: document.getElementById('surface-treatment').value,
                plateWidth: parseFloat(document.getElementById('plate-width').value),
                plateHeight: parseFloat(document.getElementById('plate-height').value),
                plateThickness: parseFloat(document.getElementById('plate-thickness').value),
                holeDiameter: parseFloat(document.getElementById('hole-diameter').value),
                holePositionX: parseFloat(document.getElementById('hole-position-x').value),
                holePositionY: parseFloat(document.getElementById('hole-position-y').value),
                quantity: parseInt(document.getElementById('quantity').value),
                deliveryTime: document.getElementById('delivery-time').value
            };
            
            // In a real application, you would send this data to the server
            console.log('Quote request:', formData);
            
            // For demo purposes, just show an alert
            alert(`Quote request submitted for ${formData.quantity} ${formData.material} plates with ${formData.surfaceTreatment} surface treatment. We will contact you shortly with pricing information.`);
        }
    });
});