const express = require('express');
const {DataTypes } = require('sequelize');

const router = express.Router();
const sequelize = require('./db');
const Order = sequelize.define('uzsakymas', {
    apmoketas: DataTypes.INTEGER,
    kaina: DataTypes.FLOAT,
    uzsakymo_data: DataTypes.STRING,
    uzsakytas_filmas: DataTypes.STRING,
    fk_Filmasid : DataTypes.INTEGER,
    fk_Klientasid : DataTypes.INTEGER,
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

//get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get by id
router.get('/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: 'order not found' });
      }
      res.json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/orders', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is missing or empty' });
        }
        const newOrder = await Order.create({
          apmoketas: req.body.apmoketas,
          kaina: req.body.kaina,
          uzsakymo_data: req.body.uzsakymo_data,
          uzsakytas_filmas: req.body.uzsakytas_filmas,
          fk_Filmasid: req.body.fk_Filmasid,
          fk_Klientasid: req.body.fk_Klientasid,
      });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// update order
router.put('/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
      const orderToUpdate = await Order.findByPk(orderId);
      if (!orderToUpdate) {
        return res.status(404).json({ error: 'order not found' });
      }
      //keiciami filmo parametrai
      orderToUpdate.apmoketas = req.body.apmoketas || orderToUpdate.apmoketas;
      orderToUpdate.kaina = req.body.kaina || orderToUpdate.kaina;
      orderToUpdate.uzsakymo_data = req.body.uzsakymo_data || orderToUpdate.uzsakymo_data;
      orderToUpdate.uzsakytas_filmas = req.body.uzsakytas_filmas || orderToUpdate.uzsakytas_filmas;
      orderToUpdate.fk_Filmasid = req.body.fk_Filmasid || orderToUpdate.fk_Filmasid;
      orderToUpdate.fk_Klientasid = req.body.fk_Klientasid || orderToUpdate.fk_Klientasid;
      await orderToUpdate.save();
  
      res.json(orderToUpdate);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
// delete order
router.delete('/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
      const orderToDelete = await Order.findByPk(orderId);
      if (!orderToDelete) {
        return res.status(404).json({ error: 'order not found' });
      }
  
      await orderToDelete.destroy();
      res.json({ message: 'order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  module.exports = router;