function getText() {
    const githubUsername = 'amaesc';
    const repoName = 'amaesc.github.io';
    const filePath = 'command/commands.txt'; // Update the file extension to .txt
    const branchName = 'main';

    const apiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}?ref=${branchName}`;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const content = atob(data.content); // Decode base64 content
            displayTextInDiv(content, "textDisplay");
        })
        .catch(error => {
            console.error('Error fetching file content:', error);
        });
}

const displayTextInDiv = (text, divId) => {
    const displayDiv = document.getElementById(divId);

    if (displayDiv) {
        // Replace newline characters with HTML line breaks
        const formattedText = text.replace(/\n/g, '<br>');
        displayDiv.innerHTML = formattedText;
    } else {
        console.error(`Div with id '${divId}' not found.`);
    }
};

document.addEventListener('DOMContentLoaded', getText);
