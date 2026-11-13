# n8n automation

`leetcode-daily-digest.json` is an [n8n](https://n8n.io) workflow that emails you your LeetCode counts every morning by calling this app's `POST /api/leetcode` endpoint.

```
Every morning (08:00) -> Config -> Fetch stats -> Build message -> Send email
```

## Use it

1. Start n8n: `docker run -it --rm -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n`
2. In n8n choose **Workflows -> Import from file** and pick `leetcode-daily-digest.json`.
3. In the **Config** node set `username` and `toEmail` (and `baseUrl` if you self-host).
4. In **Send email** attach an SMTP credential (for Gmail use an app password).
5. Run once with **Execute workflow**, then activate it.

The workflow only needs the public API; the app does not have to change. It was written against n8n's current node versions and has not been run in a live n8n instance, so check the node settings after importing.
