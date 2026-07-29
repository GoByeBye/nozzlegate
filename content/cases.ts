export type SourceKind = "Company" | "Law" | "Authority" | "Archive" | "Community";

export type CaseSource = {
  id: string;
  title: string;
  publisher: string;
  href: string;
  kind: SourceKind;
  checked: string;
};

export type CitedText = {
  text: string;
  sourceIds?: string[];
};

export type CaseFile = {
  slug: "nozzlegate" | "payment-surcharges" | "warranty-terms";
  number: string;
  shortTitle: string;
  category: string;
  title: string;
  deck: string;
  status: string;
  statusTone: "confirmed" | "documented" | "analysis";
  statusNote: string;
  updated: string;
  readTime: string;
  leadFact: string;
  leadLabel: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  summary: CitedText[];
  evidence: Array<{
    label: string;
    title: string;
    text: string;
    sourceIds: string[];
  }>;
  timeline: Array<{
    date: string;
    title: string;
    text: string;
    sourceIds: string[];
  }>;
  legalTitle: string;
  legalAnalysis: CitedText[];
  openQuestions: string[];
  sources: CaseSource[];
  reportTemplate: string;
};

export const caseFiles: CaseFile[] = [
  {
    slug: "nozzlegate",
    number: "01",
    shortTitle: "Nozzlegate",
    category: "Product representation",
    title: "Sold as hardened. Shipped as something else.",
    deck:
      "Bondtech marketed INDX tools as hardened and abrasive-resistant. Its own statement now says every Founders Edition nozzle shipped so far is not truly hardened.",
    status: "Company-confirmed",
    statusTone: "confirmed",
    statusNote: "Core mismatch admitted by Bondtech",
    updated: "29 July 2026",
    readTime: "6 min",
    leadFact: "30–32 HRC",
    leadLabel: "Bondtech’s stated bulk hardness for shipped nozzles",
    metrics: [
      {
        value: "55–60",
        label: "HRC range Bondtech gives for truly hardened nozzles",
      },
      {
        value: "Every FE tool",
        label: "Affected, according to Bondtech",
      },
      {
        value: "Many months",
        label: "Company estimate before serial production of a true hardened tool",
      },
      {
        value: "No fixed remedy",
        label: "Compensation remained unresolved on 29 July",
      },
    ],
    summary: [
      {
        text:
          "On 29 July 2026, Bondtech stated that the INDX nozzles were sold as hardened and abrasive-resistant but are not truly hardened. The company describes the shipped tools as nitrocarburized steel measuring roughly 30–32 HRC in bulk tests, compared with about 55–60 HRC for a truly hardened nozzle.",
        sourceIds: ["ng-company-update"],
      },
      {
        text:
          "Bondtech says the mismatch affects every nozzle shipped with the INDX Founders Edition and every nozzle due in the initial batches of the Prusa CORE One+ INDX Upgrade Kit. It also says some boxes may still carry the incorrect “hardened” label.",
        sourceIds: ["ng-company-update"],
      },
      {
        text:
          "A refund is expressly offered as an option. Bondtech had no concrete compensation plan on the update date and said a true hardened INDX nozzle was still a long way from serial production.",
        sourceIds: ["ng-company-update"],
      },
    ],
    evidence: [
      {
        label: "The sales claim",
        title: "“Hardened steel” and “zero fear of wear”",
        text:
          "A 16 July archive of Bondtech’s Development Kit page describes every passive tool as crafted from hardened steel and suitable for carbon-fiber, glass-fiber and glow-in-the-dark filament with “zero fear of wear.”",
        sourceIds: ["ng-archived-product"],
      },
      {
        label: "The delivered product",
        title: "Nitrocarburized, not truly hardened",
        text:
          "Bondtech’s official update identifies the shipped material treatment and publishes its own 30–32 HRC comparison. That makes the central product mismatch a company-confirmed fact, not a community inference.",
        sourceIds: ["ng-company-update"],
      },
      {
        label: "The changed record",
        title: "Product language was revised after discovery",
        text:
          "The current tool listing uses “Steel CHT” language. Contemporary reporting collected archived sales pages, buyer invoices, packing slips and boxes showing the earlier hardened description.",
        sourceIds: ["ng-current-product", "ng-investigation"],
      },
      {
        label: "The unresolved remedy",
        title: "Refund available; replacement path undefined",
        text:
          "Bondtech says buyers may return the INDX for a refund, while asking them to consider keeping it for a future upgrade offer. No date, price or replacement commitment was provided.",
        sourceIds: ["ng-company-update"],
      },
    ],
    timeline: [
      {
        date: "29 Nov 2025",
        title: "Pre-order record",
        text:
          "Archived material records the INDX specification as “Hardened with CHT.”",
        sourceIds: ["ng-investigation"],
      },
      {
        date: "20 Mar 2026",
        title: "Founders orders completed",
        text:
          "Buyer-posted order summaries list INDX “Hardened Tool” line items as paid products.",
        sourceIds: ["ng-orders-thread"],
      },
      {
        date: "16 Jul 2026",
        title: "Claim still live",
        text:
          "The archived Development Kit page still promised hardened steel and abrasive resistance.",
        sourceIds: ["ng-archived-product"],
      },
      {
        date: "17–18 Jul 2026",
        title: "Mismatch becomes public",
        text:
          "Support and Discord screenshots, delivery photos and invoices were collected by owners and independent reporting.",
        sourceIds: ["ng-investigation"],
      },
      {
        date: "29 Jul 2026",
        title: "Bondtech confirms the facts",
        text:
          "The company acknowledges the sales description, publishes the hardness range and apologizes for failing to communicate the difference.",
        sourceIds: ["ng-company-update"],
      },
    ],
    legalTitle: "A strong product-conformity case; final findings belong to authorities",
    legalAnalysis: [
      {
        text:
          "Swedish consumer law requires a product’s description, quality and function to match the agreement. A seller is responsible for original non-conformity that appears within three years, and available remedies can include repair, replacement, price reduction or cancellation depending on the circumstances.",
        sourceIds: ["ng-consumer-sales-law"],
      },
      {
        text:
          "The public record strongly supports a claim that the delivered nozzle specification did not match the advertised description. Whether particular marketing was unlawful, which seller is responsible for a given order, and which remedy is proportionate must be decided on the facts by the relevant authority, dispute body or court.",
        sourceIds: ["ng-consumer-sales-law", "ng-report-authority"],
      },
    ],
    openQuestions: [
      "What remedy will be offered to owners who keep the system?",
      "Will truly hardened replacements be supplied without further payment?",
      "What independent wear-test protocol and results will be published?",
      "Which serial numbers, Prusa batches and packaging revisions contain which nozzle treatment?",
    ],
    sources: [
      {
        id: "ng-company-update",
        title: "INDX – Hardened Nozzles Update",
        publisher: "Bondtech",
        href: "https://www.bondtech.se/2026/07/29/indx-hardened-nozzles-update/",
        kind: "Company",
        checked: "29 Jul 2026",
      },
      {
        id: "ng-archived-product",
        title: "INDX Development Kit product page, archived 16 July 2026",
        publisher: "Internet Archive / Bondtech",
        href:
          "https://web.archive.org/web/20260716153634/https://www.bondtech.se/product/indx-development-kit/",
        kind: "Archive",
        checked: "29 Jul 2026",
      },
      {
        id: "ng-current-product",
        title: "Current INDX Toolhead and passive-tool listing",
        publisher: "Bondtech",
        href: "https://www.bondtech.se/product/bondtech-indx-toolhead/",
        kind: "Company",
        checked: "29 Jul 2026",
      },
      {
        id: "ng-investigation",
        title: "Bondtech admits INDX ‘hardened’ nozzles aren’t really hardened",
        publisher: "3DPCC",
        href:
          "https://3dprintingcostcalculator.com/news/indx-hardened-nozzles",
        kind: "Community",
        checked: "29 Jul 2026",
      },
      {
        id: "ng-orders-thread",
        title: "INDX Founders: orders are open",
        publisher: "r/prusa3d",
        href:
          "https://www.reddit.com/r/prusa3d/comments/1ryxfu6/indx_founders_orders_are_open/",
        kind: "Community",
        checked: "29 Jul 2026",
      },
      {
        id: "ng-consumer-sales-law",
        title: "Konsumentköplag (2022:260), chapters 4–5",
        publisher: "Sveriges riksdag",
        href:
          "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/konsumentkoplag-2022260_sfs-2022-260/",
        kind: "Law",
        checked: "29 Jul 2026",
      },
      {
        id: "ng-report-authority",
        title: "Anmäla till Konsumentverket",
        publisher: "Konsumentverket",
        href:
          "https://www.konsumentverket.se/om-oss/anmala-till-konsumentverket/",
        kind: "Authority",
        checked: "29 Jul 2026",
      },
    ],
    reportTemplate: `Ämne: Misstänkt vilseledande marknadsföring och felaktig produktbeskrivning – Bondtech INDX

Jag vill anmäla Bondtech AB (org.nr 556995-5643), som driver bondtech.se.

Jag beställde [produkt] den [datum], ordernummer [ordernummer]. Vid köpet beskrevs INDX-munstyckena som “hardened” och som lämpade för abrasiva filament. Den 29 juli 2026 uppgav Bondtech offentligt att de levererade munstyckena inte är verkligt härdade, utan är nitrokarburerade och mäter cirka 30–32 HRC.

Jag anser att Konsumentverket bör granska om marknadsföringen, produktbeskrivningen och informationen efter köpet följer konsumenträttsliga regler.

Det här hände mig:
[Beskriv kort vad du såg vid köpet, vad du fick och när du fick veta att uppgiften var fel.]

Bilagor:
[Kvitto eller orderbekräftelse]
[Skärmbild eller arkiverad produktsida]
[Bild på förpackning/produkt]
[Relevant mejlväxling]

Webbadress: https://www.bondtech.se/

Jag förstår att en anmälan till Konsumentverket är ett tips för tillsyn och inte ett personligt ersättningsärende.`,
  },
  {
    slug: "payment-surcharges",
    number: "02",
    shortTitle: "Payment surcharges",
    category: "Pricing and checkout",
    title: "A fee for choosing a card.",
    deck:
      "Order summaries show payment-method surcharges added by Bondtech. Swedish guidance is unambiguous for consumer debit and credit cards: the shop may not add a card fee.",
    status: "Documented reports",
    statusTone: "documented",
    statusNote: "Invoice examples found; EU receipts still requested",
    updated: "29 July 2026",
    readTime: "5 min",
    leadFact: "“Fee for Credit Card”",
    leadLabel: "The line-item label in a buyer-posted Bondtech order summary",
    metrics: [
      {
        value: "$13.30",
        label: "Card fee in one posted order summary",
      },
      {
        value: "Ireland",
        label: "EU buyer location in a separate card-fee report",
      },
      {
        value: "Not allowed",
        label: "Konsumentverket’s rule for debit and credit cards",
      },
      {
        value: "Receipt wanted",
        label: "Best next evidence: a redacted EU invoice",
      },
    ],
    summary: [
      {
        text:
          "A March 2026 buyer-posted order summary lists a separate “Fee for Credit Card (Stripe)” of $13.30 and identifies the payment method as credit/debit card. The buyer was in Canada, so that example proves the checkout practice, not an EU violation by itself.",
        sourceIds: ["fee-order-thread"],
      },
      {
        text:
          "A separate buyer in Ireland reported that their Bondtech total included a card transaction fee. The public post does not show the underlying invoice or isolate the amount, so this dossier treats the EU occurrence as documented testimony that still needs primary-document confirmation.",
        sourceIds: ["fee-eu-report"],
      },
      {
        text:
          "Konsumentverket states that a store may not charge a fee because a customer pays by debit or credit card, online or in person. Swedish payment-services law likewise says a payee may not charge the payer for using a payment instrument.",
        sourceIds: ["fee-kov", "fee-payment-law"],
      },
    ],
    evidence: [
      {
        label: "Checkout practice",
        title: "A payment-method line item",
        text:
          "The posted order table names both the card processor and the fee. That is stronger than a complaint about a higher total, but it remains a community-posted record until an original redacted invoice is contributed.",
        sourceIds: ["fee-order-thread"],
      },
      {
        label: "EU occurrence",
        title: "An Irish buyer reports the same fee",
        text:
          "A June forum post itemizes an Ireland order and says its total included the card transaction fee, shipping and two additional nozzles.",
        sourceIds: ["fee-eu-report"],
      },
      {
        label: "Public terms",
        title: "The payment section does not disclose a surcharge",
        text:
          "Bondtech’s terms describe card payment through PayPal and say the card is charged when the order is received. The public payment section reviewed for this case does not mention a card-processing surcharge.",
        sourceIds: ["fee-bondtech-terms"],
      },
      {
        label: "Legal rule",
        title: "Card fees are not allowed in Sweden",
        text:
          "The official consumer guidance is categorical for debit and credit cards. A different, genuinely general fee may be permitted only when it is not tied to the payment method.",
        sourceIds: ["fee-kov", "fee-payment-law"],
      },
    ],
    timeline: [
      {
        date: "20 Mar 2026",
        title: "Card-fee line item posted",
        text:
          "A buyer shares an order table showing a $13.30 Stripe credit-card fee.",
        sourceIds: ["fee-order-thread"],
      },
      {
        date: "20 Mar 2026",
        title: "PayPal fees also reported",
        text:
          "Other buyers report a separately labelled PayPal fee. PayPal is a distinct payment arrangement and should not be treated automatically as the same legal question as a consumer-card surcharge.",
        sourceIds: ["fee-paypal-report"],
      },
      {
        date: "29 Jun 2026",
        title: "EU card-fee report",
        text:
          "An Ireland-based buyer says their completion order included a card transaction fee.",
        sourceIds: ["fee-eu-report"],
      },
      {
        date: "29 Jul 2026",
        title: "Public terms checked",
        text:
          "The reviewed payment terms explain the available methods but do not disclose a card surcharge.",
        sourceIds: ["fee-bondtech-terms"],
      },
    ],
    legalTitle: "Clear for consumer cards; do not collapse every payment fee into one claim",
    legalAnalysis: [
      {
        text:
          "For a consumer debit or credit card payment within the applicable Swedish framework, the rule is clear: a store cannot add a fee because that card was used. A report is strongest when it includes the invoice, buyer country, card type, currency, date and a comparison with another payment method.",
        sourceIds: ["fee-kov", "fee-payment-law"],
      },
      {
        text:
          "PayPal fees, foreign-exchange costs, customs charges, commercial cards and payments involving providers outside the EEA can raise different legal and factual questions. This case file therefore makes the narrow claim the evidence supports: a Bondtech consumer-card surcharge should be investigated wherever an affected EU buyer can document it.",
        sourceIds: ["fee-payment-law"],
      },
    ],
    openQuestions: [
      "Can an EU buyer provide a redacted original invoice showing the fee line?",
      "Does the fee disappear when bank transfer is selected for the same basket?",
      "Which card types, currencies and customer countries trigger the surcharge?",
      "Was the surcharge disclosed before the buyer committed to the order?",
    ],
    sources: [
      {
        id: "fee-order-thread",
        title: "INDX Founders: orders are open — posted card-fee order table",
        publisher: "r/prusa3d",
        href:
          "https://www.reddit.com/r/prusa3d/comments/1ryxfu6/indx_founders_orders_are_open/",
        kind: "Community",
        checked: "29 Jul 2026",
      },
      {
        id: "fee-eu-report",
        title: "Update… (Kind of), page 56 — Ireland card-fee report",
        publisher: "Prusa3D Forum",
        href:
          "https://forum.prusa3d.com/forum/prusa-indx-general-discussion-announcements-and-releases/update-kind-of/paged/56/",
        kind: "Community",
        checked: "29 Jul 2026",
      },
      {
        id: "fee-paypal-report",
        title: "Bondtech INDX Nozzle Selection — reported PayPal fee",
        publisher: "Prusa3D Forum",
        href:
          "https://forum.prusa3d.com/forum/prusa-core-one-general-discussion-announcements-and-releases/index/paged/2/",
        kind: "Community",
        checked: "29 Jul 2026",
      },
      {
        id: "fee-bondtech-terms",
        title: "Terms & Conditions — Payments",
        publisher: "Bondtech",
        href: "https://www.bondtech.se/shop/terms-conditions/",
        kind: "Company",
        checked: "29 Jul 2026",
      },
      {
        id: "fee-kov",
        title: "Får butiken ta en avgift när du betalar med kort?",
        publisher: "Konsumentverket",
        href: "https://www.konsumentverket.se/ekonomi/kortavgift/",
        kind: "Authority",
        checked: "29 Jul 2026",
      },
      {
        id: "fee-payment-law",
        title: "Lag (2010:751) om betaltjänster, 5 kap. 1 §",
        publisher: "Sveriges riksdag",
        href:
          "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2010751-om-betaltjanster_sfs-2010-751/",
        kind: "Law",
        checked: "29 Jul 2026",
      },
    ],
    reportTemplate: `Ämne: Kortavgift i Bondtechs webbshop

Jag vill anmäla Bondtech AB (org.nr 556995-5643), som driver bondtech.se.

Den [datum] beställde jag [produkt], ordernummer [ordernummer]. När jag valde kredit- eller betalkort lade kassan till avgiften “[exakt namn på avgiftsraden]” på [belopp och valuta].

Samma varukorg kostade [belopp] med [annan betalningsmetod], alternativt: Jag kunde inte slutföra beställningen utan den kortspecifika avgiften.

Jag vill att Konsumentverket granskar om avgiften följer 5 kap. 1 § lagen (2010:751) om betaltjänster och reglerna om prisinformation.

Bilagor:
[Orderbekräftelse eller faktura med avgiftsraden]
[Skärmbilder före och efter val av betalningsmetod]
[Kontoutdrag, med kortnummer och övriga känsliga uppgifter maskerade]
[Företagets svar om du har frågat om avgiften]

Webbadress: https://www.bondtech.se/

Jag förstår att en anmälan till Konsumentverket är ett tips för tillsyn och inte ett personligt ersättningsärende.`,
  },
  {
    slug: "warranty-terms",
    number: "03",
    shortTitle: "Warranty terms",
    category: "Terms and consumer rights",
    title: "Ninety days is not the end of your rights.",
    deck:
      "Bondtech’s terms advertise a 90-day warranty without clearly stating in that section that Swedish and EU statutory remedies remain untouched.",
    status: "Legal concern",
    statusTone: "analysis",
    statusNote: "Short warranty is lawful; misleading limitation is not",
    updated: "29 July 2026",
    readTime: "5 min",
    leadFact: "90 days",
    leadLabel: "Commercial warranty stated in Bondtech’s public terms",
    metrics: [
      {
        value: "3 years",
        label: "Swedish seller liability for original defects",
      },
      {
        value: "2 years",
        label: "Period in which an appearing defect is presumed to be the seller’s responsibility",
      },
      {
        value: "Additional",
        label: "A commercial warranty sits on top of statutory remedies",
      },
      {
        value: "Not final",
        label: "No authority decision on these terms is cited here",
      },
    ],
    summary: [
      {
        text:
          "Bondtech’s public Terms & Conditions say products supplied by the company have a 90-day warranty and then list exclusions. The reviewed warranty section does not tell consumers that statutory rights continue regardless of that voluntary warranty.",
        sourceIds: ["warranty-bondtech-terms"],
      },
      {
        text:
          "A 90-day commercial warranty is not automatically unlawful. A company may choose whether to offer a warranty and set its conditions. What it may not do is use that warranty to give consumers worse rights than mandatory law or mislead them into believing their rights end after 90 days.",
        sourceIds: ["warranty-kov", "warranty-unfair-terms"],
      },
      {
        text:
          "In Sweden, the seller remains responsible for original defects that appear within three years. If a defect appears within two years, it is presumed to be one the seller is responsible for unless the seller shows otherwise or that presumption is incompatible with the product or defect.",
        sourceIds: ["warranty-sales-law"],
      },
    ],
    evidence: [
      {
        label: "The published clause",
        title: "“Products supplied by Bondtech have 90 days warranty”",
        text:
          "That is the complete duration statement in the public warranty section reviewed on 29 July. The section does not distinguish the voluntary warranty from mandatory complaint rights.",
        sourceIds: ["warranty-bondtech-terms"],
      },
      {
        label: "The Swedish rule",
        title: "Warranty and reklamationsrätt are different",
        text:
          "Konsumentverket says a warranty is voluntary, while the right to complain about an original fault exists by law for at least three years. The warranty may not provide worse rights than the law.",
        sourceIds: ["warranty-kov", "warranty-sales-law"],
      },
      {
        label: "The EU disclosure rule",
        title: "Legal remedies must be stated as unaffected",
        text:
          "Article 17 of Directive (EU) 2019/771 requires a commercial-guarantee statement to say clearly that consumers have free legal remedies against the seller and that the guarantee does not affect them.",
        sourceIds: ["warranty-eu-directive"],
      },
      {
        label: "The regulatory question",
        title: "Could a reasonable consumer read 90 days as the limit?",
        text:
          "That is the issue to put to Konsumentverket. This dossier does not claim that the number 90 is itself illegal; it flags the omission and the risk of a misleading limitation.",
        sourceIds: ["warranty-unfair-terms", "warranty-report-authority"],
      },
    ],
    timeline: [
      {
        date: "1 May 2022",
        title: "Current Swedish Consumer Sales Act takes effect",
        text:
          "The act establishes three-year seller liability and a two-year presumption for defects.",
        sourceIds: ["warranty-sales-law"],
      },
      {
        date: "29 Jul 2026",
        title: "Bondtech terms checked",
        text:
          "The public warranty section states 90 days and lists exclusions without a nearby statutory-rights clarification.",
        sourceIds: ["warranty-bondtech-terms"],
      },
      {
        date: "29 Jul 2026",
        title: "No adjudication located",
        text:
          "No published Konsumentverket decision or court judgment about this specific Bondtech clause is cited in this dossier.",
        sourceIds: ["warranty-report-authority"],
      },
    ],
    legalTitle: "The omission is the concern, not the existence of a short warranty",
    legalAnalysis: [
      {
        text:
          "Commercial warranties are optional benefits. Statutory conformity rights are mandatory protections against the seller. A term can become unfair or misleading when its purpose or effect is to exclude or limit those legal rights.",
        sourceIds: [
          "warranty-kov",
          "warranty-unfair-terms",
          "warranty-eu-directive",
        ],
      },
      {
        text:
          "The public wording deserves regulatory review because an ordinary consumer could understand “90 days warranty” as the entire period for fault claims. A full assessment should also inspect the exact guarantee statement delivered with the product, the checkout terms that applied on the purchase date and how Bondtech responds to complaints after day 90.",
        sourceIds: ["warranty-bondtech-terms", "warranty-report-authority"],
      },
    ],
    openQuestions: [
      "What warranty or statutory-rights statement is delivered on a durable medium with each order?",
      "How does Bondtech respond when an EU consumer reports an original defect after day 90?",
      "Which version of the terms was accepted at checkout for each affected order?",
      "Will Bondtech revise the warranty section to state clearly that statutory rights are unaffected?",
    ],
    sources: [
      {
        id: "warranty-bondtech-terms",
        title: "Terms & Conditions — Warranty / Complaints",
        publisher: "Bondtech",
        href: "https://www.bondtech.se/shop/terms-conditions/",
        kind: "Company",
        checked: "29 Jul 2026",
      },
      {
        id: "warranty-kov",
        title: "Garanti – vad är garanti och när gäller den?",
        publisher: "Konsumentverket",
        href: "https://www.konsumentverket.se/konsumentratt/garanti/",
        kind: "Authority",
        checked: "29 Jul 2026",
      },
      {
        id: "warranty-sales-law",
        title: "Konsumentköplag (2022:260), 4 kap. 14, 17 and 21–23 §§",
        publisher: "Sveriges riksdag",
        href:
          "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/konsumentkoplag-2022260_sfs-2022-260/",
        kind: "Law",
        checked: "29 Jul 2026",
      },
      {
        id: "warranty-eu-directive",
        title: "Directive (EU) 2019/771, Article 17",
        publisher: "EUR-Lex",
        href:
          "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02019L0771-20260731",
        kind: "Law",
        checked: "29 Jul 2026",
      },
      {
        id: "warranty-unfair-terms",
        title: "Avtalsvillkorslagen – consumer guidance",
        publisher: "Konsumentverket",
        href:
          "https://www.konsumentverket.se/lagar/avtalsvillkorslagen-konsument/",
        kind: "Authority",
        checked: "29 Jul 2026",
      },
      {
        id: "warranty-report-authority",
        title: "Anmäla till Konsumentverket",
        publisher: "Konsumentverket",
        href:
          "https://www.konsumentverket.se/om-oss/anmala-till-konsumentverket/",
        kind: "Authority",
        checked: "29 Jul 2026",
      },
    ],
    reportTemplate: `Ämne: Otydligt garanti- och reklamationsvillkor hos Bondtech AB

Jag vill anmäla Bondtech AB (org.nr 556995-5643), som driver bondtech.se.

I företagets allmänna villkor står det under “Warranty / Complaints” att produkter har 90 dagars garanti. I samma avsnitt framgår det inte tydligt att konsumentens lagstadgade rättigheter vid fel – bland annat säljarens felansvar enligt konsumentköplagen – gäller oberoende av den frivilliga garantin.

Jag mötte villkoret den [datum] i samband med [köp/reklamation/läsning av webbplatsen].

Det här hände mig:
[Beskriv om företaget hänvisade till 90 dagar, nekade en reklamation eller på annat sätt gav intryck av att dina rättigheter hade upphört.]

Jag vill att Konsumentverket granskar om villkoret och presentationen av garantin är tydliga och skäliga enligt konsumentskyddande lagstiftning.

Bilagor:
[Villkoren som PDF eller skärmbild med datum och webbadress]
[Orderbekräftelse]
[Din reklamation och företagets svar]

Webbadress: https://www.bondtech.se/shop/terms-conditions/

Jag förstår att en anmälan till Konsumentverket är ett tips för tillsyn och inte ett personligt ersättningsärende.`,
  },
];

export function getCaseFile(slug: CaseFile["slug"]) {
  const caseFile = caseFiles.find((entry) => entry.slug === slug);

  if (!caseFile) {
    throw new Error(`Unknown case file: ${slug}`);
  }

  return caseFile;
}
