# Visual evidence registry

Only link images that actually exist on GitHub and reflect experiment/application output. The audited `main` tree contains:

| File | Purpose / correct interpretation |
|---|---|
| `plots/training_results.png` | recorded training/validation trajectory, cross-check `reports/training_history.csv` |
| `examples/both_datasets_label_audit.png` | source-specific ground-truth mask mapping demonstration |
| `examples/CWFID_test_examples.png` | qualitative examples from CWFID research test set |
| `examples/EWIS1_test_examples.png` | qualitative examples from EWIS1 research test set |

No actual application screenshot was committed to `assets/screenshots/` at the 2026-11-13 GitHub audit. Although an interactive image-analysis screenshot was shared in conversation, do not fabricate or link a non-existent screenshot. To document the UI, save an actual screenshot locally after checking privacy and image licensing, commit it to `assets/screenshots/` only if redistribution is authorized, then add a relative Markdown image reference to README. `assets/diagrams/` currently has no tracked diagram; the docs use actual Mermaid text diagrams. Never claim sample visuals prove generalized accuracy.
