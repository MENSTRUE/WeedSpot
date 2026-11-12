# WeedSpot 🌱

**Day 35 — 100 Days of Projects**  
**Computer Vision · Precision Agriculture · Weed Detection & Segmentation**

An AI-powered computer vision project exploring weed identification in agricultural imagery to support precision farming and automated field monitoring.

> **Project Status:** In Progress — Model Inference & Integration

## Overview

WeedSpot aims to identify unwanted vegetation in agricultural images using computer vision and deep learning techniques.

The project explores how image-based AI can support farmers, researchers, and agricultural technology developers in detecting weeds and understanding their distribution within crop areas.

WeedSpot is part of the **100 Days of Projects** initiative, focused on practical AI engineering, reproducible experimentation, and real-world problem solving.

## Problem Statement

Weeds compete with crops for sunlight, nutrients, water, and growing space. Identifying them early is important for effective agricultural management.

Traditional manual field inspection can be labor-intensive, time-consuming, and difficult to scale across large agricultural areas.

Computer vision offers a potential approach for supporting more efficient weed monitoring.

## Project Objectives

- Explore deep learning approaches for agricultural weed identification.
- Develop and validate an image-based inference workflow.
- Investigate detection and segmentation capabilities based on available annotations.
- Visualize predictions and model confidence where supported.
- Evaluate model performance and identify common failure cases.
- Prepare the foundation for backend and frontend integration.
- Document reproducible experiments and technical limitations.

## Development Progress

| Component | Status | Description |
|---|---|---|
| Repository structure | Completed | Standard project scaffold initialized |
| Problem definition | Completed | Weed identification for agricultural imagery |
| Dataset provenance | Pending verification | Dataset sources, licenses, and annotation formats require confirmation |
| Dataset preprocessing | Not verified | Preprocessing results have not yet been documented |
| Model training | Not verified | Training results and checkpoints require confirmation |
| Model inference | In progress | Developing and debugging the inference workflow |
| Model evaluation | Pending | Held-out metrics have not been confirmed |
| Backend integration | Planned | API-based model inference |
| Frontend integration | Planned | Interactive visualization of predictions |
| Documentation | In progress | README and development tracking |

**Note:** A component marked *Not verified* does not necessarily mean it has not been attempted. It means a reproducible result has not yet been documented.

## Proposed AI Workflow

```text
Agricultural Image
        |
        v
Image Validation
        |
        v
Preprocessing
        |
        v
Trained Model / Checkpoint
        |
        v
Inference Pipeline
        |
        v
Predicted Classes / Masks / Boxes
        |
        v
Confidence & Visualization
        |
        v
Results and Limitations
```

The final output format depends on the actual dataset annotations and validated model architecture.

## Machine Learning Methodology

1. **Dataset Audit:** Verify dataset sources, annotation schema, class distributions, duplicates, and licensing.
2. **Data Preparation:** Perform preprocessing and establish reproducible train/validation/test splits.
3. **Model Experimentation:** Train and compare appropriate computer vision baselines.
4. **Validation:** Select the model using validation performance only.
5. **Inference Development:** Load the selected model, process new images, and generate predictions.
6. **Evaluation:** Report held-out performance, per-class metrics, and failure cases.
7. **Application Integration:** Connect the validated inference pipeline to backend and frontend components.
8. **Documentation:** Record dependencies, limitations, model artifacts, and usage instructions.

## Current Focus: Inference Development

The immediate development priority is completing and verifying the inference pipeline.

### Current Tasks

- [ ] Confirm checkpoint path and model architecture.
- [ ] Verify model loading without errors.
- [ ] Confirm input preprocessing matches training.
- [ ] Validate output tensor shapes and class mappings.
- [ ] Implement prediction postprocessing.
- [ ] Produce visual examples from representative images.
- [ ] Measure inference latency.
- [ ] Document limitations and failure cases.
- [ ] Integrate successful inference into the application.

### Definition of Done

Inference development will be considered complete when:

- The intended checkpoint loads successfully.
- Sample images produce valid predictions.
- Predictions use the correct class mapping.
- The output visualization matches the selected task.
- Inference can be reproduced using documented commands.
- At least one successful inference example is recorded.

## Dataset

Dataset provenance and annotation schema remain subject to verification.

Possible task formulations include image classification, object detection, semantic segmentation, and instance segmentation.

The selected approach must follow the verified labels rather than assumptions about the dataset.

Raw datasets are not committed to this repository.

## Repository Structure

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

## Reproducibility

Experiments should document dataset versions, license information, access dates, random seeds, preprocessing procedures, data splits, training configurations, validation metrics, and model selection criteria.

The held-out test set must not be used for hyperparameter tuning or champion selection.

## Development Roadmap

- [x] Initialize repository and project documentation.
- [x] Define the agricultural weed identification problem.
- [ ] Finalize dataset provenance and preprocessing documentation.
- [ ] Verify training artifacts and class mappings.
- [ ] Complete image inference.
- [ ] Add prediction visualization.
- [ ] Evaluate the selected model.
- [ ] Integrate backend inference endpoints.
- [ ] Develop an interactive frontend.
- [ ] Add reproducible setup and testing instructions.
- [ ] Publish a technical project demonstration.

## Limitations

WeedSpot is an experimental research and portfolio project.

Performance may vary depending on crop species, image resolution, lighting, camera angle, field conditions, and differences between training and deployment images.

Predictions should not be treated as definitive agronomic assessments without appropriate validation.

## License

See [LICENSE](LICENSE).

## Author

Developed by [MENSTRUE](https://github.com/MENSTRUE) as part of the **100 Days of Projects** initiative.
