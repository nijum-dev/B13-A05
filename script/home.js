const container = document.getElementById("issues-container");
const filterBtns = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("issue-modal");
const searchInput = document.querySelector('input[placeholder="Search issues..."]');

let allIssues = [];


function renderIssues(issues) {

    container.innerHTML = "";

    issues.forEach(issue => {

        const isOpen = issue.status.toLowerCase() === "open";
        const borderColor = isOpen
            ? "border-t-[4px] border-green-500"
            : "border-t-[4px] border-purple-500";

        const statusImg = isOpen
            ? "assets/Open-Status.png"
            : "assets/Closed- Status .png";

        let priorityBadge = "";
        const p = (issue.priority || "").toUpperCase();
        if (p === "HIGH") {
            priorityBadge = "bg-red-100 text-red-700";
        } else if (p === "MEDIUM") {
            priorityBadge = "bg-yellow-100 text-yellow-700";
        } else {
            priorityBadge = "bg-purple-100 text-purple-700";
        }

        const card = `
<div onclick='openModal(${JSON.stringify(issue)})'
class="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-3 ${borderColor} cursor-pointer">

<div class="flex justify-between items-center">

<img src="${statusImg}" class="w-6 h-6">

<span class="text-xs font-semibold px-3 py-1 rounded-full ${priorityBadge}">
${issue.priority}
</span>

</div>

<h3 class="font-semibold text-sm">
${issue.title}
</h3>

<p class="text-gray-500 text-xs">
${issue.description.slice(0, 70)}${issue.description.length > 70 ? "..." : ""}
</p>

<div class="flex gap-2 flex-wrap">
${issue.labels?.map(label => {
            if (label.toLowerCase() === 'bug') {
                return `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[rgba(254,202,202,1)] text-[#EF4444]"><i class="fa-solid fa-bug"></i>${label.toUpperCase()}</span>`;
            }
            else if (label.toLowerCase() === 'help wanted') {
                return `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#FDE68A] text-[#D97706]"> 
                 <img src="./assets/Lifebuoy.png" alt="">
                  ${label.toUpperCase()}</span>`;
            }

            else if (label.toLowerCase() === 'enhancement') {
                return `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#00a96e2a] text-[#00A96E]"> 
                 <img src="./assets/Sparkle.png" alt="">
                  ${label.toUpperCase()}</span>`;
            }
            else if (label.toLowerCase() === 'documentation') {
                return `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#b1e9f5] text-[#000ea9a4]"> 
                 <i class="fa-brands fa-readme"></i>
                  ${label.toUpperCase()}</span>`;
            }
            else if (label.toLowerCase() === 'good first issue') {
                return `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#c1b1f56b] text-[#6000a9b7]"> 
                 <i class="fa-solid fa-pen-nib"></i>
                  ${label.toUpperCase()}</span>`;
            }


            else {
                return `<span class="badge bg-gray-100 text-gray-700 text-xs">${label.toUpperCase()}</span>`;
            }
        }).join("")}
</div>

<div class="flex border-t-1 justify-between text-xs text-gray-400 pt-2">


<span>#${issue.id} by ${issue.author}</span>

<span>${new Date(issue.createdAt).toLocaleDateString()}</span>

</div>

