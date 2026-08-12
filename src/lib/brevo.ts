const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

export async function addContactToBrevo(email: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  if (!apiKey || !listId) return;

  const res = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email,
      listIds: [Number(listId)],
      updateEnabled: true,
    }),
  });

  if (!res.ok) {
    console.error("Brevo contact sync failed:", await res.text());
  }
}
