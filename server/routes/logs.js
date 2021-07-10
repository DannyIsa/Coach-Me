const models = require("../models");
const { Op, where } = require("sequelize");
const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.SQL_DATA_BASE,
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: "mysql",
  }
);
const express = require("express");
const { Router } = require("express");
const logs = Router();
logs.use(express.json());

logs.post("/workout/add/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  const { workoutId } = req.body;
  if (!traineeId | !workoutId) return res.status(400).send("Id Required");
  const workout = await models.Workout.findOne({ where: { id: workoutId } });
  if (!workout) return res.status(404).send("Workout Not Found");
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });
  if (!trainee) return res.status(404).send("Trainee Not Found");

  const log = await models.WorkoutLog.create({
    trainee_id: traineeId,
    workout_id: workoutId,
  });
  if (!log) return res.status(400).send("Couldn't Register Log");
  return res.status(201).send(log);
});

async function updateOrCreate(model, where, newItem) {
  // First try to find the record
  const todayLog = await model.findOne({
    where: where,
  });
  if (!todayLog) {
    // Item not found, create a new one
    const item = await model.create(newItem);
    return { item, status: 201 };
  }
  // Found an item, update it
  const item = await model.update(newItem, { where });
  if (!item) {
    return { item: "couldnt update", status: 400 };
  }
  const newLog = await model.findOne({
    where: where,
  });

  return { item: newLog, status: 201 };
}

logs.post("/measure/add", async (req, res) => {
  const {
    id,
    weight,
    height,
    chestPerimeter,
    hipPerimeter,
    bicepPerimeter,
    thighPerimeter,
    waistPerimeter,
  } = req.body || null;

  const trainee = await models.Trainee.findOne({ where: { id } });

  if (!id || !trainee) {
    return res.status(404).send("Invalid ID");
  }
  if (
    !weight &&
    !height &&
    !chestPerimeter &&
    !hipPerimeter &&
    !bicepPerimeter &&
    !thighPerimeter &&
    !waistPerimeter
  ) {
    return res.status(404).send("Must send measure logs");
  }

  updateOrCreate(
    models.MeasureLog,
    {
      created_at: {
        [Op.gt]: new Date().setHours(0, 0, 0, 0),
        [Op.lt]: new Date(),
      },
    },
    {
      trainee_id: id,
      weight,
      height,
      chest_perimeter: chestPerimeter,
      hip_perimeter: hipPerimeter,
      bicep_perimeter: bicepPerimeter,
      thigh_perimeter: thighPerimeter,
      waist_perimeter: waistPerimeter,
    }
  )
    .then(async (data) => {
      const { height, weight } = data.item;
      await trainee.update({ height, weight });
      return res.status(data.status).send(data.item);
    })
    .catch((err) => {
      return res.status(err.status).send("Couldn't update logs");
    });
});

logs.get("/workout/show/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });

  if (!traineeId || !trainee) {
    return res.status(400).send("Invalid ID");
  }
  const traineeWorkoutsLog = await models.WorkoutLog.findAll({
    attributes: ["workout_id", "created_at"],
    where: { trainee_id: traineeId },
  });
  const workouts = await Promise.all(
    traineeWorkoutsLog.map(async (log) => {
      let item = await log.getWorkout();
      if (!item)
        return {
          id: log.workout_id,
          name: "*Workout Deleted*",
          date: log.toJSON().created_at,
        };
      item = item.toJSON();
      delete item.createdAt;
      delete item.updatedAt;
      return {
        ...item,
        date: log.toJSON().created_at,
      };
    })
  );
  if (!workouts) return res.status(200).send([]);
  res.status(200).send(workouts);
});

logs.get("/measure/show/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });

  if (!traineeId || !trainee) {
    return res.status(404).send("Invalid ID");
  }

  const traineeMeasureLog = await models.MeasureLog.findOne({
    attributes: [
      "height",
      "weight",
      "hip_perimeter",
      "chest_perimeter",
      "thigh_perimeter",
      "bicep_perimeter",
      "waist_perimeter",
      [sequelize.fn("date", sequelize.col("MeasureLog.created_at")), "date"],
    ],
    where: { trainee_id: traineeId },
    order: [["created_at", "DESC"]],
  });
  if (!traineeMeasureLog) return res.status(200).send({});

  return res.status(200).send(traineeMeasureLog);
});

