const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const path = require('path');
const envPath = path.resolve(__dirname, `../env/.env.${NODE_ENV}`);
require('dotenv').config({ path: envPath });
const mongoose = require('mongoose');
const fs = require('fs').promises;
const { AgreementTemplate } = require('../src/models/AgreementTemplate');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    const htmlPath = path.join(
      __dirname,
      '../src/templates/SolutionAgreement.html',
    );
    const templateText = await fs.readFile(htmlPath, 'utf-8');

    const template = new AgreementTemplate({ templateText, type: 'solution' });
    const savedTemplate = await template.save();

    console.log('Template saved:', savedTemplate);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run seed function
seedDatabase();
