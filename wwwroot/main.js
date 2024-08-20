
function postMessage(message, data) {
    window.chrome.webview.postMessage({ message, data });
}

async function handleMessage(event) {
    console.log(event);
    const { message, data } = event.data;
    if (message === "refreshData") {
        await refreshData();
    } else if (message === "start") {
        document.getElementById("loading").classList.remove("hidden");
        document.getElementById("result").classList.add("hidden");
    } else if (message === "end") {
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("result").classList.remove("hidden");
    }
}

window.chrome.webview.addEventListener("message", handleMessage);


function getPolicy(path, policies) {
    for (const policy of policies) {
        if (policy.path == path) {
            return policy;
        }
    }
}

function flattenTestCase(testsuite, testcase, policies) {
    const policy = getPolicy(testsuite.name, policies);
    let status = "pass";
    let statusClass = "pico-background-lime";
    if (policy.skipReason != "") {
        status = "skip";
        statusClass = "pico-background-slate";
    }
    if (testcase.failure) {
        status = "fail";
        statusClass = "pico-background-orange";
    }
    testcase.policy = policy;
    testcase.status = status;
    testcase.statusClass = statusClass;
    return testcase;
}

function renderTestCase(testcase) {
    let tr = document.createElement("tr");
    let tdSeverity = document.createElement("td");
    let tdDocument = document.createElement("td");
    let tdRuleName = document.createElement("td");
    let tdCategory = document.createElement("td");
    let tdStatus = document.createElement("td");
    tdSeverity.innerText = testcase.policy.severity;

    let details = document.createElement("details");
    let summary = document.createElement("summary");
    summary.innerText = testcase.name;
    details.appendChild(summary);

    let pDescription = document.createElement("p");
    let title = document.createElement("strong");
    title.innerText = testcase.policy.title;
    let description = document.createElement("span");
    description.innerText = testcase.policy.description;


    pDescription.appendChild(title);
    pDescription.appendChild(document.createElement("br"));
    pDescription.appendChild(description);
    details.appendChild(pDescription);

    let pRemediation = document.createElement("p");
    let remediation = document.createElement("strong");
    remediation.innerText = "Remediation";
    let remediationDescription = document.createElement("span");
    remediationDescription.innerText = testcase.policy.remediation;
    pRemediation.appendChild(remediation);
    pRemediation.appendChild(document.createElement("br"));
    pRemediation.appendChild(remediationDescription);
    pRemediation.classList.add("pico-color-blue");
    details.appendChild(pRemediation);

    if (testcase.status === "fail") {
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
    tdRuleName.innerText = testcase.policy.ruleName;
    tdCategory.innerText = testcase.policy.category;

    let spanStatus = document.createElement("span");
    spanStatus.innerText = testcase.status;
    spanStatus.classList.add("label");
    spanStatus.classList.add(testcase.statusClass);
    tdStatus.appendChild(spanStatus);

    tr.appendChild(tdSeverity);
    tr.appendChild(tdDocument);
    tr.appendChild(tdRuleName);
    tr.appendChild(tdCategory);
    tr.appendChild(tdStatus);
    return tr;
}

async function refreshData() {
    let response = await fetch("./api");
    let data = await response.json();

    let policies = document.getElementById("policies");

    let policyItems = [];
    let pass = 0;
    let skip = 0;
    let fail = 0;
    let total = 0;

    for (const testsuite of data.testsuites) {

        let testcases = testsuite.testcases;
        for (const testcase of testcases) {
            let ts = flattenTestCase(testsuite, testcase, data.policies);
            let tr = renderTestCase(ts);
            policyItems.push(tr);
            if (ts.status === "fail") {
                fail++;
            } else if (ts.status === "skip") {
                skip++;
            } else {
                pass++;
            }
        }
    }
    total = pass + skip + fail;
    document.getElementById("summaryTotal").innerText = total;
    document.getElementById("summaryPass").innerText = pass;
    document.getElementById("summarySkip").innerText = skip;
    document.getElementById("summaryFail").innerText = fail;

    if (fail > 0) {
        document.getElementById("result").innerText = "fail";
        document.getElementById("result").classList.value = "pico-background-orange";
    } else {
        document.getElementById("result").innerText = "pass";
        document.getElementById("result").classList.value = "pico-background-lime";
    }
    document.getElementById("result").classList.add("label");



    policies.replaceChildren(...policyItems);
}

function init() {
    document.getElementById("policies").replaceChildren();
    document.getElementById("summaryTotal").innerText = "-";
    document.getElementById("summaryPass").innerText = "-";
    document.getElementById("summarySkip").innerText = "-";
    document.getElementById("summaryFail").innerText = "-";
    document.getElementById("result").innerText = "-";
}

/*
document.getElementById("LintButton").addEventListener("click", () => {
    postMessage("LintModel");
});
*/

init();

postMessage("MessageListenerRegistered");
setInterval(async () => {
    postMessage("refreshData");
    //    await refreshData();
}, 1000);