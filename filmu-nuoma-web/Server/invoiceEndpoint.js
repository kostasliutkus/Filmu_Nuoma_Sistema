const express = require('express');
const {DataTypes } = require('sequelize');

const router = express.Router();
const sequelize = require('./db');
const Invoice = sequelize.define('israsas', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    pirkejas: DataTypes.STRING,
    suma: DataTypes.DOUBLE,
    aprasas: DataTypes.STRING,
    israso_data: DataTypes.STRING,
    suma_zodziais : DataTypes.STRING,
    pardavejo_informacija : DataTypes.STRING,
    fk_Uzsakymasid  : DataTypes.INTEGER,
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

//get all Invoices
router.get('/invoices', async (req, res) => {
    try {
        const Invoices = await Invoice.findAll();
        res.json(Invoices);
    } catch (error) {
        console.error('Error fetching Invoices:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get by id
router.get('/invoices/:id', async (req, res) => {
    const InvoiceId = req.params.id;
    try {
      const Invoice = await Invoice.findByPk(InvoiceId);
      if (!Invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
      res.json(Invoice);
    } catch (error) {
      console.error('Error fetching Invoice:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/invoices', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is missing or empty' });
        }
        const newInvoice = await Invoice.create({
            pirkejas: req.body.pirkejas,
            suma: req.body.suma,
            aprasas: req.body.aprasas,
            israso_data: req.body.israso_data,
            suma_zodziais :req.body.suma_zodziais,
            pardavejo_informacija : req.body.pardavejo_informacija,
            fk_Uzsakymasid  : req.body.fk_Uzsakymasid,
      });
        res.status(201).json(newInvoice);
    } catch (error) {
        console.error('Error creating Invoice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// update Invoice
router.put('/invoices/:id', async (req, res) => {
    const InvoiceId = req.params.id;
    try {
      const InvoiceToUpdate = await Invoice.findByPk(InvoiceId);
      if (!InvoiceToUpdate) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
      //keiciami filmo parametrai
      InvoiceToUpdate.apmoketas = req.body.apmoketas || InvoiceToUpdate.apmoketas;
      InvoiceToUpdate.kaina = req.body.kaina || InvoiceToUpdate.kaina;
      InvoiceToUpdate.uzsakymo_data = req.body.uzsakymo_data || InvoiceToUpdate.uzsakymo_data;
      InvoiceToUpdate.uzsakytas_filmas = req.body.uzsakytas_filmas || InvoiceToUpdate.uzsakytas_filmas;
      InvoiceToUpdate.fk_Filmasid = req.body.fk_Filmasid || InvoiceToUpdate.fk_Filmasid;
      InvoiceToUpdate.fk_Klientasid = req.body.fk_Klientasid || InvoiceToUpdate.fk_Klientasid;
      await InvoiceToUpdate.save();
  
      res.json(InvoiceToUpdate);
    } catch (error) {
      console.error('Error updating Invoice:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
// delete Invoice
router.delete('/invoices/:id', async (req, res) => {
    const InvoiceId = req.params.id;
    try {
      const InvoiceToDelete = await Invoice.findByPk(InvoiceId);
      if (!InvoiceToDelete) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
  
      await InvoiceToDelete.destroy();
      res.json({ message: 'Invoice deleted successfully' });
    } catch (error) {
      console.error('Error deleting Invoice:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  module.exports = router;