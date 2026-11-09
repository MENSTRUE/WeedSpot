# AGENTS.md — WeedSpot

## Project Identity

Project: WeedSpot
Day: 35
Program: 100 Days of Projects
Domain: Agriculture / Computer Vision

## Mandatory Repository Structure

Preserve the following root structure:

- README.md
- AGENTS.md
- LICENSE
- .gitignore
- .env.example
- notebooks/
- models/
- reports/
- assets/plots/
- assets/examples/
- assets/screenshots/
- assets/diagrams/
- backend/
- frontend/
- docs/
- scripts/

Do not rename or remove required folders.

Do not create a tracked datasets/ folder.

Use .gitkeep for empty directories.

## Dataset Rules

Use credible and task-relevant data sources.

Document each dataset's:

- Original source URL
- Provider or publisher
- Version
- License
- Access date
- Annotation format
- Intended use
- Known limitations

Do not invent provenance, sample counts,
labels, metrics, or experiments.

Do not combine datasets before verifying
their annotation semantics and compatibility.

## Machine Learning Rules

Before training:

1. Inspect directory and annotation schemas.
2. Validate labels and image references.
3. Check corrupted and missing samples.
4. Check exact and near-duplicates.
5. Investigate train/test leakage.
6. Choose an appropriate split.
7. Establish meaningful baseline models.

Training requirements:

- Explicit seeds and configuration
- Documented preprocessing
- Reproducible experiments
- Validation-based model selection
- Independent held-out test evaluation
- Per-class metrics
- Confusion matrix or task-specific analysis
- Failure examples
- Saved model and configuration

Never tune using test-set performance.

## Application Rules

Backend and frontend implementations must:

- Load only compatible exported artifacts.
- Validate user input.
- Handle errors clearly.
- State model limitations.
- Avoid fabricated predictions.
- Communicate uncertainty.

Do not claim that a placeholder feature is functional.

## Git Rules

Never commit:

- Raw datasets
- Virtual environments
- Secret keys
- .env
- Cache files
- Temporary training artifacts
- Large checkpoints unless intentionally approved

Do not overwrite existing project files without review.

## Documentation

Prefer clear and technically accurate
English documentation with Indonesian support
where appropriate.

Explain decisions, assumptions,
limitations, and reproducibility details.

## Current Project State

Initial repository scaffold.

Dataset and task formulation not yet finalized.
No model performance claims are authorized.