export function trimAndTitleCase(input: string): string {
  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return "";
  }

  return trimmed.replace(/\S+/g, (word) => {
    const characters = Array.from(word);

    if (characters.length === 0) {
      return "";
    }

    return characters[0].toUpperCase() + characters.slice(1).join("").toLowerCase();
  });
}
