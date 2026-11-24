# Browser-based development with GitHub Codespaces

This repository includes a Node.js development container for the React dashboard.

## Open the workspace

1. Open the repository on GitHub.
2. Select **Code**.
3. Open the **Codespaces** tab.
4. Select **Create codespace on main**.
5. Wait for the workspace to initialise. The dev container runs `npm install` in the dashboard folder.

## Run the dashboard

In the Codespaces terminal, run:

```bash
cd dashboard
npm run dev
```

Codespaces should forward port 5173. Open the forwarded port in the browser.

## Current scope

The dashboard is a static UI prototype with illustrative placeholders. It is not connected to Firebase, Android call events, or WhatsApp. Do not enter real patient information.

## Next engineering gate

The Android missed-call detector still requires validation on the clinic's actual Android phone. Codespaces can host source code and build tooling, but it cannot prove real-device telephony behaviour by itself.
