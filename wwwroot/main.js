function postMessage(message, data) {
    window.chrome.webview.postMessage({ message, data });
}

// Register message handler.
if (window.chrome.webview) {
    window.chrome.webview.addEventListener("message", handleMessage);
    // Indicate that you are ready to receive messages.
    postMessage("MessageListenerRegistered");
} else {
    console.error("window.chrome.webview is not available.");
}

function getPolicy(path, policies) {
    for (const policy of policies) {
        if (policy.path == path) {
            return policy;
        }
    }
}


function renderTestCase(testsuite, testcase, policies) {
    let tr = document.createElement("tr");
    let tdSeverity = document.createElement("td");
    let tdDocument = document.createElement("td");
    let tdRuleName = document.createElement("td");
    let tdCategory = document.createElement("td");
    let tdStatus = document.createElement("td");
    const policy = getPolicy(testsuite.name, policies);
    tdSeverity.innerText = policy.severity;

    let details = document.createElement("details");
    let summary = document.createElement("summary");
    summary.innerText = testcase.name;
    details.appendChild(summary);

    let pDescription = document.createElement("p");
    let title = document.createElement("strong");
    title.innerText = policy.title;
    let description = document.createElement("span");
    description.innerText = policy.description;


    pDescription.appendChild(title);
    pDescription.appendChild(document.createElement("br"));
    pDescription.appendChild(description);
    details.appendChild(pDescription);

    let pRemediation = document.createElement("p");
    let remediation = document.createElement("strong");
    remediation.innerText = "Remediation";
    let remediationDescription = document.createElement("span");
    remediationDescription.innerText = policy.remediation;
    pRemediation.appendChild(remediation);
    pRemediation.appendChild(document.createElement("br"));
    pRemediation.appendChild(remediationDescription);
    pRemediation.classList.add("pico-color-blue");
    details.appendChild(pRemediation);

    if (testcase.failure) {
        let pError = document.createElement("p");
        let error = document.createElement("strong");
        error.innerText = "Error";
        let errorDescription = document.createElement("span");
        errorDescription.innerText = testcase.failure.message;
        pError.appendChild(error);
        pError.appendChild(document.createElement("br"));
        pError.appendChild(errorDescription);
        pError.classList.add("pico-color-orange");
        details.appendChild(pError);
    }

    tdDocument.appendChild(details);
    tdRuleName.innerText = policy.ruleName;
    tdCategory.innerText = policy.category;

    let status = "pass";
    let statusClass = "pico-background-lime";
    if (policy.skipReason != "") {
        status = "skipped";
        statusClass = "pico-background-slate";
    }
    if (testcase.failure) {
        status = "failed";
        statusClass = "pico-background-orange";
    }
    let spanStatus = document.createElement("span");
    spanStatus.innerText = status;
    spanStatus.classList.add("label");
    spanStatus.classList.add(statusClass);
    tdStatus.appendChild(spanStatus);

    tr.appendChild(tdSeverity);
    tr.appendChild(tdDocument);
    tr.appendChild(tdRuleName);
    tr.appendChild(tdCategory);
    tr.appendChild(tdStatus);
    return tr;
}

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

    for (const testsuite of data.testsuites) {

        let testcases = testsuite.testcases;
        for (const testcase of testcases) {
            let tr = renderTestCase(testsuite, testcase, data.policies);
            policyItems.push(tr);
        }
    }

    policies.replaceChildren(...policyItems);
}

document.getElementById("LintButton").addEventListener("click", () => {
    postMessage("LintModel");
    refreshData();
});

await refreshData();