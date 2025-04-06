import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import path from "path";
// import os from 'os';
import fs from "fs/promises";
// import { dir } from "console";
// import {exec}  from "node:child_process";


// Create server instance
const server = new McpServer({
    name: "Vijay's MCP Server",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});






server.tool("write-html",
    "Write HTML to the file ./portfolio/index.html",
    {
        html: z.string().describe("HTML content to write"),
    },
    async ({ html }) => {
        try {
            await fs.writeFile(path.join("D:/MCP SERVER/", "portfolio", "index.html"), html);
            // console.log("HTML file written successfully");
            return {
                content: [
                    {
                        type: "text",
                        text: "HTML file written successfully",
                    },
                ],
            };
        } catch (err) {
            console.error("Error writing HTML file:", err);
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to write HTML file",
                    },
                ],
            };
        }
    }

);

server.tool("write-css",
    "Write CSS to the file ./portfolio/style.css",
    {
        css: z.string().describe("CSS styles to write"),
    },
    async ({ css }) => {
        try {
            await fs.writeFile(path.join("D:/MCP SERVER/", "portfolio", "style.css"), css);
            // console.log("CSS styles written successfully");
            return {
                content: [
                    {
                        type: "text",
                        text: "CSS styles written successfully",
                    },
                ],
            };
        } catch (err) {
            console.error("Error writing CSS file:", err);
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to write CSS file",
                    },
                ],
            };
        }
    }
);

server.tool("write-js",
    "Write JavaScript to the file ./portfolio/script.js",
    {
        script: z.string().describe("JavaScript content to write"),
    },
    async ({ script }) => {
        try {
            await fs.writeFile(path.join("D:/MCP SERVER/", "portfolio", "script.js"), script);
            // console.log("HTML file written successfully");
            return {
                content: [
                    {
                        type: "text",
                        text: "JavaScript written successfully",
                    },
                ],
            };
        } catch (err) {
            console.error("Error writing JavaScript file:", err);
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to write JavaScript file",
                    },
                ],
            };
        }
    }
);

server.tool("get-html",
    "Get current content in CSS file ./portfolio/index.html",
    async () => {
        try {
            const html = await fs.readFile(path.join("D:/MCP SERVER/", "portfolio", "index.html"), "utf-8");
            // console.log("HTML file read successfully");
            return {
                content: [{
                    type: "text",
                    text: html,
                }],
            }
        } catch (err) {
            console.error("Error reading HTML file:", err);
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to get HTML file",
                    },
                ],
            };
        }
    }
);

server.tool("get-css",
    "Get current content in CSS file ./portfolio/style.css",
    async () => {
        try {
            const css = await fs.readFile(path.join("D:/MCP SERVER/", "portfolio", "style.css"), "utf-8");
            // console.log("CSS styles read successfully");
            return {
                content: [{
                    type: "text",
                    text: css,
                }],
            }
        } catch (err) {
            console.error("Error reading CSS file:", err);
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to get CSS file",
                    },
                ],
            };
        }
    }
);

server.tool("get-js",
    "Get current content in JS file ./portfolio/script.js",
    async () => {
        try {
            const jsfile = await fs.readFile(path.join("D:/MCP SERVER/", "portfolio", "script.js"), "utf-8");
            // console.log("JS file read successfully");
            return {
                content: [{
                    type: "text",
                    text: jsfile,
                }],
            }
        } catch (err) {
            console.error("Error reading JS file:", err);
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to get HTML file",
                    },
                ],
            };
        }
    }
);

server.tool("get-portfolio-structure",
    "Get the structure of the portfolio directory",
    async () => {
        try{
            const files = await fs.readdir(path.join("D:/MCP SERVER", "portfolio"));
            // console.log("Portfolio directory structure read successfully");
            return {
                content: [{
                    type: "text",
                    text: files.join("\n"),
                }],
            }
        }
        catch (err) {
            console.error("Error reading portfolio directory:", err);
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to get portfolio directory structure",
                    },
                ],
            };
        }
    }
);







async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});