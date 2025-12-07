module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/My_Life_Uncharted/hooks/useTheme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyToggleStyles",
    ()=>applyToggleStyles
]);
const applyToggleStyles = (t, btn, toggle)=>{
    if (!btn || !toggle) return;
    if (t === "dark") {
        btn.style.borderColor = "#f4f5f0";
        btn.style.backgroundColor = "#232323";
        toggle.style.backgroundColor = "#f4f5f0";
        toggle.style.transform = "translateX(15px)";
    } else {
        btn.style.borderColor = "#232323";
        btn.style.backgroundColor = "#f4f5f0";
        toggle.style.backgroundColor = "#232323";
        toggle.style.transform = "translateX(1px)";
    }
};
}),
"[project]/My_Life_Uncharted/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentDateFormatted",
    ()=>getCurrentDateFormatted
]);
function getCurrentDateFormatted() {
    const date = new Date();
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/My_Life_Uncharted/utils/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE",
    ()=>API_BASE,
    "defaultBlogContent",
    ()=>defaultBlogContent,
    "defaultMeta",
    ()=>defaultMeta,
    "defaultMilestones",
    ()=>defaultMilestones
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/nanoid/index.js [app-ssr] (ecmascript) <locals>");
;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const defaultBlogContent = [
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(),
        type: "heading",
        content: "",
        tableContent: null
    }
];
const defaultMeta = {
    image: "",
    topic: "",
    title: "",
    subtitle: "",
    dateCreated: "",
    tags: [],
    likes: 0,
    comments: 0,
    views: 0,
    minsRead: 0
};
const defaultMilestones = [
    {
        title: "",
        value: ""
    },
    {
        title: "",
        value: ""
    },
    {
        title: "",
        value: ""
    },
    {
        title: "",
        value: ""
    }
];
}),
"[project]/My_Life_Uncharted/services/topics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addTopic",
    ()=>addTopic,
    "deleteTopic",
    ()=>deleteTopic,
    "getAllTopics",
    ()=>getAllTopics,
    "updateTopic",
    ()=>updateTopic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/utils/constants.ts [app-ssr] (ecmascript)");
