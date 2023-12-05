const THEME_FOOD = "food";
const THEME_RPG = "rpg";
const THEME_CHARACTHERS = "characters";

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const databaseUrl =
  "https://josecanizalesmemorycard-default-rtdb.firebaseio.com/";

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

const charactersImages = [
  "characters/char_01.png",
  "characters/char_02.png",
  "characters/char_03.png",
  "characters/char_04.png",
  "characters/char_05.png",
  "characters/char_06.png",
  "characters/char_07.png",
  "characters/char_08.png",
  "characters/char_09.png",
  "characters/char_10.png",
  "characters/char_11.png",
  "characters/char_12.png",
  "characters/char_13.png",
  "characters/char_14.png",
  "characters/char_15.png",
  "characters/char_16.png",
  "characters/char_17.png",
  "characters/char_18.png",
  "characters/char_19.png",
  "characters/char_20.png",
  "characters/char_21.png",
  "characters/char_22.png",
  "characters/char_23.png",
  "characters/char_24.png",
  "characters/char_25.png",
  "characters/char_26.png",
  "characters/char_27.png",
  "characters/char_28.png",
  "characters/char_29.png",
  "characters/char_30.png",
  "characters/char_31.png",
  "characters/char_32.png",
  "characters/char_33.png",
  "characters/char_34.png",
  "characters/char_35.png",
  "characters/char_36.png",
  "characters/char_37.png",
  "characters/char_38.png",
  "characters/char_39.png",
  "characters/char_40.png",
  "characters/char_41.png",
  "characters/char_42.png",
  "characters/char_43.png",
  "characters/char_44.png",
  "characters/char_45.png",
  "characters/char_46.png",
  "characters/char_47.png",
  "characters/char_48.png",
  "characters/char_49.png",
  "characters/char_50.png",
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

app.get("/scores", (req, res) => {
  const url = `${databaseUrl}scores.json`;
  axios
    .get(url)
    .then(function (response) {
      let scores = [];
      for (const key in response.data) {
        const score = response.data[key];
        scores.push(score);
      }
      const result = scores.sort(
        (firstScore, secondScore) => firstScore.score - secondScore.score
      );
      res.send(JSON.stringify(result.slice(0, 10)));
    })
    .catch(function (error) {
      console.log(error);
      res.send("Failed to get the scores data");
    });
});

app.post("/score", async (req, res) => {
  const url = `${databaseUrl}scores.json`;
  let score = req.body;
  axios
    .post(url, score)
    .then(function (response) {
      console.log(response);
      res.send("Scores saved successfully");
    })
    .catch(function (error) {
      console.log(error);
      res.send("Failed to save the score");
    });
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
    case THEME_CHARACTHERS:
      imageList = charactersImages;
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
