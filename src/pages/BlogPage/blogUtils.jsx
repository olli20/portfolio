export const getUniqueTags = (entries) => {
    const tagsSet = new Set();
    entries.forEach((entry) => {
      entry.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
};