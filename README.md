<div align="center">
<<<<<<< HEAD
  <img src="assets/logo.png" alt="NeoDonut Browser Logo" width="150">
  <h1>NeoDonut Browser</h1>
  <strong>Community-focused open source anti-detect browser</strong>
=======
  <img src="assets/logo.png" alt="Donut Browser Logo" width="150">
  <h1>Donut Browser</h1>
  <strong>Open Source Anti-Detect Browser</strong>
  <br>
  <a href="https://donutbrowser.com">donutbrowser.com</a>
>>>>>>> v0.29.6
</div>
<br>

<p align="center">
<<<<<<< HEAD
  <a href="https://github.com/paracosm17/donutbrowser-neo/releases/latest"><img alt="GitHub release" src="https://img.shields.io/github/v/release/paracosm17/donutbrowser-neo"></a>
  <a href="https://github.com/paracosm17/donutbrowser-neo/issues"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs Welcome"></a>
  <a href="https://github.com/paracosm17/donutbrowser-neo/blob/community/LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0-blue.svg" alt="License"></a>
</p>

> **Fork notice:** NeoDonut Browser is an independent community fork of
> [zhom/donutbrowser](https://github.com/zhom/donutbrowser). It is not an
> official Donut Browser release and is not endorsed or supported by the
> upstream maintainers. Upstream copyright and contributor attribution are
> preserved under AGPL-3.0.

<img alt="NeoDonut Browser Preview" src="assets/donut-preview.png" />

## What is different

NeoDonut Browser keeps the local privacy and automation features available to
all users. Manual fingerprint editing, cross-OS fingerprints, screen and device
properties, local REST/MCP automation, bulk local profile actions, and
self-hosted synchronization are not gated by a Pro subscription.

Hosted Donut cloud services, team collaboration, paid proxy services, and
other upstream-operated infrastructure remain separate services and may still
require an upstream account or subscription.

## Features

- Unlimited isolated browser profiles
- Manual and generated fingerprints for Windows, macOS, Linux, Android, and iOS
- Screen, locale, timezone, audio, battery, hardware, WebGL, Canvas, and media configuration
- HTTP, HTTPS, SOCKS4, SOCKS5, dynamic proxy, and WireGuard support
- Local REST API and Model Context Protocol automation
- Cookie and extension management
- Self-hosted synchronization and optional E2E encryption
- Separate application identity and data directory from upstream Donut Browser

## Install

Builds are published on the
[NeoDonut Browser Releases](https://github.com/paracosm17/donutbrowser-neo/releases)
page. Release tags use the format `v<upstream-version>-neo.<revision>`, for
example `v0.28.2-neo.2`.

Unsigned community builds can trigger Windows SmartScreen or macOS Gatekeeper
warnings. Verify downloads against the accompanying `SHA256SUMS.txt` file.

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup and quality checks. See
[FORK.md](FORK.md) for the branch model, upstream synchronization, release
process, and repository remote configuration.

## Data isolation

Release builds use `NeoDonutBrowser` and development builds use
`NeoDonutBrowserDev` as their local data directories. NeoDonut Browser does not
automatically read, move, or delete the upstream `DonutBrowser` data directory.
Portable builds continue to store data next to the executable when a
`.portable` marker is present.

## Upstream services

The Chromium-derived Wayfern engine and optional Donut-hosted account/cloud
features are still obtained from upstream-operated endpoints. Those endpoints
are intentionally not renamed because this fork does not operate replacement
infrastructure for them.

## Community

- [Issues](https://github.com/paracosm17/donutbrowser-neo/issues)
- [Discussions](https://github.com/paracosm17/donutbrowser-neo/discussions)
- [Upstream project](https://github.com/zhom/donutbrowser)

## License

NeoDonut Browser is distributed under the GNU Affero General Public License
version 3. See [LICENSE](LICENSE). The original project and contributor history
remain attributed to their respective copyright holders.
=======
  <a style="text-decoration: none;" href="https://github.com/zhom/donutbrowser/releases/latest" target="_blank"><img alt="GitHub release" src="https://img.shields.io/github/v/release/zhom/donutbrowser">
  </a>
  <a style="text-decoration: none;" href="https://github.com/zhom/donutbrowser/issues" target="_blank">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs Welcome">
  </a>
  <a style="text-decoration: none;" href="https://github.com/zhom/donutbrowser/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-AGPL--3.0-blue.svg" alt="License">
  </a>
  <a style="text-decoration: none;" href="https://github.com/zhom/donutbrowser/network/members" target="_blank">
    <img src="https://img.shields.io/github/forks/zhom/donutbrowser?style=social" alt="GitHub forks">
  </a>
</p>

<img alt="Donut Browser Preview" src="assets/donut-preview.png" />

## Features

- Unlimited browser profiles: each fully isolated with its own fingerprint, cookies, extensions, and data
- Anti-detect Chromium engine: powered by [Wayfern](https://wayfern.com), a privacy-focused Chromium fork whose fingerprint spoofing is not detected by Cloudflare, reCaptcha v3, or other browser fingerprinting and anti-bot services
- DNS AdBlocker: block ads, trackers, and other unwanted content with per-profile DNS blocking
- Proxy support: HTTP, HTTPS, SOCKS4, SOCKS5 per profile, with dynamic proxy URLs
- VPN support: WireGuard configs per profile
- Local API & MCP: REST API and [Model Context Protocol](https://modelcontextprotocol.io) server for integration with Claude, automation tools, and custom workflows
- Profile groups: organize profiles and apply bulk settings
- Import profiles: migrate from Chrome, Edge, Brave, or other Chromium browsers
- Cookie & extension management: import/export cookies, manage extensions per profile
- Default browser: set Donut as your default browser and choose which profile opens each link
- Cloud sync: sync profiles, proxies, and groups across devices (self-hostable)
- E2E encryption: optional end-to-end encrypted sync with a password only you know
- Zero telemetry: no tracking or device fingerprinting

## Install

<!-- install-links-start -->
### macOS

| | Apple Silicon | Intel |
|---|---|---|
| **DMG** | [Download](https://github.com/zhom/donutbrowser/releases/download/v0.29.5/Donut_0.29.5_aarch64.dmg) | [Download](https://github.com/zhom/donutbrowser/releases/download/v0.29.5/Donut_0.29.5_x64.dmg) |

Or install via Homebrew:

```bash
brew install --cask donut
```

### Windows

[Download Windows Installer (x64)](https://github.com/zhom/donutbrowser/releases/download/v0.29.5/Donut_0.29.5_x64-setup.exe) · [Portable (x64)](https://github.com/zhom/donutbrowser/releases/download/v0.29.5/Donut_0.29.5_x64-portable.zip)

### Linux

| Format | x86_64 | ARM64 |
|---|---|---|
| **deb** | [Download](https://github.com/zhom/donutbrowser/releases/download/v0.29.5/Donut_0.29.5_amd64.deb) | [Download](https://github.com/zhom/donutbrowser/releases/download/v0.29.5/Donut_0.29.5_arm64.deb) |
| **rpm** | [Download](https://github.com/zhom/donutbrowser/releases/download/v0.29.5/Donut-0.29.5-1.x86_64.rpm) | [Download](https://github.com/zhom/donutbrowser/releases/download/v0.29.5/Donut-0.29.5-1.aarch64.rpm) |
| **AppImage** | [Download](https://github.com/zhom/donutbrowser/releases/download/v0.29.5/Donut_0.29.5_amd64.AppImage) | [Download](https://github.com/zhom/donutbrowser/releases/download/v0.29.5/Donut_0.29.5_aarch64.AppImage) |
<!-- install-links-end -->

Or install via package manager:

```bash
curl -fsSL https://donutbrowser.com/install.sh | sh
```

<details>
<summary>Troubleshooting AppImage</summary>

If the AppImage segfaults on launch, install libfuse2 (`sudo apt install libfuse2` / `yay -S libfuse2` / `sudo dnf install fuse-libs`), or bypass FUSE entirely:

```bash
APPIMAGE_EXTRACT_AND_RUN=1 ./Donut.Browser_x.x.x_amd64.AppImage
```

If that gives an EGL display error, add `WEBKIT_DISABLE_DMABUF_RENDERER=1` or `GDK_BACKEND=x11` to the command above. If issues persist, the .deb and .rpm packages are more reliable.

</details>

### Nix

```bash
nix run github:zhom/donutbrowser#release-start
```

## Self-Hosting Sync

Run your own sync server to sync profiles, proxies, and groups across devices for free. See the [Self-Hosting Donut Sync guide](https://donutbrowser.com/docs/self-hosting) for Docker-based setup instructions.

## Contributing

Donut Browser is built by the people who use it, and plenty of the most useful help involves no code at all.

- Tell other people about Donut. Word of mouth is how most users find the project, so talking about it is a real contribution.
- Report bugs and request features in [GitHub Issues](https://github.com/zhom/donutbrowser/issues).
- Answer questions in [GitHub Discussions](https://github.com/zhom/donutbrowser/discussions).
- Fix and improve translations in `src/i18n/locales`.
- Write code. Start with [CONTRIBUTING.md](CONTRIBUTING.md).
- Star the repo so more people see it.

## Star History

<a href="https://gitdebt.com/zhom/donutbrowser?ref=readme">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.gitdebt.com/api/repos/zhom/donutbrowser/chart.svg?theme=dark&animate=1" />
    <img alt="Cumulative GitHub stars for zhom/donutbrowser over time" src="https://api.gitdebt.com/api/repos/zhom/donutbrowser/chart.svg?theme=light&animate=1" />
  </picture>
</a>

## Contributors

<a href="https://gitdebt.com/zhom/donutbrowser?ref=readme">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.gitdebt.com/api/repos/zhom/donutbrowser/stats/contributors.svg?theme=dark&animate=1" />
    <img alt="Everyone who has landed commits in zhom/donutbrowser, ranked by commit count" src="https://api.gitdebt.com/api/repos/zhom/donutbrowser/stats/contributors.svg?theme=light&animate=1" />
  </picture>
</a>

## Contact

For urgent questions or security vulnerability reports, email [contact@donutbrowser.com](mailto:contact@donutbrowser.com).

## License

This project is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for details.
>>>>>>> v0.29.6
