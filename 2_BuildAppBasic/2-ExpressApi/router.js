const router = require('express').Router();

var users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Obae' },
    { id: 3, name: 'Jame' },
    { id: 4, name: 'Tomy' }
];

router.get('/', (req, res) => res.json({
    data: users
}));

router.get('/user/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ data: user });
});

router.post('/user', (req, res) => {
    console.log(req.body);
    const user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.json({ data: user });
});

router.put('/user/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.name = req.body.name;
    res.json({ data: user });
});

router.delete('/user/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.json({ data: user });
});

router.get('/about', (req, res) => res.json({ message: 'About page' }));
router.get('/contact', (req, res) => res.json({ message: 'Contact page' }));

module.exports = router;