import type { Metadata } from "next";
import { CaseArticle } from "../../components/CaseArticle";
import { getCaseFile } from "../../../content/cases";

const caseFile = getCaseFile("warranty-terms");

export const metadata: Metadata = {
  title: "Case 03 — Warranty terms",
  description:
    "Why Bondtech’s 90-day warranty does not replace Swedish and EU statutory consumer rights, and why the wording deserves review.",
};

export default function WarrantyTermsCasePage() {
  return <CaseArticle caseFile={caseFile} />;
}
