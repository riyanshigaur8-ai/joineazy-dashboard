export const getStorageData = (key, fallback = null) => {
    try{
        const data = localStorage.getItem(key);

        return data ? JSON.parse(data) : fallback;
    } catch (error) {
        console.error("Error reading from localStorage:", error);
        return fallback;
    }
};

export const setStorageData = (key, value) => {
    try{
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
    };

export const removeStorageData = (key) => {
    try{
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing from localStorage:", error);
    }
};