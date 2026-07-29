import type { Metadata } from "next";
import { CaseArticle } from "../../components/CaseArticle";
import { getCaseFile } from "../../../content/cases";

const caseFile = getCaseFile("payment-surcharges");

export const metadata: Metadata = {
  title: "Case 02 — Payment surcharges",
  description:
    "Documented Bondtech card-fee charges, applicable consumer rules, and steps for requesting a fee refund or reporting the practice.",
};

export default function PaymentSurchargesCasePage() {
  return <CaseArticle caseFile={caseFile} />;
}
