export function encodeFormData(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v ?? "")}`)
    .join("&");
}

export async function submitNetlifyForm(
  formName: string,
  data: Record<string, string>
): Promise<void> {
  const body = encodeFormData({ "form-name": formName, ...data });
  const response = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw new Error(`Netlify form ${formName} failed`);
}
