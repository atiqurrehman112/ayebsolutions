interface BaseActionState {
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
  readonly message: string;
  readonly status: "idle" | "error" | "success";
}

export type BlogActionState = BaseActionState;
export type ContactFormState = BaseActionState & {
  readonly submissionId?: string;
};
export type FounderActionState = BaseActionState;
export type MediaActionState = BaseActionState;
export type PortfolioActionState = BaseActionState;
export type SiteSettingsActionState = BaseActionState;
export type TeamActionState = BaseActionState;
export type TestimonialActionState = BaseActionState;

export const initialBlogActionState: BlogActionState = {
  message: "",
  status: "idle",
};
export const initialContactFormState: ContactFormState = {
  message: "",
  status: "idle",
};
export const initialFounderActionState: FounderActionState = {
  message: "",
  status: "idle",
};
export const initialMediaActionState: MediaActionState = {
  message: "",
  status: "idle",
};
export const initialPortfolioActionState: PortfolioActionState = {
  message: "",
  status: "idle",
};
export const initialSiteSettingsActionState: SiteSettingsActionState = {
  message: "",
  status: "idle",
};
export const initialTeamActionState: TeamActionState = {
  message: "",
  status: "idle",
};
export const initialTestimonialActionState: TestimonialActionState = {
  message: "",
  status: "idle",
};
