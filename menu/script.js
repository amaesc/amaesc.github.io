let ShopList = [
  ];


// Function to create menu HTML from JSON data
function createMenuHTML(category, itemsOrSubcategories) {
    const categoryHTML = `<div class="menu-category" id="category"><h2>${category}</h2></div>`;
    const itemsHTML = Array.isArray(itemsOrSubcategories)
        ? itemsOrSubcategories.map(itemDetails => {
            return `
                <div class="menu-item" onclick='test(this, "category")'>
                    <div class="item-details">
                        <h2>${itemDetails.name}</h2>
                        <p>${itemDetails.description}</p>
                        <p>Price: $${itemDetails.price.toFixed(2)} - ${itemDetails.unit}</p>
                    </div>
                </div>
            `;
        }).join('')
        : Object.entries(itemsOrSubcategories).map(([subcategory, subcategoryItems]) => {
            const subcategoryHTML = `<div class="menu-subcategory"><h3>${subcategory}</h3></div>`;
            const itemsListHTML = subcategoryItems.map(itemDetails => {
                return `
                    <div class="menu-item">
                        <div class="item-details">
                            <h2>${itemDetails.name}</h2>
                            <p>${itemDetails.description}</p>
                            <p>Price: $${itemDetails.price.toFixed(2)} - ${itemDetails.unit}</p>
                        </div>
                    </div>
                `;
            }).join('');
            return subcategoryHTML + itemsListHTML;
        }).join('');

    return categoryHTML + itemsHTML;
}



// Function to show categories
function showCategories() {
    // Get the menu container element
    const menuContainer = document.getElementById('menu-container');
    const menuButtonsContainer = document.getElementById('menu-buttons');
    
    // Clear the existing content
    menuButtonsContainer.innerHTML = '';

    // Fetch JSON data from the menu.json file
    fetch('menu.json')
        .then(response => response.json())
        .then(jsonData => {
            // Get the principal categories (Hambre and Sed)
            const principalCategories = Object.keys(jsonData);

            // Create buttons for each principal category
            principalCategories.forEach(category => {
                const categoryButton = document.createElement('button');
                categoryButton.textContent = category;
                categoryButton.onclick = () => showSubcategories(category);
                menuButtonsContainer.appendChild(categoryButton);
            });
        })
        .catch(error => console.error('Error fetching menu.json:', error));
}

// Function to show subcategories for a specific category
function showSubcategories(category) {
    // Get the menu container element
    const menuContainer = document.getElementById('menu-container');
    
    // Clear the existing content
    menuContainer.innerHTML = '';

    // Fetch JSON data from the menu.json file
    fetch('menu.json')
        .then(response => response.json())
        .then(jsonData => {
            // Check if the category exists in the JSON data
            if (jsonData.hasOwnProperty(category)) {
                const subcategories = jsonData[category];
                
                // Create buttons for each subcategory
                subcategories.forEach(subcategory => {
                    const subcategoryButton = document.createElement('button');
                    subcategoryButton.textContent = Object.keys(subcategory)[0];
                    subcategoryButton.onclick = () => showItems(category, subcategory);
                    menuContainer.appendChild(subcategoryButton);
                });
            } else {
                console.error(`Category "${category}" not found in the menu.`);
            }
        })
        .catch(error => console.error('Error fetching menu.json:', error));
}

// Function to show items for a specific subcategory
function showItems(category, subcategory) {
    const menuContainer = document.getElementById('menu-container');
    
    // Clear the existing content
    menuContainer.innerHTML = '';

    // Fetch JSON data from the menu.json file
    fetch('menu.json')
        .then(response => response.json())
        .then(jsonData => {
            // Check if the category and subcategory exist in the JSON data
            if (jsonData.hasOwnProperty(category)) {
                const subcategories = jsonData[category];                
                const selectedSubcategory = subcategories.find(sub => Object.keys(sub)[0] === Object.keys(subcategory)[0]);
                if (selectedSubcategory) {
                    const items = selectedSubcategory[Object.keys(subcategory)[0]];
                    const categoryHTML = createMenuHTML(Object.keys(subcategory)[0], items);
                    menuContainer.innerHTML += categoryHTML;
                } else {
                    console.error(`Subcategory "${Object.keys(subcategory)[0]}" not found in the menu.`);
                }
            } else {
                console.error(`Category "${category}" not found in the menu.`);
            }
        })
        .catch(error => console.error('Error fetching menu.json:', error));
}


