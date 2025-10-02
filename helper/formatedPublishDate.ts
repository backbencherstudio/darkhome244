    const formatPublishDate = (dateString: string) => {
        const s = dateString ?? "";
        const m = s.match(/^(?:[A-Za-z]{3},\s*)?(\d{1,2}\s+[A-Za-z]{3}\s+\d{4})\s+(\d{2}):(\d{2})/);
        if (!m) return s;
        const [, datePart, HH, MM] = m;
        const h = (parseInt(HH, 10) % 12) || 12;
        const ampm = parseInt(HH, 10) >= 12 ? "pm" : "am";
        return `${datePart} at ${h}:${MM} ${ampm}`;
    };

    export default formatPublishDate