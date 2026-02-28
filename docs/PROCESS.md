Complete Tier (250-300 words)

5. Self-review patterns. Did the AI consistently catch certain types of issues during self-review (e.g., edge cases, missing error handling)? Did it ever miss something you caught yourself?

During self-review, the AI was pretty reliable at catching technical gaps. It regularly pointed out missing error handling (like what happens if the YAML frontmatter is malformed) and edge cases such as notes without a # heading for a title. It also caught logic issues around syncing write/preview modes and flagged potential problems with rendering Markdown directly into HTML. That said, it wasn’t perfect. It sometimes missed smaller UX details that only became obvious when I mentally walked through the experience — like accidentally overwriting a note with the same title or the cursor jumping when toggling preview. Those were things I had to notice myself.

7. Browser tool vs. CLI comparison. If you’ve used Claude Code CLI or another terminal tool, how did the browser-based experience compare? What’s better/worse about each?

The browser-based workflow felt more conversational and better for thinking through features step by step. It was easier to reason about UI behavior, state management, and how each feature builds on the last. In comparison, tools like Claude Code CLI feel more powerful when working across multiple files or doing larger refactors. The CLI is faster and more direct if you already know what you want to change. The browser, though, is better for planning, iterating, and reflecting on design decisions.

8. When would you use micro-iteration + self-review? For what kinds of tasks does this workflow make sense? When would you skip it?

I’d use micro-iteration plus self-review for small-to-medium apps with clear features — especially frontend projects or CRUD-style tools. It makes sense for something structured and layered, like a simplified version of Notion. I’d skip it for quick scripts, experiments where I’m just exploring ideas, or projects that require heavy upfront system design before writing any code.
