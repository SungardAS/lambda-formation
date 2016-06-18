# Change Log
All notable changes to this project will be documented here in
accordance with [Keep a CHANGELOG][keep-changelog-url].
This project adheres to [Semantic Versioning][semver-url].

## [0.1.6] - 2016-06-18
### Added
- Handlers detect if a message is from SNS and will normailze the event
  object accordingly
- Updated dependencies and devDependencies

## [0.1.5] - 2016-04-12
### Fixed
- removed devDependencies from dependencies
- use nock ^8.0.0

## [0.1.4] - 2016-04-12
### Changed
- updated cfn-responder version to 0.1.5
- updated tests to reflect error returned from cfn-responder
- updated modules in package.json to latest versions

[keep-changelog-url]: http://keepachangelog.com/
[semver-url]: http://semver.org/
