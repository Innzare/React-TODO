export function generateRandomId(): string {
  const timestamp = Date.now().toString(36);
  const randomChars = Math.random().toString(36).substr(2, 5);

  return timestamp + randomChars;
}
