import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.json({
    sucess: true,
    data: {
      message: 'Hello Goalfy!'
    }
  })
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
