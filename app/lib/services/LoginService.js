class LoginService {
    constructor() {
        this.endpoints = process.env['NEXT_PUBLIC_API_URL'];
    }

    authenticate = async (req) => {
        try {
            const response = await fetch(`${this.endpoints}/api/auth/login`, {
                method: 'POST',
                body: JSON.stringify(req),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) return Object.assign({}, { success: false }, data);

            return { success: true };
        } catch (error) {
            console.error(error);

            return { success: false, message: 'Somthing went wrong. Please, try again later' };
        }
    };
}

export default new LoginService();