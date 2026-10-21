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

IMAGE ?= ghcr.io/discordy-voics/bots-sdk
VERSION ?= $(shell node -p "require('./package.json').version")
REVISION ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo unknown)

## Multi-stage build: verify and pack the package, then a non-root runtime image
docker:
	docker build --build-arg VERSION=$(VERSION) --build-arg REVISION=$(REVISION) -t $(IMAGE):$(VERSION) .

# Install the pre-push hook (lint + unit tests, see lefthook.yml).
.PHONY: hooks
hooks:
	lefthook install
