# AI Impact Library — research summary

**Research date:** 27 September 2026<br>
**Scope:** 13 real implementation cases; 10 recommended launch cases. No website work is included. The companion [case articles](case-articles.md) provide a readable account of each problem, method, operating change and result; `cases.json` contains the same narratives for later use in the library.

## What the evidence supports

The library contains **13 cases across 11 industry labels** in the JSON: banking; financial services/payments; insurance; healthcare; logistics; retail; retail/e-commerce; consumer goods/e-commerce; consumer goods/manufacturing; software/technology; and professional services. The business functions represented are customer service, HR, marketing, e-commerce sales, procurement, claims, clinical operations, software development, technology risk, manufacturing quality, energy, and delivery operations.

Evidence grades: **3 A, 4 B, 6 C, 0 D, 0 E**. An A grade means the claim appears in a filing or investor/annual disclosure; it does **not** mean every operational claim is independently audited. A C grade means a named customer participated in a technology-provider case or joint study. Every figure in `cases.json` is tied to its source and stated at its actual scope.

Each case now includes an article-style narrative and six practical implementation steps. Those steps are reconstructions of the disclosed operating model where a company did not publish its project plan. Implementation difficulty, staffing needs, requirements, and replicability are research judgments. The companies generally did not disclose project duration or complete implementation cost, so the JSON says so rather than inventing estimates.

## Strongest documented cost cases

