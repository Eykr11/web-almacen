document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.querySelector('#product-form form');
    const productList = document.getElementById('products');

    // Load products from JSON file (assuming data.json exists)
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                renderProduct(product);
            });
        });

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const budget = document.getElementById('budget').value;
        const unit = document.getElementById('unit').value;
        const productName = document.getElementById('product-name').value;
        const description = document.getElementById('description').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const unitValue = parseFloat(document.getElementById('unit-value').value);
        const acquisitionDate = document.getElementById('acquisition-date').value;
        const supplier = document.getElementById('supplier').value;
        const totalValue = quantity * unitValue;

        if (!budget || !unit || !productName || !description || isNaN(quantity) || isNaN(unitValue) || !acquisitionDate || !supplier) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        const product = { budget, unit, productName, description, quantity, unitValue, totalValue, acquisitionDate, supplier };
        renderProduct(product);
        saveProduct(product);

        // Limpiar los campos de entrada
        productForm.reset();
    });

    function renderProduct(product) {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <p><strong>Presupuesto:</strong> ${product.budget}</p>
            <p><strong>Unidad:</strong> ${product.unit}</p>
            <p><strong>Nombre del Producto:</strong> ${product.productName}</p>
            <p><strong>Descripción:</strong> ${product.description}</p>
            <p><strong>Cantidad:</strong> ${product.quantity}</p>
            <p><strong>Valor Unitario:</strong> ${product.unitValue}€</p>
            <p><strong>Valor Total:</strong> ${product.totalValue}€</p>
            <p><strong>Fecha de Adquisición:</strong> ${product.acquisitionDate}</p>
            <p><strong>Proveedor:</strong> ${product.supplier}</p>
            <button class="edit-btn" onclick="editProduct(event)">Editar</button>
            <button class="delete-btn" onclick="deleteProduct(event)">Eliminar</button>
        `;
        productList.appendChild(div);
    }

    function saveProduct(product) {
        // Implement saving to JSON file or database here
        // For simplicity, let's assume the data is stored locally in a variable
        // and update it whenever a new product is added
    }

    window.editProduct = function(event) {
        const productDiv = event.target.parentElement;
        const budget = productDiv.querySelector('p:nth-child(1)').textContent.split(': ')[1];
        const unit = productDiv.querySelector('p:nth-child(2)').textContent.split(': ')[1];
        const productName = productDiv.querySelector('p:nth-child(3)').textContent.split(': ')[1];
        const description = productDiv.querySelector('p:nth-child(4)').textContent.split(': ')[1];
        const quantity = parseInt(productDiv.querySelector('p:nth-child(5)').textContent.split(': ')[1]);
        const unitValue = parseFloat(productDiv.querySelector('p:nth-child(6)').textContent.split(': ')[1].replace('€', ''));
        const acquisitionDate = productDiv.querySelector('p:nth-child(8)').textContent.split(': ')[1];
        const supplier = productDiv.querySelector('p:nth-child(9)').textContent.split(': ')[1];

        document.getElementById('budget').value = budget;
        document.getElementById('unit').value = unit;
        document.getElementById('product-name').value = productName;
        document.getElementById('description').value = description;
        document.getElementById('quantity').value = quantity;
        document.getElementById('unit-value').value = unitValue;
        document.getElementById('acquisition-date').value = acquisitionDate;
        document.getElementById('supplier').value = supplier;

        // Remove the existing product entry
        productDiv.remove();
    };

    window.deleteProduct = function(event) {
        const productDiv = event.target.parentElement;
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';

        document.getElementById('cancelBtn').onclick = function() {
            modal.style.display = 'none';
        };

        document.getElementById('deleteBtn').onclick = function() {
            productDiv.remove();
            modal.style.display = 'none';
            // Logic to delete the product from the database or storage can be added here
        };
    };
    
});
