export const fetchServices = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/services`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}
