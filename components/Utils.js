export const formatYear = (year) => {
    if (year < 0) {
        return `${Math.abs(year)} BCE`;
    }
    return year.toString();
};