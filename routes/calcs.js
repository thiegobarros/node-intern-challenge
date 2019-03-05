const router = require('express').Router();

function fat (n) { // TODO
  
  if (n == 0) {
    return 1;
  }
  
  var resp = n;

  while (n > 2) {
    resp *= --n;
  }

  return resp;

}

function fib (n) {

  if (n <= 1) return 1;

  return fib(n - 1) + fib(n - 2);

}

router.post('/fat', (req, res) => {
  const {n} = req.body;

  if (!n) {
    res.sendStatus(400);
  }

  res.json({result: fat(n)});
});

router.post('/fib', (req, res) => {
  const {n} = req.body;

  if (!n) {
    res.sendStatus(400);
  }

  res.json({result: fib(n)});
});

module.exports = router;
