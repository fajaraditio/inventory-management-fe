class TranslateService {
    translate = async (text, targetLang) => {
        try {
            const response = await fetch(`/api/translate`, {
                method: 'POST',
                body: JSON.stringify({
                    text: text,
                    target: targetLang,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) return Object.assign({}, { success: false }, { data: data });

            return Object.assign({}, { success: false }, { data: data });
        } catch (error) {
            console.error(error);

            return { success: false, message: 'Something went wrong. Please, try again later' };
        }
    }
}

export default new TranslateService();