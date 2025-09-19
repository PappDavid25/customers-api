import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());


const customers = [
    { id: 1, name: 'Gusztáv', email: 'valami1@gmail.com' },
    { id: 2, name: 'Dzsézönsztethem' , mail: 'valami2@gmail.com'},
    { id: 3, name: 'Ronaldo', mail: 'valami3@gmail.com'},
    { id: 4, name: 'Lion' , mail: 'valami4@gmail.com'},
    { id: 5, name: 'Emánuel', mail: 'valami5@gmail.com'}
];

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/customers', (req, res) => {
    res.status(200).json(customers);
});

app.get('/customers/:id', (req, res) => {
    const customerId = parseInt(req.params.id);
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        res.json(customer);
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
});

app.post('/customers', (req, res) => {
    const {name, mail } = req.body;
    if (!name || !mail) {
        return res.status(400).json({ message: 'Name and mail are required' });
    }
    const id = customers.length ? customers[customers.length - 1].id + 1 : 1;
    const customer = { id, name, mail };
    customers.push(customer);
    res.status(201).json(customer);
});

app.put('/customers/:id', (req, res) => {
    const customerId = parseInt(req.params.id);
    const customerIndex = customers.findIndex(c => c.id === customerId);
    if (customerIndex !== -1) {
        customers[customerIndex] = req.body;
        res.json(customers[customerIndex]);
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
});
app.delete('/customers/:id', (req, res) => {
    const customerId = parseInt(req.params.id);
    const customerIndex = customers.findIndex(c => c.id === customerId);
    if (customerIndex !== -1) {
        customers.splice(customerIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
});


