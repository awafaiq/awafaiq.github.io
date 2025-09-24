document.addEventListener("DOMContentLoaded", function () {
  const contentDiv = document.getElementById("content"); //linked to quiz1.html, a reminder to change from plain <main>
  const navLinks = document.querySelectorAll("nav a");
  const loadContent = async (url) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const newContent = doc.querySelector("main").innerHTML;

      contentDiv.innerHTML = newContent;

      const scripts = contentDiv.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        document.body.appendChild(newScript);
        oldScript.remove();
      });
    } catch (error) {
      console.error("Error loading content:", error);
      contentDiv.innerHTML = "Sorry, the content could not be loaded.";
    }
  };

  loadContent("quiz1/homepage.html");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const href = this.getAttribute("href");
      loadContent(href);
    });
  });
});
