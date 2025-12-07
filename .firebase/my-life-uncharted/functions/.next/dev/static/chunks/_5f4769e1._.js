(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Notification.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Notification
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const BG = {
    red: "rgba(255, 0, 0, 0.6)",
    green: "rgba(0, 255, 0, 0.6)",
    blue: "rgba(0, 0, 255, 0.6)"
};
const ACTIONS = {
    GOOD: "ok",
    BAD: "error",
    INFO: "info"
};
function reducer(state, action) {
    switch(action.type){
        case ACTIONS.GOOD:
            return "green";
        case ACTIONS.INFO:
            return "blue";
        case ACTIONS.BAD:
            return "red";
        default:
            return state;
    }
}
function Notification({ notification, setNotification, notificationStatus, setNotificationStatus }) {
    _s();
    const [colour, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(reducer, "blue");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Notification.useEffect": ()=>{
            if (!notificationStatus) {
                dispatch({
                    type: "info"
                });
            } else {
                dispatch({
                    type: notificationStatus
                });
            }
        }
    }["Notification.useEffect"], [
        notificationStatus
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Notification.useEffect": ()=>{
            if (!notification) return;
            const timer = setTimeout({
                "Notification.useEffect.timer": ()=>{
                    setNotification(undefined);
                    setNotificationStatus(null);
                }
            }["Notification.useEffect.timer"], 2000);
            return ({
                "Notification.useEffect": ()=>clearTimeout(timer)
            })["Notification.useEffect"];
        }
    }["Notification.useEffect"], [
        notification,
        setNotification,
        setNotificationStatus
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `top-1/3 absolute w-[250px] grid justify-center`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: BG[colour],
                border: "2px",
                borderColor: colour,
                color: "white"
            },
            className: `pointer-events-none mt-4 p-3 border rounded-lg shadow-lg transition-all duration-1000 ease-in-out ${notification ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-30px]"}`,
            role: "status",
            "aria-live": "polite",
            children: notification
        }, void 0, false, {
            fileName: "[project]/components/Notification.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Notification.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(Notification, "F5YZTTPedsFbr0em3cQO70CT7Fw=");
_c = Notification;
var _c;
__turbopack_context__.k.register(_c, "Notification");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SectionTitle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SectionTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function SectionTitle({ title = "title" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "values text-(--primary-blue)",
        children: title
    }, void 0, false, {
        fileName: "[project]/components/SectionTitle.tsx",
        lineNumber: 2,
        columnNumber: 10
    }, this);
}
_c = SectionTitle;
var _c;
__turbopack_context__.k.register(_c, "SectionTitle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/subscribers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addSubscriber",
    ()=>addSubscriber,
    "deleteSubscriber",
    ()=>deleteSubscriber,
    "getSubscribers",
    ()=>getSubscribers,
    "updateSubscriber",
    ()=>updateSubscriber
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/constants.ts [app-client] (ecmascript)");
;
async function getSubscribers() {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE"]}/api/subscribers`, {
            cache: "no-store"
        });
        if (!res.ok) throw new Error(`Failed to fetch subscribers: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error in getSubscribers:", err);
        throw err;
    }
}
async function addSubscriber(data) {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE"]}/api/subscribers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`Failed to add subscriber`);
        return await res.json();
    } catch (err) {
        console.error("Error in addSubscriber:", err);
        throw err;
    }
}
async function updateSubscriber(data) {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE"]}/api/subscribers`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed to update subscriber");
        return await res.json();
    } catch (err) {
        console.error("Error in updatSubscriber:", err);
        throw err;
    }
}
async function deleteSubscriber(email) {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE"]}/api/subscribers`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        });
        if (!res.ok) throw new Error(`No email found`);
        return await res.json();
    } catch (err) {
        throw "Error disconnecting; either email doesn't exist or network problems.";
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useSubscription.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useSubscription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/topics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$subscribers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/subscribers.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useSubscription() {
    _s();
    const [notification, setNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [notificationStatus, setNotificationStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("info");
    const [topics, setTopics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [checkedTopics, setCheckedTopics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [selectedTopics, setSelectedTopics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [connectEmail, setConnectEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [disconnectEmail, setDisconnectEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [connecting, setConnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [disconnecting, setDisconnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 1. Fetch topics
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSubscription.useEffect": ()=>{
            async function fetchTopics() {
                const list = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$topics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllTopics"])();
                setTopics(list);
            }
            fetchTopics();
        }
    }["useSubscription.useEffect"], []);
    // 2. Initialize checkedTopics once topics are loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSubscription.useEffect": ()=>{
            if (topics.length === 0) return;
            const status = {};
            topics.forEach({
                "useSubscription.useEffect": (t)=>status[t.title] = true
            }["useSubscription.useEffect"]);
            setCheckedTopics(status);
        }
    }["useSubscription.useEffect"], [
        topics
    ]);
    // 3. Derive selected topics from checkedTopics
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSubscription.useEffect": ()=>{
            const active = Object.entries(checkedTopics).filter({
                "useSubscription.useEffect.active": ([_, isChecked])=>isChecked
            }["useSubscription.useEffect.active"]).map({
                "useSubscription.useEffect.active": ([topic])=>topic
            }["useSubscription.useEffect.active"]);
            setSelectedTopics(active);
        }
    }["useSubscription.useEffect"], [
        checkedTopics
    ]);
    // 4. Toggle a checkbox
    const handleCheckboxChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSubscription.useCallback[handleCheckboxChange]": (topicName)=>{
            setCheckedTopics({
                "useSubscription.useCallback[handleCheckboxChange]": (prev)=>({
                        ...prev,
                        [topicName]: !prev[topicName]
                    })
            }["useSubscription.useCallback[handleCheckboxChange]"]);
        }
    }["useSubscription.useCallback[handleCheckboxChange]"], []);
    // 5. Submit
    const handleConnect = async (e)=>{
        e.preventDefault();
        setConnecting(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$subscribers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addSubscriber"])({
                email: connectEmail,
                topics: selectedTopics
            });
            setNotification("Connection successful!");
            setNotificationStatus("ok");
        } catch (error) {
            setNotification(error);
            setNotificationStatus("error");
        } finally{
            setConnectEmail("");
            setConnecting(false);
        }
    };
    // 6. Handle Delete Subscription
    const handleDisconnect = async (e)=>{
        e.preventDefault();
        setDisconnecting(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$subscribers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteSubscriber"])(disconnectEmail);
            setNotification("disconnected successfully!");
            setNotificationStatus("ok");
        } catch (error) {
            setNotification(error);
            setNotificationStatus("error");
        } finally{
            setDisconnectEmail("");
            setDisconnecting(false);
        }
    };
    return {
        topics,
        checkedTopics,
        handleConnect,
        connecting,
        connectEmail,
        setConnectEmail,
        disconnecting,
        disconnectEmail,
        setDisconnectEmail,
        handleCheckboxChange,
        handleDisconnect,
        notification,
        setNotification,
        notificationStatus,
        setNotificationStatus
    };
}
_s(useSubscription, "h8mQtrFMi3IhLUQOFUFevvzfp0Y=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/subscription/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Subscription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Notification.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SectionTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SectionTitle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSubscription$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useSubscription.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Subscription() {
    _s();
    const { topics, checkedTopics, handleConnect, connecting, connectEmail, setConnectEmail, disconnecting, disconnectEmail, setDisconnectEmail, handleCheckboxChange, handleDisconnect, notification, setNotification, notificationStatus, setNotificationStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSubscription$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex flex-col justify-center items-center gap-10 page-layout",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "flex flex-col gap-5 w-full md:w-[500px]",
                onSubmit: handleConnect,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SectionTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        title: "Stay in touch"
                    }, void 0, false, {
                        fileName: "[project]/app/subscription/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-(--secondary-blue) rounded-[10px] p-2 md:p-5 grid gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-5",
                                children: [
                                    `Get connected so you don't miss a content on the topics you love.`,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: "Your email:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscription/page.tsx",
                                                lineNumber: 40,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                value: connectEmail,
                                                placeholder: "example@test.com",
                                                required: true,
                                                className: "border border-(--secondary-blue) w-full rounded-[10px] px-4 py-2 text-foreground",
                                                onChange: (e)=>setConnectEmail(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscription/page.tsx",
                                                lineNumber: 41,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/subscription/page.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: "I want to receive notifications on topics:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscription/page.tsx",
                                                lineNumber: 52,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                                                children: topics.map((topicObj)=>{
                                                    const checkboxId = `checkbox-${topicObj.title.replace(/\s/g, "-")}`;
                                                    const topic = topicObj.title;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: checkboxId,
                                                        className: "flex items-center gap-2 cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        id: checkboxId,
                                                                        type: "checkbox",
                                                                        checked: checkedTopics[topic] ?? false,
                                                                        onChange: ()=>handleCheckboxChange(topic),
                                                                        className: "appearance-none h-5 w-5 border-2 border-(--secondary-blue) rounded-full focus:outline-none peer"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/subscription/page.tsx",
                                                                        lineNumber: 68,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute left-1 h-3 w-3 rounded-full bg-(--primary-blue) dark:bg-(--secondary-blue)/50 opacity-0 peer-checked:opacity-100"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/subscription/page.tsx",
                                                                        lineNumber: 75,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/subscription/page.tsx",
                                                                lineNumber: 67,
                                                                columnNumber: 23
                                                            }, this),
                                                            topic
                                                        ]
                                                    }, topic, true, {
                                                        fileName: "[project]/app/subscription/page.tsx",
                                                        lineNumber: 62,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscription/page.tsx",
                                                lineNumber: 53,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/subscription/page.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/subscription/page.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "button",
                                children: connecting ? "Connecting" : "Connect"
                            }, void 0, false, {
                                fileName: "[project]/app/subscription/page.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/subscription/page.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/subscription/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "border border-(--secondary-blue) flex flex-col p-2 md:p-5 gap-5 w-full md:w-[500px] rounded-2xl",
                onSubmit: handleDisconnect,
                children: [
                    "You can also disconnect anytime ;)",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "Your email:"
                            }, void 0, false, {
                                fileName: "[project]/app/subscription/page.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "email",
                                placeholder: "example@test.com",
                                value: disconnectEmail,
                                className: "border border-(--secondary-blue) w-full rounded-[10px] px-4 py-2 text-foreground",
                                onChange: (e)=>setDisconnectEmail(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/subscription/page.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/subscription/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "button",
                        children: disconnecting ? "Disconnecting" : "Disconnect"
                    }, void 0, false, {
                        fileName: "[project]/app/subscription/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/subscription/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Notification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                notification: notification,
                setNotification: setNotification,
                notificationStatus: notificationStatus,
                setNotificationStatus: setNotificationStatus
            }, void 0, false, {
                fileName: "[project]/app/subscription/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/subscription/page.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(Subscription, "HCIE7mZ9eMY2LbG84vkyOvvkDK8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSubscription$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = Subscription;
var _c;
__turbopack_context__.k.register(_c, "Subscription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_5f4769e1._.js.map