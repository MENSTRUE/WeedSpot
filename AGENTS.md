# AGENTS.md — WeedSpot

## 1. Project Identity

- **Project:** WeedSpot
- **Day:** 35
- **Program:** 100 Days of Projects
- **Domain:** Agriculture / Computer Vision
- **Primary Goal:** Agricultural weed identification using computer vision and deep learning
- **Current Phase:** Inference Development & Verification
- **Project Status:** Work in Progress

WeedSpot explores the identification of weeds in agricultural imagery to support precision agriculture.

This document defines mandatory instructions for AI coding agents and contributors working within this repository.

**Core Principle:** Prioritize working, reproducible, evidence-based implementations over premature feature expansion.

---

## 2. Mandatory Repository Structure

Preserve the existing root structure:

```text
WeedSpot/
├── README.md
├── AGENTS.md
├── LICENSE
├── .gitignore
├── .env.example
├── notebooks/
├── models/
├── reports/
├── assets/
│   ├── plots/
│   ├── examples/
│   ├── screenshots/
│   └── diagrams/
├── backend/
├── frontend/
├── docs/
└── scripts/
```

### Repository Constraints

- Do not rename, remove, or reorganize mandatory directories.
- Do not create a tracked `datasets/` directory.
- Use `.gitkeep` for empty mandatory directories.
- Preserve existing source files unless modifications are required and reviewed.
- Do not introduce redundant folders or duplicate application implementations.
- Keep generated caches, temporary files, and large artifacts out of Git.
- Maintain compatibility with the existing repository architecture.

---

## 3. Current Development State

The repository scaffold and initial project documentation have been established.

The project is currently focused on implementing, debugging, and verifying model inference.

### Progress Classification

| Component | Status |
|---|---|
| Repository scaffold | Completed |
| Problem definition | Completed |
| Dataset provenance | Pending verification |
| Dataset preprocessing | Not verified |
| Model training | Not verified |
| Model checkpoint compatibility | Pending verification |
| Inference pipeline | In progress |
| Prediction visualization | Pending verification |
| Held-out evaluation | Pending |
| Backend integration | Planned |
| Frontend integration | Planned |
| Documentation | In progress |

**Important:** Do not interpret *Not verified* as proof that an implementation does not exist. Inspect the repository before making changes.

Never claim model accuracy, inference success, deployment readiness, or completed integration without supporting evidence.

---

## 4. Immediate Development Priorities

Prioritize inference completion before introducing additional major features.

### Priority 1 — Repository and Artifact Audit

1. Inspect the existing source code.
2. Identify actual model architecture and task formulation.
3. Locate available model checkpoints.
4. Locate label mappings and preprocessing configuration.
5. Inspect existing inference implementations.
6. Determine missing dependencies and integration issues.
7. Record findings before implementing changes.

Do not assume that a checkpoint exists or that the current model supports segmentation.

### Priority 2 — Model Inference

- [ ] Verify checkpoint existence and integrity.
- [ ] Confirm model architecture compatibility.
- [ ] Validate preprocessing against training configuration.
- [ ] Load model artifacts successfully.
- [ ] Validate input and output tensor shapes.
- [ ] Apply task-appropriate postprocessing.
- [ ] Produce valid predictions on sample inputs.
- [ ] Add visualization for supported output types.
- [ ] Handle invalid files and inference errors.
- [ ] Measure inference latency.
- [ ] Document inference limitations.

### Priority 3 — Testing and Evaluation

- [ ] Create reproducible inference tests.
- [ ] Verify class-index mapping.
- [ ] Check output consistency across repeated inference.
- [ ] Investigate prediction failures.
- [ ] Validate model behavior on representative images.
- [ ] Evaluate using a previously untouched test set, if available.
- [ ] Report task-appropriate quantitative metrics only when measured.

### Priority 4 — Application Integration

After inference is verified:

