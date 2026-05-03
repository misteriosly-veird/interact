let json_path = "";

const path = window.location.pathname;

if (path.includes("logs")) {
    json_path = "../feed/log.json";
} else if (path.includes("abstract")) {
    json_path = "../feed/abstract.json";
} else {
    json_path = "../feed/extracted.json"
}



async function loadFeed() {
    const container = document.querySelector(".abstract_feed");

    try {
        const res = await fetch(json_path);
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