# sasquatch

A configurable code modifier for typescript and friends. Can transform entire codebases to enforce better coding practices, eliminate tech debt in one fell swoop, and catch bad code before it is committed.

## Installation

- Clone this repo
- Install dependencies: `npm i`
- Install globally: `npm i -g`

## Usage

- sasquatch <file|glob>

## Configuration

By default, all transforms will be executed. If you want to whitelist transforms for a project, copy default.config.ts to your_project_root/sasquatch.config.ts and remove any transforms you don't want.

## Shoutout

This project heavily depends on https://dsherret.github.io/ts-simple-ast/, so huge shoutout to dsherret for his work there and thorough documentation.
