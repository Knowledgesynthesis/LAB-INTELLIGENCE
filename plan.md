# **LAB INTELLIGENCE — OPTIMIZED MASTER PROMPT FOR EDUCATIONAL APP GENERATION**  
A clinically rigorous, evidence-based master prompt for generating a **mobile-first, offline-capable, dark-mode educational app** that teaches clinicians, residents, and laboratory stewards *how to think about diagnostic testing intelligently* — including pre-test probability, post-test probability, likelihood ratios, Bayesian updating, diagnostic stewardship, test characteristics, and informatics-driven decision support.

---

# **MASTER PROMPT — Lab Intelligence Educational App Generator (SPECIALIZED VERSION)**

## **Role & Mission**
You are a cross-functional team (PM + Staff Engineer + Senior Instructional Designer + Clinical Pathology SME + Evidence-Based Medicine SME + Informatics/Diagnostic Stewardship SME + UX Writer + QA).  
Your mission: design a **decision-support education platform** that teaches:

**Lab Intelligence: Decision Support & Diagnostic Stewardship**  
—A simulation-driven, visual-first environment where learners master appropriate test utilization, Bayesian reasoning, interpretation of diagnostic tests, and the interplay between laboratory science, clinical judgment, and informatics.

This app must:
- Serve **all learner levels:** MS2 → MS4 → residents → fellows → attendings  
- Cover **pre-test probability, test characteristics, rules of diagnostic use, cost-effectiveness, false positives, false negatives, cascades, and stewardship strategies**  
- Use **synthetic clinical scenarios and lab datasets only**  
- Provide **interactive Bayesian updating calculators, LR visualizers, ROC tools, stewardship decision trees, and case-based simulations**  
- Be **mobile-first, offline-ready, dark-mode optimized**  
- Strictly adhere to evidence-based diagnostic principles (no hallucinated test properties)

---

## **Inputs (Fill These)**
- **Primary Topic(s):**  
  Always centered on **diagnostic reasoning & lab stewardship**, including:  
  - Pre-test probability & disease prevalence  
  - Sensitivity, specificity, LR+, LR–  
  - Bayesian reasoning & post-test probability  
  - ROC curves & threshold selection  
  - PPV/NPV across prevalence ranges  
  - Testing cascades, overuse, underuse  
  - Diagnostic stewardship frameworks  
  - Informatics-based decision support (CDS) principles  
  - Choosing Wisely recommendations  
  - Ordering pathways (e.g., troponin, D-dimer, PCR, imaging labs)  
  - Value-based and harm-based evaluation  
- **Target Learner Levels:** {{LEVELS}}  
- **Learner Context:** {{CONTEXT}}  
- **Learning Outcomes:** {{LEARNING_OBJECTIVES}}  
- **Constraints:**  
  Always include:  
  - *Mobile-first; dark mode; offline-ready; synthetic dataset; evidence-based diagnostic guidelines; educational-only*  
- **References/Standards:** {{REFERENCES}}  
  - e.g., “ACP High-Value Care, Choosing Wisely, CDC stewardship principles, Evidence-Based Diagnosis references”
- **Brand/Voice:** {{VOICE_TONE}}  
- **Localization:** {{LOCALE}}

---

# **Required Deliverables (Produce All)**

---

## **1. Executive Summary**
- Explain why clinicians struggle with appropriate test utilization and Bayesian reasoning.  
- Introduce Lab Intelligence as the **Diagnostic Reasoning Simulator + Stewardship Engine + Bayesian Visualizer**.  
- Provide 2–3 alternate names + concise value propositions.

---

## **2. Learner Personas & Use Cases**
Examples:
- Resident unsure whether to order troponin  
- IM hospitalist evaluating D-dimer appropriateness  
- ED trainee interpreting PCR/rapid tests  
- Pathologist guiding consults for lab stewardship  
Use cases: morning report, curbside consult practice, EBM teaching, CDS evaluation.

---

## **3. Curriculum Map & Knowledge Graph**
Connect:

**Disease → Pre-test probability → Test characteristics → Result → Post-test probability → Action → Stewardship impact**

### **Prerequisites**
- Probability basics  
- Clinical reasoning steps  
- Understanding of test characteristics  

### **Modules**

1. **Foundations of Diagnostic Reasoning**
   - Prevalence → probability  
   - Sensitivity, specificity  
   - Likelihood ratios  

2. **Bayesian Medicine**
   - Bayes theorem (clinical version)  
   - Fagan nomogram (visual)  
   - Updating from pre-test to post-test probability  

3. **Test Performance & ROC Curves**
   - Threshold trade-offs  
   - AUC interpretation  
   - When ROC curves mislead  

4. **Predictive Values in Context**
   - PPV/NPV as functions of prevalence  
   - Real-world examples (HIV, COVID, troponin, D-dimer)  

5. **Stewardship Principles**
   - Overdiagnosis harms  
   - False-positive cascades  
   - Value vs utility vs cost vs risk  
   - Choosing Wisely logic  
   - Test redundancy & reflex testing  

6. **Informatics & Decision Support**
   - CDS rules (conceptual)  
   - Alerts vs care pathways  
   - LOINC, order sets, triggers  
   - Algorithm misuse pitfalls  

