"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("exercises", [
      {
        name: "Arnold Press",
        equipment: "Dumbbells",
        type: "Weight",
        muscle: "Arms",
        image:
          "giphy-2.gif (https://dl.airtable.com/FvaObZ1SyqwBU12Wx4K7_giphy-2.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bicep Curl",
        equipment: "Bar,Dumbbells,Cable",
        type: "Weight,Machine",
        muscle: "Arms",
        image:
          "3e8b7121-738e-4457-b6d8-fd3a3e04de5a.gif (https://dl.airtable.com/Pld28NJDTyeYLcaJV7hQ_3e8b7121-738e-4457-b6d8-fd3a3e04de5a.gif)",
        description:
          "Don't use momentum. Make sure the movement is coming from the bottom half of your arm not your shoulder moving the weight.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bicycle Crunch",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Core",
        image: "200.gif (https://dl.airtable.com/Y0JUbM2YTfe8uRz0jb5w_200.gif)",
        description:
          'The lower the "straight" leg is to the ground the more challenging this exercise is.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bounds",
        equipment: "Body Weight",
        type: "Cardio,Laps",
        muscle: "Full Body,Legs",
        image:
          "1ea07303-2e87-4876-8e68-8944edd42173.gif (https://dl.airtable.com/EkEnZqmyR9aAqElh54PL_1ea07303-2e87-4876-8e68-8944edd42173.gif)",
        description: "Do laps across the room of these.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Box Jumps",
        equipment: "Body Weight",
        type: "Plyo",
        muscle: "Full Body",
        image:
          "giphy.gif (https://dl.airtable.com/ZA0AU7h5RGyzcOQ1km9Z_giphy.gif)",
        description:
          "Don't be afraid, you can jump higher than you think. Just try it once.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Box Toe Touch",
        equipment: "Platform",
        type: "Cardio",
        muscle: "Legs",
        image:
          "workoutanniversarygif9570.gif (https://dl.airtable.com/ypibIv5pTmgfMNAJgY6J_workoutanniversarygif9570.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Broad Jump",
        equipment: "Body Weight",
        type: "Plyo,Laps,Cardio",
        muscle: "Legs",
        image:
          "Broad-Jumps-180-Degree-Twist.gif (https://dl.airtable.com/bYHQDYRDSeyzMCrhFxoT_Broad-Jumps-180-Degree-Twist.gif)",
        description:
          "You can do these for speed, or for distance. Speed = Cardio, Distance/Height = Plyo",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bulgarian Split Squat",
        equipment: "Bar,Dumbbells",
        type: "Weight",
        muscle: "Legs",
        image:
          "erin_stern_demonstrates_bulgarian_split_squat.gif (https://dl.airtable.com/599OAXT5SmTKCEZDTkWA_erin_stern_demonstrates_bulgarian_split_squat.gif)",
        description: "Use Single 30LB Dumbbell or an Olympic Bar",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Burpee",
        equipment: "Body Weight,Bosu Ball",
        type: "Plyo",
        muscle: "Full Body",
        image:
          "Burpee.gif (https://dl.airtable.com/xDZ3bhDQqG3erLNNwgyF_Burpee.gif)",
        description:
          "Option with half Bosu, Pushup Optional. Make sure you don't round your back",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Burpee Broad Jump",
        equipment: "Body Weight",
        type: "Plyo,Laps",
        muscle: "Full Body",
        image:
          "BurpeeBroadJump-1.gif (https://dl.airtable.com/e4ymuWNQqezi70M2EVpG_BurpeeBroadJump-1.gif)",
        description: "Do laps of these across the room if you have the space.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Butt Kickers",
        equipment: "Body Weight",
        type: "Cardio",
        muscle: "Legs",
        image:
          "1ef0b377-0b2e-47a0-9f1f-1e8ab3669923.gif (https://dl.airtable.com/pUgsc0ifRCKNfXOcvkSX_1ef0b377-0b2e-47a0-9f1f-1e8ab3669923.gif)",
        description:
          "Do it like you mean it, or this exercise is a waste of time.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Calf Raise",
        equipment: "Dumbbells,Machine",
        type: "Weight",
        muscle: "Legs",
        image:
          "Calf-Raises-Basic.jpg (https://dl.airtable.com/SQxbpgUWQSGxagLa6JaD_Calf-Raises-Basic.jpg)",
        description:
          "Play around with foot placement, some gyms also have machines for this",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Chest Press",
        equipment: "Dumbbells",
        type: "Weight",
        muscle: "Arms",
        image:
          "Dumbbell-Floor-Press.gif (https://dl.airtable.com/kyVvuwERkueuJQpV5fcT_Dumbbell-Floor-Press.gif)",
        description: "You can do this lying on the ground, or on a bench top",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Close to Wide Grip Burnout",
        equipment: "Dumbbells",
        type: "Weight",
        muscle: "Arms",
        image: "4.gif (https://dl.airtable.com/EKGDlplSbeSlC8mY2jqH_4.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Compass Jump",
        equipment: "Body Weight",
        type: "Cardio",
        muscle: "Full Body",
        image:
          "3b38ff89-fc79-409e-b45e-ae6a47d1ca17.gif (https://dl.airtable.com/DVWMKACWQ2S1D1AIo75L_3b38ff89-fc79-409e-b45e-ae6a47d1ca17.gif)",
        description: "These can also be done with both feet on the ground.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Crab Crawl",
        equipment: "Body Weight",
        type: "Cardio,Laps",
        muscle: "Full Body",
        image:
          "0d08fe37-5714-486b-a786-fea0f0cfbea7.gif (https://dl.airtable.com/ATjCdKZ9QialuVzd072J_0d08fe37-5714-486b-a786-fea0f0cfbea7.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Curtsey Lunges",
        equipment: "Dumbbells,Bar",
        type: "Weight",
        muscle: "Legs",
        image:
          "curtsy_lunge_barbell.gif (https://dl.airtable.com/qInmxz6RmTISdbvfQxUQ_curtsy_lunge_barbell.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Deficit Squat",
        equipment: "Platform",
        type: "Weight",
        muscle: "Legs",
        image:
          "dumbell-squat-from-deficit-front-view.png (https://dl.airtable.com/Je3QynAQXy8fNetseCA8_dumbell-squat-from-deficit-front-view.png)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Donkey Kick",
        equipment: "Dumbbells,Band,Body Weight",
        type: "Weight",
        muscle: "Legs",
        image:
          "kickbacks_donkey_kicks_on_the_smith_machine_ifbb_bikini_pro_training_glutes.gif (https://dl.airtable.com/Od3Fpm51SjuPFoNp6QNh_kickbacks_donkey_kicks_on_the_smith_machine_ifbb_bikini_pro_training_glutes.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Fire Hydrant",
        equipment: "Band,Body Weight",
        type: "Weight",
        muscle: "Legs",
        image:
          "Jen-Selters-Fire-Hydrant.gif (https://dl.airtable.com/MEMCDbjRam2VygRIDV5S_Jen-Selters-Fire-Hydrant.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Flutter Kick",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Core",
        image:
          "Flutter-Kicks.gif (https://dl.airtable.com/rsRW7e2JQMSscISPxOwm_Flutter-Kicks.gif)",
        description:
          "Her neck looks like its undergoing some serious strain. Feel free to leave yours on the ground.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Frogger",
        equipment: "Body Weight",
        type: "Plyo",
        muscle: "Full Body",
        image:
          "831b594cc2767b2f_Frogger.gif (https://dl.airtable.com/LqlhafK8SdbDLhssMfVG_831b594cc2767b2f_Frogger.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Glute Bridge",
        equipment: "Band,Dumbbells",
        type: "Weight",
        muscle: "Legs",
        image:
          "a562d6f5-888c-4b4a-a274-f969c3a8557d.gif (https://dl.airtable.com/KNCrgmAZTKyppbcj7oTC_a562d6f5-888c-4b4a-a274-f969c3a8557d.gif)",
        description: "If using weights, place in hip crease",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Glute Bridge March",
        equipment: "Band,Platform",
        type: "Weight",
        muscle: "Legs",
        image:
          "7346ca6c-b218-4a33-8fc7-f522df243390.gif (https://dl.airtable.com/CEVQMLbKSouX9GjRVXpR_7346ca6c-b218-4a33-8fc7-f522df243390.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Goblet Squat",
        equipment: "Kettlebells,Dumbbells",
        type: "Weight",
        muscle: "Legs",
        image:
          "depositphotos_127641230-stock-photo-kettlebell-goblet-squat.jpg (https://dl.airtable.com/GhZXa41TlGnE4DjPPmWA_depositphotos_127641230-stock-photo-kettlebell-goblet-squat.jpg)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Halo",
        equipment: "Kettlebells,Dumbbells",
        type: "Weight",
        muscle: "Arms",
        image:
          "ebe25b12-cc24-4b29-8d98-9566007ac4a8.gif (https://dl.airtable.com/XfsU9SRQoqRDq99IUeA2_ebe25b12-cc24-4b29-8d98-9566007ac4a8.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Heart Pump",
        equipment: "Kettlebells,Dumbbells",
        type: "Weight",
        muscle: "Arms",
        image:
          "eac68ec3-15dc-4a6a-806f-aa7572f394b0.gif (https://dl.airtable.com/rTMlSufGTWmbykC4De4Y_eac68ec3-15dc-4a6a-806f-aa7572f394b0.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "High Knees",
        equipment: "Body Weight",
        type: "Cardio",
        muscle: "Full Body",
        image:
          "highkneerun-1457044203.gif (https://dl.airtable.com/J9KgeDiSS6CcpoXXCu6v_highkneerun-1457044203.gif)",
        description:
          "My coach always says, your high knees tells a lot about your dedication. Do yours like the guy in the gif. Get your knees up or don't bother!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Jump Lunges",
        equipment: "Body Weight",
        type: "Plyo,Cardio",
        muscle: "Legs",
        image:
          "6405bfbb-585f-45e8-8834-0c5145f546f6.gif (https://dl.airtable.com/Ba9XRSpLRIK2a7mnAcxp_6405bfbb-585f-45e8-8834-0c5145f546f6.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Jump Rope",
        equipment: "Body Weight",
        type: "Cardio",
        muscle: "Full Body",
        image:
          "Sprint-2.gif (https://dl.airtable.com/vMYowb6TRJ6PeXp23MvX_Sprint-2.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Jumping Jack Push Press",
        equipment: "Medicine Ball",
        type: "Plyo",
        muscle: "Full Body",
        image:
          "workoutanniversarygif05570.gif (https://dl.airtable.com/oZVQcwVARtqxWSC7tyFu_workoutanniversarygif05570.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Jumping Jacks",
        equipment: "Body Weight",
        type: "Cardio",
        muscle: "Full Body",
        image:
          "jumping-jacks-gif-11.gif (https://dl.airtable.com/4EdvWh9Tre1EKZ9BH9LA_jumping-jacks-gif-11.gif)",
        description:
          "Go faster than the gif lady. I chose her because she has good form, your hand should always touch at the top",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kettlebell Swing",
        equipment: "Kettlebells,Dumbbells",
        type: "Cardio,Weight",
        muscle: "Full Body",
        image:
          "778789f4361994739ce59b8e597d00e7.gif (https://dl.airtable.com/sc9eLj4NTPSdXpxAlVxv_778789f4361994739ce59b8e597d00e7.gif)",
        description:
          'When I do these I usually keep my hand close to my body and let my hips "push" the movement. If you\'d like to experiment, you can use a dumbbell instead',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Knee Drive",
        equipment: "Body Weight",
        type: "Plyo",
        muscle: "Full Body",
        image:
          "skipsgifsmall.gif (https://dl.airtable.com/zk1x1ZczQLaNOaduvTiF_skipsgifsmall.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Lateral Band Walk",
        equipment: "Band",
        type: "Cardio,Laps",
        muscle: "Legs",
        image:
          "_CrabWalkSelf2_1_2.gif (https://dl.airtable.com/CF41gTm6RqG9eXo4ZZn1__CrabWalkSelf2_1_2.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Leg Pull Apart",
        equipment: "Band",
        type: "Weight",
        muscle: "Legs,Back",
        image:
          "f240c036-c8d8-4d59-8a2b-941a438ea462.gif (https://dl.airtable.com/5BX9RPuRQsanTolgDYcg_f240c036-c8d8-4d59-8a2b-941a438ea462.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Leg Raise",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Core",
        image:
          "legraise.jpg (https://dl.airtable.com/dXQ5blUQzqkbvODop0DP_legraise.jpg)",
        description: "Hold onto something heavy",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Literally Just Jumping",
        equipment: "Body Weight",
        type: "Plyo",
        muscle: "Full Body",
        image:
          "tenor.gif (https://dl.airtable.com/vlcOBT7rRZKO6CPNG3bP_tenor.gif)",
        description:
          "No good gifs for this, keep core tight, minimize time on the ground and jump up and down.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Lying Leg Raises",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Core",
        image:
          "lying.gif (https://dl.airtable.com/poLyFerTtuakObeRkXam_lying.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Military Plank",
        equipment: "Body Weight",
        type: "Plyo",
        muscle: "Full Body,Arms",
        image:
          "Military-Plank-Vicky.gif (https://dl.airtable.com/jKY8uPBNQCmUoiT9oehg_Military-Plank-Vicky.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Monkey Jump",
        equipment: "Body Weight",
        type: "Plyo,Cardio",
        muscle: "Full Body",
        image:
          "d6367f97-0584-4895-b292-d7aeae1b3ad6.gif (https://dl.airtable.com/niCgrY1wSI2BNzhk9Yuc_d6367f97-0584-4895-b292-d7aeae1b3ad6.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mountain Climbers",
        equipment: "Body Weight,Bosu Ball",
        type: "Cardio",
        muscle: "Core,Full Body",
        image:
          "mountain-climbers-gif-3.gif (https://dl.airtable.com/irHgy8wcTOaOoGUxhSxa_mountain-climbers-gif-3.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Plank",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Full Body,Core",
        image:
          "plank.jpg (https://dl.airtable.com/oAufzPV5TLaAWqvawz9T_plank.jpg)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Plank Jack",
        equipment: "Band,Body Weight",
        type: "Cardio",
        muscle: "Full Body,Core",
        image:
          "3705bd36-6b31-42df-9dd1-8d4984b797dc.gif (https://dl.airtable.com/gQzMkwbOSdab50QPoMEB_3705bd36-6b31-42df-9dd1-8d4984b797dc.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Plank Row",
        equipment: "Dumbbells",
        type: "Weight",
        muscle: "Full Body,Back",
        image:
          "3d9683d8b8f09bb0863726633ae69910.gif (https://dl.airtable.com/grctQ485ReSm2OEthRIc_3d9683d8b8f09bb0863726633ae69910.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Pushup",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Arms",
        image:
          "GlossySkinnyDuckbillcat-max-1mb.gif (https://dl.airtable.com/yyFWkXdGT2i7TMjYZGpL_GlossySkinnyDuckbillcat-max-1mb.gif)",
        description:
          "Can be done from knees, or legs. Arms parallel to your body like the dude in the gif.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Pushup Walk",
        equipment: "Band",
        type: "Weight",
        muscle: "Arms",
        image:
          "094028d3-bc38-481b-85c1-5c8dad17f12b.gif (https://dl.airtable.com/qK68xf5EQhiJvcxDH3Pd_094028d3-bc38-481b-85c1-5c8dad17f12b.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Reverse Crunches",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Core",
        image:
          "reverse.gif (https://dl.airtable.com/VaOguQgQI6w8qryauNZQ_reverse.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Row",
        equipment: "Bar,Dumbbells,Landmine",
        type: "Weight",
        muscle: "Back",
        image:
          "78eb6279-95b9-4269-a337-c2c0ca3b78d3.gif (https://dl.airtable.com/kVcbXQy9QdGOrjdFdzoO_78eb6279-95b9-4269-a337-c2c0ca3b78d3.gif)",
        description: "Bar + 15LB",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Russian Twist",
        equipment: "Kettlebells,Dumbbells",
        type: "Weight",
        muscle: "Core",
        image:
          "26c0501d-0254-4bc7-9b79-47b004393d4d.gif (https://dl.airtable.com/dYG39TGTPavUaPz63Jsy_26c0501d-0254-4bc7-9b79-47b004393d4d.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Seal Jacks",
        equipment: "Body Weight",
        type: "Cardio",
        muscle: "Full Body",
        image:
          "Seal-Jacks.gif (https://dl.airtable.com/IFXO2u2ZR8OzAHgp52v1_Seal-Jacks.gif)",
        description:
          "Clap your hands and dance around while you do these. Makes life more fun.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Shoulder Press",
        equipment: "Bar,Dumbbells",
        type: "Weight",
        muscle: "Arms",
        image:
          "03478637-60f5-49f1-95b3-593fead73610.gif (https://dl.airtable.com/lk4lhOS9RdqnKm5Pj7aw_03478637-60f5-49f1-95b3-593fead73610.gif)",
        description: "Bar + 5LB",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Side Arm / Lateral Raise",
        equipment: "Dumbbells",
        type: "Weight",
        muscle: "Arms",
        image:
          "12abf096-2edb-4062-8468-17e2951c14fe.gif (https://dl.airtable.com/NUbYbi5uRb6GeH0ZlcXi_12abf096-2edb-4062-8468-17e2951c14fe.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Side Lunge",
        equipment: "Body Weight,Dumbbells",
        type: "Weight",
        muscle: "Legs",
        image:
          "lungeside.gif (https://dl.airtable.com/OL3jchvCRQSLsnYmhI55_lungeside.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Side Plank",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Full Body,Core",
        image:
          "_main2_sideplank.jpg (https://dl.airtable.com/keRG2g3RECoT3LxhDGtQ__main2_sideplank.jpg)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Side Plank Dips",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Core",
        image:
          "Side-Plank-Hip-Dips.gif (https://dl.airtable.com/wkTRLvHTt2o4UX8RLo61_Side-Plank-Hip-Dips.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Side Plank with Leg Lift",
        equipment: "Band,Body Weight",
        type: "Weight",
        muscle: "Core",
        image:
          "75dcba8e-f0af-48c0-a6e8-c477b738911e.gif (https://dl.airtable.com/llvinxQRxCzG0K0YihOQ_75dcba8e-f0af-48c0-a6e8-c477b738911e.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Single Arm Clean and Press",
        equipment: "Kettlebells,Dumbbells",
        type: "Weight",
        muscle: "Full Body,Arms",
        image:
          "KettleBellCleanPress.gif (https://dl.airtable.com/M3Q7JQh4SEC22nZq5ru0_KettleBellCleanPress.gif)",
        description: "Currently using 25LB",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Single Leg Hip Bridge",
        equipment: "Body Weight,Dumbbells,Bosu Ball",
        type: "Weight",
        muscle: "Legs",
        image:
          "Hip-Thrust.gif (https://dl.airtable.com/nNGVnc7SFewVtiVcQb3U_Hip-Thrust.gif)",
        description:
          "You're wasting your time on this if you're not actually thinking about squeezing your glutes with each movement. You really need to be focused to do this.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Single Leg Squat",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Legs",
        image:
          "c7c4a48e-8a32-4f5e-aacf-bf152712e71a.gif (https://dl.airtable.com/PtJIrGJjSkqqfObx7q8c_c7c4a48e-8a32-4f5e-aacf-bf152712e71a.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Situp and Throw",
        equipment: "Medicine Ball",
        type: "Weight",
        muscle: "Core",
        image:
          "30-best-ab-exercises-situp-and-throw.jpg (https://dl.airtable.com/NDsSU55jRXSUAdKHEZA3_30-best-ab-exercises-situp-and-throw.jpg)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Skaters",
        equipment: "Body Weight",
        type: "Cardio",
        muscle: "Legs",
        image:
          "cca03f06-da6a-4d09-9718-b6e595fb2b96.gif (https://dl.airtable.com/Q5dmhk82TzqmlWq6xqJg_cca03f06-da6a-4d09-9718-b6e595fb2b96.gif)",
        description:
          "Lady in the gif isn't giving it 100% make sure to touch the ground between reps",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Skipping",
        equipment: "Body Weight",
        type: "Cardio,Laps",
        muscle: "Full Body",
        image:
          "4ee3d030-05d7-4961-86a6-bcdc727ec8e9.gif (https://dl.airtable.com/k5H1cu0cQF6rfO8LsRaa_4ee3d030-05d7-4961-86a6-bcdc727ec8e9.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Skull Crusher",
        equipment: "Dumbbells,Bar",
        type: "Weight",
        muscle: "Arms",
        image: "14.gif (https://dl.airtable.com/h9v6LLAERqunzBJAdjeD_14.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Spiderman Pushup",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Arms,Core",
        image:
          "0dd5e852-dd90-4f1e-a570-c20dca7c72cf.gif (https://dl.airtable.com/OK93O1xWRA2yu3GG8zoF_0dd5e852-dd90-4f1e-a570-c20dca7c72cf.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Squat",
        equipment: "Bar,Dumbbells,Body Weight,Squat Rack,Band",
        type: "Weight",
        muscle: "Legs",
        image:
          "barbell-squat.gif (https://dl.airtable.com/r3DIlCSPTsimSjgCPuHS_barbell-squat.gif)",
        description: "Bar + 45LB",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Squat Jump",
        equipment: "Body Weight",
        type: "Plyo,Cardio",
        muscle: "Legs",
        image:
          "5a1e902f-42e7-4b38-b3c5-af3cb2cbbf0c.gif (https://dl.airtable.com/gpp3YS4jTyijTClCALdq_5a1e902f-42e7-4b38-b3c5-af3cb2cbbf0c.gif)",
        description:
          "You can do these for height (plyo) or speed (cardio) and to switch them up sometimes do them with your arms clasped at the front so it's a leg-only exercise",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Squat Jumps 180",
        equipment: "Body Weight",
        type: "Plyo",
        muscle: "Full Body",
        image:
          "0145ce919124c8a3_SquatJump180Small.gif (https://dl.airtable.com/U5DO3G2T1apEtdTbx9PH_0145ce919124c8a3_SquatJump180Small.gif)",
        description: "Turn body 180 while doing squat jump",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Squat to Lateral Leg Lift",
        equipment: "Band",
        type: "Weight",
        muscle: "Legs",
        image:
          "_SquatLateralLegLiftSelf2_1_3.gif (https://dl.airtable.com/ZuOXOtbTRcuVbC9uQPuY__SquatLateralLegLiftSelf2_1_3.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Standing Glute Kickbaks",
        equipment: "Band",
        type: "Weight",
        muscle: "Legs",
        image:
          "_StandingGluteKickBackSelf2_1_4.gif (https://dl.airtable.com/uF03I0P8SQW3vLXFUfRN__StandingGluteKickBackSelf2_1_4.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Standing Leg Lift",
        equipment: "Cable,Band",
        type: "Weight",
        muscle: "Legs",
        image:
          "standing abduction.jpg (https://dl.airtable.com/5som2SlmRjmkjITXHWtQ_standing%20abduction.jpg)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Standing Oblique Crunch",
        equipment: "Dumbbells",
        type: "Weight",
        muscle: "Core",
        image:
          "Standing-Oblique-Crunches.gif (https://dl.airtable.com/38n4dcbTgCM2tjvxWKUb_Standing-Oblique-Crunches.gif)",
        description: "20LB Weight Minimum",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Star Jump",
        equipment: "Body Weight",
        type: "Plyo",
        muscle: "Full Body",
        image:
          "workoutanniversarygif06570.gif (https://dl.airtable.com/ISLRenRs2FWV3QFratPw_workoutanniversarygif06570.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Step Up Lunges",
        equipment: "Platform,Dumbbells",
        type: "Plyo",
        muscle: "Legs",
        image:
          "dumbbell-step-up.gif (https://dl.airtable.com/QBmW9FpxQn2FN7CQLFH7_dumbbell-step-up.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Step-Back Lunge",
        equipment: "Bar,Body Weight,Dumbbells,Squat Rack",
        type: "Weight",
        muscle: "Legs",
        image:
          "bikini_prep_full_glute_training_routine_quest_cake_recipe_training_vlog.gif (https://dl.airtable.com/A2uJ0HlJQWWebQFz0eul_bikini_prep_full_glute_training_routine_quest_cake_recipe_training_vlog.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Straightup Situp",
        equipment: "Dumbbells",
        type: "Weight",
        muscle: "Core",
        image:
          "30-best-ab-exercises-straight-leg-barbell-situp.jpg (https://dl.airtable.com/GPXUq5zcRoGqP9WbvJLa_30-best-ab-exercises-straight-leg-barbell-situp.jpg)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Sumo Squat",
        equipment: "Bar,Dumbbells,Body Weight",
        type: "Weight",
        muscle: "Legs",
        image:
          "a7a48b0ff2d2b6b10e086290b1fede92.gif (https://dl.airtable.com/OLsqAqSuS16qsySMCgAw_a7a48b0ff2d2b6b10e086290b1fede92.gif)",
        description:
          "Bar + 35LB. You want your legs to be just wide enough that your knees still track over your toes",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Superman",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Back",
        image:
          "13a573f1_Superman.jpg (https://dl.airtable.com/I7Gp5cmZTKejJcfh2oNA_13a573f1_Superman.jpg)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Touchdown",
        equipment: "Body Weight",
        type: "Plyo",
        muscle: "Full Body",
        image:
          "WtFJBce.gif (https://dl.airtable.com/MTMz4OoeRFaccThM3XKx_WtFJBce.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tricep Dip",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Arms",
        image:
          "Tricep-Dip-on-Bench-g.gif (https://dl.airtable.com/gZTLGaYoTI6P0WwdO2u4_Tricep-Dip-on-Bench-g.gif)",
        description: "Find a chair or platform you can lean on.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tricep Kick-Back",
        equipment: "Dumbbells",
        type: "Weight",
        muscle: "Arms",
        image:
          "Triceps-Kickback.jpg (https://dl.airtable.com/tjY0kN2QTBSIoZZCv10k_Triceps-Kickback.jpg)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tricep Overhead Press",
        equipment: "Dumbbells",
        type: "Weight",
        muscle: "Arms",
        image: "5.gif (https://dl.airtable.com/Pp7ftUMQe6qzCxJg7iXs_5.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tuck Jump",
        equipment: "Body Weight",
        type: "Plyo",
        muscle: "Full Body",
        image:
          "Tuck-Jumps.gif (https://dl.airtable.com/Zo0O59geRTataUwhQo2r_Tuck-Jumps.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Twisted Mountain Climbers",
        equipment: "Body Weight,Bosu Ball",
        type: "Cardio",
        muscle: "Full Body,Core",
        image:
          "mountain-climbers-gif-3.gif (https://dl.airtable.com/QqbBRbLRFaMBuFe9VR8g_mountain-climbers-gif-3.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Wall Ball",
        equipment: "Medicine Ball",
        type: "Cardio",
        muscle: "Full Body",
        image:
          "WallBallToss.gif (https://dl.airtable.com/tOqEs71CReQ9XSK15MwN_WallBallToss.gif)",
        description:
          "Toss the Medicine Ball in the air, or against a solid wall (concrete or brick) if available.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Weighted Jumping Jacks",
        equipment: "Dumbbells",
        type: "Cardio",
        muscle: "Full Body",
        image:
          "eec0a59a6eacdc9cfd19a13290516684.jpg (https://dl.airtable.com/Ay4JNlvRqCCbLlKjwHWC_eec0a59a6eacdc9cfd19a13290516684.jpg)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Weighted Punches",
        equipment: "Dumbbells",
        type: "Cardio",
        muscle: "Core",
        image:
          "cross-punch-exercise-illustration.gif (https://dl.airtable.com/AZ5zCPLNRJBCx5CwWUwn_cross-punch-exercise-illustration.gif)",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Deadbug",
        equipment: "Body Weight",
        type: "Weight",
        muscle: "Core",
        image:
          "exAX6p.gif (https://dl.airtable.com/Vwxt6KjRW62PrDrpTDSx_exAX6p.gif)",
        description:
          "Really good if you have lower back pain and want to do an ab workout",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("exercises", null, {});
  },
};
