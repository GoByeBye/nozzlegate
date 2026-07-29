---
slug: payment-surcharges
number: "02"
shortTitle: Payment surcharges
category: Pricing and checkout
title: The checkout added a card fee.
deck: In a Sweden checkout, selecting card added a 28.01 kr line labelled “Fee for Credit Card (Stripe).” The same amount appeared as a PayPal fee when PayPal was selected.
status: Charge privately confirmed
statusTone: documented
statusNote: Completed card charges privately confirmed · Visa, Mastercard and Amex
updated: 29 July 2026
readTime: 7 min
leadFact: 28.01 kr
leadLabel: Card-labelled fee shown with Sweden selected
metrics:
  - value: 2.56%
    label: Fee as a share of the displayed 1,094.88 kr subtotal
  - value: Sweden
    label: Country / Region visible in both captures
  - value: 28.01 kr
    label: Same amount shown when PayPal is selected
  - value: 3 card schemes
    label: Fee privately confirmed on Visa, Mastercard and American Express
summary:
  - text: Two screenshots show the same basket with Sweden selected. Both contain two INDX Passive Tools, a 1,094.88 kr subtotal and a 1,122.89 kr total.
    sourceIds:
      - fee-sweden-card
      - fee-sweden-paypal
  - text: "When card is selected, the checkout says “Fee for Credit Card (Stripe): 28.01 kr.” When PayPal is selected, the same amount is labelled “Fee for PayPal.” The screenshots prove what the checkout displayed, not that the fee only applies to cards."
    sourceIds:
      - fee-sweden-card
      - fee-sweden-paypal
  - text: Neither Sweden image alone shows a completed order, transaction date or the card ultimately used. Buyers privately confirmed that completed card orders retained the fee across Visa, Mastercard and American Express. The scheme-specific receipts are not public. A separate buyer privately confirmed that a completed US-dollar card receipt also retained its displayed fee.
    sourceIds:
      - fee-sweden-card
      - fee-sweden-paypal
      - fee-eu-checkout
      - fee-usd-order-summary
  - text: EU guidance says traders may not add surcharges for covered consumer credit or debit cards. It identifies exceptions for American Express or Diners Club and business or corporate cards. Konsumentverket and Swedish payment-services law state the same core prohibition for covered card payments.
    sourceIds:
      - fee-eu-guidance
      - fee-eu-consumer-guidance
      - fee-kov
      - fee-payment-law
evidence:
  - label: Primary checkout evidence
    title: Sweden selected and 28.01 kr labelled as a card fee
    text: "The credit/debit-card state visibly sets Country / Region to Sweden and itemizes “Fee for Credit Card (Stripe): 28.01 kr.” Blank card fields mean the image itself records the checkout offer rather than a completed payment. Buyers have since privately confirmed that completed orders retained the fee when paying with Visa, Mastercard and American Express. The scheme-specific receipts are not published."
    sourceIds:
      - fee-sweden-card
    image:
      src: /evidence/bondtech-sweden-checkout-card-selected.png
      alt: Bondtech checkout with Sweden selected, Credit and Debit Card selected, and a 28.01 kr Fee for Credit Card Stripe
      caption: Contributor-supplied original. Buyers later privately confirmed completed card fees across Visa, Mastercard and American Express; the receipts themselves are not public.
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
  - label: Privately confirmed charge
    title: A completed card receipt retained the displayed fee
    text: "A submitted order-summary table shows a $699.00 Founders Edition INDX, $27.18 FedEx shipping, “Fee for Credit Card (Stripe): $15.02,” Credit / Debit Card as the payment method and a $741.20 total. A buyer privately confirmed that the completed card receipt included the fee and that an authorized, redacted copy showing the date and card scheme can be provided. The receipt is not yet published, and the public image does not show the date, order number or card scheme."
    sourceIds:
      - fee-usd-order-summary
    image:
      src: /evidence/bondtech-usd-card-fee-order-summary.png
      alt: Order summary showing a $699 subtotal, $27.18 shipping, a $15.02 Fee for Credit Card Stripe, Credit and Debit Card as payment method, and a $741.20 total
      caption: Supplied by a buyer who privately confirmed that the completed card receipt included the fee. The public image itself does not show the date or card scheme.
      width: 548
      height: 563
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
    text: A contributor supplies two captures of the same basket with Sweden selected. The 28.01 kr line is labelled as a Stripe credit-card fee when card is selected and as a PayPal fee when PayPal is selected. Buyers later privately confirm that completed orders retained the card fee across Visa, Mastercard and American Express.
    sourceIds:
      - fee-sweden-card
      - fee-sweden-paypal
  - date: 29 Jul 2026
    title: Euro checkout capture contributed
    text: A contributor supplies a checkout image showing a €4.45 Stripe credit-card fee on a €197.55 Bondtech INDX basket. Buyer-country and card-scheme metadata remain outstanding.
    sourceIds:
      - fee-eu-checkout
  - date: 29 Jul 2026
    title: Completed card charge confirmed privately
    text: A buyer supplied an order summary showing a $15.02 Stripe credit-card fee on a $699 INDX order and privately confirmed that the completed card receipt included the fee. The buyer also confirmed that an authorized, redacted copy showing the date and card scheme can be provided. The receipt is not yet public.
    sourceIds:
      - fee-usd-order-summary
  - date: 29 Jul 2026
    title: Public terms checked
    text: The reviewed payment terms explain the available methods but do not disclose a card surcharge.
    sourceIds:
      - fee-bondtech-terms
