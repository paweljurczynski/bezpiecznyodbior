function encodeFormData(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v ?? "")}`)
    .join("&");
}

export async function submitNetlifyForm(
  formName: string,
  data: Record<string, string>,
  files?: File[]
): Promise<void> {
  let body: string | FormData;
  let headers: Record<string, string>;

  if (files && files.length > 0) {
    const formData = new FormData();
    formData.append("form-name", formName);
    Object.entries(data).forEach(([k, v]) => formData.append(k, v ?? ""));
    files.forEach((f) => formData.append("files", f));
    body = formData;
    headers = {};
  } else {
    body = encodeFormData({ "form-name": formName, ...data });
    headers = { "Content-Type": "application/x-www-form-urlencoded" };
  }

  const response = await fetch("/__forms.html", {
    method: "POST",
    headers,
    body,
  });
  if (!response.ok) throw new Error(`Netlify form ${formName} failed`);
}
