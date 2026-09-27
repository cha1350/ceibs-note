# AI Impact Library — case articles

Research notes for business readers. Each article distinguishes source-reported facts from a practical reconstruction of implementation. The full structured records, evidence grades, metrics and applicability fields are in `cases.json`.

## Klarna: AI assistant handles routine customer-service chats

**Industry:** Financial services / payments<br>
**Function:** Customer service<br>
**Evidence:** A — A 2025 Form 20-F reports the operating metrics and management-modeled cost savings. Filing status makes the source strong, but the $59 million is a counterfactual estimate, not an audited line-item saving.

Klarna’s customer-service problem was a scale problem. A routine question still required a person to read the conversation, identify the request and work toward a resolution. That model becomes costly when a payments company operates around the clock across many countries and languages. Klarna introduced its OpenAI-powered assistant in February 2024 to make digital chat the first stop for many requests, while keeping human representatives available.

### How they did it

The public filing identifies the assistant’s scope and results but does not publish its internal architecture, training set or escalation rules. The disclosed method is a conversational assistant that can handle a range of customer errands in more than 35 languages across 23 markets. Operationally, the assistant takes on chats that would otherwise require service agents; customers can still ask for a human. Klarna measures the shift through service-chat logs, resolution times, repeat inquiries and internal satisfaction surveys. A practical implementation sequence would be to inventory the most common requests, define which actions the assistant may take, connect it to approved service information and account workflows, and test the handoff to an agent before expanding across languages. Those project steps are a reconstruction, not a published Klarna playbook.

### The operating change

The central change is the allocation of work. AI handles a large share of digital conversations, leaving human staff to take requests that need judgment, reassurance or an explicit preference for a person. The assistant therefore changes service capacity, not merely the wording of replies.

### Result and what it means

Klarna reported that the assistant handled 80% of customer-service chats in 2025. It estimated approximately USD 59 million of cost savings that year by valuing the reduced volume of agent-handled requests against the cost of human service. That is a management-modeled saving, not proof of USD 59 million less payroll. Its comparison of two-minute AI resolution and twelve-minute human resolution may also reflect different mixes of simple and complex cases.

### Practical takeaway

The replicable idea is to start with high-volume digital requests and measure cost per resolved request alongside repeat contact and satisfaction. A business with little chat volume or weak escalation processes will not have the same economics.

**Implementation steps**

1. Inventory repeated chat requests and separate account actions from questions that only need an approved answer.
2. Prepare current policies and authorized customer-service workflows for the assistant; define which cases need a person.
3. Introduce the OpenAI-powered assistant in digital chat, then expand its language and market coverage.
4. Allow customers to reach a human representative and pass unresolved or sensitive cases to that route.
5. Use service logs to compare AI and human resolution time, repeat contact and satisfaction by request type.
6. Estimate avoided service cost from the reduction in agent-handled volume, and keep that estimate separate from booked expense changes.

