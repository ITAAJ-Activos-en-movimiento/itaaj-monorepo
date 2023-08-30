export const fromNow = (d: any) => {

    const date = new Date(d);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - date.getTime();
    const secondsDiff = Math.round(timeDiff / 1000);
    const minutesDiff = Math.round(secondsDiff / 60);
    const hoursDiff = Math.round(minutesDiff / 60);
    const daysDiff = Math.round(hoursDiff / 24);

    let formattedDate = '';
    if (daysDiff > 0) {
        formattedDate = `${daysDiff} ${daysDiff === 1 ? 'day ago' : 'days ago'}`;
    } else if (hoursDiff > 0) {
        formattedDate = `${hoursDiff} ${hoursDiff === 1 ? 'hour ago' : 'hours ago'}`;
    } else if (minutesDiff > 0) {
        formattedDate = `${minutesDiff} ${minutesDiff === 1 ? 'minute ago' : 'minutes ago'}`;
    } else {
        formattedDate = `${secondsDiff} ${secondsDiff === 1 ? 'second' : 'seconds'}`;
    }

    return formattedDate;
}