PNPM ?= corepack pnpm

.PHONY: install dev test lint build docs docker

install:
	$(PNPM) install --frozen-lockfile

## Rebuild on change (library watch mode)
dev: install
	$(PNPM) run dev

test: install
	$(PNPM) test

## ESLint plus a TypeScript type check
lint: install
	$(PNPM) run lint
	$(PNPM) run typecheck

build: install
	$(PNPM) run build

## Regenerate the TypeDoc API reference in docs/api
docs: install
	$(PNPM) run docs:api

## bots-sdk ships as an npm package, not a container image
docker:
	@echo "bots-sdk is published to GitHub Packages as @discordy-voics/bots; there is no container image to build."
