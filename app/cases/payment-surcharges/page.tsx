import type { Metadata } from "next";
import { CaseArticle } from "../../components/CaseArticle";
import { getCaseFile } from "../../../content/cases";

const caseFile = getCaseFile("payment-surcharges");

export const metadata: Metadata = {
  title: "Case 02 — Payment surcharges",
  description:
    "Documented Bondtech card-fee reports, the Swedish rule against consumer card surcharges and the evidence still needed.",
};

export default function PaymentSurchargesCasePage() {
  return <CaseArticle caseFile={caseFile} />;
}
