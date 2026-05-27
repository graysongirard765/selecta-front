import type { PolicySlug } from "../model/types";

export const policyRegistry = [
  {
    slug: "terminos-y-condiciones",
    fileName: "terms.md",
  },
  {
    slug: "politica-de-privacidad",
    fileName: "privacy.md",
  },
  {
    slug: "politica-de-cookies",
    fileName: "cookies.md",
  },
] as const satisfies ReadonlyArray<{
  slug: PolicySlug;
  fileName: string;
}>;