legalTitle: Clear rule for covered cards; exact coverage still depends on the card and account
legalAnalysis:
  - text: "For a covered consumer debit or credit card payment in the EU, the official rule is clear: the trader cannot add a fee because that card was used. A report is strongest when it includes the invoice, buyer country, card type, currency, date and a comparison with another payment method."
    sourceIds:
      - fee-eu-guidance
      - fee-eu-consumer-guidance
      - fee-kov
      - fee-payment-law
  - text: The Sweden images establish the checkout state and a card-labelled fee. Private buyer confirmations report that completed orders retained the fee across Visa, Mastercard and American Express; those receipts are not public. That resolves which card schemes buyers encountered as a factual matter, but it does not make their legal treatment identical. Business or corporate cards, PayPal fees, foreign-exchange costs and customs charges can raise different legal questions.
    sourceIds:
      - fee-sweden-card
      - fee-sweden-paypal
      - fee-eu-checkout
      - fee-usd-order-summary
      - fee-eu-guidance
      - fee-eu-consumer-guidance
      - fee-payment-law
remedy:
  title: Ask Bondtech to refund the card fee
  intro:
    text: If Bondtech added a separately itemised card fee, ask for that fee to be refunded while keeping the underlying order. Swedish law states that a payee may not charge the payer for using a payment instrument.
    sourceIds:
      - fee-payment-law
      - fee-kov
  note: This is a fee-only refund request. It is not a cancellation, return or dispute of the full purchase. Use the card-fee line shown on your own receipt.
  steps:
    - title: Save the evidence
      text: Keep a clean copy of everything that shows what was ordered and what reached the card account.
      bullets:
        - Your original order confirmation.
        - The line showing “Fee for Credit Card (Stripe).”
        - Your card statement showing the single completed transaction.
        - A redacted copy for sharing. Hide the full card number, unrelated transactions, address and other personal details.
    - title: Ask Bondtech in writing
      text: Reply to the original order email. If replies are not accepted, use Bondtech’s order-support form or its published order address, order@bondtech.se. Say clearly that you want only the card fee refunded.
      links:
        - label: Email order@bondtech.se
          href: mailto:order@bondtech.se
        - label: Open Bondtech’s order form
          href: https://www.bondtech.se/contact/
      sourceIds:
        - fee-bondtech-terms
        - fee-bondtech-order-support
    - title: Start with the order confirmation
      text: Attach the confirmation containing the fee line. A card statement is not needed unless Bondtech disputes that it collected the fee; if you later send one, redact everything unrelated to this transaction.
    - title: Give a clear response date
      text: Fourteen calendar days is a reasonable practical deadline to request. It is your chosen response window, not a special statutory refund period.
    - title: Keep the paper trail
      text: Save the sent message, delivery confirmation and every response. You will need that correspondence if you ask a consumer body or card issuer to help.
    - title: If Bondtech says Stripe charged it
      text: Ask Bondtech to identify any separate Stripe transaction. If your confirmation includes the fee inside Bondtech’s order total, point that out and keep the claim focused on the itemised card fee.
  escalationTitle: If Bondtech refuses or does not answer
  escalationIntro: Keep the claim limited to the fee unless you are separately challenging the underlying purchase.
  escalation:
    - title: If eligible, ask your European Consumer Centre for help
      text: If you live in the EU, Iceland or Norway, the European Consumer Centre in your country may help with an unresolved purchase from a seller in another participating country. Contact Bondtech first, then provide the order documents and correspondence.
      links:
        - label: Find your European Consumer Centre
          href: https://commission.europa.eu/topics/consumers/consumer-rights-and-complaints/resolve-your-consumer-complaint/european-consumer-centres-network-ecc-net_en
      sourceIds:
        - fee-ecc-net
    - title: Report the practice to Konsumentverket
      text: A report can support supervision of Bondtech’s checkout practice, but it will not recover your individual fee.
      links:
        - label: Report to Konsumentverket
          href: https://www.konsumentverket.se/om-oss/anmala-till-konsumentverket/
      sourceIds:
        - fee-kov-report
    - title: Ask your card issuer about a fee-only card complaint
      text: Ask whether it accepts a card complaint or chargeback for only the card fee. Do not dispute the full purchase unless you are also challenging it. Eligibility depends on the card and issuer, and deadlines can be short.
  templateTitle: Card-fee refund email
  templateNote: Replace every bracketed field with the details from your own order before sending.
  emailTemplate: |-
    Subject: Request for refund of card fee — Order [ORDER NUMBER]

    Hello Bondtech,

    I am requesting a refund of the card fee charged on Order [ORDER NUMBER], placed on [ORDER DATE].

    My order confirmation shows a separate fee because I paid by card:

    “Fee for Credit Card (Stripe)”

    This fee was included in the order total.

    Under Chapter 5, Section 1 of the Swedish Payment Services Act (Lag (2010:751) om betaltjänster), a payee may not charge the payer a fee for using a payment instrument:

    “En betalningsmottagare får inte ta ut någon avgift av betalaren vid användning av ett betalningsinstrument.”

    Konsumentverket also states that debit- and credit-card fees are prohibited in physical stores and online:

    https://www.konsumentverket.se/ekonomi/kortavgift/

    My order confirmation itemises the card fee inside Bondtech’s order total. I therefore request that the card fee be refunded to the original payment method.

    Please confirm by [DATE — 14 CALENDAR DAYS FROM SENDING] that the refund has been processed.

    This request concerns only the separately itemised card fee. I am not cancelling or returning the underlying order.

    Kind regards,

    [YOUR FULL NAME]
    [EMAIL ADDRESS USED FOR THE ORDER]
    Order [ORDER NUMBER]
