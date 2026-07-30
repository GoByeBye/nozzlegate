import type { Metadata } from "next";
import { CaseArticle } from "../../components/CaseArticle";
import { getCaseFile } from "../../../content/cases";

const caseFile = getCaseFile("nozzlegate");

export const metadata: Metadata = {
  title: "Nozzlegate issue",
  description:
    "The sourced record of Bondtech’s INDX hardened-nozzle claims, the shipped 30–32 HRC tools and the company’s July 29 admission.",
};

export default function NozzlegateCasePage() {
  return <CaseArticle caseFile={caseFile} />;
}
