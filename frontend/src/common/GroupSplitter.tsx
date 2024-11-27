const groupInThrees = (data: any) => {
    const grouped = [];
    for (let i = 0; i < data.length; i += 3) {
        grouped.push(data.slice(i, i + 3));
    }
    return grouped;
}

export default groupInThrees;