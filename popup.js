
// Add an event listener to the button that will add the tabs to a bookmark folder when clicked
// buttonElement.addEventListener("click", doit);
document.getElementById('addTabsToFolder').onclick = doit;


function doit() {
  // Get the input element and button element from the popup window
  var inputElement = document.getElementById("folderName");
  var buttonElement = document.getElementById("addTabsToFolder");

  console.log("HERE!!");
  // Get the name of the bookmark folder from the input element
  var folderName = inputElement.value;
  console.log("Folder name " + folderName);

folderId = chrome.bookmarks.create(
  {'parentId': "1" /*bookmarkBar.id*/, 'title':  folderName},
  function(newFolder) {
    console.log("added folder: " + newFolder.title);
  },
);
  
  // Get all open tabs
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    // Loop through each tab and add it to a bookmark folder with the specified name
    for (var i = 0; i < tabs.length; i++) {
      var url = tabs[i].url;
      var title = tabs[i].title;
      console.log("tab name " + title + " url " + url);
      chrome.bookmarks.create({ parentId: folderId, title: title, url: url }, function(result) {
        console.log("added tab name " + title + " url " + url);
        // chrome.bookmarks.move([result], { parentId: folderId });
      });
    }
  });
}
