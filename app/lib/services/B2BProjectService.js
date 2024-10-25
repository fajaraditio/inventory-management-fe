class B2BProjectService {
    constructor() {
        this.endpoints = process.env['NEXT_PUBLIC_API_URL'];
    }

    fetchMatchSimilarityProject = async (req) => {
        try {
            const response = await fetch(`${this.endpoints}/api/v1/b2b-project/check-similarity?${new URLSearchParams(req)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) return Object.assign({}, { success: false }, data);

            return Object.assign({}, { success: false }, data);
        } catch (error) {
            console.error(error);

            return { success: false, message: 'Something went wrong. Please, try again later' };
        }
    }
}

export default new B2BProjectService();