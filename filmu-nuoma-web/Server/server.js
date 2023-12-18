const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const OTPAuth = require('otpauth');
const base32 = require('thirty-two');
const crypto = require('crypto');

//cia copy paste pagal savo endpoint.js faila
const movieEndpoints = require('./movieEndpoints');
const orderEndpoints = require('./orderEndpoints');
const directorEndpoints = require('./directorEndpoints');
const reviewEndpoints = require('./reviewEndpoints');
const actorEndpoints = require('./actorEndpoints');
const genreEndpoints = require('./genreEndpoints');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());

//cia copy paste pagal savo endpoint.js faila
app.use('/api', movieEndpoints);
app.use('/api', orderEndpoints);
app.use('/api', directorEndpoints);
app.use('/api', reviewEndpoints);
app.use('/api', actorEndpoints);
app.use('/api', genreEndpoints);

const secretKey = 'F8D3C71E8EA4E1A2CBA663272DBBA';
const sequelize = require('./db');

const User = sequelize.define('klientas', {
    vardas: DataTypes.STRING,
    pavarde: DataTypes.STRING,
    telefonas: DataTypes.STRING,
    tipas: DataTypes.STRING,
    el_pastas: DataTypes.STRING,
    slapyvardis: DataTypes.STRING,
    slaptazodis: DataTypes.STRING,
    sukurimo_data: DataTypes.STRING,
    twoFactorSecret: DataTypes.STRING,
    kreditas: DataTypes.INTEGER,
}, {
    timestamps: false,
  });

sequelize.sync()
.then(() => {
console.log('Database and table synced');
})
.catch((error) => {
console.error('Error syncing database:', error);
});


const generateRandomBase32 = () => {
    const buffer = crypto.randomBytes(15);
    const base32String = base32.encode(buffer).toString().replace(/=/g, "").substring(0, 24);
    return base32String;
};

app.post('/api/register', async (req, res) => {
    const { slapyvardis } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({
            where: {
                slapyvardis,
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        // If the username is not taken, proceed with user registration
        const newUser = await User.create(req.body);

        const secret = generateRandomBase32();
        newUser.twoFactorSecret = secret;
        await newUser.save();

        const totp = new OTPAuth.TOTP({
            issuer: "filmu-nuoma",
            label: "Filmu nuoma",
            algorithm: "SHA1",
            digits: 6,
            period: 30,
            secret: secret,
        });

        const otpauth_url = totp.toString();

        const qrCodeDataURL = await QRCode.toDataURL(otpauth_url);

        res.status(201).json({
            message: 'User registered successfully',
            qrCodeDataURL,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/api/verify-2fa', async (req, res) => {
    const { userId, token, twoFactorCode } = req.body;

    try {
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err || decoded.userId !== userId) {
                console.log("invalid token");
                return res.status(401).json({ error: 'Invalid token' });
            }
            const user = await User.findByPk(userId);

            if (!user) {
                console.log("user not found");
                return res.status(404).json({ error: 'User not found' });
            }

            const totp = new OTPAuth.TOTP({
                issuer: "filmu-nuoma",
                label: "Filmu nuoma",
                algorithm: "SHA1",
                digits: 6,
                secret: user.twoFactorSecret,
            });
            
            const delta = totp.validate({ token:twoFactorCode, window: 1 });

            if (delta == null) {
                console.log("invalid 2fa");
                return res.status(401).json({ message: 'Invalid 2FA code' });
            }

            const newToken = jwt.sign({
                userId: user.id,
                username: user.slapyvardis,
                role: user.tipas,
            }, secretKey, { expiresIn: '1h' });
            res.json({ message: '2FA verification successful', newtoken: newToken });
        });
    } catch (error) {
        console.error('Error during 2FA verification:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username and password in the database
        const user = await User.findOne({
          where: {
            slapyvardis: username,
            slaptazodis: password,
          },
        });
    
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // Generate JWT token
        const token = jwt.sign({ userId: user.id, username: user.slapyvardis, role: user.tipas, }, secretKey, { expiresIn: '1h' });
        const userId = user.id;
        res.json({ token,  userId});
      } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

app.get('/api/user-profile', async (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authorizationHeader.split(' ')[1];
    
    // Verify the JWT token
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: 'Invalid token' });
        }
    
        const userId = decoded.userId;
    
        try {
        // Find the user in the database based on the ID from the token
        const user = await User.findByPk(userId);
    
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        // Return user profile data
        res.json({
            id: user.id,
            username: user.slapyvardis,
            name: user.vardas,
            lastName: user.pavarde,
            phoneNumber: user.telefonas,
            email: user.el_pastas,
            kreditas: user.kreditas,
        });
        } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    });
    });

app.delete('/api/delete-profile', async (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: 'Invalid token' });
        }

        const userId = decoded.userId;

        try {
            // Find the user by ID and delete the profile
            const user = await User.findByPk(userId);
        
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
        
            await user.destroy();
        
            res.status(200).json({ message: 'Profile deleted successfully' });

        } catch (error) {
            console.error('Error deleting profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    });


app.put('/api/update-profile', (req, res) => {
    
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: 'Invalid token' });
        }

        const userId = decoded.userId;

        const updatedUserData = {
            vardas: req.body.name,
            pavarde: req.body.lastName,
            telefonas: req.body.phoneNumber,
            el_pastas: req.body.email,
            slapyvardis: req.body.username,
            kreditas: req.body.kreditas,
          };

        try {
            const user = await User.findByPk(userId);

            if (!user) {
            return res.status(404).json({ error: 'User not found' });
            }
            await user.update(updatedUserData);

            res.sendStatus(200);
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});