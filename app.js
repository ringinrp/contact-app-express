const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./utils/contacts');

const app = express()
const port = 3000

//menggunakan ejs
app.set('view engine', 'ejs');
//third-party middleware
app.use(expressLayouts);
//built-in middleware 
app.use(express.static('public'));


app.get('/', (req, res) => {
    // res.sendFile('./index.html', {root: __dirname});
    const mahasiswa = [
        {
            nama: 'Restu',
            email: 'restu@gmail.com'
        },
        {
            nama: 'Pati',
            email: 'pati@gmail.com'
        },
        {
            nama: 'Zoya',
            email: 'zoya@gmail.com'
        },
    ]
    res.render('index', 
    {nama: 'Ringin Restu Pati', 
    title: 'Halaman HOME',
    mahasiswa,
    layout: 'layouts/main-layout',
});
});

app.get('/about', (req, res) => {
res.render('about', {
    layout: 'layouts/main-layout',
    title: ' Halaman About'});
})


app.get('/contact', (req, res) => {
    const contacts = loadContact();

    res.render('contact', {
        layout: 'layouts/main-layout',
        title: ' Halaman Contact',
        contacts,
    });
})
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('detail', {
        layout: 'layouts/main-layout',
        title: ' Halaman Detail Contact',
        contact,
    });
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

