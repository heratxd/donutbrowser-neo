<div align="center">
  <img src="assets/logo.png" alt="NeoDonut Browser Logo" width="150">
  <h1>NeoDonut Browser</h1>
  <strong>Community-focused open source anti-detect browser</strong>
</div>
<br>

<p align="center">
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
