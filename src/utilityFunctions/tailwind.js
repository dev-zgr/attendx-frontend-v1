export const gridColInferior = (size) => {
    let className = `sm:col-span-3`;
    switch (size) {
        case 4:
            className = `sm:col-span-4`;
            break;
        case 5:
            className = `sm:col-span-5`;
            break;
        case 6:
            className = `sm:col-span-6`;
            break;
        default:
            break;
    }
    return className;
}
