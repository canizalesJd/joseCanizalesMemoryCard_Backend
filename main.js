const THEME_FOOD = "food";
const THEME_RPG = "rpg";
const THEME_RANDOM = "random";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

const foodImages = [
  "food/Peach.png",
  "food/Pickle.png",
  "food/Jerky.png",
  "food/Turnip.png",
  "food/Grub.png",
  "food/Waffles.png",
  "food/Cherry.png",
  "food/Roll.png",
  "food/Eggs.png",
  "food/Marmalade.png",
  "food/Eggplant.png",
  "food/PepperGreen.png",
  "food/Pretzel.png",
  "food/Sashimi.png",
  "food/Bug.png",
  "food/Whiskey.png",
  "food/Honey.png",
  "food/ChickenLeg.png",
  "food/Pepperoni.png",
  "food/Bacon.png",
  "food/MelonHoneydew.png",
  "food/Bread.png",
  "food/PickledEggs.png",
  "food/Wine.png",
  "food/Boar.png",
  "food/Tart.png",
  "food/Chicken.png",
  "food/Fish.png",
  "food/Shrimp.png",
  "food/Cookie.png",
  "food/Honeycomb.png",
  "food/Apple.png",
  "food/PiePumpkin.png",
  "food/Strawberry.png",
  "food/Sardines.png",
  "food/DragonFruit.png",
  "food/Sausages.png",
  "food/AppleWorm.png",
  "food/Moonshine.png",
  "food/Olive.png",
  "food/MelonCantaloupe.png",
  "food/Tomato.png",
  "food/Sushi.png",
  "food/Avocado.png",
  "food/Onion.png",
  "food/Beer.png",
  "food/MelonWater.png",
  "food/Lemon.png",
  "food/Brownie.png",
  "food/FishSteak.png",
  "food/Grubs.png",
  "food/Steak.png",
  "food/Stein.png",
  "food/FishFillet.png",
  "food/Pineapple.png",
  "food/PieLemon.png",
  "food/Ribs.png",
  "food/PepperRed.png",
  "food/Cheese.png",
  "food/PieApple.png",
  "food/PotatoRed.png",
  "food/Saki.png",
  "food/Potato.png",
  "food/Jam.png",
];

const rpgImages = [
  "rpg/Scroll.png",
  "rpg/IngotSilver.png",
  "rpg/PickAxe.png",
  "rpg/Stone01.png",
  "rpg/Wand.png",
  "rpg/Stone02.png",
  "rpg/Bow.png",
  "rpg/Potion01.png",
  "rpg/Diamond.png",
  "rpg/IngotGold.png",
  "rpg/Key.png",
  "rpg/Coin.png",
  "rpg/Compass.png",
  "rpg/Potion02.png",
  "rpg/Arrow.png",
  "rpg/Axe.png",
  "rpg/Chest.png",
  "rpg/Stick.png",
  "rpg/Book.png",
  "rpg/Skull.png",
  "rpg/Sword.png",
];

app.get("/cards/:difficulty/:theme", (req, res) => {
  let cards = [];
  let data = { cards: cards };

  if (req.params !== null) {
    if (req.params.difficulty !== null && req.params.theme !== null) {
      let difficulty = req.params.difficulty;
      let theme = req.params.theme;
      // 1. Create the cards list
      let cards = getCards(difficulty, theme);
      // 2. Duplicate the cards list
      cards.forEach((card) => {
        data.cards.push(card);
      });
      cards.forEach((card) => {
        data.cards.push(card);
      });
      // 3. Shuffle the cards list
      shuffleCards(data.cards);
    }
  }
  res.send(JSON.stringify(data));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const getCards = (difficulty, theme) => {
  let cards = [];
  let imageList = null;

  switch (theme) {
    case THEME_FOOD:
      imageList = foodImages;
      break;
    case THEME_RPG:
      imageList = rpgImages;
      break;
    case THEME_RANDOM:
      imageList = rpgImages;
      break;
  }

  for (let i = 1; i <= difficulty; i++) {
    let imageIndex = getIconIndex(-1, cards, imageList.length);
    let card = {
      id: imageIndex,
      image: imageList[imageIndex],
    };
    cards.push(card);
  }

  return cards;
};

const shuffleCards = (cards) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i + 1);
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
};

const getIconIndex = (iconIndex, cards, length) => {
  // TO DO: Add logic to get unique icons
  let newIconIndex = getRandomBetween(0, length - 1);

  if (iconIndex === newIconIndex) {
    return getIconIndex(iconIndex, cards, length);
  }

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (card.id === newIconIndex) {
      return getIconIndex(newIconIndex, cards, length);
    }
  }

  return newIconIndex;
};

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
