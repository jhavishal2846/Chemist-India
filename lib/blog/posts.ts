/**
 * Single source of truth for blog content. The listing page and the
 * detail page (/blog/[slug]) both render from this module.
 */

export interface BlogSection {
  heading?: string
  paragraphs: string[]
  bullets?: string[]
}

export interface BlogPost {
  slug:        string
  title:       string
  excerpt:     string
  category:    string
  date:        string
  readTime:    string
  /** Accent color used on the listing cards and the detail-page hero overlay. */
  color:       string
  author:      string
  authorRole:  string
  sections:    BlogSection[]
}

export const posts: BlogPost[] = [
  {
    slug:       'gmp-compliance-pharmaceutical-manufacturing',
    title:      'GMP Compliance in Pharmaceutical Raw Material Sourcing',
    excerpt:    'Understanding Good Manufacturing Practice requirements when procuring APIs, excipients, and intermediates — what documentation you need and how to audit your suppliers.',
    category:   'Regulatory',
    date:       'May 12, 2026',
    readTime:   '7 min read',
    color:      '#243774',
    author:     'Dr. Priya Sharma',
    authorRole: 'Head of Regulatory Affairs',
    sections: [
      {
        paragraphs: [
          'Good Manufacturing Practice (GMP) is the bedrock of pharmaceutical quality. For any manufacturer sourcing Active Pharmaceutical Ingredients (APIs), excipients, or intermediates from external suppliers, demonstrating GMP compliance throughout the supply chain is not optional — it is the line between a saleable batch and a regulatory recall.',
          'This guide walks through the core documentation set you should request from every raw material supplier, the on-site checks that matter most during a vendor audit, and the common red flags that should give you pause before issuing a purchase order.',
        ],
      },
      {
        heading: 'The Documentation Bundle',
        paragraphs: [
          'A compliant API supplier should provide each of the following as a matter of course — never as an afterthought when asked. If any item is missing or stale, treat it as a finding, not a forgivable oversight.',
        ],
        bullets: [
          'Certificate of Analysis (COA) tied to the specific batch, with all monograph parameters tested and signed off by QA.',
          'Material Safety Data Sheet (MSDS / SDS) in the latest GHS-aligned format.',
          'Drug Master File (DMF) reference or Letter of Authorisation, where applicable.',
          'CEP / COS for European supply, or an equivalent regulatory dossier.',
          'GMP certificate from the local regulatory authority (CDSCO in India, FDA in the USA, EDQM in Europe).',
          'Stability data — at minimum 12 months real-time data plus accelerated study.',
        ],
      },
      {
        heading: 'Auditing the Manufacturing Site',
        paragraphs: [
          'Documents are necessary but never sufficient. An on-site audit lets you verify that the systems described on paper are actually being followed on the shop floor. Pay particular attention to change-control records, deviation logs, and out-of-specification investigations — these tell you how the site behaves when things go wrong, which is the most honest signal of quality culture you will get.',
          'Walk the warehouse. Check that incoming raw materials are quarantined, sampled, and only released to production after QA approval. Sit in on a batch-record review and trace one finished batch backwards to its inputs. If the paperwork tells a clean story but the operator on the line tells a different one, trust the operator.',
        ],
      },
      {
        heading: 'Red Flags to Watch For',
        paragraphs: [
          'Suppliers who resist site visits, slow-walk document requests, or whose COA values are suspiciously identical across batches are signalling something. So are facilities where deviation rates appear too low — every real plant has deviations; the difference is how they are investigated and closed. A clean record with no documented learnings is usually a record of things not being looked at.',
        ],
      },
    ],
  },
  {
    slug:       'nutraceutical-market-growth-india-2025',
    title:      "India's Nutraceutical Market: Growth Drivers and Sourcing Opportunities",
    excerpt:    'The Indian nutraceutical sector is growing at 15% CAGR. We explore the key ingredients in demand, regulatory landscape under FSSAI, and how manufacturers can build resilient supply chains.',
    category:   'Market Insight',
    date:       'Apr 28, 2026',
    readTime:   '9 min read',
    color:      '#5AA344',
    author:     'Rahul Mehta',
    authorRole: 'VP Business Development',
    sections: [
      {
        paragraphs: [
          "India's nutraceutical market crossed USD 18 billion in 2025 and is projected to reach USD 35 billion by 2030 — a compound annual growth rate north of 15%. Behind that headline number is a structural shift in how Indian consumers think about health: preventive wellness has moved from urban niche to mainstream household spend, and domestic manufacturing has scaled to meet it.",
          'For ingredient suppliers, this is the most significant demand-side change in the industry in two decades. The question is no longer whether the category will grow — it is which categories within it will compound fastest, and how the supply chain has to evolve to serve them.',
        ],
      },
      {
        heading: 'What is Driving Demand',
        paragraphs: [
          'Three forces are stacking. First, an ageing demographic (the over-60 cohort grew 35% in the last decade) is creating sustained demand for joint, cardiovascular, and cognitive support formulations. Second, the post-pandemic immunity wave never fully receded — vitamin D, zinc, and immune-modulating botanicals remain top sellers. Third, performance nutrition has gone mass-market, with protein powders and amino-acid supplements now sold through everyday grocery channels rather than specialist stores.',
        ],
      },
      {
        heading: 'High-Demand Ingredients',
        paragraphs: [
          'Procurement teams should be watching the following categories closely. Demand is outpacing reliable supply in several:',
        ],
        bullets: [
          'Vitamin D3 (Cholecalciferol) — fortification mandates plus consumer demand have tripled volumes in five years.',
          'Coenzyme Q10 — cardiovascular and statin-coadministration use cases.',
          'Botanical extracts standardised to active markers — Ashwagandha, Curcumin, Boswellia, and Bacopa lead the pack.',
          'Amino acids (L-Glutamine, L-Arginine, L-Carnitine) for sports nutrition.',
          'Marine and algal Omega-3 sources — sustainable alternatives to fish-oil-derived DHA/EPA.',
        ],
      },
      {
        heading: 'FSSAI and the Regulatory Environment',
        paragraphs: [
          'FSSAI 2022 nutraceutical regulations brought the category formally under food law, requiring product-level registration, health-claim substantiation, and adherence to permitted ingredient lists. The upside is regulatory clarity. The downside is that small brands without compliance infrastructure are increasingly squeezed — and that pressure is pushing them toward suppliers who can provide ready-to-use, FSSAI-compliant ingredient documentation as a bundled service.',
        ],
      },
    ],
  },
  {
    slug:       'understanding-coa-msds-documentation',
    title:      'COA, MSDS, and DMF: Essential Documentation for Chemical Imports',
    excerpt:    'A practical guide to the documentation bundle required for importing pharmaceutical and industrial chemicals — Certificate of Analysis, Material Safety Data Sheets, Drug Master Files, and more.',
    category:   'Documentation',
    date:       'Apr 14, 2026',
    readTime:   '6 min read',
    color:      '#468534',
    author:     'Ananya Patel',
    authorRole: 'Quality Assurance Manager',
    sections: [
      {
        paragraphs: [
          'Every chemical shipment crossing a border carries a paper trail. Understanding what each document does — and what to check before you sign off on a consignment — is the difference between a smooth customs clearance and a multi-week hold at the port.',
          'This is a working procurement-team reference. It is not exhaustive, but it covers the documents you will see on 95% of pharmaceutical and industrial chemical imports.',
        ],
      },
      {
        heading: 'Certificate of Analysis (COA)',
        paragraphs: [
          'The COA is the batch-specific quality passport. It records the test results for every parameter in the product specification — identity, assay, related substances, residual solvents, heavy metals, microbial limits — against the monograph or in-house spec. The COA you receive should match the batch number on your container, be signed by an authorised QA representative, and show test results within specification across the board.',
          'If you see "complies" against a parameter without a numerical result, push back. "Complies" tells you the supplier believes it complies; the number tells you what the actual value was.',
        ],
      },
      {
        heading: 'Material Safety Data Sheet (MSDS / SDS)',
        paragraphs: [
          'The SDS describes the hazards of the substance, safe handling procedures, first-aid measures, and transport classification. It must be in the GHS (Globally Harmonized System) 16-section format and dated within the last five years. For dangerous goods shipments, the SDS is also what your freight forwarder uses to assign UN numbers and class — getting this wrong delays the shipment.',
        ],
      },
      {
        heading: 'Drug Master File (DMF) and CEP',
        paragraphs: [
          'For Active Pharmaceutical Ingredients, the DMF is a confidential dossier filed by the manufacturer with the regulatory authority, describing the chemistry, manufacturing process, and controls. You do not receive the DMF directly — you receive a Letter of Authorisation that allows the regulator to review the DMF on your behalf during your own product registration.',
          'The European equivalent, the CEP (Certificate of Suitability), is publicly issued by EDQM and confirms that the API meets European Pharmacopoeia standards. A CEP-holding supplier is usually the path of least resistance for European market entry.',
        ],
      },
    ],
  },
  {
    slug:       'pellet-technology-modified-release',
    title:      'Multi-Particulate Pellet Technology for Modified-Release Formulations',
    excerpt:    'From MCC starter pellets to enteric-coated PPI systems — an overview of pellet manufacturing technologies, their advantages over conventional tablets, and key quality parameters.',
    category:   'Technical',
    date:       'Mar 31, 2026',
    readTime:   '11 min read',
    color:      '#F97316',
    author:     'Dr. Vikram Joshi',
    authorRole: 'Technical Director',
    sections: [
      {
        paragraphs: [
          'Multi-particulate pellet systems have quietly become one of the most versatile platforms in modified-release drug delivery. Where a conventional matrix tablet releases drug as a single unit, a pellet-filled capsule releases drug from hundreds of independent units — improving dose uniformity, smoothing plasma profiles, and dramatically reducing dose-dumping risk.',
          'This piece is a technical overview for formulators and procurement teams looking to understand what they are buying when they purchase pellets, and the quality parameters that matter.',
        ],
      },
      {
        heading: 'The Pellet Anatomy',
        paragraphs: [
          'A drug-loaded pellet typically has three layers: an inert starter core (commonly microcrystalline cellulose, "Cellets", or sugar non-pareils); a drug layer applied by spray-coating onto the core with a binder; and a functional coating that controls release. The functional coat is where formulation engineering lives — choice of polymer and thickness determines whether the pellet is immediate-release, enteric-coated, sustained-release, or pulsatile.',
        ],
      },
      {
        heading: 'Why Pellets, Not Tablets',
        paragraphs: [
          'There are a handful of cases where pellets outperform a conventional tablet on patient outcomes and regulatory robustness:',
        ],
        bullets: [
          'Acid-labile drugs (PPIs like Omeprazole, Pantoprazole) — enteric coating protects the API until it reaches the duodenum.',
          'Drugs with a narrow therapeutic window — multi-particulate dosing reduces peak-trough swings.',
          'Combination products — different release profiles for each component can be achieved by mixing pellet populations in one capsule.',
          'Paediatric and geriatric patients — capsules can be opened and sprinkled on food.',
        ],
      },
      {
        heading: 'Quality Parameters to Specify',
        paragraphs: [
          'When purchasing finished or semi-finished pellets, the parameters that matter most are particle-size distribution (D10/D50/D90), sphericity (aspect ratio ideally >0.9), drug-loading uniformity (RSD <2%), dissolution profile in the relevant media (0.1N HCl for enteric resistance, pH 6.8 buffer for release), and friability after handling. A supplier who cannot provide a release-profile graph for the specific batch is not yet ready to sell into a regulated market.',
        ],
      },
    ],
  },
  {
    slug:       'reach-regulation-chemical-exports-europe',
    title:      'REACH Compliance for Chemical Exports to the European Union',
    excerpt:    'Everything you need to know about Registration, Evaluation, Authorisation and Restriction of Chemicals (REACH) — who needs to comply, key timelines, and SVHC restrictions.',
    category:   'Regulatory',
    date:       'Mar 17, 2026',
    readTime:   '8 min read',
    color:      '#243774',
    author:     'Sarah Mitchell',
    authorRole: 'EU Regulatory Consultant',
    sections: [
      {
        paragraphs: [
          'REACH — Registration, Evaluation, Authorisation and Restriction of Chemicals — is the European Union framework that governs every chemical substance manufactured in or imported into the EU above one tonne per year. For Indian chemical exporters, REACH is the single most important regulatory hurdle to clear before serving European customers, and the area where most market-entry mistakes are made.',
        ],
      },
      {
        heading: 'Who Needs to Register',
        paragraphs: [
          'Any non-EU manufacturer wishing to export to the EU must either register substances themselves through an Only Representative (OR) established in the EU, or rely on the EU-based importer doing the registration. The OR route is preferred when serving multiple importers, as it consolidates regulatory cost and gives the exporter control over the dossier.',
          'Registration is per substance, not per product. Volume bands determine the data requirements — 1–10 tonnes/year requires a basic dossier, 10–100 requires expanded toxicology, and above 1000 tonnes triggers full chemical safety reporting.',
        ],
      },
      {
        heading: 'SVHC and the Candidate List',
        paragraphs: [
          'Substances of Very High Concern (SVHCs) sit on a Candidate List that ECHA updates twice a year. Once a substance is on the list, downstream users in the EU have notification and communication obligations whenever the substance is present above 0.1% w/w in an article. Substances may eventually be moved to Annex XIV, after which they require authorisation for any continued use — a process that is intentionally restrictive and expensive.',
        ],
      },
      {
        heading: 'Practical Steps for Indian Exporters',
        paragraphs: [
          'Build the REACH dossier in advance of the first commercial shipment, not after a customer asks for it. Identify substances likely to head onto the Candidate List in the next 18–24 months by tracking ECHA registry of intentions, and develop substitution roadmaps before the regulatory pressure arrives. Most importantly, integrate REACH compliance documentation into your supplier qualification package — Indian exporters who can hand a European procurement team a complete regulatory bundle close deals faster than those who treat REACH as a one-off project.',
        ],
      },
    ],
  },
  {
    slug:       'herbal-extract-standardisation',
    title:      'Standardisation of Herbal Extracts: Quality Markers and Testing Methods',
    excerpt:    'How are herbal extracts standardised to guarantee consistent active compound concentrations? We break down marker compounds, HPLC testing, and how to evaluate supplier specifications.',
    category:   'Technical',
    date:       'Feb 28, 2026',
    readTime:   '10 min read',
    color:      '#5AA344',
    author:     'Dr. Meena Reddy',
    authorRole: 'Phytochemistry Specialist',
    sections: [
      {
        paragraphs: [
          'A botanical extract is not a single molecule — it is a complex mixture of dozens or hundreds of phytochemicals, the composition of which varies with cultivar, soil, harvest season, drying method, and extraction solvent. Standardisation is the discipline of ensuring that despite all that natural variability, every batch a customer buys delivers the same active content within a defined range.',
        ],
      },
      {
        heading: 'Marker vs. Active Compounds',
        paragraphs: [
          'Standardisation requires choosing one or more marker compounds — molecules whose concentration is measured and reported on the Certificate of Analysis. In an ideal world the marker is the pharmacologically active compound (curcumin in turmeric, withanolides in ashwagandha, silymarin in milk thistle). In practice, sometimes the active is not analytically tractable, and a stable, easily-measured proxy marker is used instead. Reputable suppliers are explicit about which they have done.',
        ],
      },
      {
        heading: 'HPLC: The Standard Tool',
        paragraphs: [
          'High-Performance Liquid Chromatography (HPLC) is the workhorse method for marker quantification. A well-validated HPLC method delivers reproducibility under 2% RSD batch-to-batch, with calibration against pharmaceutical-grade reference standards. When evaluating a supplier, ask to see the method validation report — accuracy, precision, linearity range, LOD/LOQ, and specificity. If they cannot share it, the standardisation claim is unverified.',
        ],
      },
      {
        heading: 'Buyer Checklist',
        paragraphs: [
          'When sourcing standardised extracts, the following items separate a serious supplier from a marketing one:',
        ],
        bullets: [
          'Marker compound disclosed by name, not just percentage (e.g., "5% withanolides" should specify total or Withanoside IV).',
          'Test method disclosed (HPLC, UV-Vis spectrophotometry, gravimetric).',
          'Reference standard source (USP, EDQM, in-house with characterisation).',
          'Heavy metals, pesticide residue, and microbial limits tested per pharmacopoeial standards.',
          'DNA-barcoding or HPTLC fingerprint to confirm botanical identity and rule out adulteration.',
        ],
      },
    ],
  },
  {
    slug:       'dye-intermediates-global-supply-chain',
    title:      'Global Dye Intermediates Supply: Challenges and Resilience Strategies',
    excerpt:    'Supply disruptions in 2024 exposed vulnerabilities in dye intermediate sourcing. This piece analyses the causes, their impact on textile and pharma sectors, and practical diversification strategies.',
    category:   'Market Insight',
    date:       'Feb 10, 2026',
    readTime:   '7 min read',
    color:      '#EF4444',
    author:     'Arjun Singhania',
    authorRole: 'Supply Chain Analyst',
    sections: [
      {
        paragraphs: [
          'The 2024 dye intermediates supply crunch was a wake-up call. When environmental enforcement actions in three major Chinese provinces took roughly 30% of global H-Acid and J-Acid capacity offline within six weeks, prices in some grades doubled and lead times stretched from four weeks to four months. Textile and pharmaceutical buyers who had concentrated their sourcing on a single low-cost region discovered, the hard way, what diversification is actually for.',
        ],
      },
      {
        heading: 'Why the Concentration Risk Exists',
        paragraphs: [
          'Dye intermediates are capital-intensive to produce, environmentally demanding to manufacture cleanly, and operate on thin margins. Over the past two decades, production has consolidated heavily into a handful of clusters where regulatory compliance, scale economics, and chemical infrastructure align. That consolidation drove costs down — but it also concentrated systemic risk in ways that only become visible during disruption.',
        ],
      },
      {
        heading: 'Building a More Resilient Supply Base',
        paragraphs: [
          'Resilience is not the same as redundancy. A second supplier in the same industrial cluster does not protect you when the cluster shuts down. Practical resilience means:',
        ],
        bullets: [
          'Geographic diversification across at least two non-correlated regions (e.g., India + China, or India + Europe).',
          'Tiered supplier relationships — primary, secondary, and qualified-backup status with documented changeover procedures.',
          'Strategic inventory of critical intermediates beyond just-in-time levels (8–12 weeks for hard-to-substitute molecules).',
          'Periodic re-qualification of backup suppliers so they are not stale when activated.',
        ],
      },
      {
        heading: 'India as a Hedge',
        paragraphs: [
          'For dye intermediates specifically, Indian manufacturing has grown into a credible second-source region for several key molecules over the past five years. Capacity is now sufficient to absorb meaningful share shifts during disruption, and environmental compliance has improved as the sector has matured. For procurement teams reassessing supplier portfolios in 2026, qualifying Indian sources is not an exotic move — it is increasingly standard practice.',
        ],
      },
    ],
  },
  {
    slug:       'impurity-profiling-api-characterisation',
    title:      'Impurity Profiling: Why Reference Standards Matter in API Manufacturing',
    excerpt:    'ICH Q3A and Q3B guidelines require manufacturers to identify and control impurities in APIs. We explain the role of certified reference standards in impurity profiling and regulatory submissions.',
    category:   'Technical',
    date:       'Jan 25, 2026',
    readTime:   '9 min read',
    color:      '#F59E0B',
    author:     'Dr. Priya Sharma',
    authorRole: 'Head of Regulatory Affairs',
    sections: [
      {
        paragraphs: [
          'Every batch of API contains impurities. The question regulators care about is not "are there impurities" but "are they identified, controlled, and justified?" ICH Q3A (drug substances) and Q3B (drug products) lay out the framework — reporting, identification, and qualification thresholds that determine how much investigation any given impurity warrants. The instrument that makes this whole framework practical is the certified reference standard.',
        ],
      },
      {
        heading: 'The ICH Thresholds in Plain English',
        paragraphs: [
          'Below the reporting threshold (typically 0.05% for most APIs), you do not even need to disclose an impurity. Between reporting and identification (0.10%), you must report but not yet characterise. Above identification, you must structurally identify the impurity. Above the qualification threshold (0.15%), you must demonstrate it is safe — usually by toxicology data or by showing it is present in the original innovator product at the same or higher level.',
        ],
      },
      {
        heading: 'What a Reference Standard Does',
        paragraphs: [
          'To identify an impurity by HPLC, you need something to compare it against — a known, characterised sample of that exact compound with documented purity. That is a reference standard. Without it, you have an unknown peak; with it, you have a quantified, named impurity that can be reported and controlled.',
          'Reference standards come in two flavours: pharmacopoeial (USP, EP, JP — typically the highest-grade, with full characterisation) and in-house. In-house standards are acceptable for non-pharmacopoeial impurities provided you can demonstrate identity by NMR, mass spec, and elemental analysis, and provided you can defend the purity assignment.',
        ],
      },
      {
        heading: 'Building an Impurity-Standards Library',
        paragraphs: [
          'A regulatory-mature API manufacturer maintains a working library of reference standards covering every identified impurity in their product. This includes process impurities (from synthesis), degradation products (from stability), and metabolite-related compounds where relevant. The investment pays back the first time you face an FDA observation about an unidentified peak — and several times after that.',
        ],
      },
    ],
  },
  {
    slug:       'food-chemical-regulations-fssai-eu',
    title:      'Food Chemical Regulations: Navigating FSSAI and EU Standards',
    excerpt:    'Food manufacturers sourcing preservatives, sweeteners, and emulsifiers must comply with both Indian FSSAI regulations and EU food additive directives. Here is a side-by-side comparison.',
    category:   'Regulatory',
    date:       'Jan 12, 2026',
    readTime:   '8 min read',
    color:      '#5AA344',
    author:     'Kavita Nair',
    authorRole: 'Food Compliance Specialist',
    sections: [
      {
        paragraphs: [
          'Food chemical regulation looks superficially similar across major jurisdictions — preservatives, sweeteners, emulsifiers, and colourants must be safety-evaluated and listed on positive ingredient lists before they can be used. In practice, the FSSAI framework in India and the EU food additives directive diverge on enough specifics that a product compliant in one market may fail compliance in the other.',
        ],
      },
      {
        heading: 'The Numbering Systems',
        paragraphs: [
          "EU additives carry E-numbers (E330 for citric acid, E202 for potassium sorbate). FSSAI references INS numbers, which are the same as JECFA's international numbering system — and which usually align with E-numbers but not always. Always cross-check INS-to-E mapping rather than assuming equivalence.",
        ],
      },
      {
        heading: 'Where the Frameworks Differ',
        paragraphs: [
          'Three areas account for most non-compliance findings:',
        ],
        bullets: [
          'Use levels — maximum permitted concentrations differ between FSSAI and EU for the same additive in the same food category. Always check both.',
          'Food category coding — the EU uses a 18-category system; FSSAI uses 16 categories with different boundaries. A product slotted in category 8 in the EU may sit in 6 or 9 under FSSAI.',
          'Labelling — EU requires E-number or full chemical name; FSSAI requires INS or chemical name. Cross-border products may need dual labelling.',
        ],
      },
      {
        heading: 'A Pragmatic Compliance Workflow',
        paragraphs: [
          'For products targeting both markets, the cleanest workflow is to design to the stricter of the two limits across every dimension, label dual-format from the start, and maintain a single technical file that maps additives to both INS and E-numbers. Retrofitting compliance after a product is in market is expensive; building it in at the formulation stage costs almost nothing.',
        ],
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug)
  if (!current) return posts.slice(0, limit)
  // Prefer same category, fall back to others
  const sameCategory  = posts.filter(p => p.slug !== slug && p.category === current.category)
  const otherCategory = posts.filter(p => p.slug !== slug && p.category !== current.category)
  return [...sameCategory, ...otherCategory].slice(0, limit)
}