logs.get("/diet/show/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  const { day, month, year } = req.query;
  let date;
  if (!day || !month | !year) date = new Date();
  else date = new Date(year + "-" + month + "-" + day);
  date = date.toISOString().slice(0, 10);
  const trainee = await models.Trainee.findOne({
    where: { id: traineeId },
  });

  if (!traineeId || !trainee) {
    return res.status(404).send("Invalid ID");
  }

  const traineeDietLog = await models.EatenFood.findAll({
    where: {
      [Op.and]: [
        { trainee_id: traineeId },
        sequelize.where(
          sequelize.fn("date", sequelize.col("created_at")),
          "=",
          date
        ),
      ],
    },
  });

  if (traineeDietLog.length === 0) return res.status(200).send([]);

  const items = await Promise.all(
    traineeDietLog.map(async (log) => {
      let item = await log.getFood();
      return { ...item.toJSON(), ...log.toJSON() };
    })
  );

  res.status(200).send(items);
});

logs.get("/diet/show/all/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  if (!Number(traineeId)) return res.status(400).send("Id Required");
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });
  if (!trainee) return res.status(404).send("No Trainee Found");
  const dietLogs = await models.EatenFood.findAll({
    attributes: [
      [sequelize.fn("date", sequelize.col("EatenFood.created_at")), "date"],
      [
        sequelize.fn("sum", sequelize.literal("(amount*Food.calories)")),
        "total_calories",
      ],
      [
        sequelize.fn("sum", sequelize.literal("(amount*Food.protein)")),
        "total_protein",
      ],
      [
        sequelize.fn("sum", sequelize.literal("(amount*Food.fats)")),
        "total_fats",
      ],
      [
        sequelize.fn("sum", sequelize.literal("(amount*Food.carbs)")),
        "total_carbs",
      ],
      "calorie_goal",
    ],
    where: { trainee_id: traineeId },
    include: {
      model: models.Food,
      attributes: ["calories", "protein", "fats", "carbs"],
    },
    group: ["date"],
  });
  if (!dietLogs) return [];
  let dataToSend = [...dietLogs].map((log) => {
    let item = { ...log.toJSON() };
    if (!item.calorie_goal)
      item.calorie_goal = trainee.toJSON().daily_calorie_goal;
    delete item.Food;
    return item;
  });
  return res.status(200).send(dataToSend);
});

logs.get("/workout/check/:traineeId", async (req, res) => {
  const { traineeId } = req.params;
  if (!traineeId) return res.status(400).send("Id Required");
  const trainee = await models.Trainee.findOne({ where: { id: traineeId } });
  if (!trainee) return res.status(404).send("No Trainee Found");
  const date = new Date().toISOString().slice(0, 10);

  const logs = await models.WorkoutLog.findOne({
    where: {
      [Op.and]: [
        { trainee_id: traineeId },
        [
          sequelize.where(
            sequelize.fn("date", sequelize.col("created_at")),
            "=",
            date
          ),
        ],
      ],
    },
  });
  if (logs) {
    const workout = await logs.getWorkout();
    return res.status(200).send({
      done: true,
      workout: {
        ...workout.toJSON(),
        day: new Date().toString().split(" ")[0],
      },
    });
  }
  const calendar = await trainee.getCalendars({
    where: {
      day: { [Op.startsWith]: new Date().toString().split(" ")[0] },
    },
  });
  if (!calendar[0]) return res.status(200).send({ done: false });
  const workout = await calendar[0].getWorkout();
  if (!workout)
    return res.status(200).send({
      done: false,
    });
  return res.status(200).send({
    done: false,
    workout: { ...workout.toJSON(), day: calendar[0].day },
  });
});
module.exports = logs;
