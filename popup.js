document.getElementById('changeButton').addEventListener('click', () => {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        const imageData = reader.result;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'changeProfilePictures', imageData: imageData });
        });
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
    }
});
