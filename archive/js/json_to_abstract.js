async function loadFeed() {
    const container = document.querySelector(".abstract_feed");

    try {
        const res = await fetch("../feed/extracted.json");
        const posts = await res.json();

        posts.forEach(post => {
            const article = document.createElement("article");
            article.className = "abstract_entry";

            article.innerHTML = `
                <h2 class="abstract_title">${post.title}</h2>
                <div class="abstract_body">
                    <p>${post.summary}</p>
                </div>
            `;

            container.appendChild(article);
        });

    } catch (err) {
        console.error("Could not load feed:", err);
    }
}

loadFeed();