openQuestions:
  - What fee label and total appear when Prepaid (SEK) or Klarna is selected for the same basket?
  - When were the checkout captures made, and how did Bondtech respond if the fee was challenged?
sources:
  - id: fee-sweden-card
    title: Bondtech Sweden checkout — card selected
    publisher: Buyer-supplied checkout capture and private completion and card-scheme confirmations
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
  - id: fee-usd-order-summary
    title: Bondtech USD order — $15.02 card fee and private receipt confirmation
    publisher: Buyer submission
    href: /evidence/bondtech-usd-card-fee-order-summary.png
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
  - id: fee-bondtech-order-support
    title: Questions About an Order — official contact form
    publisher: Bondtech
    href: https://www.bondtech.se/contact/
    kind: Company
    checked: 29 Jul 2026
  - id: fee-ecc-net
    title: European Consumer Centres Network — cross-border help
    publisher: European Commission
    href: https://commission.europa.eu/topics/consumers/consumer-rights-and-complaints/resolve-your-consumer-complaint/european-consumer-centres-network-ecc-net_en
    kind: Authority
    checked: 29 Jul 2026
  - id: fee-kov-report
    title: Anmäl till Konsumentverket
    publisher: Konsumentverket
    href: https://www.konsumentverket.se/om-oss/anmala-till-konsumentverket/
    kind: Authority
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
