let exampleData = {
    "testsuites": [
        {
            "name": "C:\\Users\\ops\\source\\repos\\cinaq\\mendix-cli-extension\\resources\\App\\.mendix-cache\\policies\\001_project_settings\\001_0001_anonymous_disabled.rego",
            "tests": 1,
            "failures": 0,
            "skipped": 0,
            "time": 0.0025816,
            "testcases": [
                {
                    "name": "modelsource\\Security$ProjectSecurity.yaml",
                    "time": 0.0025816
                }
            ]
        },
        {
            "name": "C:\\Users\\ops\\source\\repos\\cinaq\\mendix-cli-extension\\resources\\App\\.mendix-cache\\policies\\001_project_settings\\001_0002_demo_users_disabled.rego",
            "tests": 1,
            "failures": 1,
            "skipped": 0,
            "time": 0.0020738,
            "testcases": [
                {
                    "name": "modelsource\\Security$ProjectSecurity.yaml",
                    "time": 0.0020738,
                    "failure": {
                        "message": "[HIGH, Security, 4098] Business apps should disable demo users",
                        "type": "AssertionError"
                    }
                }
            ]
        },
        {
            "name": "C:\\Users\\ops\\source\\repos\\cinaq\\mendix-cli-extension\\resources\\App\\.mendix-cache\\policies\\001_project_settings\\001_0003_security_checks.rego",
            "tests": 1,
            "failures": 0,
            "skipped": 0,
            "time": 0.0025866,
            "testcases": [
                {
                    "name": "modelsource\\Security$ProjectSecurity.yaml",
                    "time": 0.0025866
                }
            ]
        }
    ],
    "policies": [
        {
            "title": "Business apps must always require login",
            "description": "No anonymous means every user must have valid login session or credentials",
            "category": "Security",
            "severity": "HIGH",
            "ruleNumber": "001_0001",
            "remediation": "Disable anonymous/guest access in Project Security",
            "ruleName": "AnonymousDisabled",
            "path": "C:\\Users\\ops\\source\\repos\\cinaq\\mendix-cli-extension\\resources\\App\\.mendix-cache\\policies\\001_project_settings\\001_0001_anonymous_disabled.rego",
            "skipReason": "",
            "pattern": "Security$ProjectSecurity.yaml",
            "packageName": "app.mendix.project_settings.anonymous_disabled"
        },
        {
            "title": "Business apps should disable demo users",
            "description": "No demo users",
            "category": "Security",
            "severity": "HIGH",
            "ruleNumber": "001_0002",
            "remediation": "Disable demo users in Project Security",
            "ruleName": "DemoUsersDisabled",
            "path": "C:\\Users\\ops\\source\\repos\\cinaq\\mendix-cli-extension\\resources\\App\\.mendix-cache\\policies\\001_project_settings\\001_0002_demo_users_disabled.rego",
            "skipReason": "",
            "pattern": "Security$ProjectSecurity.yaml",
            "packageName": "app.mendix.project_settings.demo_users_disabled"
        },
        {
            "title": "Ensure security rules are active",
            "description": "Any serious app needs entity access security configured",
            "category": "Security",
            "severity": "MEDIUM",
            "ruleNumber": "001_0003",
            "remediation": "Set Security check to production in Project Security",
            "ruleName": "SecurityChecks",
            "path": "C:\\Users\\ops\\source\\repos\\cinaq\\mendix-cli-extension\\resources\\App\\.mendix-cache\\policies\\001_project_settings\\001_0003_security_checks.rego",
            "skipReason": "",
            "pattern": "Security$ProjectSecurity.yaml",
            "packageName": "app.mendix.project_settings.security_checks"
        },
    ]
};
document.filter = ["HIGH", "MEDIUM", "LOW"];

function postMessage(message, data) {
    if (window.chrome.webview === undefined) {
        console.log("Missing webview ", message, data);
        return;
    }
    window.chrome.webview.postMessage({ message, data });
}

async function handleMessage(event) {
    console.log(event);
    const { message, data } = event.data;
    if (message === "refreshData") {
        await refreshData();
    } else if (message === "start") {
        document.getElementById("loading").classList.remove("hidden");
        document.getElementById("ready").classList.add("hidden");
    } else if (message === "end") {
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("ready").classList.remove("hidden");
    }
}

if (window.chrome.webview !== undefined) {
    window.chrome.webview.addEventListener("message", handleMessage);
}


function getPolicy(path, policies) {
    for (const policy of policies) {
        if (policy.path == path) {
            return policy;
        }
    }
}

