import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var articles = [];

function createArticle(id, title, description, content) { return { id, title, description, content } };

for (let i = 0; i < 4; i++) {
    articles.push(createArticle(
        `article-${i}`,
        `Lorem ipsum dolor sit amet`,
        `Nam varius condimentum diam vitae placerat. Duis a sem egestas, pellentesque mi porta, ultricies dolor. Donec sodales faucibus pretium.`,
        `Nunc vitae ante non ante ullamcorper tristique. Donec congue, diam ac porta vulputate, tellus dui luctus sem, vitae pulvinar risus risus vitae urna. Nulla facilisi. Etiam molestie ipsum vel est suscipit, vel sagittis tortor ultrices. Integer libero ex, euismod id tempus eu, ullamcorper vitae justo. Nullam vel diam vitae elit sagittis facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc accumsan ligula sit amet justo vehicula mattis. Fusce et velit id dui venenatis fermentum. Duis non sagittis ex. Maecenas in erat eros. Fusce eget ullamcorper dui. Aenean nec eros nec nunc sagittis sagittis quis sed magna.
    Quisque malesuada purus a felis cursus, ut luctus urna aliquam. 
    Maecenas scelerisque tellus in posuere cursus. Vivamus a ex et urna consequat dignissim sit amet vitae purus.
    Vestibulum aliquet feugiat arcu eget placerat.
    Curabitur tempor viverra dolor id feugiat. Suspendisse sed leo viverra dui luctus interdum at vitae magna. Morbi eget dui sit amet leo tempus fringilla ut nec nulla. Donec sed accumsan nisi. Quisque molestie mattis neque. Morbi et velit nibh. Nam ultrices mauris at bibendum porttitor. Vivamus eget purus massa. Nullam aliquet quis nisl eget dignissim. Donec viverra ultricies eros, vitae bibendum risus faucibus ac.`));
}

app.get('/', (req, res) => {

    const firstArticle = articles[0];
    res.render('index.ejs', { article: articles, first: firstArticle });
});

app.get('/article/:id', (req, res) => {
    const id = req.params.id;
    const selectedArticle = articles.find(a => a.id === id);

    if (!selectedArticle) {
        return res.status(404).send('Article not found');
    }

    res.render('article.ejs', { article: selectedArticle, articles: articles });
});

app.post('/modify', (req, res) => {
    const selectedArticles = articles.find(a => a.id === req.body.id);
    if (!selectedArticles) {
        return res.status(404).send('Article introuvable');
    }
    selectedArticles.title = req.body.title;
    selectedArticles.description = req.body.description;
    selectedArticles.content = req.body.content;

    res.redirect('/');
});

app.get('/create', (req, res) => {
    res.render('create.ejs');
});

app.post('/create', (req, res) => {
    var id = articles.length + 1;
    var article = createArticle(`article-${id}`, req.body.title, req.body.description, req.body.content);
    articles.push(article);
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const index = articles.findIndex(a => a.id === id);

    if (index !== -1) {
        articles.splice(index, 1); // supprime l'article du tableau
    }

    res.redirect('/');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`listening on ${port}`);
});

