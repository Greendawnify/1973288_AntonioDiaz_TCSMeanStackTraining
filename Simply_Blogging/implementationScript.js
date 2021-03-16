function addBlog() {
  var container = document.getElementById("displayContainer");

  var newDiv = document.createElement("div");
  newDiv.className = "col-4";

  // add info to new div
  var titleHeading = document.createElement("h3");
  titleHeading.innerHTML = document.getElementById("titleID").value;

  var article = document.createElement("p");
  article.innerHTML = document.getElementById("articleID").value;
  try {
    var image = document.createElement("img");
    image.src = document.getElementById("imageID").files[0].name;
  } catch {}

  newDiv.appendChild(titleHeading);
  newDiv.appendChild(article);
  newDiv.appendChild(image);

  container.appendChild(newDiv);
}
