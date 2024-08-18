function postMessage(message, data) {
    window.chrome.webview.postMessage({ message, data });
}

// Register message handler.
window.chrome.webview.addEventListener("message", handleMessage);
// Indicate that you are ready to receive messages.
postMessage("MessageListenerRegistered");

async function handleMessage(event) {
    const { message, data } = event.data;
    if (message === "refreshData") {
        await refreshData();
    }
}

async function refreshData() {
    let response = await fetch("./api");
    let data = await response.json();

    let policies = document.getElementById("policies");

    let policyItems = [];

    for (const item of data.testsuites) {

        let tr = document.createElement("tr");
        let tdName = document.createElement("td");
        let tdStatus = document.createElement("td");
        let tdActions = document.createElement("td");
        tdName.innerText = item.name;
        tdStatus.innerText = "passed";

        tr.appendChild(tdName);
        tr.appendChild(tdStatus);
        tr.appendChild(tdActions);
        policyItems.push(tr);
    }

    policies.replaceChildren(...policyItems);
}

document.getElementById("LintButton").addEventListener("click", () => {
    postMessage("LintModel");
    refreshData();
});

await refreshData();