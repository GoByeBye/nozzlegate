import type { Metadata } from "next";
import { CaseArticle } from "../../components/CaseArticle";
import { getCaseFile } from "../../../content/cases";

const caseFile = getCaseFile("nozzlegate");

export const metadata: Metadata = {
  title: "Nozzlegate issue",
  description:
    "The sourced record of Bondtech’s INDX hardened-nozzle claims, its July 29 admission, and a consumer return-and-refund guide with a copyable email.",
};

export default function NozzlegateCasePage() {
  return <CaseArticle caseFile={caseFile} />;
}
