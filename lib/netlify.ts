function toUrlEncoded(formData: FormData): string {
  return [...formData.entries()]
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

export async function submitNetlifyForm(form: HTMLFormElement): Promise<void> {
  const formData = new FormData(form);

  const response = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: toUrlEncoded(formData),
  });
  if (!response.ok) throw new Error("Netlify form failed");
}
