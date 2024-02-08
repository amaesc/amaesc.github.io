fetch('data/menuData.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jsonData => {
    Object.keys(jsonData).forEach(category => {
      const button = document.createElement('button');
      button.className = 'btn btn-outline-danger';
      button.style.minHeight = "10vh"
      button.style.marginLeft = '15px';
      button.style.marginRight = '15px';
      button.textContent = category;
  
      button.addEventListener('click', () => {
        const subCategories = jsonData[category];
        const subContainer = document.getElementById('subcategory-buttons');
        subContainer.innerHTML = '';
        subCategories.forEach(subCategory => {
          const subButton = document.createElement('button');
          subButton.className = 'btn btn-outline-secondary';
          subButton.textContent = Object.keys(subCategory)[0];
          subButton.style.margin = '5px';
  
          subButton.addEventListener('click', () => {
            const productsContainer = document.getElementById('products-buttons');
            productsContainer.innerHTML = '';
  
            const products = subCategory[Object.keys(subCategory)[0]];

            const divOne = document.createElement('div');
            divOne.className = 'list-group';

            products.forEach(product => {
              const productsContainer = document.getElementById('products-buttons');

              const anchor = document.createElement('a');
              anchor.href = '#';
              anchor.className = 'list-group-item list-group-item-action';

              const flexDiv = document.createElement('div');
              flexDiv.className = 'd-flex w-100 justify-content-between';

              const h5 = document.createElement('h5');
              h5.className = 'mb-1';
              h5.innerText = product.name;

              const small = document.createElement('small');
              small.innerText = product.unit;

              const paragraph = document.createElement('p');
              paragraph.className = 'mb-1';
              paragraph.innerText = product.description;

              const small2 = document.createElement('small');
              small2.innerText = '$' + product.price;

              flexDiv.appendChild(h5);
              flexDiv.appendChild(small);

              anchor.appendChild(flexDiv);
              anchor.appendChild(paragraph);
              anchor.appendChild(small2);

              anchor.style.transition = 'background-color 1s ease';
              anchor.style.padding = '15px';
              anchor.style.borderRadius = '15px'

              anchor.addEventListener('click', (event) => {
                console.log('click');
                event.preventDefault();
                
                anchor.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';

                i = document.createElement('i');
                iOne = document.createElement('i');
                i.className = 'fa-solid fa-1 fa-shake fa-2xl';
                iOne.className = 'fa-solid fa-plus fa-shake fa-sm';
                shoppingNumber = document.getElementById('shopping-number');
                shoppingNumber.appendChild(iOne);
                shoppingNumber.appendChild(i);

                setTimeout(() => {
                  anchor.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                  shoppingNumber.innerHTML = '';
                }, 1000);
                
              });

              productsContainer.appendChild(anchor);
            });

            window.scrollBy(0, 500);
          });
  
          subContainer.appendChild(subButton);
        })
        window.scrollBy(0, 100);
      });
    
      const container = document.getElementById('category-buttons');
      container.appendChild(button);
    });
  })

  .catch(error => {
    console.error('There was a problem fetching the data:', error);
  });