1. Integrate the model into the backend.
2. Implement validated image-upload handling.
3. Expose prediction results through documented API endpoints.
4. Integrate frontend prediction visualization.
5. Provide clear loading, success, and error states.
6. Add user-facing model limitations.
7. Test the complete prediction workflow.

---

## 5. Dataset Rules

Use credible, task-relevant datasets.

For every dataset, document:

- Original source URL
- Provider or publisher
- Dataset version
- License and usage restrictions
- Access date
- Annotation format
- Class definitions
- Intended experimental use
- Known limitations

### Mandatory Data Audit

Before modeling:

1. Inspect directory and annotation schemas.
2. Validate image references and class labels.
3. Identify missing and corrupted samples.
4. Check exact and near-duplicate samples.
5. Investigate data leakage.
6. Review class distribution.
7. Determine defensible train/validation/test splits.
8. Verify annotation compatibility across datasets.

Do not invent dataset provenance, sample counts, annotation details, labels, or experimental results.

Do not combine datasets with incompatible annotation semantics without a documented conversion and validation process.

Raw datasets must not be committed to Git.

---

## 6. Machine Learning Standards

### Reproducibility

All experiments should record:

- Python and library versions
- Random seeds
- Dataset references
- Input image resolution
- Preprocessing and augmentation
- Model architecture
- Hyperparameters
- Training configuration
- Validation criteria
- Model selection procedure
- Export format and artifact metadata

### Model Selection

- Select models using validation performance only.
- Do not tune hyperparameters against held-out test performance.
- Maintain an independent test set.
- Report class-level results where applicable.
- Include failure cases and uncertainty.
- Avoid reporting unsupported performance claims.

### Task-Specific Evaluation

**Classification:** Accuracy, precision, recall, F1-score, confusion matrix.

**Object Detection:** mAP, precision, recall, bounding-box error analysis.

**Segmentation:** IoU, Dice score, per-class segmentation metrics, qualitative masks.

Only report metrics applicable to the verified implementation.

---

## 7. Inference Engineering Rules

Inference must use artifacts compatible with the selected model.

### Required Behavior

- Verify checkpoint and configuration availability.
- Validate image formats and input dimensions.
- Apply consistent preprocessing.
- Use correct class mappings.
- Perform task-specific postprocessing.
- Avoid fabricated confidence scores.
- Return meaningful errors.
- Record actual model-loading failures.
- Handle CPU/GPU availability gracefully.
- Document device requirements and limitations.

### Model Loading

Do not silently substitute another checkpoint when loading fails.

Do not claim inference succeeded based on placeholder outputs or randomly generated predictions.

If loading fails:

1. Capture the actual error.
2. Identify the failing component.
3. Check model architecture and checkpoint compatibility.
4. Implement the smallest defensible fix.
5. Run verification tests.
6. Document the resolution.

---

## 8. Environment and Dependencies

### Development Platform

- Windows 11
- Python 3.11
- PowerShell
- Shared Python AI environment where compatible

Preferred shared interpreter:

```text
C:\DevEnvs\ai-general\Scripts\python.exe
```

### Shared Environment Policy

The shared environment may access compatible packages from the global Python installation.

Agents must:

- Inspect installed dependency versions before installation.
- Avoid unnecessary duplication of large AI frameworks.
- Never reinstall PyTorch CUDA or TensorFlow without technical justification.
- Avoid unplanned upgrades to global dependencies.
- Check compatibility before installing requirements.
- Use isolated environments for conflicting versions.
- Preserve reproducibility documentation for other machines.

**Do not assume the shared environment is guaranteed to match every project requirement.**

### Dependency Validation

```powershell
& "C:\DevEnvs\ai-general\Scripts\python.exe" -m pip check
```

GPU verification:

```powershell
& "C:\DevEnvs\ai-general\Scripts\python.exe" -c "import torch; print(torch.cuda.is_available())"
```

Do not treat CUDA availability as proof that an application model works correctly.

---

## 9. Backend Rules

