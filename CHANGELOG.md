# Changelog

All notable changes to Oppijan Korp are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- GitHub Actions workflow that builds the WordPress plugin and attaches it as
  `oppijan-korp-<version>.zip` to each published GitHub release.

## [2.0.1] - 2026-11-05

First release with a version number in the app and a git tag.

### Added
- All corpus years can now be fetched in a single Korp request instead of one
  request per year. This is on by default and is controlled by the
  `fetchCorporaTogether` flag in `src/config/index.ts`. It mainly speeds up
  searches for rarer words, which previously needed one request per year.
- The app version is shown in the footer next to the copyright notice.
- Notice in the instructions that the Korp service is currently slow.

### Changed
- Package renamed from `mini-korp` to `oppijan-korp`, and the GitHub
  repository from `mini-korp` to `oppijan-korp`.
- The WordPress plugin version now follows the app version (previously 1.3).

### Removed
- Unused `vitest` development dependency.

### Security
- Updated dependencies with `npm audit fix` and removed `vitest`, which
  resolved both critical audit warnings. One moderate warning remains in
  `minimatch`, used only by ESLint during development, until
  `typescript-eslint` supports the patched version.

## Before 2.0.1

Earlier work was not versioned in git. The WordPress plugin was released
up to version 1.3. Highlights:

- **2026-08**: Copyright and licence notice; link to the Kielisepät instance.
- **2026-05**: Fixed duplicate sentences in results; dependency security fixes.
- **2026-01**: Refactored search into separate API, configuration, query
  builder and sentence extraction modules.
- **2025-12**: `?` wildcard, fixed paging, search rate limit, updated
  instructions and statistics box.
- **2025-11**: Single codebase builds both the standalone app and the
  WordPress plugin.
- **2025-10**: First version of the instructions (ohjeet).

[Unreleased]: https://github.com/danradice/oppijan-korp/compare/v2.0.1...HEAD
[2.0.1]: https://github.com/danradice/oppijan-korp/releases/tag/v2.0.1
