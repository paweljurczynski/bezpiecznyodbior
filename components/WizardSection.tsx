import { LeadWizard } from "./LeadWizard";

export function WizardSection() {
  return (
    <section id="wycena" className="bg-slate-50 py-16 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="section-heading">
            Bezpłatna wycena — odpowiadamy w ciągu godziny
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Bez zobowiązań. Cena finalna od razu, bez ukrytych kosztów.
          </p>
        </div>

        <LeadWizard />
      </div>
    </section>
  );
}
