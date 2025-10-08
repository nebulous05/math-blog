// List your posts here (title + filename)
const posts = [
  { title: "Example Proof: Sum of First n Integers", file: "example-post.md" },
  { title: "Another Post", file: "another-post.md" }
];

// Populate sidebar with links
const postList = document.getElementById("post-list");
posts.forEach(post => {
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = post.title;
  link.onclick = () => loadPost(post.file);
  postList.appendChild(link);
});

const postContent = document.getElementById("post-content");

// Load markdown post and render with MathJax
async function loadPost(filename) {
  const res = await fetch(`posts/${filename}`);
  const text = await res.text();
  postContent.innerHTML = marked.parse(text);
  if (window.MathJax) MathJax.typesetPromise();
}

// Load the first post on startup
loadPost(posts[0].file);