7. **Diagnostic Algorithms**
   - Chest pain pathways  
   - Suspected PE  
   - Fever workup  
   - Sepsis bundles  
   - Endocrine labs (TSH-first rules)  

8. **Laboratory Science Foundations**
   - Pre-analytic errors  
   - Analytical errors  
   - Post-analytic pitfalls  

9. **Case-Based Stewardship Engine**
   - Present scenario  
   - User chooses tests  
   - System updates probabilities → cascades → cost/harm metrics  

Each module has micro-concepts, Bloom levels, prerequisites, and links.

---

## **4. Interactives (Lab Intelligence–Specific)**

### **Examples**

- **Bayesian Updating Simulator**
  - Slider for pre-test probability  
  - Choose test with given LR+ / LR–  
  - Visual post-test probability update  

- **Fagan Nomogram Interactive**
  - Drag between lines to see probability trajectories  

- **ROC & Threshold Explorer**
  - Adjust sensitivity vs specificity → see threshold implications  

- **PPV/NPV vs Prevalence Explorer**
  - Graph updates dynamically with prevalence slider  

- **Test Cascade Simulator**
  - Order a test → false-positive leads to downstream tests  
  - Visualize “diagnostic cascade burden”  

- **Stewardship Case Tree**
  - Outpatient cough case  
  - Chest pain case  
  - Syncope case  
  - Each with branching tests + outcomes  

- **Pre-Analytic Error Lab**
  - Simulate hemolysis, wrong tube, contamination  
  - Show how results mislead  

- **CDS Alert Builder**
  - Choose lab → select rules → see how order prompts appear  

For each interactive:
- purpose  
- inputs/controls  
- outputs  
- visuals (curves, bar charts, flows)  
- preset synthetic examples  
- evidence-based guardrails

---

## **5. Assessment & Mastery**
Include:
- MCQs  
- Short cases (“Should you order this test?”)  
- LR reasoning exercises  
- ROC interpretation  
- PPV/NPV reasoning at various prevalences  
- Identify unnecessary vs essential tests  
Provide **10–20 items** with rationales.

---

## **6. Diagnostic Reasoning Framework**
Teach systematic approach:

1. Establish *pre-test probability*  
2. Select test based on LRs & performance  
3. Update probability after test result  
4. Decide on next action (test again, treat, observe)  
5. Avoid cascades where harms > benefits  
6. Apply stewardship principles  

Pitfalls:
- Treating tests as binary truth  
- Mixing up PPV/NPV with sensitivity/specificity  
- Ignoring prevalence  
- Overordering “just in case” labs  
- Misunderstanding pre-analytic errors  

---

## **7. Accessibility & Safety**
- WCAG 2.2 AA  
- Synthetic data only  
- No real clinical guidance  
- Explain that platform is educational  
- Ensure all formulas & LRs reflect authoritative EBM sources  

---

## **8. Tech Architecture (Mobile-First, Offline)**
- React/TypeScript  
- Tailwind + shadcn/ui  
- Recharts/D3 for curves (ROC, PPV/NPV, nomograms)  
- IndexedDB + Service Worker for offline case storage  
- Zustand/Redux for state  
- Logic modules for LRs/Bayes updating

---

## **9. Data Schemas (JSON)**
Schemas for:
- test characteristics (Sn, Sp, LR+, LR–)  
- synthetic patient scenarios  
- probability calculations  
- cascade pathways  
- CDS rule structures  
- glossary terms  
Include examples.

---

## **10. Screen Specs & Text Wireframes**
Screens:
- Home  
- Foundations of Testing  
- Bayesian Lab  
- ROC Explorer  
- Stewardship Center  
- Test Cascade Simulator  
- Pre-Analytic Error Lab  
- CDS Builder  
- Case Engine  
- Assessment Hub  
- Glossary  
- Settings  

Provide textual wireframes.

---

## **11. Copy & Content Kit**
Include:
- Microcopy (“LR+ tells you how much a positive test shifts odds”)  
- Diagram labels (nomogram steps, ROC axes)  
- Tables for common LRs (e.g., D-dimer, troponin, CRP)  
- Two full lessons + one integrated case  

---

## **12. Analytics & A/B Plan**
UI-only:
- Probability slider design  
- Case branching UI  
- Test-cascade visualization styles  

---

## **13. QA Checklist**
- Likelihood ratio math validated  
- ROC definitions correct  
- PPV/NPV vs prevalence graph accurate  
- Stewardship guidelines aligned with evidence  
- Internal logic consistent

---

## **14. Roadmap**
Prototype → Pilot → Expanded Stewardship Cases → Informatics Integration Deep Dive → Personalized Learning Tracks  
Include milestones, risks, acceptance criteria.

---

# **Style & Rigor Requirements**
- Visual-first, clinically relevant  
- Evidence-based and internally consistent  
- Clear explanations (Pathoma-like clarity but for diagnostic reasoning)  
- No contradictory test-interpretation logic  

---

# **Acceptance Criteria**
- Learners correctly use Bayesian reasoning and apply stewardship principles  
- All modules internally consistent and accurate  
- App reinforces a unified **Lab Intelligence Diagnostic Decision Map**

---

# **Now Generate**
Using the inputs above, produce all deliverables in the required order.  
If any input is missing, make evidence-based diagnostic assumptions and label them as defaults.
