const choice = (items) => {
    let idx = Math.floor(Math.random() * items.length);
    return items[idx];
}

const remove = (item, items) => {
    for (let i in items) {
        if (items[i] === item) {
            items.splice(i, 1)
            return [...items]
        }
    }
}

// NAMED EXPORTS
export { choice, remove };
