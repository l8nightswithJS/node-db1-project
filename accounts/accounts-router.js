const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db('accounts')
  .then(accounts => {
    res.json(accounts); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve accounts' });
  });
});

router.post('/', (req, res) => {
  const accountsData = req.body;
  db('accounts').insert(accountsData)
  .then(accounts => {
    db('accounts').where({ id: accounts[0] })
    .then(newAccount => {
      res.status(201).json(newAccount);
    });
  })
  .catch (err => {
    console.log('error posting', err);
    res.status(500).json({ message: "Failed to store data" });
  });
});

router.put('/', (req, res) => {
    const { id } = req.query;
    const newUpdate = req.body;

    db('accounts')
        .where({id})
        .update(newUpdate)
        .then((account) => {
            if(account){ res.status(200).json(newUpdate)
            } else {
                res.status(404).json({message: "id not found", })
            }
        })
        .catch((err) =>
            res.status(500).json({ message: "faild to update account ", err })
        );
});

router.delete('/', (req, res) => {
    const {id} = req.query;

    db('accounts')
        .where({id})
        .del()
     .then((account) => {
         res.status(200).json({account: 'deleted account'})
     })
     .catch((err) => res.status(500).json({message: "failed to delete"}))    
})


module.exports = router;