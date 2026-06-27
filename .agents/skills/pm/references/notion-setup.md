# Notion MCP Setup Guide

Step-by-step instructions for connecting the Notion MCP server so the PM can read/write tasks directly to your Notion workspace.

---

## Prerequisites

- A Notion account (free tier works fine)
- Your IDE's MCP configuration file

---

## Step 1: Add the Notion MCP Server

Add the Notion MCP server to your configuration. The official Notion MCP uses a hosted URL — no local install needed.

Add to your MCP settings configuration:

```json
{
  "notion": {
    "url": "https://mcp.notion.com/mcp"
  }
}
```

The exact config file location depends on your setup. Common paths:
- **Gemini / Antigravity**: Check your IDE's MCP server settings
- **Claude Desktop**: `~/.claude/claude_desktop_config.json`
- **Cursor**: `.cursor/mcp.json`

## Step 2: Authenticate

When you first use a Notion tool, the MCP will trigger an OAuth authentication flow:
1. A browser window will open asking you to log in to Notion
2. Select the workspace you want to connect (your personal workspace is fine)
3. Grant the requested permissions (read/write pages, databases)
4. You'll be redirected back — the connection is now active

## Step 3: Create the PM Databases

Once the Notion MCP is connected, the PM skill will create two databases automatically. You don't need to create anything manually.

### Sprint Board Database Schema

The PM will create a database called **"TS Sprint Board"** with these properties:

| Property | Type | Options |
|----------|------|---------|
| Task | Title | — |
| Status | Select | `Backlog`, `This Sprint`, `In Progress`, `Done`, `Replanned` |
| Energy | Select | `🔥 Small`, `🔥🔥 Medium`, `🔥🔥🔥 Large` |
| Priority | Select | `🐺 Sales Wolf`, `🚀 Launch Blocker`, `🤖 Delegation`, `🔧 Polish` |
| Sprint | Number | Sprint number (1, 2, 3...) |
| Week | Date | Week the task is assigned to |
| Completed | Date | Date the task was marked Done |
| Connects To | Select | Which Key Result this task serves |
| Notes | Rich Text | Optional context |

### Goals Database Schema

The PM will create a database called **"TS Goals"** with these properties:

| Property | Type | Options |
|----------|------|---------|
| Goal | Title | — |
| Timeframe | Select | `Quarterly`, `Fortnightly` |
| Status | Select | `Active`, `Achieved`, `Abandoned` |
| Key Results | Rich Text | Measurable outcomes |
| Start Date | Date | — |
| End Date | Date | — |
| Progress | Number | Percentage (0-100), manually updated by PM |

## Step 4: Seed Initial Data

On first sprint planning, the PM will seed:

1. **Q3 2026 Goal**: "Get my first paying customer"
   - KR1: 3 bookable activities with working checkout
   - KR2: 1 signed operator agreement
   - KR3: 5 qualified leads generated

2. **Sprint 1 tasks**: Decomposed from the quarterly goal during the first `@pm sprint plan` session

---

## Fallback (No Notion)

If Notion MCP is not connected, the PM operates using:
- **Google Drive SSOT** (document ID: `1GETxDYz5Jj8TttlR1rtlGEe2MK5_-zUEa91U-zj5TFA`)
- **`.context/operational-state.md`** in the local repository

The PM works either way. Notion just makes task tracking more structured and gives you a mobile-friendly view outside of your IDE.

---

## Troubleshooting

**"Permission denied" on Notion operations:**
- Re-authenticate: the OAuth token may have expired
- Check that you granted write permissions during the OAuth flow

**"Database not found":**
- The PM creates databases on first use. Run `@pm sprint plan` to trigger creation.
- If databases were manually deleted, the PM will recreate them.

**Can't see databases in Notion app:**
- Check the workspace you authenticated with matches where you're looking
- New pages/databases appear in the "Recently created" section of Notion's sidebar
