const dateFormeter = (dateString) => {
    const option = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", option);

    return `${formattedDate}`;

};

export default dateFormeter;