| Case | Disclosed result | How to read it |
|---|---|---|
| [UPS ORION](https://filexfer.ups.com/assets/resources/media/knowledge-center/UPS_2017_SR.pdf) | About **USD 410 million** in 2017 operating-expense savings and 100 million fewer miles, according to UPS. | A management-attributed realized program saving in a corporate report. ORION is route optimization; UPS does not describe the reported ORION algorithm as a machine-learning model. |
| [IBM AskHR](https://www.ibm.com/case-studies/ibm-askhr) | **40% lower HR operational costs over four years**, with AskHR contributing. | Actual departmental cost reduction, but IBM does not isolate the assistant's share from broader process changes. The later generative-AI upgrade cannot explain the whole historical decline. |
| [Klarna service assistant](https://www.sec.gov/Archives/edgar/data/2003292/000200329226000007/klar-20251231.htm) | Approximately **USD 59 million in 2025 cost savings**, reported in the Form 20-F. | Management-modeled savings from fewer agent-handled requests at estimated human-service cost; not an audited expense-line reduction or 850 eliminated jobs. |
| [Walmart supplier negotiation](https://pactum.com/clients) | **3% average savings/gain** on the chatbot-negotiated contracts in the expanded program. | Applies to the negotiated contract pool only, not all Walmart procurement. The [account coauthored by Walmart buyers](https://hbr.org/2022/11/how-walmart-automated-supplier-negotiations) supplies context. |

The first three have the largest or clearest disclosed cost outcomes. P&G's 10–20% scrap reduction and Google's cooling-energy reduction imply lower resource use, but neither source publishes a dollar saving for its case; neither is converted into one here. [P&G–Siemens](https://press.siemens.com/global/en/pressrelease/siemens-and-procter-gamble-scale-ai-based-quality-inspection-across-global-production) and [Google DeepMind](https://deepmind.google/discover/blog/deepmind-ai-reduces-google-data-centre-cooling-bill-by-40/) provide the underlying operational measures.

## Strongest revenue cases

| Case | Disclosed result | Scope and limitation |
|---|---|---|
| [Pomelo Fashion](https://aws.amazon.com/solutions/case-studies/pomelo-case-study/) | **8% increase in incremental gross revenue** after expanded product personalization. | Customer/provider case; methodology for the incremental estimate is not fully public. Its initial dresses category showed 18.3% higher revenue, which is a narrower measure. |
| [Coca-Cola Store](https://business.adobe.com/customer-success-stories/coca-cola-case-study-personalization.html) | **36% increase in revenue** reported for AI-powered personalized discovery. | US online store initiative, not The Coca-Cola Company's total revenue. The public case does not give a controlled-test design. |

DBS disclosed **SGD 750 million of 2024 economic value** across more than 370 AI and analytics use cases in its [annual-report CIO statement](https://www.dbs.com/annualreports/2024/cio-statement.html). That is a portfolio-level economic-value measure. It is **not** revenue, profit, or value assignable to the single DBS change-risk case included here.

## Strongest productivity and operating cases

- [Zurich Chile](https://www.zurich.com/campaigns/zic/articles/building-an-innovation-mindset): about **33,000 traditional reimbursement claims per month** were handled automatically by August 2024; typical settlement time fell from about **4.5 days to within one day**. The 33% automation rate is for traditional reimbursement claims, not all health claims.
- [DBS change-risk scoring](https://www.dbs.com/annualreports/2024/cio-statement.html): AI review coverage rose from **5% to 100%** of software change requests, with an **81% reduction** in the monthly average of change-caused incidents. No case-specific financial value was disclosed.
- [Chi Mei Medical Center](https://news.microsoft.com/source/asia/features/taiwan-hospital-deploys-ai-copilots-to-lighten-workloads-for-doctors-nurses-and-pharmacists): clinician-reported doctor report time fell from roughly **60 to 15 minutes**; nurse transfer-note time fell from **10–20 minutes to under five**. These are task examples, not a hospital-wide labor saving.
- [P&G with Siemens](https://press.siemens.com/global/en/pressrelease/siemens-and-procter-gamble-scale-ai-based-quality-inspection-across-global-production): **10–20% lower scrap rates**, depending on product, from line-speed visual inspection. The source does not quantify material cost saved.
- [Google DeepMind](https://deepmind.google/discover/blog/deepmind-ai-reduces-google-data-centre-cooling-bill-by-40/): up to **40% less cooling energy** in a reported live data-center test, equating to about **15% less overall power-usage-effectiveness overhead** at that site. It is not a network-wide or monetary result.

## Implementation patterns and reasons they worked

1. **Pick a repeated, costly decision.** Common support questions, similar claims, product rankings, route choices and line inspections occur often enough to justify data collection and integration.
2. **Use existing operational data.** These cases relied on service logs, purchase events, claim documents, factory images, sensor readings, change records or delivery addresses rather than a vague “AI strategy.”
3. **Start with a bounded workflow.** Pomelo began with dresses; Zurich targeted reimbursement claims outside its existing point-of-sale automation; P&G established a reusable production-line inspection pattern.
4. **Connect the AI to action.** The valuable step was routing a chat, settling an eligible claim, ordering products, flagging a risky release, setting cooling controls or rejecting a defective item.
5. **Retain human authority where judgment matters.** Klarna and IBM kept human escalation; Chi Mei clinicians review notes; UPS drivers apply route knowledge; procurement staff define negotiation limits.
6. **Measure business outcomes at the right denominator.** Compare per-chat cost and repeat contacts, negotiated-contract spend, category revenue, claim settlement time, incident counts, scrap rate or metered energy. A percentage uplift on a narrow channel should stay narrow.

## Common risks

- **Attribution:** a vendor case may report a before/after uplift without publishing a control group. IBM's cost decline reflects a wider transformation; Klarna's cost figure uses a counterfactual model.
- **Metric inflation:** hours released are capacity, not cash; agent-equivalent work is not headcount reduction; a rise in clicks or code changes is not automatically revenue or profit.
- **Data and decision quality:** outdated policies, poor labels, biased histories, false defect rejects, wrong claims decisions and unsafe physical controls can reverse the value.
- **Customer and employee trust:** difficult cases need a reachable human. Privacy and security are central in banking, healthcare and HR.
- **Transferability:** a high-volume bank, retailer or manufacturer has different economics from a small organization with little data or few repeated transactions.

## Cases to hold back from prominent financial-ROI claims

All 13 sources meet A–C under this project's classification; none relies solely on an unsupported media claim. Three cases are useful teaching examples but have weaker *case-level financial* evidence:

- **[Accenture/GitHub Copilot](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/):** a randomized study supports developer workflow measures, including 8.69% more pull requests and a 15% higher merge rate. It does not show cost, revenue or profit impact. Do not market it as an 8.69% business-productivity gain.
- **[NatWest Cora](https://investors.natwestgroup.com/~/media/Files/R/RBS-IR-V2/annual-report-2025/2025-annual-report-and-accounts.pdf):** the annual report supports about a 20-percentage-point rise in no-human resolution on comparable GenAI journeys. It does not disclose an attributable cost saving; group cost-ratio improvements cover many initiatives.
- **[Walmart/Pactum](https://pactum.com/clients):** the 3% figure is a price/terms gain on negotiated spend, with no total-dollar result or published independent audit. It should not be presented as 3% savings across Walmart's full supplier base.

## Recommended 10 launch cases

| Priority | Case | Reason to launch |
|---|---|
| 1 | [Klarna — customer-service assistant](https://www.sec.gov/Archives/edgar/data/2003292/000200329226000007/klar-20251231.htm) | Filing-backed cost model, clear operating workflow, strong discussion of estimates versus actual expense. |
| 2 | [UPS — delivery-route optimization](https://filexfer.ups.com/assets/resources/media/knowledge-center/UPS_2017_SR.pdf) | Rare large realized expense figure; a useful example of optimization rather than generative AI. |
| 3 | [IBM — AskHR](https://www.ibm.com/case-studies/ibm-askhr) | Department-level cost reduction and understandable human-escalation design. |
| 4 | [Pomelo Fashion — recommendations](https://aws.amazon.com/solutions/case-studies/pomelo-case-study/) | Clear category pilot and reported incremental revenue. |
| 5 | [Coca-Cola Store — personalized discovery](https://business.adobe.com/customer-success-stories/coca-cola-case-study-personalization.html) | Familiar brand and store-scope revenue uplift that invites an attribution discussion. |
| 6 | [Zurich Chile — health claims](https://www.zurich.com/campaigns/zic/articles/building-an-innovation-mindset) | Clear before/after processing time and high monthly volume. |
| 7 | [P&G — visual quality inspection](https://press.siemens.com/global/en/pressrelease/siemens-and-procter-gamble-scale-ai-based-quality-inspection-across-global-production) | Tangible manufacturing change and measurable waste reduction. |
| 8 | [Chi Mei — clinical documentation](https://news.microsoft.com/source/asia/features/taiwan-hospital-deploys-ai-copilots-to-lighten-workloads-for-doctors-nurses-and-pharmacists) | Concrete clinician workflow and time saved, with a clear human-review requirement. |
| 9 | [DBS — technology change-risk scoring](https://www.dbs.com/annualreports/2024/cio-statement.html) | Annual-report evidence and measurable incident reduction, without using portfolio value as case ROI. |
| 10 | [Google — data-center cooling](https://deepmind.google/discover/blog/deepmind-ai-reduces-google-data-centre-cooling-bill-by-40/) | Physical energy outcome and a good lesson in safe, measured deployment. |

The remaining three cases — Walmart, Accenture and NatWest — stay in the full research set for later thematic pages or speaker conversations. Their financial claims require the scope cautions above.
