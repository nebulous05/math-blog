document.addEventListener("DOMContentLoaded", () => {

  // Define all posts with tags
  const posts = [
    { 
      title: "Example Proof: Sum of First n Integers", 
      file: "example-post.md",
      tags: ["Algebra", "Induction"]
    },
    {
      title: "A Neat Number Theory Lemma",
      file: "number-theory.md",
      tags: ["Number Theory"]
    },
    {
      title: "Combinatorial Argument Example",
      file: "combinatorics.md",
      tags: ["Combinatorics"]
    }
  ];

  // Extract all unique tags
  const uniqueTags = [...new Set(posts.flatMap(p => p.tags))];

  // Create filter checkboxes
  const tagContainer = document.getElementById("tag-filters");
  const postContainer = document.getElementById("posts-container");

  uniqueTags.forEach(tag => {
    const label = document.createElement("label");
    label.classList.add("tag-option");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = tag;
    checkbox.onchange = updatePosts;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(tag));
    tagContainer.appendChild(label);
  });

  // Load and display posts
  async function updatePosts() {
    const selected = Array.from(document.querySelectorAll('#tag-filters input:checked')).map(cb => cb.value);
    const filtered = selected.length === 0
      ? posts
      : posts.filter(p => selected.every(tag => p.tags.includes(tag)));

    // Clear and repopulate
    postContainer.innerHTML = "";
    for (const post of filtered) {
      const res = await fetch(`posts/${post.file}`);
      const text = await res.text();
      const html = marked.parse(text);

      const postDiv = document.createElement("div");
      postDiv.className = "post";

      const tagHTML = post.tags.map(t => `<span class="tag">${t}</span>`).join('');
      postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <div class="tags">${tagHTML}</div>
        <div class="content">${html}</div>
      `;

      postContainer.appendChild(postDiv);
    }

    if (window.MathJax) MathJax.typesetPromise();
  }

  // Load all posts on page load
  updatePosts();
});
