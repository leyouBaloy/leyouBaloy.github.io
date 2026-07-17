# Repository instructions

When the user asks to add an English listening check-in:

1. Open the supplied YouTube video and extract its exact title and duration.
2. Add the check-in to `public/data/gossip.json`, following the existing schema and reverse-chronological ordering.
3. Validate that the JSON parses and run `git diff --check`.
4. Commit the relevant changes and push the current branch to its configured remote.
