---
slug: payment-surcharges
number: "02"
shortTitle: Payment surcharges
category: Pricing and checkout
title: The checkout added a card fee.
deck: In a Sweden checkout, selecting card added a 28.01 kr line labelled “Fee for Credit Card (Stripe).” The same amount appeared as a PayPal fee when PayPal was selected.
status: Checkout captured
statusTone: documented
statusNote: Sweden selected · fee label changes with payment method
updated: 29 July 2026
readTime: 6 min
leadFact: 28.01 kr
leadLabel: Card-labelled fee shown with Sweden selected
metrics:
  - value: 2.56%
    label: Fee as a share of the displayed 1,094.88 kr subtotal
  - value: Sweden
    label: Country / Region visible in both captures
  - value: 28.01 kr
    label: Same amount shown when PayPal is selected
  - value: Not completed
    label: The evidence records checkout pricing, not a final charge
summary:
  - text: Two screenshots show the same basket with Sweden selected. Both contain two INDX Passive Tools, a 1,094.88 kr subtotal and a 1,122.89 kr total.
    sourceIds:
      - fee-sweden-card
      - fee-sweden-paypal
  - text: "When card is selected, the checkout says “Fee for Credit Card (Stripe): 28.01 kr.” When PayPal is selected, the same amount is labelled “Fee for PayPal.” The screenshots prove what the checkout displayed, not that the fee only applies to cards."
    sourceIds:
      - fee-sweden-card
      - fee-sweden-paypal
  - text: Neither capture shows a completed order, transaction date or the card ultimately used. An earlier contributor-supplied euro capture independently shows a €4.45 Stripe credit-card fee, but does not display the buyer country or card scheme.
    sourceIds:
      - fee-sweden-card
      - fee-sweden-paypal
      - fee-eu-checkout
  - text: EU guidance says traders may not add surcharges for covered consumer credit or debit cards. It identifies exceptions for American Express or Diners Club and business or corporate cards. Konsumentverket and Swedish payment-services law state the same core prohibition for covered card payments.
    sourceIds:
      - fee-eu-guidance
      - fee-eu-consumer-guidance
      - fee-kov
      - fee-payment-law
evidence:
  - label: Primary checkout evidence
    title: Sweden selected and 28.01 kr labelled as a card fee
    text: "The credit/debit-card state visibly sets Country / Region to Sweden and itemizes “Fee for Credit Card (Stripe): 28.01 kr.” Blank card fields are visible, so the image records the checkout offer rather than a completed payment. It does not establish which card scheme or account type would be used."
    sourceIds:
      - fee-sweden-card
    image:
      src: /evidence/bondtech-sweden-checkout-card-selected.png
      alt: Bondtech checkout with Sweden selected, Credit and Debit Card selected, and a 28.01 kr Fee for Credit Card Stripe
      caption: Contributor-supplied original. Sweden is visible; no personal information or completed card details are entered.
      width: 1521
      height: 1113
  - label: Payment-method comparison
    title: The same basket labels the same 28.01 kr as a PayPal fee
    text: With PayPal selected, the country, products, subtotal, fee amount and total remain the same while the line becomes “Fee for PayPal.” This comparison supports that the checkout changes the fee label with the selected payment method. It also prevents a stronger claim that the 28.01 kr amount is unique to cards.
    sourceIds:
      - fee-sweden-paypal
    image:
      src: /evidence/bondtech-sweden-checkout-paypal-selected.png
      alt: Bondtech checkout with Sweden selected, PayPal selected, and a 28.01 kr Fee for PayPal
      caption: Contributor-supplied comparison capture of the same Sweden basket with PayPal selected.
      width: 1499
      height: 999
  - label: Corroborating checkout capture
    title: A separate euro basket shows a €4.45 Stripe card fee
    text: "A separate submitted image itemizes five INDX Passive Tools, a €197.55 subtotal, “Fee for Credit Card (Stripe): €4.45” and a €202.00 total. It corroborates the label, but its buyer country, date and card scheme are not visible."
    sourceIds:
      - fee-eu-checkout
    image:
      src: /evidence/bondtech-eu-card-fee-checkout.png
      alt: Checkout table showing a €197.55 subtotal, a €4.45 Fee for Credit Card Stripe, and a €202.00 total
      caption: Earlier contributor-supplied checkout capture. The image itself does not establish the buyer country or a completed charge.
      width: 617
      height: 322
  - label: Public terms
    title: The payment section does not disclose a surcharge
    text: Bondtech’s terms describe card payment through PayPal and say the card is charged when the order is received. The public payment section reviewed for this case does not mention a card-processing surcharge.
    sourceIds:
      - fee-bondtech-terms
  - label: Legal rule
    title: Covered consumer-card surcharges are prohibited
    text: EU and Swedish official guidance prohibit an added charge for covered consumer debit or credit cards. American Express, Diners Club and business or corporate cards fall outside the EU rule described by Your Europe; a genuinely general fee may also require a different analysis.
    sourceIds:
      - fee-eu-guidance
      - fee-eu-consumer-guidance
      - fee-kov
      - fee-payment-law
