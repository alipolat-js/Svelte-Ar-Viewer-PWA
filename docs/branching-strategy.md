# Git Branching Strategy

This document outlines our Git branching strategy to maintain a clean and organized codebase.

## Main Branches

- `main` - Production-ready code
- `develop` - Main development branch, integration branch for features

## Supporting Branches

### Feature Branches
- **Naming**: `feature/<feature-name>`
- **Purpose**: New features and non-emergency bug fixes
- **Branch from**: `develop`
- **Merge into**: `develop`
- **Example**: `feature/ar-viewer-controls`

### Release Branches
- **Naming**: `release/v<version>`
- **Purpose**: Release preparation and minor bug fixes
- **Branch from**: `develop`
- **Merge into**: `main` and `develop`
- **Example**: `release/v1.0.0`

### Hotfix Branches
- **Naming**: `hotfix/<fix-name>`
- **Purpose**: Emergency production fixes
- **Branch from**: `main`
- **Merge into**: `main` and `develop`
- **Example**: `hotfix/critical-security-fix`

## Branch Lifecycle

1. **Feature Development**
   - Create feature branch from `develop`
   - Develop and test feature
   - Create PR to merge into `develop`
   - Delete branch after merge

2. **Release Process**
   - Create release branch from `develop`
   - Fix any release-related issues
   - Merge into `main` and `develop`
   - Tag release in `main`

3. **Hotfix Process**
   - Create hotfix branch from `main`
   - Fix critical issue
   - Merge into `main` and `develop`
   - Tag new patch version

## Commit Message Guidelines

- Use clear, descriptive commit messages
- Start with a verb in imperative mood
- Example: "Add AR model loading functionality"

## Pull Request Process

1. Update documentation if needed
2. Get code review from at least one team member
3. Pass all automated tests
4. Squash commits if necessary
5. Merge using "Squash and merge" strategy 