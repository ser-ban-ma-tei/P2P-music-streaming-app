export const jsonToCssString = (json) => 
    `${JSON.stringify(json).slice(1, -1).replaceAll('\"', '').replaceAll(',', ';').replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)};`