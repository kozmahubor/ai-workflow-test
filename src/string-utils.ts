export function trimAndTitleCase(input: string): string {
  return input.trim().replace(/\S+/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}