timeline:
  - date: 20 Mar 2026
    title: Card-fee line item posted
    text: A buyer shares an order table showing a $13.30 Stripe credit-card fee.
    sourceIds:
      - fee-order-thread
  - date: 20 Mar 2026
    title: PayPal fees also reported
    text: Other buyers report a separately labelled PayPal fee. PayPal is a distinct payment arrangement and should not be treated automatically as the same legal question as a consumer-card surcharge.
    sourceIds:
      - fee-paypal-report
  - date: 29 Jun 2026
    title: EU card-fee report
    text: An Ireland-based buyer says their completion order included a card transaction fee.
    sourceIds:
      - fee-eu-report
  - date: 29 Jul 2026
    title: Sweden checkout comparison contributed
    text: A contributor supplies two captures of the same basket with Sweden selected. The 28.01 kr line is labelled as a Stripe credit-card fee when card is selected and as a PayPal fee when PayPal is selected.
    sourceIds:
      - fee-sweden-card
      - fee-sweden-paypal
  - date: 29 Jul 2026
    title: Euro checkout capture contributed
    text: A contributor supplies a checkout image showing a €4.45 Stripe credit-card fee on a €197.55 Bondtech INDX basket. Buyer-country and card-scheme metadata remain outstanding.
    sourceIds:
      - fee-eu-checkout
  - date: 29 Jul 2026
    title: Public terms checked
    text: The reviewed payment terms explain the available methods but do not disclose a card surcharge.
    sourceIds:
      - fee-bondtech-terms
legalTitle: Clear rule for covered cards; the evidence still stops at checkout
legalAnalysis:
  - text: "For a covered consumer debit or credit card payment in the EU, the official rule is clear: the trader cannot add a fee because that card was used. A report is strongest when it includes the invoice, buyer country, card type, currency, date and a comparison with another payment method."
    sourceIds:
      - fee-eu-guidance
      - fee-eu-consumer-guidance
      - fee-kov
      - fee-payment-law
  - text: The two new captures establish the Sweden checkout state and a card-labelled fee, but not a completed covered-card payment. The identical PayPal amount also shows why every payment fee cannot be collapsed into one legal claim. American Express, Diners Club, business or corporate cards, PayPal fees, foreign-exchange costs and customs charges can raise different legal and factual questions.
    sourceIds:
      - fee-sweden-card
      - fee-sweden-paypal
      - fee-eu-guidance
      - fee-eu-consumer-guidance
      - fee-payment-law
openQuestions:
  - Does a completed card order retain the 28.01 kr fee on the confirmation or invoice?
  - Was the selected card a covered Visa or Mastercard consumer card, rather than an excluded scheme or corporate card?
  - What fee label and total appear when Prepaid (SEK) or Klarna is selected for the same basket?
  - When were the checkout captures made, and how did Bondtech respond if the fee was challenged?
sources:
  - id: fee-sweden-card
    title: Bondtech Sweden checkout — card selected
    publisher: Contributor-supplied checkout capture
    href: /evidence/bondtech-sweden-checkout-card-selected.png
    kind: Evidence
    checked: 29 Jul 2026
  - id: fee-sweden-paypal
    title: Bondtech Sweden checkout — PayPal selected
    publisher: Contributor-supplied checkout capture
    href: /evidence/bondtech-sweden-checkout-paypal-selected.png
    kind: Evidence
    checked: 29 Jul 2026
  - id: fee-eu-checkout
    title: Bondtech euro checkout — €4.45 Stripe credit-card fee
    publisher: Contributor-supplied checkout capture
    href: /evidence/bondtech-eu-card-fee-checkout.png
    kind: Evidence
    checked: 29 Jul 2026
  - id: fee-order-thread
    title: "INDX Founders: orders are open — posted card-fee order table"
    publisher: r/prusa3d
    href: https://www.reddit.com/r/prusa3d/comments/1ryxfu6/indx_founders_orders_are_open/
    kind: Community
    checked: 29 Jul 2026
  - id: fee-eu-report
    title: Update… (Kind of), page 56 — Ireland card-fee report
    publisher: Prusa3D Forum
    href: https://forum.prusa3d.com/forum/prusa-indx-general-discussion-announcements-and-releases/update-kind-of/paged/56/
    kind: Community
    checked: 29 Jul 2026
  - id: fee-paypal-report
    title: Bondtech INDX Nozzle Selection — reported PayPal fee
    publisher: Prusa3D Forum
    href: https://forum.prusa3d.com/forum/prusa-core-one-general-discussion-announcements-and-releases/index/paged/2/
    kind: Community
    checked: 29 Jul 2026
  - id: fee-bondtech-terms
    title: Terms & Conditions — Payments
    publisher: Bondtech
    href: https://www.bondtech.se/shop/terms-conditions/
    kind: Company
    checked: 29 Jul 2026
  - id: fee-eu-guidance
    title: Electronic and cash payments — card surcharges are not allowed
    publisher: Your Europe / European Union
    href: https://europa.eu/youreurope/business/finance-and-tax/making-receiving-payments/electronic-cash-payments/index_en.htm
    kind: Authority
    checked: 29 Jul 2026
  - id: fee-eu-consumer-guidance
    title: Pricing and payments — consumer-card surcharge exceptions
    publisher: Your Europe / European Union
    href: https://europa.eu/youreurope/citizens/consumers/shopping/pricing-payments/index_en.htm
    kind: Authority
    checked: 29 Jul 2026
  - id: fee-kov
    title: Får butiken ta en avgift när du betalar med kort?
    publisher: Konsumentverket
    href: https://www.konsumentverket.se/ekonomi/kortavgift/
    kind: Authority
    checked: 29 Jul 2026
  - id: fee-payment-law
    title: Lag (2010:751) om betaltjänster, 5 kap. 1 §
    publisher: Sveriges riksdag
    href: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2010751-om-betaltjanster_sfs-2010-751/
    kind: Law
    checked: 29 Jul 2026
reportTemplate: |-
  Ämne: Kortavgift i Bondtechs webbshop

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

  Jag förstår att en anmälan till Konsumentverket är ett tips för tillsyn och inte ett personligt ersättningsärende.
---

<!--
This Markdown file is the source of truth for the rendered case.
See CONTRIBUTING.md before changing claims, citations, or evidence.
-->