;
;
async function getAllTopics() {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/blogTopics`, {
            cache: "no-store"
        });
        if (!res.ok) throw new Error(`Failed to fetch topics: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error in getAllTopics:", err);
        throw err;
    }
}
async function addTopic(title) {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/blogTopics`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                image: "",
                timeStamp: "Last Updated " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentDateFormatted"])()
            })
        });
        if (!res.ok) throw new Error("Failed to add blog topic");
        return await res.json();
    } catch (err) {
        console.error("Error in blog topic add:", err);
        throw err;
    }
}
async function updateTopic(data) {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/blogTopics`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed to update blog topic");
        return await res.json();
    } catch (err) {
        console.error("Error in blog topic update:", err);
        throw err;
    }
}
async function deleteTopic(id) {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/blogTopics`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        });
        if (!res.ok) throw new Error("Failed to delete blog topic");
        return await res.json();
    } catch (err) {
        console.error("Error in blog topic delete:", err);
        throw err;
    }
}
}),
"[project]/My_Life_Uncharted/utils/conversions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cleanUpLink",
    ()=>cleanUpLink,
    "convertColonToSlash",
    ()=>convertColonToSlash,
    "findByType",
    ()=>findByType,
    "getBlogMatchingPage",
    ()=>getBlogMatchingPage,
    "getLinkFromTopic",
    ()=>getLinkFromTopic,
    "getTopicFromLink",
    ()=>getTopicFromLink,
    "getWordAfterColon",
    ()=>getWordAfterColon,
    "getWordBeforeColon",
    ()=>getWordBeforeColon,
    "mediaType",
    ()=>mediaType,
    "toCamelCase",
    ()=>toCamelCase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/services/topics.ts [app-ssr] (ecmascript)");
;
const cleanUpLink = (link)=>link.split("-").map((p)=>p === "%26" ? "&" : p).join("-");
const getTopicFromLink = (link)=>cleanUpLink(link).split("-").map((p)=>p === "%26" ? "&" : p).map((t)=>t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
const getLinkFromTopic = (b)=>b.toLowerCase().split(" ").map((p)=>p === "%26" ? "&" : p).join("-");
const getBlogMatchingPage = async (page)=>{
    const topics = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllTopics"])();
    return topics.find((t)=>getLinkFromTopic(t.title) === cleanUpLink(page));
};
const findByType = (type, blocksData)=>blocksData.find((b)=>b.type.toLowerCase() === type.toLowerCase())?.content ?? "";
const mediaType = (url)=>{
    if (!url || typeof url !== "string") return "unknown";
    const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".webp",
        ".svg"
    ];
    const videoExtensions = [
        ".mp4",
        ".avi",
        ".mov",
        ".wmv",
        ".flv",
        ".mkv",
        ".webm"
    ];
    for (const ext of imageExtensions){
        if (url.toLowerCase().includes(ext)) return "image";
    }
    for (const ext of videoExtensions){
        if (url.toLowerCase().includes(ext)) return "video";
    }
    return "unknown";
};
const toCamelCase = (str)=>{
    return str.toLowerCase().split(" ").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};
function getWordAfterColon(inputString) {
    const colonIndex = inputString.indexOf(":");
    if (colonIndex !== -1) {
        return inputString.substring(colonIndex + 1).trim();
    } else {
        return inputString.trim();
    }
}
function getWordBeforeColon(inputString) {
    const colonIndex = inputString.indexOf(":");
    if (colonIndex !== -1) {
        return inputString.substring(0, colonIndex).trim();
    } else {
        return inputString.trim();
    }
}
const convertColonToSlash = (inputString)=>inputString.replace(":", "/");
}),
"[project]/My_Life_Uncharted/components/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$hooks$2f$useTheme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/hooks/useTheme.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/utils/conversions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/services/topics.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function Header() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const themeModeBtn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const themeModeToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("light");
    const [topicNames, setTopicNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [topicsClick, setTopicsClick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const location = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    // mount: determine initial theme and set toggle position immediately
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!themeModeBtn.current || !themeModeToggle.current) return;
        const stored = localStorage.getItem("theme");
        let initial;
        if (stored === "dark" || stored === "light") {
            initial = stored;
        } else {
            const prefersDark = ("TURBOPACK compile-time value", "undefined") !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            initial = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "light";
        }
        setTheme(initial);
        document.documentElement.classList.toggle("dark", initial === "dark");
        document.documentElement.classList.toggle("light", initial === "light");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$hooks$2f$useTheme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyToggleStyles"])(initial, themeModeBtn.current, themeModeToggle.current);
    }, []);
    // whenever theme changes persist and update DOM + toggle styles
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!themeModeBtn.current || !themeModeToggle.current) return;
        localStorage.setItem("theme", theme);
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.classList.toggle("light", theme === "light");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$hooks$2f$useTheme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyToggleStyles"])(theme, themeModeBtn.current, themeModeToggle.current);
    }, [
        theme
    ]);
    function handleThemeBtnClick() {
        setTheme((prev)=>prev === "light" ? "dark" : "light");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchTopics() {
            const topics = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllTopics"])();
            setTopicNames(topics.map((b)=>b.title));
        }
        fetchTopics();
    }, []);
    const topicLinks = topicNames.map((topic)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLinkFromTopic"])(topic));
    const topics = topicLinks.map((link, index)=>({
            link,
            name: topicNames[index]
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full min-h-[40px] h-auto flex items-center flex-col-reverse justify-center md:flex-row md:mt-[10px] md:mb-[20px] gap-[10px] px-[10px] md:pr-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 text-center md:text-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            return location === "/" ? router.push("/dashboard") : router.push("/");
                        },
                        className: "section-title cursor-pointer",
                        children: "My Life Uncharted"
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-bold",
                        children: (()=>{
                            const match = topics.find((topic)=>(location ?? "").substring(1).includes(topic.link));
                            return match ? match.name : location === "/dashboard" ? "Dashboard" : null;
                        })()
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "flex items-center justify-around right-0 top-0 w-full md:w-[410px] mx-[10px] md:mx-0 h-[40px] text-[12px] text-center md:border-t border-b border-l border-r md:border-r-0 border-(--border-color) md:rounded-tl-[10px] rounded-br-[10px] md:rounded-br-[0px] rounded-bl-[10px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            children: "Home"
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "group relative cursor-pointer",
                        onClick: ()=>setTopicsClick((prev)=>!prev),
                        onMouseEnter: ()=>setTopicsClick(true),
                        onMouseLeave: ()=>setTopicsClick(false),
                        children: [
                            "Topics",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "absolute min-w-[150px] grid gap-1 pt-[12px] -translate-x-[30px] z-1",
                                children: topicsClick && topics.map((topic, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/" + topic.link,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "border border-(--border-color) rounded-[5px] p-1 bg-(--background) hover:bg-(--secondary-blue) hover:text-black",
                                            children: topic.name
                                        }, void 0, false, {
                                            fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                                            lineNumber: 124,
                                            columnNumber: 19
                                        }, this)
                                    }, index, false, {
                                        fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                                        lineNumber: 123,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "https://bernard-webfolio.web.app/",
                            children: "About Me"
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/subscription",
                            children: "Stay in touch"
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            children: "Let's talk"
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        ref: themeModeBtn,
                        className: "border w-[30px] h-[16px] rounded-[16px] cursor-pointer duration-300",
                        onClick: handleThemeBtnClick,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: themeModeToggle,
                            className: "w-[12.78px] h-[12.78px] rounded-[12.78px] bg-(--foreground)  translate-y-[.5px] duration-300"
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/My_Life_Uncharted/components/Header.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
}),
"[project]/My_Life_Uncharted/lib/icons.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/@fortawesome/fontawesome-svg-core/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/@fortawesome/free-solid-svg-icons/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$regular$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/@fortawesome/free-regular-svg-icons/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/@fortawesome/free-brands-svg-icons/index.mjs [app-ssr] (ecmascript)");
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$fontawesome$2d$svg$2d$core$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["library"].add(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faArrowUpFromBracket"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$regular$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faHeart"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faXmark"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$regular$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faPenToSquare"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$regular$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faMessage"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faShareNodes"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$regular$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faTrashCan"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faBars"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faDownload"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$regular$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faThumbsUp"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faHeading"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faParagraph"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faTableList"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faList"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faLink"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faCode"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faQuoteRight"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faPlay"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faAngleDown"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faXmark"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faTrash"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faDownload"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faRefresh"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$regular$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faImage"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faGlobe"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faInstagram"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faYoutube"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faGithub"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faXTwitter"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faFacebookF"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faCopy"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faCheck"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$regular$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faComment"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$regular$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faEye"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$regular$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faPaperPlane"], __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faFile"]);
}),
"[project]/My_Life_Uncharted/components/Socials.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Socials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$lib$2f$icons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/lib/icons.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/@fortawesome/react-fontawesome/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const socials = [
    {
        socialHandle: "https://bernard-webfolio.web.app",
        icon: [
            "fas",
            "globe"
        ]
    },
    {
        socialHandle: "https://bernard-webfolio.web.app",
        icon: [
            "fab",
            "instagram"
        ]
    },
    {
        socialHandle: "https://bernard-webfolio.web.app",
        icon: [
            "fab",
            "github"
        ]
    },
    {
        socialHandle: "https://bernard-webfolio.web.app",
        icon: [
            "fab",
            "x-twitter"
        ]
    },
    {
        socialHandle: "https://bernard-webfolio.web.app",
        icon: [
            "fab",
            "facebook-f"
        ]
    }
];
function Socials() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed grid gap-[10px] justify-center p-[10px] w-[30px] min-h-[100px] bg-(--primary-blue) rounded-tl-[10px] rounded-bl-[10px] right-0 top-[100px] text-(--secondary-blue) text-[20px] z-10",
        children: socials.map((social, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: `${social.socialHandle}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                    icon: [
                        social.icon[0],
                        social.icon[1]
                    ]
                }, void 0, false, {
                    fileName: "[project]/My_Life_Uncharted/components/Socials.tsx",
                    lineNumber: 32,
                    columnNumber: 11
                }, this)
            }, idx, false, {
                fileName: "[project]/My_Life_Uncharted/components/Socials.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/My_Life_Uncharted/components/Socials.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cbef9415._.js.map