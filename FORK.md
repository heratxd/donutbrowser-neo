# NeoDonut Browser fork workflow

## Repository roles

- `upstream`: `https://github.com/zhom/donutbrowser.git`
- `origin`: `https://github.com/paracosm17/donutbrowser-neo.git`
- `main`: clean fast-forward mirror of `upstream/main`
- `community`: NeoDonut Browser product branch and default branch
- `feature/*`, `fix/*`: short-lived product work
- `sync/*`: reviewed merges from `main` into `community`

Run `scripts/configure-fork-remotes.ps1` in an existing clone to configure the
recommended remotes without changing branches or files.

## Safe upstream update

The scheduled `sync-upstream.yml` workflow updates only the clean `main`
branch and refuses to push if `main` has diverged. It never merges, rebases, or
opens a pull request against `community`, so upstream changes cannot silently
restore subscription gates in the shipped product.

To review an update:

```bash
git fetch origin upstream --prune
git switch community
git pull --ff-only origin community
git switch -c sync/upstream-YYYY-MM-DD
git merge origin/main
```

Resolve conflicts, run all checks, inspect the Pro/entitlement diff, then open
a pull request into `community`.

Useful audit commands:

```bash
git diff origin/main...HEAD
git log --oneline origin/main..HEAD
rg -n "function Pro|requires.*Pro|subscription|entitlement|paid" src src-tauri
```

## Releases

The community release workflow accepts tags matching `v*-neo.*`. It verifies
that the tagged commit belongs to `community`, checks that the tag equals the
version in `package.json`, `src-tauri/Cargo.toml`, and
`src-tauri/tauri.conf.json`, runs CI, then creates unsigned Windows, macOS, and
Linux artifacts plus `SHA256SUMS.txt`.

Example:

```bash
git switch community
git pull --ff-only origin community
git tag -a v0.28.2-neo.2 -m "NeoDonut Browser 0.28.2-neo.2"
git push origin v0.28.2-neo.2
```

Do not enable automatic merging from upstream into `community`. A successful
build is not enough to prove that an upstream entitlement check has not been
reintroduced.