function flattenTestCase(testsuite, testcase, policies) {
    console.log(testsuite.name);
    const policy = getPolicy(testsuite.name, policies);
    let status = "pass";
    let statusClass = "pico-background-cyan";
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
    // clean up name
    let modelsource = "modelsource\\";
    if (testcase.name.startsWith(modelsource)) {
        testcase.name = testcase.name.substring(modelsource.length);
    }
    return testcase;
}

function createSpan(text, className) {
    let span = document.createElement("span");
    span.innerText = text;
    if (className !== undefined) {
        span.classList.add(className);
    }
    return span;
}

function renderTestCase(testcase) {
    let tr = document.createElement("tr");
    let tdSeverity = document.createElement("td");
    tdSeverity.setAttribute("data-label", "Severity");
    let tdDocument = document.createElement("td");
    tdDocument.setAttribute("data-label", "Document");
    let tdRuleName = document.createElement("td");
    tdRuleName.setAttribute("data-label", "Rule");
    let tdCategory = document.createElement("td");
    tdCategory.setAttribute("data-label", "Category");
    let tdStatus = document.createElement("td");
    tdStatus.setAttribute("data-label", "Status");

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


    let spanStatus = document.createElement("span");
    spanStatus.innerText = testcase.status;
    spanStatus.classList.add("label");
    spanStatus.classList.add(testcase.statusClass);

    tdSeverity.replaceChildren(createSpan(testcase.policy.severity));
    tdDocument.replaceChildren(details);
    tdRuleName.replaceChildren(createSpan(testcase.policy.ruleName));
    tdCategory.replaceChildren(createSpan(testcase.policy.category));
    tdStatus.replaceChildren(spanStatus);

    tr.appendChild(tdSeverity);
    tr.appendChild(tdDocument);
    tr.appendChild(tdRuleName);
    tr.appendChild(tdCategory);
    tr.appendChild(tdStatus);
    return tr;
}

function renderData() {
    let details = document.getElementById("testcases");

    let policyItems = [];
    let pass = 0;
    let skip = 0;
    let fail = 0;
    let total = 0;
    let all_testcases = [];
    let data = document.data;

    for (const testsuite of data.testsuites) {
        let testcases = testsuite.testcases;
        for (const testcase of testcases) {
            let ts = flattenTestCase(testsuite, testcase, data.policies);
            if (ts.status === "fail") {
                fail++;
                ts.status_code = 1;
            } else if (ts.status === "skip") {
                skip++;
                ts.status_code = 2;
            } else {
                pass++;
                ts.status_code = 3;
            }
            if (ts.policy.severity === "HIGH") {
                ts.severity_code = 1;
            } else if (ts.policy.severity === "MEDIUM") {
                ts.severity_code = 2;
            } else {
                ts.severity_code = 3;
            }
            all_testcases.push(ts);
        }
    }

    let testcases_filtered = all_testcases.filter((ts) => document.filter.includes(ts.policy.severity));

    let testcases_sorted = testcases_filtered.sort((a, b) => {
        return a.severity_code - b.severity_code || a.status_code - b.status_code;
    });

    for (const ts of testcases_sorted) {
        let tr = renderTestCase(ts);
        policyItems.push(tr);
    }
    let policies = data.policies.length;

    total = pass + skip + fail;
    let passWidth = (pass / total) * 100;
    let skipWidth = (skip / total) * 100;
    let failWidth = (fail / total) * 100;
    document.getElementById("summaryPass").style = "width: " + passWidth + "%;";
    document.getElementById("summarySkip").style = "width: " + skipWidth + "%;";
    document.getElementById("summaryFail").style = "width: " + failWidth + "%;";

    document.getElementById("pass").innerText = pass;
    document.getElementById("skip").innerText = skip;
    document.getElementById("fail").innerText = fail;
    document.getElementById("total").innerText = total;
    document.getElementById("policies").innerText = policies;

    
    details.replaceChildren(...policyItems);
    if (total === 0) {
        details.replaceChildren(createSpan("Whoops! Nothing here yet", "pico-color-gray"));
    }
}

async function refreshData() {
    let response = await fetch("./api");
    document.data = await response.json();
    renderData();
}

function init() {
    document.data = {
        "testsuites": [],
        "policies": []
    }
    //document.data = exampleData;
    renderData();
}


document.getElementById("toggleDebug").addEventListener("click", () => {
    let hidden = document.getElementById("debug").classList.contains("hidden");
    if (hidden) {
        document.getElementById("debug").classList.remove("hidden");
    } else {
        document.getElementById("debug").classList.add("hidden");
    }
    postMessage("toggeDebug");

});

init();

postMessage("MessageListenerRegistered");
setInterval(async () => {
    postMessage("refreshData");
    //await refreshData();
}, 1000);