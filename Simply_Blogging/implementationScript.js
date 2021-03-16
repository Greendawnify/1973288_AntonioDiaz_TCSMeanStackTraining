var container = document.getElementById("displayContainer");

// checks storage if there are any blogs to add at startup
(function run() {
  if (localStorage.length > 0) {
    Object.keys(localStorage).forEach(function (key) {
      console.log(localStorage.getItem(key));
      initialAdd(JSON.parse(localStorage.getItem(key)));
    });
  }
})();

// clears the blogs from display section when clear button is clicked
function newClear() {
  //Storage.clear();
  localStorage.clear();
  console.log("cleared");
  window.location.reload();
}

// adds blog when button is clicked. Checks to make sure input is valid
function addBlog() {
  var newDiv = document.createElement("div");
  newDiv.className = "col-4";

  // get info from inputs
  var t = document.getElementById("titleID").value;
  t = t.trim();

  var a = document.getElementById("articleID").value;
  a.trim();

  // make sure input is valid
  if (a == "" || t == "") {
    alert("Not valid input");
    resetInput();
    return;
  }

  // add info to new div
  var titleHeading = document.createElement("h3");
  titleHeading.innerHTML = t;

  var article = document.createElement("p");
  article.innerHTML = a;
  try {
    var image = document.createElement("img");
    var imageFileName = document.getElementById("imageID").files[0].name;
    image.src = imageFileName;
  } catch {}

  createData(t, a, imageFileName);

  // add elements to the new div
  newDiv.appendChild(titleHeading);
  newDiv.appendChild(article);
  newDiv.appendChild(image);
  newDiv.appendChild(document.createElement("br"));
  newDiv.appendChild(document.createElement("br"));

  container.appendChild(newDiv);
  resetInput();
}

// the function that adds the blogs at start up
function initialAdd(blogObj) {
  var newDiv = document.createElement("div");
  newDiv.className = "col-4";

  var titleHeading = document.createElement("h3");
  titleHeading.innerHTML = blogObj.title;

  var article = document.createElement("p");
  article.innerHTML = blogObj.article;

  if (blogObj.image != "") {
    var image = document.createElement("img");
    image.src = blogObj.image;
  }

  newDiv.appendChild(titleHeading);
  newDiv.appendChild(article);
  newDiv.appendChild(image);
  newDiv.appendChild(document.createElement("br"));
  newDiv.appendChild(document.createElement("br"));

  container.appendChild(newDiv);
  console.log("successs");
}

// creates data to add to storage
function createData(title, article, image = "") {
  var newObj = {
    title,
    article,
    image,
  };
  var newKey = title + article + image;
  localStorage.setItem(newKey, JSON.stringify(newObj));
}

// after a blog has been added reset the input values
function resetInput() {
  document.getElementById("titleID").value = "";
  document.getElementById("articleID").value = "";
  document.getElementById("imageID").value = "";
}
