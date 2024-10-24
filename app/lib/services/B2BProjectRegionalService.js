class B2BProjectRegionalService {
    constructor() {
        this.endpoints = process.env['NEXT_PUBLIC_API_URL'];
    }

    fetchProvince = async (req) => {
        try {
            const response = await fetch(`${this.endpoints}/api/v1/b2b-project-regional/province`, {
                method: 'GET',
                body: JSON.stringify(req),
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

            return { success: false, message: 'Somthing went wrong. Please, try again later' };
        }
    }

    fetchCity = async (req) => {
        try {
            const response = await fetch(`${this.endpoints}/api/v1/b2b-project-regional/city`, {
                method: 'GET',
                body: JSON.stringify(req),
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

            return { success: false, message: 'Somthing went wrong. Please, try again later' };
        }
    }

    fetchDistrict = async (req) => {
        try {
            const response = await fetch(`${this.endpoints}/api/v1/b2b-project-regional/district`, {
                method: 'GET',
                body: JSON.stringify(req),
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

            return { success: false, message: 'Somthing went wrong. Please, try again later' };
        }
    }

    fetchSubDistrict = async (req) => {
        try {
            const response = await fetch(`${this.endpoints}/api/v1/b2b-project-regional/sub-district`, {
                method: 'GET',
                body: JSON.stringify(req),
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

            return { success: false, message: 'Somthing went wrong. Please, try again later' };
        }
    }
}

export default new B2BProjectRegionalService();