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
    // Create the archive.is URL
    const archiveUrl = `https://archive.is/submit/?url=${encodeURIComponent(url)}`;
    
    // Open the archive.is URL in a new tab immediately
    chrome.tabs.create({url: archiveUrl, active: true});
    
    // Close the popup immediately
    window.close();
  }
}); 