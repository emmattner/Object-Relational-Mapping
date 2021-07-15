const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint


//find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
    // Includes associated Products data
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find one category by its `id` value
  router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
      // Includes associated Products data
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
      });
      if (!categoryData) {
        res.status(404).json({ message: 'No categories found with this id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // craete a new category
  router.post('/', async (req, res) => {
    try {
      const categoryData = await Category.create({
        category_name: req.body.category_name,
      })
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
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
