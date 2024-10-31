const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({ key: process.env.GOOGLE_CLOUD_API_KEY });

export async function POST(req) {
    const { text, target } = await req.json();

    console.log(req);

    let [translations] = await translate.translate(text, target);

    translations = Array.isArray(translations) ? translations : [translations];

    return Response.json(translations)
}