async function test(clickedDiv, divCategoryName) {
    const h2Element = clickedDiv.querySelector('h2');
    const categoryDiv = document.getElementById(divCategoryName);
    const category = categoryDiv.querySelector('h2').innerHTML.toLowerCase();
    if (h2Element) {        
        const foundItem = ShopList.find(item => item.name == h2Element.innerHTML);
        if(foundItem){
            foundItem.quantity += 1;
        }else{
            const newItem = { type: category, name: h2Element.innerHTML, quantity: 1 };
            ShopList.push(newItem);
        }
    } else {
        console.log('No h2 element found in the clicked div.');
    }
}

async function sendItems() {
    console.log(ShopList);
    var containerDiv = document.getElementById('myDiv');
    containerDiv.innerHTML = '';

    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = `<span style="color: blue;"> Categoría <span style="color: black;">- Nombre -</span> <span style="color: red;">Cantidad</span>`;
    containerDiv.appendChild(titleDiv);

    var itemDiv = document.createElement('div');
    itemDiv.innerHTML = `- - - - - - - - - - - - - - - - - - - - - - -`;
    containerDiv.appendChild(itemDiv);

    ShopList.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item'); // Add a class for styling
        itemDiv.innerHTML = `<span style="color: blue;">${item.type}</span> - ${item.name}: <span style="color: red;">${item.quantity}</span>`;
        containerDiv.appendChild(itemDiv);
    });

    itemDiv = document.createElement('div');
    itemDiv.innerHTML = `- - - - - - - - - - - - - - - - - - - - - - -`;
    containerDiv.appendChild(itemDiv);

    const confirmDiv = document.createElement('button');
    confirmDiv.onclick = sendMessage;
    confirmDiv.innerHTML = 'Confirmar Orden';
    containerDiv.appendChild(confirmDiv);

    const totalHeight = Array.from(containerDiv.children).reduce((sum, itemDiv) => sum + itemDiv.clientHeight, 0);
    containerDiv.style.height = `${ShopList.length * 20 + 150}px`;

    if(ShopList.length == 0) containerDiv.innerHTML = 'Prueba agregando algo :D';
    containerDiv.style.display = (containerDiv.style.display === 'none') ? 'block' : 'none';
}

function fetchExistingContent(githubUsername, repoName, filePath, branchName) {
    const apiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}?ref=${branchName}`;
    
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const content = atob(data.content).split('\n').join('\n');
            const sha = data.sha || null;
            return { content, sha };
        })
        .catch(error => {
            console.error('Error fetching existing content:', error);
            throw error;
        });
}

function updateGitHubFile(githubUsername, repoName, filePath, branchName, encodedContent, latestCommitSHA) {
    const apiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`;
    console.log("Attempt to UPDATE");
    console.log(githubUsername, repoName, filePath, branchName, latestCommitSHA);
    return fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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',
        },
        body: JSON.stringify({
            message: 'Update text file via API',
            content: encodedContent,
            sha: latestCommitSHA,
            branch: branchName,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status :0  : ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error updating GitHub file:', error);
        throw error;
    });
}


function sendMessage() {
    console.log("Let's update the command.txt file");

    const githubUsername = 'amaesc';
    const repoName = 'amaesc.github.io';
    const filePath = 'command/commands.txt';
    const branchName = 'main';

    fetchExistingContent(githubUsername, repoName, filePath, branchName)
        .then(({ content, sha }) => {
            const newTextContent = createTextContent(10, ShopList);
            const mergedContent = content + newTextContent;
            const encodedContent = btoa(mergedContent);

            return updateGitHubFile(githubUsername, repoName, filePath, branchName, encodedContent, sha);
        })
        .then(updatedData => {
            console.log('File updated successfully:', updatedData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


const createTextContent = (tableNumber, items) => {
    const header = `MESA: ${tableNumber}`;
    const separator = '- - - - - - - - - -';
  
    const itemsText = items.map(item => {
      return `  type: ${item.type}, name: ${item.name}, quantity: ${item.quantity}`;
    }).join('\n');
  
    return `${header}\n${itemsText}\n${separator}`;
};


document.addEventListener('DOMContentLoaded', showCategories);
