import express from 'express';
import cors from 'cors';
import data from './data.json';

const app = express();
const fakeLatency = 1000;

function filterArticles(filter) {
  return (req, res) => setTimeout(
    () => res.json(
      data
        .map(({ full, ...item }) => item)
        .filter(filter),
    ),
    fakeLatency,
  );
}

app.use(cors());

app.get(
  '/articles/local',
  filterArticles(a => a.category === 'local'),
);

app.get(
  '/articles/global',
  filterArticles(a => a.category === 'global'),
);

app.get(
  '/articles/tech',
  filterArticles(a => a.category === 'tech'),
);

app.get(
  '/articles/sports',
  filterArticles(a => a.category === 'sports'),
);

app.get('/articles/:id', (req, res) => setTimeout(
  () => res.json(
    data.find(a => a.id === +req.params.id),
  ),
  fakeLatency,
));

app.get(
  '/articles',
  filterArticles(() => true),
);

app.listen(3001, () => console.log('Listening on port 3001...'));
