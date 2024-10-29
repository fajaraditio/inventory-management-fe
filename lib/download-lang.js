

const deepl = require('deepl-node');

const fs = require('fs');
const path = require('path');

const inquirer = require('inquirer');

const sourceLanguage = 'en'
const sourceLanguageFile = path.join(__dirname, `../locales/${sourceLanguage}.json`);

const translator = new deepl.Translator('eaa0a0d0-5c33-4631-a863-268616768a8f:fx');

const translateWithDeepl = async (jsonData, sourceLanguage, targetLanguage) => {
    const translatedObject = {};

    for (const key in jsonData) {
        if (typeof jsonData[key] === 'object') {
            // recursive translation for nested objects

            translatedObject[key] = await translateWithDeepl(jsonData[key], sourceLanguage, targetLanguage);
        }
        else {
            const translated = await translator.translateText(jsonData[key], sourceLanguage, targetLanguage);

            translatedObject[key] = translated.text;
        }
    }

    return translatedObject;
}

const prompt = inquirer.createPromptModule();

prompt([
    {
        name: 'locale',
        message: 'Input international language with ISO-639 format (e.g. zh = Chinese Mandarin)',
        type: 'input',
    }
]).then((answer) => {
    fs.readFile(sourceLanguageFile, 'utf-8', async (err, data) => {
        if (err) {
            console.log(err);
        }

        let targetLanguage = answer.locale;

        const jsonData = JSON.parse(data);

        try {
            const translatedJSON = await translateWithDeepl(jsonData, sourceLanguage, targetLanguage);

            fs.writeFileSync(path.join(__dirname, `../locales/${targetLanguage}.json`), JSON.stringify(translatedJSON));

            console.log('Done!');
        } catch (err) {
            console.error(err);
        }
    })

})