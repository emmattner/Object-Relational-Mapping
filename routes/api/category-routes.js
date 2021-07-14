const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      Product,
      {
        model: Product,
        through: ProductTag,
      }
    ]
  })
    .then((category) => res.json(category))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    inlude: [
      Category, 
      {
        model: Tag,
        through: productTag,
      },
    ],
  })
  .then((category) => res.json(category))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
 Category.create({
   category_name: req.body.category_name
})
.then((category) => res.json(category))
.catch((err) => {
  console.log(err);
  res.status(400).json(err);
});
});


router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});



router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    },
  })
.then((category) => res.status(200).json(category))
.catch((err) => 
  res.status(400).json(err));
});


module.exports = router;
