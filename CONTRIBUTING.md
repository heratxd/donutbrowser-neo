# Contributing to NeoDonut Browser

NeoDonut Browser is an independent AGPL-3.0 fork of
[zhom/donutbrowser](https://github.com/zhom/donutbrowser). Contributions should
target the `community` branch. The `main` branch is reserved as a clean mirror
of upstream.

## Branch workflow

```bash
git switch community
git pull --ff-only origin community
git switch -c feature/my-change
```

Open pull requests against `community`. Use `sync/upstream-YYYY-MM-DD` branches
for reviewed upstream merges. Never commit NeoDonut-specific changes directly
to `main`.

## Development setup

Requirements:

- Node.js from `.node-version`
- pnpm from the `packageManager` field in `package.json`
- latest stable Rust and Cargo
- Tauri v2 platform prerequisites

```bash
pnpm install --frozen-lockfile
pnpm tauri dev
```

Nix users can run `nix develop` or `nix run .#setup`.

## Quality checks

Run before opening a pull request:

```bash
pnpm format
pnpm lint
pnpm test
```

Important rules:

- Update all 9 locale files for user-facing text.
- Run the unused-Tauri-command test when commands change.
- Do not change lock files unless package metadata or dependencies require it.
- Avoid whole-project formatting during upstream syncs.
- Preserve the separation between `NeoDonutBrowser` and upstream
  `DonutBrowser` data, bundle, registry, and updater identities.
- Review every upstream merge for reintroduced Pro/subscription gates.

## Licensing and attribution

All fork contributions are accepted under AGPL-3.0. The upstream
`CONTRIBUTOR_LICENSE_AGREEMENT.md` is retained for historical attribution and
for contributors who separately choose to submit work to the upstream project;
it is not a requirement for contributions made only to this fork.

See [FORK.md](FORK.md) for release and synchronization details.
