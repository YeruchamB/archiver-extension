document.addEventListener('DOMContentLoaded', function() {
  const currentUrlElement = document.getElementById('currentUrl');
  const archiveBtn = document.getElementById('archiveBtn');
  const loadingElement = document.getElementById('loading');
  const statusElement = document.getElementById('status');

  // Get the current active tab's URL
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0] && tabs[0].url) {
      const currentUrl = tabs[0].url;
      currentUrlElement.textContent = currentUrl;
      
      // Handle archive button click
      archiveBtn.addEventListener('click', function() {
        archiveUrl(currentUrl);
      });
    } else {
      currentUrlElement.textContent = 'Unable to get current URL';
      archiveBtn.disabled = true;
    }
  });

  function archiveUrl(url) {
    // Show loading state
    loadingElement.style.display = 'block';
    archiveBtn.style.display = 'none';
    statusElement.textContent = 'Checking Wayback Machine...';
    
    // Check Wayback Machine availability
    const waybackApiUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(url)}`;
    
    fetch(waybackApiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.archived_snapshots && data.archived_snapshots.closest && data.archived_snapshots.closest.available) {
          // URL is archived, open the archived version
          const archivedUrl = data.archived_snapshots.closest.url;
          chrome.tabs.create({url: archivedUrl, active: true});
          statusElement.textContent = 'Opening archived version...';
          
          // Close popup after a short delay
          setTimeout(() => {
            window.close();
          }, 1000);
        } else {
          // URL is not archived, show message
          statusElement.textContent = 'No archived version found for this URL.';
          loadingElement.style.display = 'none';
          archiveBtn.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error checking Wayback Machine:', error);
        // Show error message if API fails
        statusElement.textContent = 'Error checking archive. Please try again.';
        loadingElement.style.display = 'none';
        archiveBtn.style.display = 'block';
      });
  }
}); 