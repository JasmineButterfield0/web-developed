# BUILD PLAN — Markdown Notes App

A lightweight in-browser note-taking app. Notes are written in Markdown, stored in localStorage, and organized with tags.

## Features
- Write & save Markdown notes
- Search notes by title or content
- Tag notes for organization

## Specifications
- **Storage:** localStorage (no backend)
- **Format:** Markdown files with YAML frontmatter for tags
  ```markdown
  ---
  tags: [work, ideas]
  ---
  # My Note
  ```
- **Editor:** Syntax-highlighted text area (write mode)
- **Preview:** Toggle button to render Markdown as rich text
- **Tags:** Derived from frontmatter — displayed and filterable

## Build Steps

1. **Editor** — Text area with Markdown syntax highlighting
2. **Preview** — Toggle button to switch between raw Markdown and rendered HTML
3. **Save & Persist** — Save note to localStorage; reload to see it again
4. **Note List** — Sidebar listing saved notes by title (parsed from frontmatter or first `#` heading)
5. **Search** — Filter note list by title or body content
6. **Tags** — Parse frontmatter tags; display as chips; filter list by tag