</div>
`;

        container.innerHTML += card;

    });

}

// modal open
function openModal(issue) {

    document.getElementById("modal-title").textContent = issue.title;

    document.getElementById("modal-author").textContent =
        "Opened by " + issue.author;

    document.getElementById("modal-date").textContent =
        new Date(issue.createdAt).toLocaleDateString();

    document.getElementById("modal-description").textContent =
        issue.description;

    document.getElementById("modal-assignee").textContent =
        issue.author;

    // status
    const statusEl = document.getElementById("modal-status");

    if (issue.status.toLowerCase() === "open") {
        statusEl.innerHTML =
            '<span class="badge bg-green-100 text-green-700">Opened</span>';
    }
    else {
        statusEl.innerHTML =
            '<span class="badge bg-purple-100 text-purple-700">Closed</span>';
    }

    // labels
    const labelsContainer = document.getElementById("modal-labels");

    labelsContainer.innerHTML = issue.labels?.map(label =>
        `<span class="badge bg-gray-100 text-gray-700">${label}</span>`
    ).join("");

    // priority
    const priorityEl = document.getElementById("modal-priority");

    priorityEl.textContent = issue.priority;

    if (issue.priority === "HIGH") {
        priorityEl.className =
            "px-3 py-1 rounded-full bg-red-500 text-white text-xs";
    }
    else if (issue.priority === "MEDIUM") {
        priorityEl.className =
            "px-3 py-1 rounded-full bg-yellow-500 text-white text-xs";
    }
    else {
        priorityEl.className =
            "px-3 py-1 rounded-full bg-purple-500 text-white text-xs";
    }

    modal.showModal();

}

function closeModal() {
    modal.close();
}

// new issue button
const newIssueBtn = document.querySelector(".btn.bg-\\[\\#4A00FF\\]");
const newIssueModal = document.getElementById("new-issue-modal");
const closeNewIssueBtn = document.getElementById("close-new-issue");
const newIssueForm = document.getElementById("new-issue-form");

if (newIssueBtn) {
    newIssueBtn.addEventListener("click", () => {
        newIssueModal.showModal();
    });
}

if (closeNewIssueBtn) {
    closeNewIssueBtn.addEventListener("click", () => {
        newIssueModal.close();
    });
}

if (newIssueForm) {
    newIssueForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("new-issue-title").value;
        const description = document.getElementById("new-issue-description").value;
        const priority = document.getElementById("new-issue-priority").value;

        const newIssue = {
            title,
            description,
            priority,
            status: "open",
            author: "CurrentUser",
            createdAt: new Date().toISOString(),
            labels: []
        };

        try {
            const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newIssue)
            });

            if (res.ok) {
                allIssues.unshift(newIssue);
                renderIssues(allIssues);
                newIssueModal.close();
                newIssueForm.reset();
                alert("Issue created successfully!");
            }
        } catch (error) {
            console.log("Error creating issue:", error);
            alert("Failed to create issue");
        }
    });
}

// load issues
async function loadIssues() {
    const loadingEl = document.getElementById("issues-loading");
    const containerEl = document.getElementById("issues-container");

    loadingEl.style.display = "flex";
    containerEl.style.display = "none";

    // Minimum 2s delay for visible spinner
    const startTime = Date.now();
    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();

        allIssues = data.data;
        renderIssues(allIssues);
    } catch (error) {
        console.log("Error loading issues:", error);
        containerEl.innerHTML = '<p class="text-center text-gray-500 col-span-full">Failed to load issues. Please refresh.</p>';
        containerEl.style.display = "grid";
        loadingEl.style.display = "none";
        return;
    }


    const elapsed = Date.now() - startTime;
    const remaining = 200 - elapsed;
    if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining));
    }

    loadingEl.style.display = "none";
    containerEl.style.display = "grid";
}

// active button
function setActive(btn) {

    filterBtns.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

}

// filters
filterBtns.forEach(btn => {

    btn.addEventListener("click", async () => {

        setActive(btn);

        const loadingEl = document.getElementById("issues-loading");
        const containerEl = document.getElementById("issues-container");

        loadingEl.style.display = "flex";
        containerEl.style.display = "none";

        const startTime = Date.now();

        const type = btn.textContent.trim().toLowerCase();

        let filteredIssues = [];

        if (type === "all") {
            filteredIssues = allIssues;
        } else if (type === "open") {
            filteredIssues = allIssues.filter(issue => issue.status.toLowerCase() === "open");
        } else if (type === "closed") {
            filteredIssues = allIssues.filter(issue => issue.status.toLowerCase() === "closed");
        }

        renderIssues(filteredIssues);

        const elapsed = Date.now() - startTime;
        const remaining = 200 - elapsed;
        if (remaining > 0) {
            await new Promise(resolve => setTimeout(resolve, remaining));
        }

        loadingEl.style.display = "none";
        containerEl.style.display = "grid";

    });

});

// search functionality
searchInput.addEventListener("input", async (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    const loadingEl = document.getElementById("issues-loading");
    const containerEl = document.getElementById("issues-container");

    loadingEl.style.display = "flex";
    containerEl.style.display = "none";

    const startTime = Date.now();

    const filteredIssues = allIssues.filter(issue => {
        return (
            issue.title.toLowerCase().includes(searchTerm) ||
            issue.description.toLowerCase().includes(searchTerm) ||
            issue.author.toLowerCase().includes(searchTerm) ||
            issue.id.toString().includes(searchTerm)
        );
    });

    renderIssues(filteredIssues);

    const elapsed = Date.now() - startTime;
    const remaining = 1000 - elapsed;
    if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining));
    }

    loadingEl.style.display = "none";
    containerEl.style.display = "grid";
});

// start
window.addEventListener("DOMContentLoaded", loadIssues);


