require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Vérification de l'URI
if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env file');
    process.exit(1);
}

async function createAdmin() {
    try {
        console.log('🔗 Connecting to MongoDB...');

        // Options de connexion supplémentaires
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });

        console.log('✅ Connected to MongoDB');

        // Schéma et modèle User
        const userSchema = new mongoose.Schema({
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            name: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        });

        const User = mongoose.models.User || mongoose.model('User', userSchema);

        console.log('🔍 Checking for existing admin...');
        const adminExists = await User.findOne({ email: 'admin@example.com' });

        if (!adminExists) {
            console.log('🔑 Hashing password...');
            const hashedPassword = await bcrypt.hash('admin123', 10);

            console.log('👨‍💼 Creating admin user...');
            await User.create({
                email: 'admin@example.com',
                password: hashedPassword,
                name: 'Admin'
            });

            console.log('\n✅ Admin user created successfully!');
            console.log('📧 Email: admin@example.com');
            console.log('🔒 Password: admin123\n');
            console.log('⚠️ Change this password immediately after first login!');
        } else {
            console.log('ℹ️ Admin user already exists');
        }
    } catch (error) {
        console.error('\n❌ Error creating admin user:');
        console.error('Error details:', error.message);

        if (error.name === 'MongoServerSelectionError') {
            console.error('\nPossible solutions:');
            console.error('1. Verify your MONGODB_URI in .env file');
            console.error('2. Check your internet connection');
            console.error('3. Verify MongoDB Atlas IP whitelist');
            console.error('4. Check if your cluster is running\n');
        }
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            console.log('🔌 Disconnected from MongoDB');
        }
        process.exit(0);
    }
}

createAdmin();