Backend implementations must:

- Load real validated model artifacts.
- Validate uploaded images.
- Enforce reasonable file-size limits.
- Handle unsupported formats.
- Provide clear error responses.
- Avoid fabricated inference outputs.
- Separate model initialization from request handling where appropriate.
- Document model readiness and runtime limitations.
- Avoid exposing sensitive filesystem paths or server details.

Do not mark the model as ready unless successful initialization has been verified.

---

## 10. Frontend Rules

Frontend implementations must:

- Use real backend responses for predictions.
- Clearly distinguish loading, success, and error states.
- Avoid misleading confidence visualization.
- Display task-appropriate outputs.
- Remain responsive during inference.
- Provide usable image-upload interactions.
- Communicate model limitations.
- Avoid decorative controls with no functionality.

Do not present mocked prediction results as real AI inference.

---

## 11. Testing Requirements

Agents should implement and run relevant tests before reporting completion.

Minimum validation includes:

1. Import and dependency checks.
2. Model-loading verification.
3. Image preprocessing checks.
4. Model inference smoke tests.
5. Prediction-output validation.
6. API endpoint tests when backend functionality exists.
7. Frontend build validation when frontend functionality exists.

If a test cannot be executed, explicitly state why.

**Never mark an unexecuted test as passed.**

---

## 12. Git and Security Rules

Never commit:

- Raw datasets
- Virtual environments
- `.env` files
- API keys or credentials
- Cache directories
- Temporary training artifacts
- Large model checkpoints unless explicitly approved
- Private user data

### Git Workflow

Before committing:

```powershell
git status --short
git diff --check
```

Stage only intended files.

Use meaningful commit messages, such as:

```text
docs(weedspot): update inference development guidance
fix(inference): correct model preprocessing pipeline
test(inference): add prediction validation tests
feat(api): integrate verified weed inference endpoint
```

Never claim a feature is completed merely because code has been committed.

---

## 13. Documentation and Communication

Prefer technically accurate English documentation with Indonesian support where appropriate.

Every meaningful change should explain:

- What changed
- Why it changed
- Files affected
- Tests executed
- Known limitations
- Remaining work

Update `README.md` when project capabilities, setup instructions, or verified development status change.

Do not include fabricated screenshots, metrics, or claims.

---

## 14. AI Coding Agent Operating Procedure

For each requested task:

### Step 1 — Inspect

Read relevant files, inspect the current implementation, and identify dependencies.

### Step 2 — Plan

Define the smallest changes needed to achieve the requested outcome.

### Step 3 — Implement

Modify only the necessary files while preserving the repository structure.

### Step 4 — Verify

Run relevant tests and inspect actual results.

### Step 5 — Document

Update documentation and report limitations.

### Step 6 — Report

Provide a concise summary of completed work, tests, blockers, and suggested next steps.

**Do not overwrite functional implementations merely to follow a new proposed architecture.**

---

## 15. Definition of Done — Current Milestone

The current inference milestone is complete only when:

- [ ] The intended model checkpoint loads successfully.
- [ ] Input preprocessing is verified.
- [ ] Predictions are generated from real model execution.
- [ ] Class mappings are correct.
- [ ] Output visualization is valid.
- [ ] Representative inference examples are saved.
- [ ] Errors are handled appropriately.
- [ ] Reproducible execution instructions are documented.
- [ ] Actual verification results are reported.

Until these conditions are met, the inference milestone remains **In Progress**.

---

## 16. Guiding Principles

1. **Evidence over assumptions.**
2. **Working inference before feature expansion.**
3. **Reproducibility before performance claims.**
4. **Real outputs over simulated demonstrations.**
5. **Compatibility before dependency upgrades.**
6. **Preserve existing work before refactoring.**
7. **Measure progress through verified results.**

> Build real AI systems, validate their behavior, document their limitations, and improve incrementally.

**Current Focus: Complete WeedSpot inference before expanding the application.**
