const BASE_URL = 'https://restcountries.com/v3.1'

export const fetchFromAPI = async (url) => {
    try {
        const response = await fetch(`${BASE_URL}/${url}`)

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        return data
    } catch (error) {
        // Handle errors appropriately, such as logging or rethrowing
        console.error('Error fetching data:', error)
        throw error
    }
}