**Primary sources:** [Klarna Group plc 2025 Form 20-F](https://www.sec.gov/Archives/edgar/data/2003292/000200329226000007/klar-20251231.htm); [Klarna financial update: AI assistant savings methodology](https://www.sec.gov/Archives/edgar/data/2003292/000162828025052805/exhibit992klarnapresenta.htm)

---

## UPS: Optimizing daily delivery routes with ORION

**Industry:** Logistics<br>
**Function:** Operations / logistics<br>
**Evidence:** B — UPS reported the numbers in its 2017 corporate sustainability report. ORION is an advanced optimization system; UPS does not identify the reported ORION algorithm itself as a machine-learning model. Include as the library’s optimization category, with that qualification.

UPS faced a physical version of the same scale challenge: millions of delivery decisions every day. Even a small reduction in miles per driver compounds across a national fleet. Its ORION system converts package destinations, custom road maps and vehicle data into a suggested daily route for each delivery vehicle.

### How they did it

UPS describes ORION as an operations-research and advanced-algorithm system, not as a generative chatbot or a disclosed machine-learning model. The software begins with package-level details and the day’s stops, incorporates customized online map information and fleet telematics, and calculates a route that meets delivery needs while avoiding unnecessary travel. Dispatchers and drivers then execute the route, with drivers using their knowledge when a recommendation clashes with conditions on the ground. UPS completed deployment across the targeted US routes in 2016. A similar project would require reliable addresses, service-time commitments, vehicle constraints and a way to compare planned and actual miles; UPS does not provide a portable model formula or detailed cost build-up.

### The operating change

Route planning moved from a primarily human and habitual process to a daily data-driven recommendation embedded in delivery operations. The operating decision still has a human last mile: the driver can recognize an impractical turn, loading issue or customer condition that the software misses.

### Result and what it means

UPS reported about 100 million fewer miles annually and operating-expense savings of roughly USD 410 million in 2017, the first full year after targeted US rollout. The figure is management-attributed program performance in a corporate sustainability report, not a separate audited income-statement line. The case belongs in an optimization category and should not be presented as evidence that a large language model created the savings.

### Practical takeaway

For a fleet business, the transferable method is to optimize a repeated operating decision and verify the result in fuel, miles, service reliability and expense. The model matters only if drivers and dispatchers can use it during real work.

**Implementation steps**

1. Gather each day’s package destinations, service commitments, vehicle information and accurate road-map data.
2. Use ORION’s routing algorithms to calculate a feasible sequence of stops for each delivery vehicle.
3. Deliver the route to dispatchers and drivers as part of daily operations.
4. Let drivers apply local knowledge when traffic, access or customer conditions make a recommendation impractical.
5. Record actual miles, fuel consumption and service performance after the route is driven.
6. Compare operating expense and miles with the pre-rollout plan, accounting for changes in delivery volume.

**Primary sources:** [UPS 2017 Corporate Sustainability Progress Report](https://filexfer.ups.com/assets/resources/media/knowledge-center/UPS_2017_SR.pdf)

---

## IBM: Automating routine HR support with AskHR

**Industry:** Software / technology<br>
**Function:** HR<br>
**Evidence:** B — IBM’s own case study reports a real departmental cost decline but says the agent contributed rather than caused all of it. Its 2025 generative-AI upgrade occurred after part of the reported four-year cost trend.

At IBM, a request for a payslip, vacation document or policy answer could cross several HR systems and regional rules. The issue was not a shortage of generic answers; it was the friction of finding the right answer and completing a routine transaction. IBM gradually developed AskHR into a common front door for these requests.

### How they did it

IBM says it first simplified HR processes before automating them. AskHR now draws on about 7,000 policy pages and connects to systems including Workday, SAP and Concur. A question is classified into an area such as payroll, benefits or career matters. The assistant either gives a relevant answer or starts an approved task, such as a vacation request or employment-verification letter. Managers can initiate more complex changes through connected workflows. Common requests stay in self-service; human advisers take sensitive or unusual cases. IBM refined the assistant over six years and added watsonx Orchestrate in 2025. The source does not disclose every policy-control rule, model evaluation result or the implementation duration for each task.

### The operating change

Employees no longer need to know which HR application owns a routine answer or transaction. For HR staff, fewer basic tickets mean more attention can go to issues requiring judgment, though the source does not quantify how much staff time was redeployed.

### Result and what it means

IBM reports a 94% containment rate for common questions and a 40% reduction in HR operational costs over four years, to which AskHR contributed. The cost decline spans a wider transformation and began before the 2025 generative-AI enhancement. It would be misleading to claim the latest model alone produced 40% savings.

### Practical takeaway

The method to copy is process simplification, approved policy knowledge, secure system connections and an explicit human tier. A chatbot over unsorted policies would be far less useful than one that can safely finish a task.

**Implementation steps**

1. Identify frequent HR questions and transactions, then simplify the underlying process before automating it.
2. Keep local policy pages and permission rules current so the assistant can present the right answer to the right employee.
3. Connect AskHR to HR systems such as Workday, SAP and Concur for approved transactions.
4. Classify a request by topic, answer it or trigger a task such as a letter or vacation request.
5. Route unusual, sensitive or unresolved matters to a human HR adviser.
6. Track containment, ticket volume, employee feedback, task productivity and HR operating cost over time.

**Primary sources:** [Transforming HR support with agentic AI: IBM AskHR](https://www.ibm.com/case-studies/ibm-askhr)

---

## Google: AI control of data-center cooling

**Industry:** Software / technology<br>
**Function:** Operations / energy<br>
**Evidence:** B — The original Google DeepMind publication describes a live on/off test and energy metrics. It does not publish a dollar saving or evidence that every Google site achieved the same result.

Data-center cooling is a continuous balancing act. A warmer day, a shift in computing load or a change in equipment behavior can make yesterday’s settings inefficient. Google and DeepMind used the historical sensor data already collected in a data center to identify better cooling choices.

### How they did it

The 2016 system learned from thousands of readings, including temperature, electrical power, pump speed and equipment settings. One set of models estimated future energy efficiency under different settings; two other sets predicted whether temperature and pressure would stay within safe limits over the next hour. Operators tried the recommendations in a live site and compared cooling energy when the recommendations were on and off. In a later 2018 iteration, Google reported that an automated controller took a fresh sensor snapshot every five minutes, checked candidate actions against safety constraints and sent approved changes through local controls under operator supervision. The 40% result belongs to the earlier reported live test; it should not be silently attributed to the later controller.

### The operating change

Cooling decisions became more adaptive to changing site conditions. The later design also reduced the effort of having operators manually implement each recommendation, while keeping local safety controls and expert oversight.

### Result and what it means

Google reported up to 40% less cooling energy and about 15% lower total power-usage-effectiveness overhead at the tested site. That is an energy measure. Neither the 2016 account nor the case record gives a verified dollar saving or a claim that every data center achieved the same reduction.

### Practical takeaway

The business method is to optimize a measurable physical cost with abundant sensor data while treating safety limits as part of the product. Any financial return must be calculated from actual metered energy, tariffs and deployment costs at each site.

**Implementation steps**

1. Collect historical readings from cooling-system sensors and measure energy use under existing operating settings.
2. Train a model to predict energy efficiency under possible cooling adjustments.
3. Train separate forecasts for temperature and pressure so unsafe adjustments can be rejected.
4. Test recommendations at a live site, comparing intervals with the system on and off.
5. Keep operators and local control systems responsible for equipment safety.
6. For later automated control, take fresh sensor readings regularly and implement only actions that pass the safety checks.

**Primary sources:** [DeepMind AI Reduces Google Data Centre Cooling Bill by 40%](https://deepmind.google/discover/blog/deepmind-ai-reduces-google-data-centre-cooling-bill-by-40/); [Safety-first AI for autonomous data centre cooling and industrial control](https://deepmind.google/blog/safety-first-ai-for-autonomous-data-centre-cooling-and-industrial-control/)

---

## The Coca-Cola Company: Personalized product discovery at the US Coca-Cola Store

**Industry:** Consumer goods / e-commerce<br>
**Function:** Marketing / e-commerce<br>
**Evidence:** C — Adobe’s customer story includes Coca-Cola executive participation and a store-scope revenue claim. There is no public audited reconciliation or experimental design, so treat the 36% as reported revenue influence.

An online storefront can show the same product grid to everyone, even though shoppers reveal different interests through what they browse and buy. Coca-Cola’s US online store used AI-powered discovery to show more relevant items and complementary products, aiming to turn that relevance into sales.

### How they did it

Adobe’s joint customer story describes a wider Coca-Cola effort to unify customer and commerce information and act on it quickly. In the US store, the specific AI use case was personalized product discovery: behavioral actions and shopper affinities informed which items appeared as recommendations, while a “frequently bought together” placement suggested extras. Business teams examined recommendation clicks, search conversion and revenue through their analytics tools. The source does not disclose the exact recommendation algorithm, how shoppers were assigned to a comparison group or the period over which the 36% revenue uplift was calculated. A practical rollout would begin with a clean product catalog and event tracking, place recommendations in a high-traffic shopping step, and compare orders and margins with a holdout group.

### The operating change

Merchandising became responsive to the individual shopper rather than a single static display. The store could surface a likely next purchase or cross-sell at the moment a customer was choosing products.

### Result and what it means

The Adobe–Coca-Cola account reports 117% more recommendation clicks and a 36% revenue increase for the US store initiative. This is not a 36% rise in The Coca-Cola Company’s global revenue. Without a public control design, the number should be presented as reported revenue influence rather than a fully audited causal estimate.

### Practical takeaway

A retailer can copy the operating logic: use customer behavior to improve discovery, then judge success on incremental orders, revenue and margin. Clicks are diagnostic; they are not the business outcome.

**Implementation steps**

1. Unify online-store product, shopper-behavior and transaction data into usable customer and product records.
2. Use browsing and buying signals to infer which products or combinations may interest a shopper.
3. Show individualized product suggestions and related-item placements inside the US online store.
4. Track clicks on recommendations, products added to baskets, completed purchases and store revenue.
5. Review whether recommendations help shoppers find relevant products rather than only increasing clicks.
6. For a future rollout, use a holdout group to estimate incremental revenue and margin more rigorously.

**Primary sources:** [Coca-Cola personalizes experiences with Adobe Journey Optimizer](https://business.adobe.com/customer-success-stories/coca-cola-case-study-personalization.html)

---

## Pomelo Fashion: Personalized fashion category pages

**Industry:** Retail / e-commerce<br>
**Function:** Sales / e-commerce<br>
**Evidence:** C — AWS published this customer story with named Pomelo executives and concrete rollout details. The claimed incremental revenue is not independently audited and the counterfactual calculation is not shown.

Pomelo Fashion’s category pages were important storefront real estate: the company said 38% of purchased products were discovered there. Yet its old ranking was recalculated once a day and looked much the same for every shopper in a country. The company tested whether more relevant product order could lift sales.

### How they did it

Pomelo had Segment collect customer events from its site, app and kiosks. Those events included clicks, carts, wish lists and purchases, while product records held details such as color, price and category. Amazon Personalize used those signals to rank items for an individual shopper. New visitors initially saw a popular-item ranking; personalization could follow once the shopper gave useful signals. The first focused test was the dresses category, where Pomelo measured a rise in product-page clicks and revenue. The company then extended the ranking to most category pages and used Braze to bring recommendations into email and in-app messages. The source does not disclose an audited contribution-margin calculation or the exact experiment design behind the 8% incremental-revenue claim.

### The operating change

The category page became a live merchandising decision, not a single daily list. Marketing could also reuse the same current recommendations in messages, so a customer’s browsing behavior shaped what appeared beyond the website.

### Result and what it means

AWS and Pomelo report 18.3% higher revenue in the initial dresses category, up to 15% higher gross revenue from category pages after expansion, and an 8% gain in incremental gross revenue. These measures have different denominators and should not be added together. The incremental figure is a company/provider claim without a fully published counterfactual.

### Practical takeaway

The transferable path is unusually clear: fix event data, pilot in one high-traffic category, keep a fallback for new shoppers and expand only after looking at sales rather than engagement alone.

**Implementation steps**

1. Collect website, app and kiosk events through Segment and clean the product catalog.
2. Feed clicks, carts, wish lists, purchases and item attributes to Amazon Personalize.
3. Start with personalized ranking on the dresses category while keeping a popular-item fallback for new visitors.
4. Compare category clicks and sales, and tune the ranking after the pilot.
5. Expand the ranking to other category pages and reuse current recommendations in Braze messages.
6. Track incremental gross revenue separately from category-page and email engagement metrics.

**Primary sources:** [Pomelo Fashion Enhances Shoppers’ Experience, Increases Revenue Using Amazon Personalize](https://aws.amazon.com/solutions/case-studies/pomelo-case-study/)

---

## Zurich Chile: AI automation of health-claim reimbursements

**Industry:** Insurance<br>
**Function:** Claims / operations<br>
**Evidence:** B — Zurich’s own publication quotes its regional chief claims officer and gives the monthly volume and before/after time. It does not disclose a monetary saving or independent causal test.

Zurich Chile already settled many health claims automatically when a patient paid at the point of sale. The more difficult part was reimbursement: a customer paid the provider, collected bills and sent documents to Zurich afterward. Those claims usually needed a slower review.

### How they did it

Zurich partnered with LISA Insurtech to automate a portion of this traditional reimbursement stream. The company’s published description says the platform reads and settles eligible claims, but it does not describe every extraction model, coverage rule or fraud check. The operational sequence is clear at a business level: the customer submits documents, the system reads the claim and policy information, straightforward cases are settled automatically, and other cases remain for staff. The useful denominator is the 35% of monthly health claims that used this traditional route, because the other 65% were already automatically settled at the point of sale. A comparable insurer would need digitized bills, policy rules, payment integration and a route for disputes or unusual claims.

### The operating change

The claims team shifted routine reimbursement work from a manual queue to automated settlement. Customers in that stream could receive a decision much sooner, while examiners could focus on exceptions.

### Result and what it means

By August 2024 Zurich said AI was automatically processing 33% of traditional reimbursement claims, about 33,000 a month. Its regional claims chief said claims that typically took about four and a half days could be settled within one day. The publication does not quantify claim-processing cost savings, error rates or the portion of the speed gain attributable only to AI.

### Practical takeaway

The lesson is to choose the part of an operation that remains slow after earlier automation. Report the denominator accurately, and make speed improvements credible with settlement-quality and appeal measures.

**Implementation steps**

1. Define the reimbursement stream separately from health claims already settled automatically at the point of sale.
2. Receive customers’ bills and claim documents through a digital claims route.
3. Use LISA’s AI platform to read the materials and assess cases against policy requirements.
4. Automatically settle eligible straightforward claims and leave other cases for human examination.
5. Measure the share automated within the reimbursement stream and the time from submission to settlement.
6. Review disputes, payment errors and fraud outcomes before expanding the eligible claim types.

**Primary sources:** [Building an innovation mindset](https://www.zurich.com/campaigns/zic/articles/building-an-innovation-mindset)

---

## Procter & Gamble: AI visual inspection on production lines

**Industry:** Consumer goods / manufacturing<br>
**Function:** Manufacturing / quality<br>
**Evidence:** C — A September 2026 joint Siemens–P&G release includes a P&G technical lead and a product-dependent scrap range. No absolute scrap tonnage, cost saving or independently audited comparison is published.

A fast consumer-goods line can produce thousands of items while materials shift, wrinkle or overlap. Fixed camera rules struggle with this variation; changing a package design can force substantial reprogramming. P&G and Siemens built an AI inspection application that can check products at full production speed.

### How they did it

P&G supplied inspection models trained to recognize acceptable variation and defects. Siemens supplied the Visual Inspection Cockpit, industrial computers and an on-site computing platform. Cameras feed images of passing products to the system; the result is processed near the machine so the line can issue an alert or remove a defective item immediately. Plant engineers can configure, train and update models through an engineering tool rather than waiting for a central data-science team for every change. Quality data also feeds back into production analysis. The joint release explains the operational design but does not publish the number of labeled images, false-reject rate or line-by-line cost calculation.

### The operating change

Inspection moved from occasional or rigid visual checks toward continuous assessment of each item. Operators receive immediate signals, and plant teams can respond to defect patterns before more material is wasted.

### Result and what it means

The partners report 10–20% lower scrap rates depending on product. They also say standardized deployments are commissioned five to ten times faster than traditional bespoke camera systems. Neither claim supplies a dollar saving; the lower scrap rate must be translated through actual material, labor and rework costs before a financial ROI is stated.

### Practical takeaway

The reusable method is to make visual inspection part of the line’s control loop, with local model maintenance and feedback to quality teams. The hard work is reliable defect examples and careful management of false positives and misses.

**Implementation steps**

1. Capture images of acceptable products and defects on a selected high-speed line.
2. Configure P&G inspection models for the relevant material, product and packaging variation.
3. Run Siemens Visual Inspection Cockpit close to the equipment so every passing item can be checked immediately.
4. Trigger an operator alert or reject an item when inspection identifies a defect.
5. Let plant engineers update models and examine false rejects, missed defects and scrap trends.
6. Reuse the standardized application at other lines and compare scrap rates by product.

**Primary sources:** [Siemens and Procter & Gamble scale AI-based quality inspection across global production](https://press.siemens.com/global/en/pressrelease/siemens-and-procter-gamble-scale-ai-based-quality-inspection-across-global-production)

---

## DBS Bank: AI review of technology changes before release

**Industry:** Banking<br>
**Function:** Risk / IT operations<br>
**Evidence:** A — DBS disclosed the use-case metrics in its 2024 annual report CIO statement. Its SGD 750 million AI economic value covers more than 370 use cases, so none of that figure is attributed to this one risk model.

A bank’s software changes are operational events: a flawed change can interrupt a service customers depend on. DBS had a review-coverage problem. Its annual report says the earlier process checked only 5% of change requests at the level later covered by AI risk scoring.

### How they did it

DBS trained an in-house machine-learning model on past change requests to classify the risk of new ones. The model gives each proposed change a score so technology teams can examine risky changes before release. The bank says this expanded risk checking to every request. The model sits within a larger resilience program that also includes a near-production testing environment, architecture review and a Testing Centre of Excellence. The source does not disclose the model variables, alert thresholds, review staffing or a controlled study isolating AI from those other measures. For another organization, the practical sequence is to join change logs to incident outcomes, define what a high-risk release looks like, score each change, route flagged changes to reviewers and monitor incidents after deployment.

### The operating change

Risk review became universal rather than a small sample. Human release managers could spend more attention where the model anticipated trouble, while the bank retained formal testing and approval controls.

### Result and what it means

DBS reports 100% of change requests checked versus 5% before, alongside an 81% reduction in the monthly average of incidents caused by changes. Its separate SGD 750 million economic-value figure covers more than 370 AI and analytics use cases and cannot be assigned to this one model. The incident reduction also occurred alongside other resilience measures.

### Practical takeaway

This is a useful example of AI improving the coverage of a business control. The important outcome is fewer service disruptions, measured against release volume and severity, not simply a high model score.

**Implementation steps**

1. Join historical software change requests to incidents that followed release.
2. Train the in-house model to recognize change characteristics associated with greater risk.
3. Score every new change request as it enters the release process.
4. Give risky changes extra human attention alongside the bank’s existing testing and architecture controls.
5. Record which changes caused incidents after release and use those outcomes to refine the model.
6. Measure incident frequency per month while keeping the other resilience initiatives visible in attribution.

**Primary sources:** [DBS Annual Report 2024: CIO statement](https://www.dbs.com/annualreports/2024/cio-statement.html)

---

## Chi Mei Medical Center: Clinical copilots reduce documentation time

**Industry:** Healthcare<br>
**Function:** Clinical operations<br>
**Evidence:** C — Microsoft’s report includes direct interviews with Chi Mei clinicians and concrete task-level before/after times. The figures are reported examples, not an independent time-motion study or labor-cost saving.

Chi Mei Medical Center had extensive digital health records, yet doctors, nurses and pharmacists still had to assemble information from several systems and write repetitive documents. The hospital built role-specific assistants so clinical staff could retrieve and draft information inside their normal workflows.

### How they did it

Chi Mei connected hospital databases to Microsoft Azure OpenAI Service and developed separate A+ tools for doctors, nurses, pharmacists and other staff. Doctors can turn admission and progress notes into a draft report, then review, edit and confirm it. Nurses use a different workflow for shift and bed-transfer notes. In the pharmacy, one screen brings together medication lists, allergies, tests and other patient details; clinicians still make the care decision. The hospital invited clinicians to help design these workflows and addressed early fears that the tools would replace staff. The source identifies the software platform and user flow but does not disclose a formal accuracy audit, model prompts or deployment costs.

### The operating change

The assistant reduced the time spent locating information and composing first drafts. It did not remove the clinician’s responsibility for medical terminology, completeness and final sign-off; nurses reported correcting language that sounded too informal or used the wrong Chinese script.

### Result and what it means

A doctor described medical reports moving from about an hour to fifteen minutes including review; nurses described transfer documentation dropping from 10–20 minutes to under five. A pharmacy leader said one pharmacist could see 30 patients a day rather than 15. These are staff-reported examples, not a controlled hospital-wide estimate of labor savings or patient outcomes.

### Practical takeaway

The practical pattern is role-specific design on top of trusted records, with visible review before anything becomes part of care. A single generic assistant would miss the different information and safety needs of each clinical role.

**Implementation steps**

1. Connect approved hospital records and databases to a secure generative-AI platform.
2. Co-design separate doctor, nurse and pharmacist screens around each role’s actual workflow.
3. Let the doctor assistant draft reports from admission and progress notes and the nurse assistant draft transfer or shift notes.
4. Give pharmacists a summarized view of medications, allergies and other patient information from several systems.
5. Require clinicians to check clinical facts, terminology and language before confirming any generated documentation.
6. Measure task time, adoption, corrections and safety issues by role rather than assuming one hospital-wide gain.

**Primary sources:** [Taiwan hospital deploys AI copilots to lighten workloads for doctors, nurses and pharmacists](https://news.microsoft.com/source/asia/features/taiwan-hospital-deploys-ai-copilots-to-lighten-workloads-for-doctors-nurses-and-pharmacists)

---

## Walmart: AI negotiation for low-priority supplier contracts

**Industry:** Retail<br>
**Function:** Procurement<br>
**Evidence:** C — A Pactum client case gives the 3% figure, and an HBR article coauthored by Walmart procurement executives describes the pilot and expansion. Results are scoped to negotiated contracts; they are not audited company-wide savings.

Walmart could negotiate carefully with major suppliers, but a long tail of smaller agreements still received standard terms. Its buyers could not justify spending hours on each low-value contract. The opportunity was not to replace strategic sourcing; it was to negotiate deals that otherwise received little attention.

### How they did it

Walmart used Pactum’s negotiation chatbot for selected suppliers. Procurement staff set acceptable commercial boundaries and trade-offs, including price and payment terms. The agent then held structured, asynchronous exchanges with suppliers, allowing a counteroffer within those limits. The first production pilot involved a smaller supplier group; Walmart and Pactum then expanded the program to additional markets. The HBR account was coauthored by Walmart procurement executives, while Pactum’s client page summarizes later results. Neither source gives a full contract-level savings audit or the precise valuation of extended payment terms.

### The operating change

A supplier could receive an individual negotiation even when a human buyer lacked time. Human procurement staff focused on exceptions and strategic relationships rather than every standard contract. The procurement team also gained a record of the terms offered, countered and finally accepted across a larger supplier set.

### Result and what it means

The production pilot reported 1.5% savings on negotiated spend; the expanded program reported an average 3% gain on negotiated contracts and a 68% agreement rate among approached suppliers. The percentage applies only to contracts that entered the chatbot process. It cannot be multiplied by all Walmart purchasing, and stronger payment terms are a working-capital benefit rather than immediate profit.

### Practical takeaway

The use case fits large organizations with thousands of repeatable supplier agreements. Before scaling it, buyers must define hard negotiation limits, supplier-escalation rights and a fair comparison with the terms they would otherwise have accepted.

**Implementation steps**

1. Identify supplier contracts that normally receive standard terms because buyer time is scarce.
2. Have procurement staff set permitted price ranges, payment terms and negotiation trade-offs.
3. Invite selected suppliers to negotiate asynchronously with Pactum’s agent.
4. Allow counteroffers within the approved limits and escalate unusual terms or strategic suppliers to buyers.
5. Finalize agreements through normal procurement and legal controls.
6. Measure savings only on the contracts negotiated by the agent, plus agreement rates and supplier feedback.

**Primary sources:** [How Walmart Automated Supplier Negotiations](https://hbr.org/2022/11/how-walmart-automated-supplier-negotiations); [Enterprise Client Success with Agentic AI in Procurement](https://pactum.com/clients)

---

## Accenture: Measuring coding copilot effects in enterprise teams

**Industry:** Professional services<br>
**Function:** Software development<br>
**Evidence:** C — GitHub and Accenture collaborated on a randomized trial, giving stronger evidence for the reported development metrics. The publication does not show a financial return or direct customer-value measure.

Accenture and GitHub wanted to learn whether a coding assistant improved work inside a large consulting organization, rather than only in a short laboratory exercise. The question was whether developers could deliver more reviewed, working changes without simply moving errors downstream.

### How they did it

The partners randomly assigned developers to a group with GitHub Copilot access and a comparison group without it. Developers used the tool during ordinary engineering, design and testing work. GitHub and Azure DevOps records provided measures of pull requests, merges and build results, while surveys captured adoption and perceived effort. Crucially, Copilot supplied suggestions inside existing developer tools; peer review and automated builds still decided whether a change was acceptable. The public report does not disclose a dollar-value calculation, a common unit of customer value or a fully reproducible dataset for every team.

### The operating change

Developers could accept or reject suggestions while writing code and search less for routine examples. The surrounding process did not disappear: changes still moved through review and tests, which helped the study check quality as well as volume.

### Result and what it means

The study reports 8.69% more pull requests, a 15% higher pull-request merge rate and an 84% increase in successful builds. Those are development-flow measures. They do not establish that Accenture invoiced more, reduced headcount, raised profit or created 8.69% more customer value.

### Practical takeaway

The strongest transferable lesson is the measurement design: run a comparable pilot, track both throughput and quality, and connect any later financial claim to project delivery or customer outcomes. Managers should also watch rework after release.

**Implementation steps**

1. Randomly assign comparable developers to Copilot-access and no-access groups.
2. Install the assistant in the development environment used for normal client and internal work.
3. Allow developers to accept or reject code suggestions while keeping standard peer review.
4. Collect pull-request, merge and automated-build outcomes from development systems.
5. Survey users about adoption, effort and satisfaction, and compare the groups.
6. Treat workflow gains as evidence of capacity or quality until delivery time, cost or customer value is measured.

**Primary sources:** [Research: Quantifying GitHub Copilot’s impact in the enterprise with Accenture](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/)

---

## NatWest Group: Generative AI improves Cora self-service

**Industry:** Banking<br>
**Function:** Customer service<br>
**Evidence:** A — NatWest reported the journey comparison in its 2025 annual report. It did not assign a cost saving to Cora; group cost-ratio changes should not be attributed to this case.

NatWest did not start with a blank-page chatbot. Cora had served banking customers since 2017, first guiding basic tasks and later supporting more personalized transactions across app, web and telephone channels. The generative-AI upgrade aimed to make selected journeys easier to resolve without passing customers to staff.

### How they did it

NatWest and IBM developed Cora+ as an upgrade to the existing assistant. The bank announced an initial 12-week pilot in 2024. For selected journeys, Cora+ could draw from multiple secure bank information sources and give a more direct answer with relevant links rather than sending a customer to a general page. When a person was needed, the planned handoff summarized the conversation for the agent. NatWest then expanded generative AI to 21 customer journeys by the end of 2025. The bank reports comparison with equivalent non-GenAI journeys, but does not publish the exact matching method, per-conversation cost or full quality breakdown.

### The operating change

Some customers could finish a routine inquiry within the digital channel. Staff would receive the cases that still required judgment or help, ideally with less need for the customer to repeat the question.

### Result and what it means

NatWest says GenAI-supported journeys resolved about 20 percentage points more queries without human intervention than equivalent journeys without GenAI. Across all of Cora, 12.9 million conversations occurred in 2025 and half required no human intervention. Those two measures have different scopes. The annual report does not attribute a cash saving to the upgrade.

### Practical takeaway

The method is to improve specific customer journeys inside an established service system, compare like with like and keep the human handoff usable. “No agent needed” becomes economic value only when quality, repeat contacts and actual service cost are measured.

**Implementation steps**

1. Select existing Cora journeys with frequent questions and unnecessary transfers to staff.
2. Work with IBM to connect the generative-AI upgrade to approved secure bank information.
3. Pilot Cora+ for 12 weeks in selected journeys and refine responses and controls.
4. Expand supported journeys, giving direct answers and relevant links instead of a general information page.
5. Escalate where a human is needed and provide a conversation summary to reduce repetition.
6. Compare no-human resolution on equivalent GenAI and non-GenAI journeys, then check repeat contacts and quality.

**Primary sources:** [NatWest Group 2025 Annual Report and Accounts](https://investors.natwestgroup.com/~/media/Files/R/RBS-IR-V2/annual-report-2025/2025-annual-report-and-accounts.pdf); [NatWest launches Cora+, the latest generative AI upgrade to the bank’s digital assistant](https://www.natwestgroup.com/news-and-insights/news-room/press-releases/data-and-technology/2024/jun/natwest-launches-cora-plus-the-latest-generative-ai-upgrade-to-t.html)

---
