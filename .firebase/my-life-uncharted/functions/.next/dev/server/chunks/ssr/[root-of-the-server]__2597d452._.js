module.exports = [
"[project]/My_Life_Uncharted/services/featuredBlogs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkIsFeatured",
    ()=>checkIsFeatured,
    "getFeaturedBlogs",
    ()=>getFeaturedBlogs,
    "setFeatured",
    ()=>setFeatured
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/utils/constants.ts [app-ssr] (ecmascript)");
;
async function getFeaturedBlogs(filters) {
    try {
        const params = new URLSearchParams();
        if (filters?.id) params.append("id", filters.id);
        if (filters?.topic) params.append("topic", filters.topic);
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/featuredBlogs?${params.toString()}`, {
            cache: "no-store"
        });
        if (!res.ok) throw new Error(`Failed to fetch featured blogs: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Error in getFeaturedBlogs:", err);
        throw err;
    }
}
const checkIsFeatured = async (id)=>{
    try {
        const blog = await getFeaturedBlogs({
            id
        });
        return !!blog.topic; // !! converts to real boolean
    } catch  {
        return false;
    }
};
const setFeatured = async (id, topic)=>{
    try {
        const res = await fetch(`/api/featuredBlogs`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                topic
            })
        });
        if (!res.ok) throw new Error(`Failed to update featured blog`);
        return await res.json();
    } catch (err) {
        console.error("Error in setFeatured:", err);
        throw err;
    }
};
}),
"[project]/My_Life_Uncharted/services/blogs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addBlogMeta",
    ()=>addBlogMeta,
    "deleteBlogMeta",
    ()=>deleteBlogMeta,
    "getAllBlogs",
    ()=>getAllBlogs,
    "getBlogMetaById",
    ()=>getBlogMetaById,
    "updateBlogMeta",
    ()=>updateBlogMeta
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/utils/constants.ts [app-ssr] (ecmascript)");
;
async function getAllBlogs(filters) {
    const params = new URLSearchParams();
    if (filters?.topic) params.append("topic", filters.topic);
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/blogs?${params.toString()}`, {
        cache: "no-store"
    });
    // if (!res.ok) {
    //   const message = await res.text(); // or res.json()
    //   return message;
    // }
    return res.json();
}
async function getBlogMetaById(id) {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/blogs?id=${id}`, {
            cache: "no-store"
        });
        if (!res.ok) throw new Error(`Failed to fetch blog meta for provided id: ${res.status}`);
        const data = await res.json();
        return {
            type: "blogs",
            id: data.id,
            blogMeta: data.blogMeta
        };
    } catch (err) {
        console.error("Error in getAllBlogsMetaById:", err);
        throw err;
    }
}
async function addBlogMeta(data) {
    try {
        const res = await fetch(`/api/blogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`Failed to add blog meta`);
        return await res.json();
    } catch (err) {
        console.error("Error in adding blog meta:", err);
        throw err;
    }
}
async function updateBlogMeta({ id, blogMeta }) {
    try {
        const res = await fetch(`/api/blogs`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                blogMeta
            })
        });
        if (!res.ok) throw new Error("Failed to update blog meta");
        return await res.json();
    } catch (err) {
        console.error("Error in blog meta update:", err);
        throw err;
    }
}
async function deleteBlogMeta(id) {
    try {
        const res = await fetch(`/api/blogs`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        });
        if (!res.ok) throw new Error(`Failed to delete blog meta`);
        return await res.json();
    } catch (err) {
        console.error("Error in blog meta delete:", err);
        throw err;
    }
}
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/My_Life_Uncharted/lib/firebase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "app",
    ()=>app,
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "functions",
    ()=>functions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/firebase/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$firebase$2f$functions$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/firebase/functions/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$functions$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/@firebase/functions/dist/esm/index.esm.js [app-ssr] (ecmascript)");
;
;
;
;
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyDdOf3yF2LlmKBLKe0Eqn7hIfErBs-R7Xc",
    authDomain: "my-life-uncharted.firebaseapp.com",
    projectId: "my-life-uncharted",
    storageBucket: "my-life-uncharted.firebasestorage.app",
    messagingSenderId: "913164628777",
    appId: "1:913164628777:web:e80fdf57f47786ba093d38",
    measurementId: "G-SNKCNCZMYL"
};
const app = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApp"])();
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirestore"])(app);
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$firebase$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuth"])(app);
const functions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$functions$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFunctions"])(app, "us-central1");
}),
"[project]/My_Life_Uncharted/services/FirestoreStorage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteBlogImage",
    ()=>deleteBlogImage,
    "deleteBlogTopicImage",
    ()=>deleteBlogTopicImage,
    "deleteBlogVideo",
    ()=>deleteBlogVideo,
    "deleteLandingPageImage",
    ()=>deleteLandingPageImage,
    "getBlogImgUrl",
    ()=>getBlogImgUrl,
    "getBlogVideoUrl",
    ()=>getBlogVideoUrl,
    "getImgName",
    ()=>getImgName,
    "getImgUrl",
    ()=>getImgUrl,
    "getMainImgName",
    ()=>getMainImgName,
    "getMainImgUrl",
    ()=>getMainImgUrl,
    "getSecondaryBottomImgName",
    ()=>getSecondaryBottomImgName,
    "getSecondaryBottomImgUrl",
    ()=>getSecondaryBottomImgUrl,
    "getSecondaryTopImgName",
    ()=>getSecondaryTopImgName,
    "getSecondaryTopImgUrl",
    ()=>getSecondaryTopImgUrl,
    "uploadBlogImage",
    ()=>uploadBlogImage,
    "uploadBlogTopicImage",
    ()=>uploadBlogTopicImage,
    "uploadBlogVideo",
    ()=>uploadBlogVideo,
    "uploadLandingPageImage",
    ()=>uploadLandingPageImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/lib/firebase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/firebase/storage/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/@firebase/storage/dist/node-esm/index.node.esm.js [app-ssr] (ecmascript)");
;
;
const storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStorage"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["app"]);
async function getImgUrl(imageName) {
    const undefinedCheck = imageName.split("/").includes("undefined");
    if (!undefinedCheck) {
        const topicImgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, imageName);
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDownloadURL"])(topicImgRef);
        } catch (error) {
            console.error("Error fetching topic image URL:", error);
            return null;
        }
    }
    return "undefined image name";
}
async function getImgName(imageName) {
    const undefinedCheck = imageName.split("/").includes("undefined");
    if (!undefinedCheck) {
        const topicImgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, imageName);
        try {
            return topicImgRef.name;
        } catch (error) {
            console.error("Error fetching topic image URL:", error);
            return null;
        }
    }
    return "undefined image name";
}
/**************** Landing Page Images CRUD*****************/ async function getSingleImageFromFolder(folderName) {
    try {
        const folderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, folderName);
        const items = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listAll"])(folderRef);
        if (items.items.length === 0) {
            console.error(`No files found in folder: ${folderName}`);
            return null;
        }
        // Take the first (and only) image inside the folder
        const fileRef = items.items[0];
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDownloadURL"])(fileRef);
    } catch (err) {
        console.error(`Error fetching image from folder ${folderName}:`, err);
        return null;
    }
}
async function getSingleImageNameFromFolder(folderName) {
    try {
        const folderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, folderName);
        const items = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listAll"])(folderRef);
        if (items.items.length === 0) {
            console.error(`No files found in folder: ${folderName}`);
            return null;
        }
        // Take the first (and only) image inside the folder
        const fileRef = items.items[0];
        return fileRef.name;
    } catch (err) {
        console.error(`Error fetching image from folder ${folderName}:`, err);
        return null;
    }
}
async function getMainImgUrl() {
    return getSingleImageFromFolder("landingPageImages/main-image");
}
async function getSecondaryTopImgUrl() {
    return getSingleImageFromFolder("landingPageImages/secondary-top-image");
}
async function getSecondaryBottomImgUrl() {
    return getSingleImageFromFolder("landingPageImages/secondary-bottom-image");
}
async function getMainImgName() {
    return getSingleImageNameFromFolder("landingPageImages/main-image");
}
async function getSecondaryTopImgName() {
    return getSingleImageNameFromFolder("landingPageImages/secondary-top-image");
}
async function getSecondaryBottomImgName() {
    return getSingleImageNameFromFolder("landingPageImages/secondary-bottom-image");
}
async function uploadLandingPageImage({ file, path }) {
    try {
        const storageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, `landingPageImages/${path}`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadBytes"])(storageRef, file);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDownloadURL"])(storageRef);
    } catch (error) {
        console.error("Error uploading landing page image:", error);
        return null;
    }
}
async function deleteLandingPageImage(path) {
    try {
        const storageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, `landingPageImages/${path}`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteObject"])(storageRef);
        return true;
    } catch (err) {
        console.error("Error deleting landing page image:", err);
        return false;
    }
}
async function uploadBlogTopicImage(file) {
    try {
        const fileName = file.name;
        const storageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, `blogTopicImg/${fileName}`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadBytes"])(storageRef, file);
        return fileName;
    } catch (error) {
        console.error("Error uploading blog topic image:", error);
        return null;
    }
}
async function deleteBlogTopicImage(ImageName) {
    try {
        const storageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, `blogTopicImg/${ImageName}`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteObject"])(storageRef);
        return true;
    } catch (err) {
        console.error("Error deleting blog topic image:", err);
        return false;
    }
}
async function getBlogImgUrl(imageName) {
    const topicImgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, `blog/images/${imageName}`);
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDownloadURL"])(topicImgRef);
    } catch (error) {
        console.error("Error fetching topic image URL:", error);
        return null;
    }
}
async function getBlogVideoUrl(imageName) {
    const topicImgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, `blog/videos/${imageName}`);
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDownloadURL"])(topicImgRef);
    } catch (error) {
        console.error("Error fetching topic video URL:", error);
        return null;
    }
}
async function uploadBlogImage(file) {
    try {
        const storageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, `blog/images/${file.name}`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadBytes"])(storageRef, file);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDownloadURL"])(storageRef);
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}
async function uploadBlogVideo(file) {
    try {
        const storageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, `blog/videos/${file.name}`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadBytes"])(storageRef, file);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDownloadURL"])(storageRef);
    } catch (error) {
        console.error("Error uploading video:", error);
        return null;
    }
}
async function deleteBlogImage(fullUrl) {
    try {
        const storageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, `blog/images/${fullUrl}`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteObject"])(storageRef);
        return true;
    } catch (err) {
        console.error("Error deleting file:", err);
        return false;
    }
}
async function deleteBlogVideo(fullUrl) {
    try {
        const storageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, `blog/videos/${fullUrl}`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteObject"])(storageRef);
        return true;
    } catch (err) {
        console.error("Error deleting file:", err);
        return false;
    }
}
}),
"[project]/My_Life_Uncharted/app/loading.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionLoading",
    ()=>SectionLoading,
    "default",
    ()=>loading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function loading({ loading }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-1/2 flex flex-col items-center justify-center w-full text-(--secondary-blue)",
            children: [
                loading,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-[70px] h-[70px] rounded-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute border-4 border-(--secondary-blue) rounded-full w-full h-full border-l-transparent animate-[rotate_1s_cubic-bezier(0.15,0.61,0.58,0.4)_infinite]"
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/app/loading.tsx",
                            lineNumber: 7,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute border-4 border-(--secondary-blue) rounded-full w-[35px] h-[35px] translate-x-[17.5px] translate-y-[17.5px] border-t-transparent animate-[rotate-reverse_1s_cubic-bezier(0.15,0.61,0.58,0.4)_infinite]"
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/app/loading.tsx",
                            lineNumber: 8,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/My_Life_Uncharted/app/loading.tsx",
                    lineNumber: 6,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/My_Life_Uncharted/app/loading.tsx",
            lineNumber: 4,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/My_Life_Uncharted/app/loading.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
function SectionLoading({ loading }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex flex-col items-center justify-center w-full h-full text-(--secondary-blue)",
        children: [
            loading,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-[70px] h-[70px] rounded-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute border-4 border-(--secondary-blue) rounded-full w-full h-full border-l-transparent animate-[rotate_1s_cubic-bezier(0.15,0.61,0.58,0.4)_infinite]"
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/app/loading.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute border-4 border-(--secondary-blue) rounded-full w-[35px] h-[35px] translate-x-[17.5px] translate-y-[17.5px] border-t-transparent animate-[rotate-reverse_1s_cubic-bezier(0.15,0.61,0.58,0.4)_infinite]"
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/app/loading.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/My_Life_Uncharted/app/loading.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/My_Life_Uncharted/app/loading.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/My_Life_Uncharted/components/FeaturedBlog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeaturedBlog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$featuredBlogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/services/featuredBlogs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$blogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/services/blogs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/utils/conversions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$FirestoreStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/services/FirestoreStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$app$2f$loading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/app/loading.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function FeaturedBlog({ topic }) {
    const [featuredBlog, setFeaturedBlog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$featuredBlogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFeaturedBlogs"])({
            topic: topic
        }).then((e)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$blogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBlogMetaById"])(e[0].id).then((e)=>{
                setFeaturedBlog(e);
            });
        }).finally(()=>setLoaded(true));
    }, [
        topic
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (featuredBlog) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$FirestoreStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBlogImgUrl"])(featuredBlog.blogMeta.image).then(setImage);
        }
    }, [
        featuredBlog
    ]);
    if (!featuredBlog || !loaded) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$app$2f$loading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionLoading"], {
        loading: "Loading Featured blog"
    }, void 0, false, {
        fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
        lineNumber: 36,
        columnNumber: 12
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: `/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLinkFromTopic"])(featuredBlog.blogMeta.topic) + "/" + featuredBlog.id}`,
        className: "h-full grid grid-rows-[30px_1fr] gap-[10px] lg:gap-[20px] text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center",
                children: "Featured Blog"
            }, void 0, false, {
                fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:flex gap-[10px] lg:gap-[30px] grid-rows-[200px_1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative lg:w-[50%]",
                        children: image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: image,
                            alt: "Bike Riding",
                            fill: true,
                            style: {
                                objectFit: "cover"
                            },
                            className: "object-cover",
                            unoptimized: true
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col justify-between lg:w-[50%]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1 items-center detail-text",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "",
                                                children: featuredBlog.blogMeta.dateCreated
                                            }, void 0, false, {
                                                fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                                                lineNumber: 62,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-0.5 h-0.5 rounded rounded-0.5 bg-white"
                                            }, void 0, false, {
                                                fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                                                lineNumber: 63,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "",
                                                children: [
                                                    featuredBlog.blogMeta.minsRead,
                                                    " min read"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                                                lineNumber: 64,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "blog-title",
                                        children: featuredBlog.blogMeta.title
                                    }, void 0, false, {
                                        fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "blog-font",
                                        children: featuredBlog.blogMeta.subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1 detail-text border-t border-white pt-[10px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "",
                                        children: [
                                            featuredBlog.blogMeta.views,
                                            " views"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "",
                                        children: [
                                            featuredBlog.blogMeta.comments,
                                            " comments"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "",
                                        children: [
                                            featuredBlog.blogMeta.likes,
                                            " likes"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/My_Life_Uncharted/components/FeaturedBlog.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
"[project]/My_Life_Uncharted/services/milestones.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addMilestones",
    ()=>addMilestones,
    "deleteMilestones",
    ()=>deleteMilestones,
    "getAllMilestones",
    ()=>getAllMilestones,
    "updateMilestone",
    ()=>updateMilestone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/utils/constants.ts [app-ssr] (ecmascript)");
;
async function getAllMilestones(topic) {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/milestones?topic=${topic ? encodeURIComponent(topic) : ""}`, {
            cache: "no-store"
        });
        if (!res.ok) throw new Error(`Failed to fetch featured blogs: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error in getAllFeaturedBlogs:", err);
        throw err;
    }
}
async function addMilestones(data) {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/milestones`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed to add milestone");
        return await res.json();
    } catch (err) {
        console.error("Error in milestone add:", err);
        throw err;
    }
}
async function updateMilestone(data) {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/milestones`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed to update milestones");
        return await res.json();
    } catch (err) {
        console.error("Error in milestone update:", err);
        throw err;
    }
}
async function deleteMilestones(topic) {
    try {
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/milestones`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(topic)
        });
        if (!res.ok) throw new Error("Failed to delete milestones");
        return await res.json();
    } catch (err) {
        console.error("Error in milestones delete:", err);
        throw err;
    }
}
}),
"[project]/My_Life_Uncharted/components/Milestones.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Milestones
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$milestones$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/services/milestones.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function Milestones({ topic = "" }) {
    const [milestones, setMilestones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (topic) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$milestones$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllMilestones"])(topic).then(setMilestones);
        }
    }, [
        topic
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full grid justify-around min-h-[250px] text-white bg-(--primary-blue) py-[20px]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-layout grid md:flex gap-[40px] justify-between h-full",
            children: !milestones ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: "Loading Milestones"
            }, void 0, false, {
                fileName: "[project]/My_Life_Uncharted/components/Milestones.tsx",
                lineNumber: 24,
                columnNumber: 11
            }, this) : milestones?.milestones.map((milestone, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sub-title text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "values min-h-[120px]",
                            children: milestone.value
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/Milestones.tsx",
                            lineNumber: 28,
                            columnNumber: 15
                        }, this),
                        milestone.title
                    ]
                }, idx, true, {
                    fileName: "[project]/My_Life_Uncharted/components/Milestones.tsx",
                    lineNumber: 27,
                    columnNumber: 13
                }, this))
        }, void 0, false, {
            fileName: "[project]/My_Life_Uncharted/components/Milestones.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/My_Life_Uncharted/components/Milestones.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/My_Life_Uncharted/components/Blogs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Blogs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$FirestoreStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/services/FirestoreStorage.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Blogs({ link, imageUrl, imageType, topic, timeStamp }) {
    const location = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // only get the images for non-empty image names
        if (imageUrl !== "landingPageImages/" && imageUrl !== "blogTopicImg/" && imageUrl !== "blog/images/" && imageUrl !== "blog/videos/") (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$FirestoreStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getImgUrl"])(imageUrl).then(setImage);
    }, [
        imageUrl
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: `/${link}`,
        className: `${(location ?? "").substring(1).includes(link) ? "hidden" : ""}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${location === "/" ? "h-[370px]" : "h-[250px]"} border border-(--border-color) p-[5px] overflow-hidden`,
            onMouseEnter: ()=>setHovered(true),
            onMouseLeave: ()=>setHovered(false),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `relative w-full ${location === "/" ? "h-[250px]" : "h-full"} overflow-hidden`,
                    children: image && image !== "" && (imageType === "image" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: `${image}`,
                        alt: "image",
                        fill: true,
                        style: {
                            objectFit: "cover"
                        },
                        className: "object-cover"
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/Blogs.tsx",
                        lineNumber: 56,
                        columnNumber: 15
                    }, this) : imageType === "video" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        autoPlay: true,
                        muted: true,
                        className: "media w-full h-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                            src: image,
                            type: "video/mp4"
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/Blogs.tsx",
                            lineNumber: 65,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/Blogs.tsx",
                        lineNumber: 64,
                        columnNumber: 15
                    }, this) : null)
                }, void 0, false, {
                    fileName: "[project]/My_Life_Uncharted/components/Blogs.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `duration-300 ${location === "/" ? "grid h-[108px]" : location !== "/" && hovered === true ? "opacity-100 -translate-y-[108px] h-[108px]" : "opacity-0 h-[0px]"} gap-[20px] p-2 w-full bg-white text-black text-left`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[20px] font-semibold",
                            children: topic
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/Blogs.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[12px]",
                            children: timeStamp
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/Blogs.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/My_Life_Uncharted/components/Blogs.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/My_Life_Uncharted/components/Blogs.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/My_Life_Uncharted/components/Blogs.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/My_Life_Uncharted/components/BlogCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogCards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/@fortawesome/react-fontawesome/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/utils/conversions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$FirestoreStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/services/FirestoreStorage.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function BlogCards({ location, blog, imageType }) {
    const { image, title, views, likes, comments } = blog.blogMeta;
    const [imageUrl, setImageUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (image !== "") (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$FirestoreStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getImgUrl"])(`blog/images/${image}`).then(setImageUrl);
    }, [
        image
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLinkFromTopic"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTopicFromLink"])(location))}/${blog.id}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full border flex flex-col justify-between border-gray-400 h-fit",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative h-[250px] overflow-hidden",
                    children: imageUrl && imageType ? imageType === "image" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: imageUrl,
                        alt: "",
                        fill: true,
                        style: {
                            objectFit: "cover"
                        },
                        unoptimized: true
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                        lineNumber: 38,
                        columnNumber: 15
                    }, this) : imageType === "video" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-[250px] flex text-blue-600 font-medium border-blue-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                            autoPlay: true,
                            muted: true,
                            className: "media",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                src: imageUrl,
                                type: "video/mp4"
                            }, void 0, false, {
                                fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                                lineNumber: 48,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                            lineNumber: 47,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                        lineNumber: 46,
                        columnNumber: 15
                    }, this) : null : null
                }, void 0, false, {
                    fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-[10px] p-[20px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-[65px] overflow-hidden sub-title text-(--secondary-blue)",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between border-t border-gray-600 detail-text pt-[10px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                            className: "icon-size",
                                            icon: [
                                                "far",
                                                "eye"
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                                            lineNumber: 60,
                                            columnNumber: 15
                                        }, this),
                                        "  ",
                                        views
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-[10px] items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                            className: "icon-size",
                                            icon: [
                                                "far",
                                                "heart"
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this),
                                        " ",
                                        likes
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-[10px] items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FontAwesomeIcon"], {
                                            className: "icon-size",
                                            icon: [
                                                "far",
                                                "message"
                                            ]
                                        }, void 0, false, {
                                            fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, this),
                                        " ",
                                        comments
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, blog.id, false, {
        fileName: "[project]/My_Life_Uncharted/components/BlogCard.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/My_Life_Uncharted/hooks/useBlogTopicPage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBlogTopicPage",
    ()=>useBlogTopicPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$blogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/services/blogs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/services/topics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$FirestoreStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/services/FirestoreStorage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/utils/conversions.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const useBlogTopicPage = (blogTopicPage)=>{
    const [targetBlogs, setTargetBlogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [topicPage, setTopicPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [allTopics, setAllTopics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [imageType, setImageType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const page = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cleanUpLink"])(blogTopicPage);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBlogMatchingPage"])(page).then(setTopicPage);
    }, [
        page
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchData() {
            try {
                // fetch and save topics
                const allTopics = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$topics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllTopics"])();
                if (allTopics) setAllTopics(allTopics);
                // fetch and save blogs
                const allBlogs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$blogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllBlogs"])({
                    topic: topicPage?.title || ""
                });
                if (allBlogs) setTargetBlogs(allBlogs);
                // fetch and save image
                const imageUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$FirestoreStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getImgUrl"])(`blogTopicImg/${topicPage?.image}`);
                if (imageUrl) setImage(imageUrl);
                // fetch image name
                const imageName = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$services$2f$FirestoreStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getImgName"])(`blogTopicImg/${topicPage?.image}`);
                if (imageName) setImageType((0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaType"])(imageName));
            } catch (error) {
                console.error(error);
            } finally{
                setLoaded(true);
            }
        }
        fetchData();
    }, [
        topicPage
    ]);
    return {
        loaded,
        topicPage,
        page,
        targetBlogs,
        allTopics,
        image,
        imageType
    };
};
}),
"[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$components$2f$FeaturedBlog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/components/FeaturedBlog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$components$2f$Milestones$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/components/Milestones.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$components$2f$Blogs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/components/Blogs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$components$2f$BlogCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/components/BlogCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$app$2f$loading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/app/loading.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/utils/conversions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$hooks$2f$useBlogTopicPage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/My_Life_Uncharted/hooks/useBlogTopicPage.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
function Page({ params }) {
    const { blogTopicPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(params);
    const { loaded, topicPage, page, targetBlogs, allTopics, image, imageType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$hooks$2f$useBlogTopicPage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBlogTopicPage"])(blogTopicPage);
    if (!loaded) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$app$2f$loading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        loading: "Loading Blogs"
    }, void 0, false, {
        fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
        lineNumber: 26,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-[20px] w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute w-screen left-0 h-[400px] lg:h-[calc(100vh-70px)]",
                children: image && (imageType === "image" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    src: image,
                    alt: topicPage?.title || "Topic Image",
                    fill: true,
                    priority: true,
                    style: {
                        objectFit: "cover"
                    },
                    unoptimized: true
                }, void 0, false, {
                    fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                    lineNumber: 34,
                    columnNumber: 13
                }, this) : imageType === "video" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    autoPlay: true,
                    muted: true,
                    className: "media w-full h-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                        src: image,
                        type: "video/mp4"
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                        lineNumber: 44,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                    lineNumber: 43,
                    columnNumber: 13
                }, this) : null)
            }, void 0, false, {
                fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-layout",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-[20px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-[430px] lg:h-[400px] mt-[200px] lg:mt-[calc(100vh-270px)] p-[20px] lg:p-[40px] z-1 bg-(--primary-blue)/80",
                            children: topicPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$components$2f$FeaturedBlog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                topic: topicPage?.title || ""
                            }, void 0, false, {
                                fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                                lineNumber: 52,
                                columnNumber: 27
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sub-title",
                                    children: "Recent Posts"
                                }, void 0, false, {
                                    fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]",
                                    children: targetBlogs && targetBlogs.map((blog)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$components$2f$BlogCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            location: page,
                                            blog: blog,
                                            imageType: imageType
                                        }, blog.id, false, {
                                            fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                                            lineNumber: 60,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$components$2f$Milestones$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                topic: topicPage?.title
            }, void 0, false, {
                fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-layout",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Explore More Topics:"
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-[20px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                        children: allTopics && allTopics.map((b)=>{
                            const link = (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLinkFromTopic"])(b.title);
                            return page !== link ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$components$2f$Blogs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                link: link,
                                imageUrl: `blogTopicImg/${b.image}`,
                                imageType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$My_Life_Uncharted$2f$utils$2f$conversions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaType"])(b.image),
                                topic: b.title,
                                timeStamp: b.timeStamp
                            }, b.id, false, {
                                fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                                lineNumber: 81,
                                columnNumber: 17
                            }, this) : null;
                        })
                    }, void 0, false, {
                        fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/My_Life_Uncharted/app/[blogTopicPage]/page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2597d452._.js.map