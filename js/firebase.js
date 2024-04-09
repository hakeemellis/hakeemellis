document.addEventListener('DOMContentLoaded', () => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imagesContainer = document.getElementById('slideshow-container');
    let currentImageIndex = 0;
    let contentUrls = [];
  
    // Function to load content from Firebase Storage based on project name
    function loadContentFromFirebase(projectName) {
      imagesContainer.innerHTML = '';
      currentImageIndex = 0;
  
      const projectRef = storageRef.child('graphic-portfolio/' + projectName);
  
      projectRef.listAll().then((result) => {
        contentUrls = [];
        result.items.forEach((itemRef, index) => {
          itemRef.getDownloadURL().then((url) => {
            contentUrls.push({ url, type: getItemType(itemRef) });
  
            if (contentUrls.length === 1) {
              showContent(contentUrls[0]);
              enableNavigationControls();
            }
          });
        });
      });
    }
  
    // Function to determine the type of an item (image, video, or PDF)
    function getItemType(itemRef) {
      const itemName = itemRef.name.toLowerCase();
      if (itemName.endsWith('.jpg') || itemName.endsWith('.jpeg') || itemName.endsWith('.png')) {
        return 'image';
      } else if (itemName.endsWith('.mp4')) {
        return 'video';
      } else if (itemName.endsWith('.gif')) {
        return 'gif';
      } else if (itemName.endsWith('.pdf')) {
        return 'pdf';
      } else {
        return 'unknown';
      }
    }
  
    // Function to show content in the modal based on its type
    function showContent(content) {
      imagesContainer.innerHTML = '';
  
      if (content.type === 'image' || content.type === 'gif') {
        const img = document.createElement('img');
        img.src = content.url;
        img.alt = 'Design Preview';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100vh';
        imagesContainer.appendChild(img);
      } else if (content.type === 'video') {
        const video = document.createElement('video');
        video.src = content.url;
        video.type = 'video/mp4';
        video.controls = true;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';
        imagesContainer.appendChild(video);
      } else if (content.type === 'pdf') {
        const pdfEmbed = document.createElement('embed');
        pdfEmbed.src = content.url;
        pdfEmbed.type = 'application/pdf';
        pdfEmbed.style.width = '100%';
        pdfEmbed.style.height = '100vh';
        imagesContainer.appendChild(pdfEmbed);
      }
    }
  
    // Function to enable navigation controls
    function enableNavigationControls() {
      const nextButton = document.getElementById('nextButton');
      const prevButton = document.getElementById('prevButton');
  
      nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % contentUrls.length;
        showContent(contentUrls[currentImageIndex]);
        prevButton.disabled = false;
      });
  
      prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + contentUrls.length) % contentUrls.length;
        showContent(contentUrls[currentImageIndex]);
        prevButton.disabled = currentImageIndex <= 0;
        nextButton.disabled = false;
      });
  
      prevButton.disabled = contentUrls.length <= 1;
    }
  
    // Example usage when an image is clicked
    const imageLinks = document.querySelectorAll('.image-container a');
  
    imageLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const projectName = link.getAttribute('data-project');
        loadContentFromFirebase(projectName);
  
        const modal = document.getElementById('slideshowModal');
        modal.style.display = 'block'; // Show the modal
      });
    });
  
    // Close the modal when the close button is clicked
    document.querySelector('.modal-header .close').addEventListener('click', function () {
      const modal = document.getElementById('slideshowModal');
      modal.style.display = 'none'; // Hide the modal
    });
  });
  
  
