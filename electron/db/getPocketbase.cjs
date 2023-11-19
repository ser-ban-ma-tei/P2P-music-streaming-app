exports.getPocketbase = async () => {
    const pocketbase = await import('./pocketbase.mjs');
    return pocketbase.default.getInstance();
}